import { db } from '$src/lib/server/data/db.js';
import { campaignInvite } from '$src/lib/server/data/schema.js';
import { error } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import { serverPusher } from '$src/lib/server/data/server-pusher';

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
	await db
		.insert(campaignInvite)
		.values({
			campaignId: campaignId,
			invitedUserId: userId
		})
		.onDuplicateKeyUpdate({ set: { campaignId: sql`campaign_id` } }); // do nothing on conflict

	serverPusher.trigger(userId, 'invite', {});

	return new Response(null, { status: 200 });
}
