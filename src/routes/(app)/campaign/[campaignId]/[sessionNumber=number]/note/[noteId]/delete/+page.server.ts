import { deleteNoteFromDB } from '$src/lib/server/data/queries/campaign-notes';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const deleteNoteSchema = z.object({
	campaignId: z.string(),
	sessionNumber: z.string(),
	noteId: z.string()
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = deleteNoteSchema.safeParse(formData);

		if (!parsedFormData.success) {
			throw error(400);
		}
		const { campaignId, sessionNumber, noteId } = parsedFormData.data;
		const wasAllowedToDeleteNote = await deleteNoteFromDB(noteId, session.user.userId);

		if (!wasAllowedToDeleteNote) {
			throw error(403);
		}

		throw redirect(302, `/campaign/${campaignId}/${sessionNumber}`);
	}
};
