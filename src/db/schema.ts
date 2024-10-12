import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable('users', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
});

export const insertUserSchema = createInsertSchema(users);
const selectUserSchema = createSelectSchema(users);
export const safeUserSchema = selectUserSchema.omit({ password: true });
export const userJwtPayloadSchema = z
    .object({
        iat: z.string().optional(),
        exp: z.number().optional(),
        nbf: z.number().optional(),
    })
    .and(safeUserSchema);
export const loginUserSchema = selectUserSchema.pick({
    email: true,
    password: true,
});

export type UserJwtPayload = z.infer<typeof userJwtPayloadSchema>;
