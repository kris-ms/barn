import { sign, verify } from 'hono/jwt';
import * as schema from 'db/schema';
import { db } from 'db/db';
import { eq } from 'drizzle-orm';
import type { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';

export class Auth {
    static async verifyToken(
        token: string
    ): Promise<schema.UserJwtPayload | undefined> {
        try {
            const payload = await verify(token, Bun.env['JWT_SECRET']);
            const validPayload =
                await schema.userJwtPayloadSchema.safeParseAsync(payload);

            return validPayload.data;
        } catch (e) {
            console.error(e);
            return;
        }
    }

    static async signUserToken(user: any): Promise<string | undefined> {
        try {
            const validUserData = schema.loginUserSchema.parse(user);
            const rows = await db
                .select()
                .from(schema.users)
                .where(eq(schema.users.email, validUserData.email))
                .limit(1);
            const foundUser = rows[0];

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

            return c.redirect('/');
        }

        if (!sessionToken) {
            return c.redirect('/login');
        }

        const payload = await Auth.verifyToken(sessionToken);
        if (!payload) {
            return c.redirect('/login');
        }

        c.set('jwtPayload', payload);
        return next();
    }
}
