import { Auth } from 'auth';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { FC } from 'hono/jsx';
import { query, db } from 'db/db';
import { eq } from 'drizzle-orm';
import * as schema from 'db/schema';
import { nanoid } from 'nanoid';

type UploadProps = {
    folders: Array<schema.BarnFolder>;
};

const Upload: FC<UploadProps> = ({ folders }) => {
    return (
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file" />
            <select name="folder">
                {folders.map((folder) => (
                    <option value={folder.id}>{folder.name}</option>
                ))}
            </select>
            <button type="submit">Upload</button>
        </form>
    );
};

const uploadRoute = new Hono<{ Variables: schema.Variables }>();
uploadRoute.use(Auth.middleware);

uploadRoute.get('/', async (c) => {
    const user = c.get('jwtPayload');
    const folders = await query.folders.findMany({
        where: eq(schema.folders.owner_id, user.id),
    });
    return c.render(<Upload folders={folders} />, {
        title: 'Upload',
    });
});

uploadRoute.post('/', async (c) => {
    const user = c.get('jwtPayload');
    const body = await c.req.parseBody();
    const { file, folder } = body;
    if (typeof file === 'string' || !file) {
        throw new HTTPException(400);
    }

    const fileInfo = {
        id: nanoid(),
        name: file.name,
        created_at: new Date().toISOString(),
        file_url: `./files/${file.name}`,
        folder_id: String(folder),
        uploader_id: user.id,
        size: file.size,
    };

    const validFile = schema.insertFileSchema.parse(fileInfo);
    if (!validFile) {
        throw new HTTPException(400);
    }

    try {
        const fileRecord = await db
            .insert(schema.files)
            .values(validFile)
            .returning();

        console.log(fileRecord);
        if (!fileRecord) {
            throw new HTTPException(500);
        }

        const writePath = `./files/${fileInfo.folder_id}/${file.name}`;

        const buffer = await file.arrayBuffer();
        const bytesWritten = await Bun.write(writePath, buffer);

        console.log(bytesWritten, `bytes written to ${writePath}`);

        return c.redirect('/');
    } catch (e) {
        console.error(e);
    }
});

export default uploadRoute;
