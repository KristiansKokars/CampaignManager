import { auth } from '$lib/server/features/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { LuciaError } from 'lucia';

const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(12)
});

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = loginUserSchema.safeParse(formData);

		if (!parsedFormData.success) {
			const allFieldErrors = parsedFormData.error.errors.map((error) => ({
				field: error.path[0],
				message: error.message
			}));
			return fail(400, { error: true, allFieldErrors });
		}

		const { email, password } = parsedFormData.data;
		try {
			const userKey = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: userKey.userId,
				attributes: {}
			});

			locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: 'Incorrect email or password'
				});
			}

			return fail(500, {
				message: 'An unknown error occurred'
			});
		}

		throw redirect(302, '/');
	}
};

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
}
