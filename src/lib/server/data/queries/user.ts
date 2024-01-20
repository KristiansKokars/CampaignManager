import { and, like, not, eq } from 'drizzle-orm';
import { db } from '$src/lib/server/data/db';
import { user } from '$src/lib/server/data/schema';

export async function findUsersByUsernameExcludingYourself(
	userId: string,
	usernameToSearch: string
) {
	return await db
		.select({ userId: user.id, username: user.username })
		.from(user)
		.where(and(like(user.username, `%${usernameToSearch}%`), not(eq(user.id, userId))));
}
