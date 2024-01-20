import { unlinkSync, writeFileSync } from 'fs';
import { cloudinary } from '$src/lib/server/data/cloudinary';
import { PICTURE_STORAGE_PROVIDER } from '$env/static/private';

export async function uploadBannerImage(campaignId: string, banner: File): Promise<string> {
	const buffer = Buffer.from(await banner.arrayBuffer());

	// While any non cloudinary usage will be considered local, env is "local" or "cloudinary" in case of more options in the future or changed default
	if (PICTURE_STORAGE_PROVIDER !== 'cloudinary') {
		writeFileSync(`static${localCampaignImagePath(campaignId)}`, buffer);
		return localCampaignImagePath(campaignId);
	}

	const uploadResult = await new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					public_id: remoteCampaignImageId(campaignId)
				},
				(error, uploadResult) => {
					if (error) return reject(error);

					return resolve(uploadResult);
				}
			)
			.end(buffer);
	});

	return (uploadResult as { secure_url: string }).secure_url;
}

export async function deleteBannerImage(bannerUrl: string, campaignId: string) {
	if (bannerUrl.startsWith('https://res.cloudinary.com')) {
		const result = await new Promise((resolve) => {
			cloudinary.uploader.destroy(remoteCampaignImageId(campaignId), (_, callResult) => {
				resolve(callResult);
			});
		});
		console.log(`Delete banner image for campaign ${campaignId} result: ${JSON.stringify(result)}`);
	} else {
		unlinkSync(localCampaignImagePath(campaignId));
	}
}

export function localCampaignImagePath(campaignId: string): string {
	return `/campaign-images/${campaignId}`;
}

export function remoteCampaignImageId(campaignId: string): string {
	return `campaign/${campaignId}`;
}
