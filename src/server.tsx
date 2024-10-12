import { Hono } from 'hono';
import IndexRoute from './routes/index';
import LoginRoute from './routes/login';
import LogoutRoute from './routes/logout';
import UploadRoute from './routes/upload';
import FoldersRoute from './routes/folders';
import FoldersSingleRoute from './routes/folders/single';
import FileSingleRoute from './routes/files/single';
import { jsxRenderer } from 'hono/jsx-renderer';
import { Style } from 'hono/css';

const app = new Hono();

app.use(
    jsxRenderer(({ children }) => {
        return (
            <html lang="en">
                <head>
                    <Style />
                    <meta charset="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                </head>
                <body>{children}</body>
            </html>
        );
    })
);

app.route('/', IndexRoute);
app.route('/login', LoginRoute);
app.route('/logout', LogoutRoute);
app.route('/upload', UploadRoute);
app.route('/folders', FoldersRoute);
app.route('/folders', FoldersSingleRoute);
app.route('/files', FileSingleRoute);

export default {
    port: 3000,
    fetch: app.fetch,
};
