import { db } from '$src/lib/server/data/db';
import { campaign } from '$src/lib/server/data/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const campaign = await getCampaign(params.campaignId);
	if (campaign?.dungeonMasterId !== session.user.userId) throw error(401);

	return {
		campaign: campaign
	};
}

async function getCampaign(campaignId: string) {
	return (await db.select().from(campaign).where(eq(campaign.id, campaignId)).limit(1))[0];
}
