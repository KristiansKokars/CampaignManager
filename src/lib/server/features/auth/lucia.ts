import { user, userKey, userSession } from '$src/lib/server/data/schema';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { mysql2 } from '@lucia-auth/adapter-mysql';
import { connection } from '$src/lib/server/data/db';
import { getTableConfig } from 'drizzle-orm/mysql-core';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { github } from '@lucia-auth/oauth/providers';

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

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
