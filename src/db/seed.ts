import { db } from './db';
import { nanoid } from 'nanoid';
import { insertUserSchema, users } from './schema';

const seedUsers = [
    {
        id: nanoid(),
        name: 'John Doe',
        email: 'test@example.com',
        password: Bun.password.hashSync('dev'),
    },
    {
        id: nanoid(),
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
