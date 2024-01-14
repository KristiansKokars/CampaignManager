import 'dotenv/config';
import { tablePrefix } from './src/lib/server/data/schema';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/data/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		uri: process.env.DATABASE_URL
	},
	tablesFilter: [`${tablePrefix}*`]
} satisfies Config;
