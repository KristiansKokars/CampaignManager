import { db } from '$src/lib/server/data/db';
import { getCampaign } from '$src/lib/server/data/queries/get-campaign';
import { campaign } from '$src/lib/server/data/schema';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const campaign = await getCampaign(params.campaignId);
	if (campaign?.dungeonMasterId !== session.user.userId) throw error(401);
	if (!campaign) throw error(404);

	return {
		campaign: campaign
	};
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = editCampaignSchema.safeParse(formData);

		if (!parsedFormData.success) {
			const allFieldErrors = parsedFormData.error.errors.map((error) => ({
				field: error.path[0],
				message: error.message
			}));
			return fail(400, { error: true, allFieldErrors });
		}

		const wasAllowedToEdit = await editExistingCampaign(parsedFormData.data, session.user.userId);
		if (!wasAllowedToEdit) {
			throw error(403);
		}

		redirect(302, `/campaign/${parsedFormData.data.campaignId}`);
	}
};

async function editExistingCampaign(
	editCampaignData: EditCampaignData,
	userId: string
): Promise<boolean> {
	const campaignToEdit = (
		await db
			.select({ dungeonMasterId: campaign.dungeonMasterId })
			.from(campaign)
			.where(eq(campaign.id, editCampaignData.campaignId))
			.limit(0)
	)[0];
	if (campaignToEdit?.dungeonMasterId !== userId) return false;

	await db
		.update(campaign)
		.set({
			name: editCampaignData.name,
			description: editCampaignData.description,
			status: 'not_started'
		})
		.where(eq(campaign.id, editCampaignData.campaignId));
	return true;
}

const editCampaignSchema = z.object({
	campaignId: z.string(),
	name: z.string().max(254),
	description: z.string().nullable()
});

type EditCampaignData = z.infer<typeof editCampaignSchema>;
