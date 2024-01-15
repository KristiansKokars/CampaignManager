import { eq } from 'drizzle-orm';
import { db } from '../db';
import { campaign } from '$src/lib/server/data/schema';

export async function getCampaign(campaignId: string) {
	return (await db.select().from(campaign).where(eq(campaign.id, campaignId)).limit(1))[0];
}
