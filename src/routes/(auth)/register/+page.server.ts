import { auth } from '$lib/server/features/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { parseFormData } from '$src/lib/util/parse-form-data';

const registerUserSchema = z.object({
	email: z.string().email(),
	username: z.string().min(10),
	password: z.string().min(12)
});

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const parsedFormData = await parseFormData(request, registerUserSchema);
		if (!parsedFormData.success) {
			const allFieldErrors = parsedFormData.error.errors.map((error) => ({
				field: error.path[0],
				message: error.message
			}));
			return fail(400, { error: true, allFieldErrors });
		}
		const { email, username, password } = parsedFormData.data;

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email.toLowerCase(),
					password
				},
				attributes: {
					email: email.toLowerCase(),
					email_verified: 0, // as MySQL stores a boolean as a number, 0 - false
					username
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			console.error(`Failed to register user: ${username}`, e);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}

		console.log(`Registered and logged in user: ${username}`);
		throw redirect(302, '/');
	}
};

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
}
