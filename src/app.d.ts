declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
	}
	namespace Lucia {
		type Auth = import('$lib/server/features/auth/lucia').Auth;
		type DatabaseUserAttributes = {
			username: string;
			email?: string;
			email_verified?: number; // MySQL stores booleans as 0 or 1
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
