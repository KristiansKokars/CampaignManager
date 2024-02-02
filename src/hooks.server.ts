import { error, type Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/features/auth/lucia';
import { ratelimit } from '$lib/server/features/ratelimit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const ip = event.getClientAddress();
	const rateLimitAttempt = await ratelimit.limit(ip);
	if (!rateLimitAttempt.success) {
		const timeRemaining = Math.floor((rateLimitAttempt.reset - new Date().getTime()) / 1000);
		throw error(429, `Too many requests. Please try again in ${timeRemaining} seconds.`);
	}

	return await resolve(event);
};
