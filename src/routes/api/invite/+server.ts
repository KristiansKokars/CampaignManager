import { db } from '$src/lib/server/data/db.js';
import { campaignInvite } from '$src/lib/server/data/schema.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

const sendInviteSchema = z.object({
	campaignId: z.string(),
	userId: z.string()
});

export async function POST({ request, locals }) {
	const session = await locals.auth.validate();
	if (!session) throw error(401);

	const parsedRequest = sendInviteSchema.safeParse(await request.json());
	if (!parsedRequest.success) throw error(400, 'Invalid request');

	const { userId, campaignId } = parsedRequest.data;

	// TODO: check if user is DM and can invite to this campaign!
	await db.insert(campaignInvite).values({
		campaignId: campaignId,
		invitedUserId: userId
	});

	return new Response(null, { status: 200 });
}
