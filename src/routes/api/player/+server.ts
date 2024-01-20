import { findUsersByUsernameExcludingYourself } from '$src/lib/server/data/queries/user.js';
import { json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const username = url.searchParams.get('username');
	if (!username) return json([]);
	const session = await locals.auth.validate();

	const users = await findUsersByUsernameExcludingYourself(session?.user.userId ?? '', username);

	return json(users);
}
