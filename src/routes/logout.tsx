import { Hono } from 'hono';
import { deleteCookie } from 'hono/cookie';

const logoutRoute = new Hono();

logoutRoute.get('/', async (c) => {
    deleteCookie(c, 'session_token');
    return c.redirect('/');
});

export default logoutRoute;
