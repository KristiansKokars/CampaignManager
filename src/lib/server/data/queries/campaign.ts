import { db } from '$src/lib/server/data/db';
import { campaign, campaignInvite, campaignSession } from '$src/lib/server/data/schema';
import { and, desc, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { uploadBannerImage, deleteBannerImage } from '$src/lib/server/data/image-files';

export const createCampaignSchema = z.object({
	name: z.string().max(254),
	description: z.string().nullable(),
	banner: z.instanceof(Blob).nullable()
});
export type CreateCampaignData = z.infer<typeof createCampaignSchema>;

export async function createNewCampaign(
	createCampaignData: CreateCampaignData,
	dungeonMasterId: string
) {
	const campaignId = nanoid();
	let bannerUrl = '';

	if (createCampaignData.banner) {
		try {
			bannerUrl = await uploadBannerImage(campaignId, createCampaignData.banner as File);
		} catch (e) {
			console.error(`Could not upload picture for ${createCampaignData.name}, skipping...`);
		}
	}

	await db.insert(campaign).values({
		id: campaignId,
		name: createCampaignData.name,
		description: createCampaignData.description,
		dungeonMasterId: dungeonMasterId,
		status: 'not_started',
		bannerUrl: bannerUrl
	});
}

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

export async function getCampaign(userId: string, campaignId: string) {
	const foundCampaign = await db.query.campaign.findFirst({
		where: eq(campaign.id, campaignId),
		with: {
			sessions: {
				with: {
					notes: {
						with: {
							author: {
								columns: {
									username: true
								}
							}
						}
					}
				},
				orderBy: [desc(campaignSession.sessionNumber)]
			},
			campaignInvites: {
				columns: {
					invitedUserId: true
				}
			}
		}
	});

	if (
		foundCampaign?.dungeonMasterId !== userId &&
		foundCampaign?.campaignInvites.find((invite) => invite.invitedUserId === userId) === undefined
	) {
		// TODO: make a proper error flow
		return undefined;
	}

	return foundCampaign;
}

export async function getCampaignsForDM(userId: string) {
	return await db.select().from(campaign).where(eq(campaign.dungeonMasterId, userId));
}

export async function getCampaignsForPlayer(userId: string) {
	return await db
		.select({ campaign })
		.from(campaignInvite)
		.innerJoin(campaign, eq(campaignInvite.campaignId, campaign.id))
		.where(and(eq(campaignInvite.invitedUserId, userId), eq(campaignInvite.status, 'accepted')));
}

export const editCampaignSchema = z.object({
	campaignId: z.string(),
	name: z.string().max(254),
	description: z.string().nullable()
});
export type EditCampaignData = z.infer<typeof editCampaignSchema>;

export async function editExistingCampaign(
	editCampaignData: EditCampaignData,
	userId: string
): Promise<boolean> {
	const campaignToEdit = (
		await db
			.select({ dungeonMasterId: campaign.dungeonMasterId })
			.from(campaign)
			.where(eq(campaign.id, editCampaignData.campaignId))
			.limit(0)
	)[0];
	if (campaignToEdit?.dungeonMasterId !== userId) return false;

	await db
		.update(campaign)
		.set({
			name: editCampaignData.name,
			description: editCampaignData.description,
			status: 'not_started'
		})
		.where(eq(campaign.id, editCampaignData.campaignId));
	return true;
}

export async function deleteCampaignFromDB(campaignId: string, userId: string): Promise<boolean> {
	const dungeonMasterIdForCampaign = await getDungeonMasterIdForCampaign(campaignId);
	if (dungeonMasterIdForCampaign !== userId) return false;

	const bannerUrl = (
		await db
			.select({ bannerUrl: campaign.bannerUrl })
			.from(campaign)
			.where(eq(campaign.id, campaignId))
			.limit(1)
	)[0]?.bannerUrl;

	if (bannerUrl) {
		await deleteBannerImage(bannerUrl, campaignId);
	}

	await db
		.delete(campaign)
		.where(and(eq(campaign.id, campaignId), eq(campaign.dungeonMasterId, userId)));

	return true;
}
