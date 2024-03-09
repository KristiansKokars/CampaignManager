import { drizzle } from 'drizzle-orm/libsql';
import { DATABASE_URL, DATABASE_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client';
import * as schema from './schema';

export const connection = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_TOKEN
});

export const db = drizzle(connection, { schema });
