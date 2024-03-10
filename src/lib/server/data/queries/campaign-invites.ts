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

export async function fetchInvitesForUser(userId: string): Promise<CampaignInviteDTO[]> {
	return await db.query.campaignInvite.findMany({
		where: and(
			eq(campaignInvite.invitedUserId, userId),
			eq(campaignInvite.status, 'sent')
		),
		with: {
			campaign: {
				columns: {
					name: true
				}
			}
		}
	})
}

export interface CampaignInviteDTO {
	campaignId: string;
	status: "declined" | "sent" | "accepted" | null;
	invitedUserId: string;
	campaign: {
		name: string;
	}
}