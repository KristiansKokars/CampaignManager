import { deleteNoteFromDB } from '$src/lib/server/data/queries/campaign-notes';
import { parseFormDataOrThrow400 } from '$src/lib/util/parse-form-data';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const deleteNoteSchema = z.object({
	campaignId: z.string(),
	noteId: z.string()
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const session = await locals.auth.validate();
		if (!session) throw error(401);

		const { campaignId, noteId } = await parseFormDataOrThrow400(request, deleteNoteSchema);
		const wasAllowedToDeleteNote = await deleteNoteFromDB(noteId, session.user.userId);

		console.log(wasAllowedToDeleteNote);
		if (!wasAllowedToDeleteNote) {
			throw error(403);
		}

		throw redirect(302, `/campaign/${campaignId}`);
	}
};
