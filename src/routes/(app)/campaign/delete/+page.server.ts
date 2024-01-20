import { deleteCampaignFromDB } from '$src/lib/server/data/queries/campaign';
import { parseFormData } from '$src/lib/util/parse-form-data';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const deleteCampaignSchema = z.object({
	campaignId: z.string()
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const { campaignId } = await parseFormData(request, deleteCampaignSchema);
		const wasAllowedToDeleteCampaign = await deleteCampaignFromDB(campaignId, session.user.userId);

		if (!wasAllowedToDeleteCampaign) {
			throw error(403);
		}

		throw redirect(302, '/campaign');
	}
};
