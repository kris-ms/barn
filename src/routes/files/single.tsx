import { Hono } from 'hono';
import { type FC } from 'hono/jsx';
import { Auth } from 'lib/auth';
import { HTTPException } from 'hono/http-exception';
import { query } from 'db/db';
import { eq, and } from 'drizzle-orm';
import * as schema from 'db/schema';

const SingleFile: FC<schema.BarnFile> = ({ name, file_url }) => {
    return (
        <div>
            <h1>{name}</h1>
            <a href={file_url}>{file_url}</a>
        </div>
    );
};

const singleFileRoute = new Hono<{ Variables: schema.Variables }>();
singleFileRoute.use(Auth.middleware);

singleFileRoute.get('/:fileId', async (c) => {
    const userId = c.get('jwtPayload').id;
    const { fileId } = c.req.param();
    const file = await query.files.findFirst({
        where: and(
            eq(schema.files.id, fileId),
            eq(schema.files.uploader_id, userId)
        ),
    });

    if (!file) {
        throw new HTTPException(404);
    }

    return c.render(<SingleFile {...file} />);
});

export default singleFileRoute;
