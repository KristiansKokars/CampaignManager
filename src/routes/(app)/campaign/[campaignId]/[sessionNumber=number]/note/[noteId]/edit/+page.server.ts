import {
	editExistingNote,
	editNoteSchema,
	getNote
} from '$src/lib/server/data/queries/campaign-notes.js';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const note = await getNote(session.user.userId, params.noteId);
	if (note?.authorId !== session.user.userId) throw error(401);
	if (!note) throw error(404);

	return {
		campaignId: params.campaignId,
		sessionNumber: params.sessionNumber,
		noteId: params.noteId,
		note: note
	};
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = editNoteSchema.safeParse(formData);

		if (!parsedFormData.success) {
			const allFieldErrors = parsedFormData.error.errors.map((error) => ({
				field: error.path[0],
				message: error.message
			}));
			return fail(400, { error: true, allFieldErrors });
		}
		const { noteId, campaignId, sessionNumber } = parsedFormData.data;

		const wasAllowedToEdit = await editExistingNote(parsedFormData.data, session.user.userId);
		if (!wasAllowedToEdit) {
			throw error(403);
		}

		redirect(302, `/campaign/${campaignId}/${sessionNumber}/note/${noteId}`);
	}
};
