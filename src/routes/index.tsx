import { Hono } from 'hono';
import { Auth } from 'auth';
import * as schema from 'db/schema';
import { query } from 'db/db';
import { HTTPException } from 'hono/http-exception';
import { eq } from 'drizzle-orm';
import { Dashboard } from 'components/dashboard/full';

const indexRoute = new Hono<{ Variables: schema.Variables }>();
indexRoute.use(Auth.middleware);

indexRoute.get('/', async (c) => {
    const user = c.get('jwtPayload');

    try {
        const folders = await query.folders.findMany({
            where: eq(schema.folders.owner_id, user.id),
            with: {
                files: true,
            },
        });

        const recentFiles = await query.files.findMany({
            where: eq(schema.files.uploader_id, user.id),
            orderBy: (files, { desc }) => desc(files.created_at),
            limit: 5,
        });

        return c.render(
            <Dashboard
                user={user}
                folders={folders}
                recentFiles={recentFiles}
            />,
            {
                title: 'Home',
            }
        );
    } catch (e) {
        console.error(e);
        throw new HTTPException(500);
    }
});

export default indexRoute;
