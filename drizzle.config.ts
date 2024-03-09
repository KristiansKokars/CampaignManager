import 'dotenv/config';
import { tablePrefix } from './src/lib/server/data/schema';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/data/schema.ts',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_TOKEN
	},
	tablesFilter: [`${tablePrefix}*`]
} satisfies Config;
