import { db } from '$src/lib/server/data/db';
import { campaign } from '$src/lib/server/data/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const createCampaignSchema = z.object({
	name: z.string().max(254),
	description: z.string().nullable()
});

type CreateCampaignData = z.infer<typeof createCampaignSchema>;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		// TODO: can we make this repeatable block in one function?
		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = createCampaignSchema.safeParse(formData);

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

async function createNewCampaign(createCampaignData: CreateCampaignData, dungeonMasterId: string) {
	await db.insert(campaign).values({
		id: crypto.randomUUID().toString(),
		name: createCampaignData.name,
		description: createCampaignData.description,
		dungeonMasterId: dungeonMasterId,
		status: 'not_started'
	});
}
