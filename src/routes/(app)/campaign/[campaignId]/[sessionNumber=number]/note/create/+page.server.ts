import { db } from '$src/lib/server/data/db.js';
import { getCampaign } from '$src/lib/server/data/queries/campaign';
import { campaignNotes } from '$src/lib/server/data/schema.js';
import { redirect, error, type Actions, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { nanoid } from 'nanoid';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const campaign = await getCampaign(params.campaignId);
	if (campaign?.dungeonMasterId !== session.user.userId) throw error(401);
	if (!campaign) throw error(404);

	return {
		campaignId: params.campaignId,
		sessionNumber: params.sessionNumber,
		campaign: campaign
	};
}

const createNoteSchema = z.object({
	campaignId: z.string(),
	sessionNumber: z.string(),
	title: z.string().optional(),
	text: z.string()
});

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
		const { campaignId, title, text, sessionNumber } = parsedFormData.data;

		// TODO: add user permissions check
		await db.insert(campaignNotes).values({
			id: nanoid(),
			title: title,
			text: text,
			authorId: session.user.userId,
			sessionNumber: sessionNumber,
			campaignId: campaignId
		});

		redirect(302, `/campaign/${campaignId}`);
	}
};
