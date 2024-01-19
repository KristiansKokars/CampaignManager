import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { campaign, campaignNotes } from '../schema';
import { z } from 'zod';
import { nanoid } from 'nanoid';

export const createNoteSchema = z.object({
	campaignId: z.string(),
	sessionNumber: z.string(),
	title: z.string().optional(),
	text: z.string()
});
export type CreateNoteData = z.infer<typeof createNoteSchema>;

export async function createNote(createNoteData: CreateNoteData, userId: string) {
	// TODO: add user permissions check
	await db.insert(campaignNotes).values({
		id: nanoid(),
		title: createNoteData.title,
		text: createNoteData.text,
		authorId: userId,
		sessionNumber: Number(createNoteData.sessionNumber),
		campaignId: createNoteData.campaignId
	});
}

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

export async function deleteNoteFromDB(noteId: string, userId: string): Promise<boolean> {
	const authorIdForNote = await getAuthorIdForNote(noteId);
	if (authorIdForNote !== userId) return false;

	await db
		.delete(campaignNotes)
		.where(and(eq(campaignNotes.id, noteId), eq(campaign.dungeonMasterId, userId)));

	return true;
}

export async function getNote(noteId: string) {
	return await db.query.campaignNotes.findFirst({
		where: eq(campaignNotes.id, noteId)
	});
}

export async function editExistingNote(
	editNoteData: EditNoteData,
	userId: string
): Promise<boolean> {
	const noteToEdit = (
		await db
			.select({ authorId: campaignNotes.authorId })
			.from(campaignNotes)
			.where(eq(campaignNotes.id, editNoteData.noteId))
			.limit(0)
	)[0];
	if (noteToEdit?.authorId !== userId) return false;

	await db
		.update(campaignNotes)
		.set({
			title: editNoteData.title,
			text: editNoteData.text
		})
		.where(eq(campaignNotes.id, editNoteData.noteId));
	return true;
}

export const editNoteSchema = z.object({
	noteId: z.string(),
	campaignId: z.string(),
	sessionNumber: z.string(),
	title: z.string().max(254),
	text: z.string()
});
export type EditNoteData = z.infer<typeof editNoteSchema>;
