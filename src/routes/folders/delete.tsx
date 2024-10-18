import { Hono } from 'hono';
import * as schema from 'db/schema';
import { db, query } from 'db/db';
import { Auth } from 'lib/auth';
import { HTTPException } from 'hono/http-exception';
import { eq, and } from 'drizzle-orm';
import { unlink } from 'node:fs/promises';

export const deleteFolderRoute = new Hono<{ Variables: schema.Variables }>();

deleteFolderRoute.use(Auth.middleware);

deleteFolderRoute.get('/:folderId/delete', async (c) => {
    const userId = c.get('jwtPayload').id;
    const { folderId } = c.req.param();
    try {
        const foundFolder = await query.folders.findFirst({
            where: and(
                eq(schema.folders.id, folderId),
                eq(schema.folders.owner_id, userId)
            ),
            with: {
                files: true,
            },
        });

        if (foundFolder) {
            for (const file of foundFolder.files) {
                await db
                    .delete(schema.files)
                    .where(eq(schema.files.id, file.id));

                const filePath = Bun.pathToFileURL(file.file_url);
                await unlink(filePath).catch(() => null);
            }

            await db
                .delete(schema.folders)
                .where(eq(schema.folders.id, folderId));

            return c.redirect('/folders');
        } else {
            throw new HTTPException(404);
        }
    } catch (e) {
        console.error(e);
        throw new HTTPException(500);
    }
});

export default deleteFolderRoute;
