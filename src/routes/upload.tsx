import { Auth } from 'auth';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { FC } from 'hono/jsx';

const Upload: FC = () => {
    return (
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="text" name="name" />
            <input type="file" name="file" />
            <button type="submit">Upload</button>
        </form>
    );
};

const uploadRoute = new Hono();
uploadRoute.use(Auth.middleware);

uploadRoute.get('/', async (c) => {
    return c.render(<Upload />);
});

uploadRoute.post('/', async (c) => {
    const body = await c.req.parseBody();
    const { file } = body;
    if (typeof file === 'string') {
        throw new HTTPException(400);
    }

    const buffer = await file.arrayBuffer();
    const bytesWritten = await Bun.write(`./files/${file.name}`, buffer);

    console.log(bytesWritten, `bytes written to ./files/${file.name}`);

    return c.redirect('/');
});

export default uploadRoute;
