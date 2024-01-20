import { db } from '$src/lib/server/data/db.js';
import { campaignInvite } from '$src/lib/server/data/schema.js';
import { parseFormData } from '$src/lib/util/parse-form-data.js';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const campaignInvites = db.query.campaignInvite.findMany({
		where: and(
			eq(campaignInvite.invitedUserId, session.user.userId),
			eq(campaignInvite.status, 'sent')
		),
		with: {
			campaign: {
				columns: {
					name: true
				}
			}
		}
	});

	return {
		campaignInvites: campaignInvites
	};
}

const inviteSchema = z.object({
	campaignId: z.string()
});

export const actions: Actions = {
	acceptInvite: async ({ request, locals }) => {
		await replyToInvite(locals, request, 'accepted');
	},
	denyInvite: async ({ request, locals }) => {
		await replyToInvite(locals, request, 'declined');
	}
};

async function replyToInvite(locals: App.Locals, request: Request, reply: 'accepted' | 'declined') {
	const session = await locals.auth.validate();
	if (!session) throw error(401);

	const { campaignId } = await parseFormData(request, inviteSchema);

	await db
		.update(campaignInvite)
		.set({
			status: reply
		})
		.where(
			and(
				eq(campaignInvite.campaignId, campaignId),
				eq(campaignInvite.invitedUserId, session.user.userId)
			)
		);
}
