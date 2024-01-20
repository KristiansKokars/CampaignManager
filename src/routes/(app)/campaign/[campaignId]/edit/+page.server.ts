import {
	editCampaignSchema,
	editExistingCampaign,
	getCampaign
} from '$src/lib/server/data/queries/campaign';
import { parseFormData } from '$src/lib/util/parse-form-data.js';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const campaign = await getCampaign(session.user.userId, params.campaignId);
	if (campaign?.dungeonMasterId !== session.user.userId) throw error(401);
	if (!campaign) throw error(404);

	return {
		campaign: campaign
	};
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		const parsedFormData = await parseFormData(request, editCampaignSchema);
		if (!parsedFormData.success) {
			const allFieldErrors = parsedFormData.error.errors.map((error) => ({
				field: error.path[0],
				message: error.message
			}));
			return fail(400, { error: true, allFieldErrors });
		}

		const wasAllowedToEdit = await editExistingCampaign(parsedFormData.data, session.user.userId);
		if (!wasAllowedToEdit) {
			throw error(403);
		}

		redirect(302, `/campaign/${parsedFormData.data.campaignId}`);
	}
};
