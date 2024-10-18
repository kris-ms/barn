import type { FC } from 'hono/jsx';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Auth } from 'auth';
import * as schema from 'db/schema';
import { HTTPException } from 'hono/http-exception';
import { setCookie } from 'hono/cookie';

const loginRoute = new Hono();

export const Login: FC = () => {
    return (
        <form action="/login" method="post">
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button type="submit">Login</button>
        </form>
    );
};

loginRoute.use(Auth.middleware);

loginRoute.get('/', async (c) => {
    return c.render(<Login />, { title: 'Login' });
});

loginRoute.post('/', zValidator('form', schema.loginUserSchema), async (c) => {
    try {
        const validUser = c.req.valid('form');
        const token = await Auth.signUserToken(validUser);

        if (!token) {
            // TODO: show error
            throw new HTTPException(500);
        }

        setCookie(c, 'session_token', token);
        return c.redirect('/');
    } catch (e) {
        console.error(e);
        throw new HTTPException(400);
    }
});

export default loginRoute;
