<script lang="ts">
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import H2 from '$src/lib/components/H2.svelte';
	import LoadingSpinner from '$src/lib/components/LoadingSpinner.svelte';
	import PageGlassCard from '$src/lib/components/PageGlassCard.svelte';
	import TopLayout from '$src/lib/components/TopLayout.svelte';

	export let data;
</script>

<TopLayout>
	<PageGlassCard class="items-start justify-start">
		<H2>Your campaigns as a player</H2>
		{#await data.playerCampaigns}
			<div class="flex items-center justify-center"><LoadingSpinner /></div>
		{:then playerCampaignResponse}
			{@const playerCampaigns = playerCampaignResponse.map((campaign) => campaign.campaign)}
			{#if playerCampaigns.length === 0}
				<p>No invites to player campaigns yet.</p>
			{:else}
				<div class="flex gap-2">
					{#each playerCampaigns as campaign (campaign.id)}
						<GlassCard class="max-w-40 bg-red-700 bg-opacity-40">
							<a href={`campaign/${campaign.id}`}>{campaign.name}</a>
						</GlassCard>
					{/each}
				</div>
			{/if}
		{/await}
		<div class="flex gap-x-4">
			<H2>Your campaigns as a dungeon master</H2>
			<a href="/campaign/new" class="rounded-md bg-white p-3 text-black hover:bg-gray-100"
				>Make a new campaign</a
			>
		</div>
		<div>
			{#await data.dmCampaigns}
				<div class="flex items-center justify-center"><LoadingSpinner /></div>
			{:then campaigns}
				{#if campaigns.length === 0}
					<GlassCard><p>No DM campaigns yet. Make one!</p></GlassCard>
				{:else}
					<div class="flex gap-2">
						{#each campaigns as campaign (campaign.id)}
							<GlassCard class="max-w-40 bg-red-700 bg-opacity-40">
								<a href={`campaign/${campaign.id}`}>{campaign.name}</a>
							</GlassCard>
						{/each}
					</div>
				{/if}
			{/await}
		</div>
	</PageGlassCard>
</TopLayout>
