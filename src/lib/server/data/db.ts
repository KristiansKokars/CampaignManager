import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

export const connection = await mysql.createConnection({
	uri: DATABASE_URL
});

// TODO: mode from .env
export const db = drizzle(connection, { mode: 'planetscale', schema });
