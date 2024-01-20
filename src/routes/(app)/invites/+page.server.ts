import { db } from '$src/lib/server/data/db.js';
import { campaignInvite } from '$src/lib/server/data/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (!session) redirect(302, '/login');

	const campaignInvites = db.query.campaignInvite.findMany({
        where: eq(campaignInvite.invitedUserId, session.user.userId)
    });

	return {
		campaignInvites: campaignInvites
	};
}
