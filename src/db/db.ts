import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';

const sqlite = new Database('barn.db');

export const db = drizzle(sqlite);

export const query = drizzle(db.$client, { schema }).query;
