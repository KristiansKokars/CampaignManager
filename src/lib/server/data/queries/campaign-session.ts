import { max, eq } from 'drizzle-orm';
import { db } from '$src/lib/server/data/db';
import { campaignSession } from '$src/lib/server/data/schema';

// TODO: take in user ID to check, or unify the permsision checks
export async function getLastSessionNumberForCampaign(campaignId: string) {
	const lastSessionNumberValues = await db
		.select({ values: max(campaignSession.sessionNumber) })
		.from(campaignSession)
		.where(eq(campaignSession.campaignId, campaignId));
	const lastSessionNumber = lastSessionNumberValues[0]?.values ?? 0;
	return lastSessionNumber;
}

export async function createNewCampaignSession(campaignId: string) {
	await db.insert(campaignSession).values({
		campaignId: campaignId,
		sessionNumber: (await getLastSessionNumberForCampaign(campaignId)) + 1
	});
}
