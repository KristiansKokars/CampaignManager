import { getCampaign } from '$src/lib/server/data/queries/campaign';
import { redirect, error, type Actions, fail } from '@sveltejs/kit';
import { createNote, createNoteSchema } from '$src/lib/server/data/queries/campaign-notes.js';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const campaign = await getCampaign(session.user.userId, params.campaignId);
	if (!campaign) throw error(404);

	return {
		campaignId: params.campaignId,
		sessionNumber: params.sessionNumber,
		campaign: campaign
	};
}

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = createNoteSchema.safeParse(formData);

		if (!parsedFormData.success) {
			const allFieldErrors = parsedFormData.error.errors.map((error) => ({
				field: error.path[0],
				message: error.message
			}));
			return fail(400, { error: true, allFieldErrors });
		}
		const { campaignId } = parsedFormData.data;

		await createNote(parsedFormData.data, session.user.userId);

		redirect(302, `/campaign/${campaignId}`);
	}
};
