import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable('users', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    folders: many(folders),
    files: many(files),
}));

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

export type Variables = {
    jwtPayload: UserJwtPayload;
};

export const folders = sqliteTable('folders', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    created_at: text('created_at').notNull(),
    owner_id: text('owner_id').notNull(),
});

export const foldersRelations = relations(folders, ({ one, many }) => ({
    owner: one(users, {
        fields: [folders.owner_id],
        references: [users.id],
    }),
    files: many(files),
}));

export const insertFolderSchema = createInsertSchema(folders);
export const selectFolderSchema = createSelectSchema(folders);
export const safeFolderSchema = selectFolderSchema.omit({ owner_id: true });

export type BarnFolder = z.infer<typeof selectFolderSchema> & {
    files?: Array<BarnFile>;
};

export const files = sqliteTable('files', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    created_at: text('created_at').notNull(),
    file_url: text('file_url').notNull(),
    folder_id: text('folder_id').notNull(),
    uploader_id: text('uploader_id').notNull(),
    size: integer().notNull(),
});

export const filesRelations = relations(files, ({ one }) => ({
    folder: one(folders, {
        fields: [files.folder_id],
        references: [folders.id],
    }),
    uploader: one(users, {
        fields: [files.uploader_id],
        references: [users.id],
    }),
}));

export const insertFileSchema = createInsertSchema(files);
export const selectFileSchema = createSelectSchema(files);
export const safeFileSchema = selectFileSchema.omit({ folder_id: true });

export type BarnFile = z.infer<typeof selectFileSchema>;
