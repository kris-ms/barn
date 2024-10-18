import { sign, verify } from 'hono/jwt';
import * as schema from 'db/schema';
import { query } from 'db/db';
import { eq } from 'drizzle-orm';
import type { Context, Next } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';

export class Auth {
    static async verifyToken(
        token: string
    ): Promise<schema.UserJwtPayload | undefined> {
        try {
            const payload = await verify(token, Bun.env['JWT_SECRET']);
            const validPayload =
                await schema.userJwtPayloadSchema.safeParseAsync(payload);

            if (!validPayload.success) {
                return;
            }

            const validUser = query.users.findFirst({
                where: eq(schema.users.id, validPayload.data.email),
            });

            if (!validUser) {
                return;
            }

            return validPayload.data;
        } catch (e) {
            console.error(e);
            return;
        }
    }

    static async signUserToken(user: any): Promise<string | undefined> {
        try {
            const validUserData = schema.loginUserSchema.parse(user);
            const foundUser = await query.users.findFirst({
                where: eq(schema.users.email, validUserData.email),
            });

            if (!foundUser) {
                throw new Error('User not found');
            }

            if (
                !Bun.password.verifySync(
                    validUserData.password,
                    foundUser.password
                )
            ) {
                throw new Error('Invalid password');
            }

            const safeUser = schema.safeUserSchema.parse(foundUser);
            return await sign(
                {
                    ...safeUser,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                },
                Bun.env['JWT_SECRET']
            );
        } catch (e) {
            return;
        }
    }

    static async middleware(c: Context, next: Next) {
        const onLoginPage = c.req.path === '/login';
        const sessionToken = getCookie(c, 'session_token');
        if (onLoginPage) {
            if (!sessionToken) {
                return next();
            }

            const payload = await Auth.verifyToken(sessionToken);
            if (!payload) {
                return next();
            }

            const validUser = await query.users.findFirst({
                where: eq(schema.users.id, payload.email),
            });

            if (!validUser) {
                return next();
            }

            return c.redirect('/');
        }

        if (!sessionToken) {
            return c.redirect('/login');
        }

        const payload = await Auth.verifyToken(sessionToken);
        if (!payload) {
            return c.redirect('/login');
        }

        const validUser = await query.users.findFirst({
            where: eq(schema.users.id, payload.id),
        });

        if (!validUser) {
            setCookie(c, 'session_token', '');
        }

        c.set('jwtPayload', payload);
        return next();
    }
}
