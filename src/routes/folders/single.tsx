import { Hono } from 'hono';
import * as schema from 'db/schema';
import { query } from 'db/db';
import { eq, and } from 'drizzle-orm';
import { Auth } from 'lib/auth';
import { HTTPException } from 'hono/http-exception';
import type { FC } from 'hono/jsx';

const SingleFolder: FC<schema.BarnFolder> = ({ name, files }) => {
    return (
        <div>
            <h1>{name}</h1>
            <ul>
                {files.map((file) => (
                    <li>
                        <a href={`/files/${file.id}`}>{file.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const singleFolderRoute = new Hono<{ Variables: schema.Variables }>();
singleFolderRoute.use(Auth.middleware);

singleFolderRoute.get('/:folderId', async (c) => {
    const userId = c.get('jwtPayload').id;
    const { folderId } = c.req.param();
    const folder = await query.folders.findFirst({
        where: and(
            eq(schema.folders.id, folderId),
            eq(schema.folders.owner_id, userId)
        ),
        with: {
            files: true,
        },
    });

    if (!folder) {
        throw new HTTPException(404);
    }

    return c.render(<SingleFolder {...folder} />);
});

export default singleFolderRoute;
