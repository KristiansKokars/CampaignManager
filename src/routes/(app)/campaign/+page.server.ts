import { getCampaignsForDM, getCampaignsForPlayer } from '$src/lib/server/data/queries/campaign';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const playerCampaigns = getCampaignsForPlayer(session.user.userId);
	const dmCampaigns = getCampaignsForDM(session.user.userId);

	return {
		username: session.user.username,
		playerCampaigns: playerCampaigns,
		dmCampaigns: dmCampaigns
	};
}
