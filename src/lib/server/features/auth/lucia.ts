import { user, userKey, userSession } from '$src/lib/server/data/schema';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { mysql2 } from '@lucia-auth/adapter-mysql';
import { connection } from '$src/lib/server/data/db';
import { getTableConfig } from 'drizzle-orm/mysql-core';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: mysql2(connection, {
		user: getTableConfig(user).name,
		session: getTableConfig(userSession).name,
		key: getTableConfig(userKey).name
	}),

	getUserAttributes: (data) => {
		return {
			username: data.username,
			email: data.email,
			emailVerified: Boolean(data.email_verified) // MySQL stores booleans as 0 or 1, so we do a conversion here
		};
	}
});

export type Auth = typeof auth;
