import type { Handle } from '@sveltejs/kit';
import { auth } from '$src/lib/server/features/auth/lucia';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
