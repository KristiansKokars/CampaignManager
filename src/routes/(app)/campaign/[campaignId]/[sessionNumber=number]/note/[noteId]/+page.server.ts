import { error, redirect } from '@sveltejs/kit';
import { getNote } from '$src/lib/server/data/queries/campaign-notes';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const note = await getNote(session.user.userId, params.noteId);
	if (!note) throw error(404);

	return {
		campaignId: params.campaignId,
		sessionNumber: params.sessionNumber,
		noteId: params.noteId,
		note: note
	};
}
