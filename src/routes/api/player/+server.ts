import { db } from '$src/lib/server/data/db';
import { user } from '$src/lib/server/data/schema';
import { json } from '@sveltejs/kit';
import { like } from 'drizzle-orm';

export async function GET({ url }) {
	const username = url.searchParams.get('username');
	if (!username) return json([]);

	const users = await db
		.select({ userId: user.id, username: user.username })
		.from(user)
		.where(like(user.username, `%${username}%`));

	return json(users);
}
