import { max, eq, and } from 'drizzle-orm';
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

// TODO: add check for players here
export async function createNewCampaignSession(userId: string, campaignId: string) {
	await db.insert(campaignSession).values({
		campaignId: campaignId,
		sessionNumber: (await getLastSessionNumberForCampaign(campaignId)) + 1
	});
}

export async function deleteCampaignSession(
	userId: string,
	campaignId: string,
	sessionNumber: number
) {
	await db
		.delete(campaignSession)
		.where(
			and(
				eq(campaignSession.campaignId, campaignId),
				eq(campaignSession.sessionNumber, sessionNumber)
			)
		);
	return true;
}
