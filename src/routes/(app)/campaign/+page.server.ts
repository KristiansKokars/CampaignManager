import { getCampaignsForDM } from '$src/lib/server/data/queries/campaign';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const campaigns = getCampaignsForDM(session.user.userId);

	return {
		username: session.user.username,
		campaigns: campaigns
	};
}
