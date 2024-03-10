<script lang="ts">
	import { enhance } from '$app/forms';
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import H1 from '$src/lib/components/H1.svelte';
	import HiddenFormValue from '$src/lib/components/HiddenFormValue.svelte';
	import type { CampaignInviteDTO } from '$src/lib/server/data/queries/campaign-invites';

	export let campaignInvites: CampaignInviteDTO[];
</script>

<GlassCard class="flex-col bg-opacity-90">
	<H1 class="pb-4">Invites</H1>
	{#if campaignInvites.length === 0}
		<p>No received invites.</p>
	{:else}
		<div class="flex flex-col gap-2">
			{#each campaignInvites as campaignInvite (campaignInvite.campaignId)}
				<div class="items-center justify-center gap-x-4">
					<p>{campaignInvite.campaign.name}</p>
					<form action="?/acceptInvite" use:enhance method="POST">
						<HiddenFormValue name="campaignId" value={campaignInvite.campaignId} />
						<TextButton class="text-emerald-400/80 hover:text-emerald-400">Accept</TextButton>
					</form>
					<form action="?/denyInvite" use:enhance method="POST">
						<HiddenFormValue name="campaignId" value={campaignInvite.campaignId} />
						<TextButton class="text-red-400/80 hover:text-red-400">Deny</TextButton>
					</form>
				</div>
			{/each}
		</div>
	{/if}
</GlassCard>
