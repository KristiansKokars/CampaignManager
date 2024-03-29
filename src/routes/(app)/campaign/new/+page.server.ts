import { createCampaignSchema, createNewCampaign } from '$src/lib/server/data/queries/campaign';
import { parseFormData } from '$src/lib/util/parse-form-data';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		const parsedFormData = await parseFormData(request, createCampaignSchema);
		if (!parsedFormData.success) {
			const allFieldErrors = parsedFormData.error.errors.map((error) => ({
				field: error.path[0],
				message: error.message
			}));
			return fail(400, { error: true, allFieldErrors });
		}
		await createNewCampaign(parsedFormData.data, session.user.userId);

		redirect(302, '/campaign');
	}
};
