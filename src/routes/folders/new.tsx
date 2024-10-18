import { Hono } from 'hono';
import type { FC } from 'hono/jsx';
import * as schema from 'db/schema';
import { db } from 'db/db';
import { Auth } from 'auth';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import { nanoid } from 'nanoid';

const NewFolder: FC = () => {
    return (
        <form action="/folders/new" method="post">
            <input type="text" name="name" />
            <button type="submit">Create</button>
        </form>
    );
};

export const newFolderRoute = new Hono<{ Variables: schema.Variables }>();

newFolderRoute.use(Auth.middleware);

newFolderRoute.get('/new', async (c) => {
    return c.render(<NewFolder />);
});

newFolderRoute.post(
    '/new',
    zValidator('form', schema.insertFolderSchema.pick({ name: true })),
    async (c) => {
        const userId = c.get('jwtPayload').id;
        const { name } = c.req.valid('form');
        try {
            const newFolderData = {
                name,
                owner_id: userId,
                created_at: new Date().toISOString(),
                id: nanoid(),
            };
            const newFolder = await db
                .insert(schema.folders)
                .values(newFolderData)
                .returning();
            if (newFolder) {
                return c.redirect(`/folders/${newFolder[0].id}`);
            } else {
                throw new HTTPException(500);
            }
        } catch (e) {
            console.error(e);
            throw new HTTPException(500);
        }
    }
);

export default newFolderRoute;
