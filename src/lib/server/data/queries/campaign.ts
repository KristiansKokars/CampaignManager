import { db } from '$src/lib/server/data/db';
import { campaign } from '$src/lib/server/data/schema';
import { and, eq } from 'drizzle-orm';

export async function getDungeonMasterIdForCampaign(campaignId: string) {
	const campaignToFind = (
		await db
			.select({ dungeonMasterId: campaign.dungeonMasterId })
			.from(campaign)
			.where(eq(campaign.id, campaignId))
			.limit(0)
	)[0];
	return campaignToFind?.dungeonMasterId;
}

export async function deleteCampaign(campaignId: string, userId: string) {
	await db
		.delete(campaign)
		.where(and(eq(campaign.id, campaignId), eq(campaign.dungeonMasterId, userId)));
}

export async function getCampaign(campaignId: string) {
	return db.query.campaign.findFirst({
		where: eq(campaign.id, campaignId),
		with: {
			sessions: {
				with: {
					notes: true
				}
			}
		}
	});
}
