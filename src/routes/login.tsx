import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import * as schema from 'db/schema';
import { Auth } from 'auth';
import { setCookie } from 'hono/cookie';

const Login = () => {
    return (
        <form action="/login" method="post">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <button type="submit">Login</button>
        </form>
    );
};

const loginRoute = new Hono();
loginRoute.use(Auth.middleware);

loginRoute.get('/', async (c) => {
    return c.render(<Login />);
});

loginRoute.post('/', zValidator('form', schema.loginUserSchema), async (c) => {
    const token = await Auth.signUserToken(c.req.valid('form'));

    if (!token) {
        // TODO: handle error in form
        return c.redirect('/login');
    }

    setCookie(c, 'session_token', token);
    return c.redirect('/');
});

export default loginRoute;
