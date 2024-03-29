import { db } from '$src/lib/server/data/db';
import { campaignInvite } from '$src/lib/server/data/schema';
import { and, eq } from 'drizzle-orm';

export async function load({ locals, depends }) {
	depends('invite:hasUncheckedCampaignInvites');

	const session = await locals.auth.validate();

	let hasUncheckedCampaignInvites = false;
	if (session) {
		const uncheckedCampaignInvites = await db.query.campaignInvite.findFirst({
			where: and(
				eq(campaignInvite.invitedUserId, session.user.userId),
				eq(campaignInvite.status, 'sent')
			)
		});
		hasUncheckedCampaignInvites = uncheckedCampaignInvites !== undefined;
	}

	return {
		userId: session?.user.userId,
		isLoggedIn: session !== null,
		hasUncheckedCampaignInvites: hasUncheckedCampaignInvites
	};
}
