export async function load({ locals }) {
	const session = await locals.auth.validate();

	return {
		username: session?.user.username
	};
}
