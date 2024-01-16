import { db } from '$src/lib/server/data/db.js';
import { campaign } from '$src/lib/server/data/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const campaigns = getCampaignsForDM(session.user.userId);

	return {
		username: session.user.username,
		campaigns: campaigns
	};
}

async function getCampaignsForDM(userId: string) {
	return await db.select().from(campaign).where(eq(campaign.dungeonMasterId, userId));
}
