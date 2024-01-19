import {
	deleteCampaign,
	getDungeonMasterIdForCampaign
} from '$src/lib/server/data/queries/campaign';
import { error, redirect, type Actions } from '@sveltejs/kit';
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
	const dungeonMasterIdForCampaign = await getDungeonMasterIdForCampaign(campaignId);
	if (dungeonMasterIdForCampaign !== userId) return false;

	await deleteCampaign(campaignId, userId);
	return true;
}
