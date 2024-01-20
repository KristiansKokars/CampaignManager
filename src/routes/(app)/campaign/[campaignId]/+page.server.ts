import { createNewCampaignSession } from '$src/lib/server/data/queries/campaign-session.js';
import { getCampaign } from '$src/lib/server/data/queries/campaign';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { deleteCampaignFromDB } from '$src/lib/server/data/queries/campaign';
import { parseFormDataOrThrow400 } from '$src/lib/util/parse-form-data.js';
import { leaveCampaign } from '$src/lib/server/data/queries/campaign-invites.js';

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

const campaignIdSchema = z.object({
	campaignId: z.string()
});

export const actions: Actions = {
	addSession: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const { campaignId } = await parseFormDataOrThrow400(request, campaignIdSchema);

		await createNewCampaignSession(session.user.userId, campaignId);
	},
	delete: async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const { campaignId } = await parseFormDataOrThrow400(request, campaignIdSchema);

		const wasAllowedToDeleteCampaign = await deleteCampaignFromDB(campaignId, session.user.userId);
		if (!wasAllowedToDeleteCampaign) {
			throw error(403);
		}

		throw redirect(302, '/campaign');
	},
	leave: async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const { campaignId } = await parseFormDataOrThrow400(request, campaignIdSchema);

		await leaveCampaign(session.user.userId, campaignId);

		throw redirect(302, '/campaign');
	}
};
