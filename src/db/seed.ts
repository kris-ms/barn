import { db } from './db';
import { nanoid } from 'nanoid';
import {
    files,
    folders,
    insertFileSchema,
    insertFolderSchema,
    insertUserSchema,
    users,
} from './schema';

// Cleans databse

for (const table of [users, folders, files]) {
    await db.delete(table);
}

const USER_1_ID = nanoid();
const USER_2_ID = nanoid();

const seedUsers = [
    {
        id: USER_1_ID,
        name: 'John Doe',
        email: 'test@example.com',
        password: Bun.password.hashSync('dev'),
    },
    {
        id: USER_2_ID,
        name: 'Jane Doe',
        email: 'test2@example.com',
        password: Bun.password.hashSync('dev2'),
    },
];

const validUsers = seedUsers.map((user) => insertUserSchema.parse(user));

for (const user of validUsers) {
    const result = db.insert(users).values(user).returning().get();

    console.log(result);
}

const testFolders = [
    {
        id: nanoid(),
        name: 'test',
        owner_id: validUsers[0].id,
        created_at: new Date().toISOString(),
    },
    {
        id: nanoid(),
        name: 'test2',
        owner_id: validUsers[1].id,
        created_at: new Date().toISOString(),
    },
];

const validFolders = testFolders.map((folder) => {
    return insertFolderSchema.parse(folder);
});

for (const folder of validFolders) {
    const result = db.insert(folders).values(folder).returning().get();
    console.log(result);
}

const testFiles = [
    {
        id: nanoid(),
        name: 'test.txt',
        folder_id: validFolders[0].id,
        uploader_id: validUsers[0].id,
        created_at: new Date().toISOString(),
        file_url: 'test',
        size: 1,
        mime_type: 'text/plain',
    },
    {
        id: nanoid(),
        name: 'test2.txt',
        folder_id: validFolders[1].id,
        uploader_id: validUsers[1].id,
        created_at: new Date().toISOString(),
        file_url: 'test2',
        size: 2,
        mime_type: 'text/plain',
    },
];

const validFiles = testFiles.map((file) => {
    return insertFileSchema.parse(file);
});

for (const file of validFiles) {
    const result = db.insert(files).values(file).returning().get();
    console.log(result);
}
