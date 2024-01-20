import { getDungeonMasterIdForCampaign } from '$src/lib/server/data/queries/campaign';
import { createNewCampaignSession } from '$src/lib/server/data/queries/campaign-session.js';
import { getCampaign } from '$src/lib/server/data/queries/campaign';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const campaign = await getCampaign(session.user.userId, params.campaignId);
	if (!campaign) throw error(404); // we will pretend if you do not have access, it does not exist, because I am lazy

	return {
		id: params.campaignId,
		isDungeonMasterForCampaign: campaign.dungeonMasterId === session.user.userId,
		campaign: campaign
	};
}

const addSessionSchema = z.object({
	campaignId: z.string()
});

export const actions: Actions = {
	addSession: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = addSessionSchema.safeParse(formData);

		if (!parsedFormData.success) {
			throw error(400);
		}

		const { campaignId } = parsedFormData.data;
		const dungeonMasterId = await getDungeonMasterIdForCampaign(campaignId);
		if (dungeonMasterId !== session.user.userId) throw error(401);

		await createNewCampaignSession(campaignId);
	}
};
