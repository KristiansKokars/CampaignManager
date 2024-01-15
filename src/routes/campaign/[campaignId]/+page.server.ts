import { getCampaign } from '$src/lib/server/data/queries/get-campaign';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const campaign = await getCampaign(params.campaignId);
	if (campaign?.dungeonMasterId !== session.user.userId) throw error(401);

	return {
		campaign: campaign
	};
}
