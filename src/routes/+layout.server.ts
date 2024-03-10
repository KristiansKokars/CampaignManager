import {
	fetchInvitesForUser,
	type CampaignInviteDTO
} from '$src/lib/server/data/queries/campaign-invites';

export async function load({ locals, depends }) {
	depends('invite:hasUncheckedCampaignInvites');

	const session = await locals.auth.validate();

	let hasUncheckedCampaignInvites = false;
	let campaignInvites: CampaignInviteDTO[] = [];
	if (session) {
		campaignInvites = await fetchInvitesForUser(session.user.userId);
		hasUncheckedCampaignInvites = campaignInvites !== undefined && campaignInvites.length !== 0;
	}

	return {
		userId: session?.user.userId,
		isLoggedIn: session !== null,
		hasUncheckedCampaignInvites: hasUncheckedCampaignInvites,
		campaignInvites: campaignInvites
	};
}
