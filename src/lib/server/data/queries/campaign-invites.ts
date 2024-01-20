import { db } from '$src/lib/server/data/db';
import { campaignInvite } from '$src/lib/server/data/schema';
import { and, eq } from 'drizzle-orm';

export async function leaveCampaign(userId: string, campaignId: string) {
	await db
		.delete(campaignInvite)
		.where(
			and(eq(campaignInvite.invitedUserId, userId), eq(campaignInvite.campaignId, campaignId))
		);
}
