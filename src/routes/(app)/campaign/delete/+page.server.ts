import { db } from '$src/lib/server/data/db';
import { campaign } from '$src/lib/server/data/schema';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

const deleteCampaignSchema = z.object({
	campaignId: z.string()
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = deleteCampaignSchema.safeParse(formData);

		if (!parsedFormData.success) {
			throw error(400);
		}
		const { campaignId } = parsedFormData.data;
		const wasAllowedToDeleteCampaign = await deleteCampaignFromDB(campaignId, session.user.userId);

		if (!wasAllowedToDeleteCampaign) {
			throw error(403);
		}

		throw redirect(302, '/campaign');
	}
};

async function deleteCampaignFromDB(campaignId: string, userId: string): Promise<boolean> {
	const campaignToDelete = (
		await db
			.select({ dungeonMasterId: campaign.dungeonMasterId })
			.from(campaign)
			.where(eq(campaign.id, campaignId))
			.limit(0)
	)[0];
	if (campaignToDelete?.dungeonMasterId !== userId) return false;

	await db
		.delete(campaign)
		.where(and(eq(campaign.id, campaignId), eq(campaign.dungeonMasterId, userId)));
	return true;
}
