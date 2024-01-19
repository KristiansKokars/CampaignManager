import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { campaign, campaignNotes } from '../schema';

export async function getAuthorIdForNote(noteId: string) {
	const campaignToFind = (
		await db
			.select({ authorId: campaignNotes.authorId })
			.from(campaignNotes)
			.where(eq(campaignNotes.id, noteId))
			.limit(0)
	)[0];
	return campaignToFind?.authorId;
}

export async function deleteNote(noteId: string, userId: string) {
	await db
		.delete(campaignNotes)
		.where(and(eq(campaignNotes.id, noteId), eq(campaign.dungeonMasterId, userId)));
}

export async function getNote(noteId: string) {
	return await db.query.campaignNotes.findFirst({
		where: eq(campaignNotes.id, noteId)
	});
}
