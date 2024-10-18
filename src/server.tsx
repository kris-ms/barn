import { Hono } from 'hono';
import IndexRoute from './routes/index';
import LoginRoute from './routes/login';
import LogoutRoute from './routes/logout';
import UploadRoute from './routes/upload';
import FoldersRoute from './routes/folders';
import FoldersNewRoute from './routes/folders/new';
import FoldersSingleRoute from './routes/folders/single';
import FileSingleRoute from './routes/files/single';
import FoldersDeleteRoute from './routes/folders/delete';
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer';
import { Style } from 'hono/css';
import { serveStatic } from 'hono/bun';
import { Layout } from 'components/layout/full';

const app = new Hono();

declare module 'hono' {
    interface ContextRenderer {
        (content: string | Promise<string>, props: { title: string }): Response;
    }
}

app.use(
    jsxRenderer(({ children, title }) => {
        return (
            <html lang="en">
                <head>
                    <title>Barn - {title}</title>
                    <Style />
                    <meta charset="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <link
                        rel="stylesheet"
                        href="/static/css/reset.css"
                        type="text/css"
                    />
                    <link
                        rel="stylesheet"
                        href="/static/css/global.css"
                        type="text/css"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossorigin=""
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lexend:wght@100..900&display=swap"
                        rel="stylesheet"
                    />
                </head>
                <Layout title={title} path={useRequestContext().req.path}>
                    <body>{children}</body>
                </Layout>
            </html>
        );
    })
);

app.use('/static/*', serveStatic({ root: './src' }));
app.route('/', IndexRoute);
app.route('/login', LoginRoute);
app.route('/logout', LogoutRoute);
app.route('/upload', UploadRoute);
app.route('/folders', FoldersRoute);
app.route('/folders', FoldersNewRoute);
app.route('/folders', FoldersSingleRoute);
app.route('/folders', FoldersDeleteRoute);
app.route('/files', FileSingleRoute);

export default {
    port: 3000,
    fetch: app.fetch,
};
