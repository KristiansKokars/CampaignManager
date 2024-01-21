<script lang="ts">
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import H2 from '$src/lib/components/H2.svelte';
	import LoadingSpinner from '$src/lib/components/LoadingSpinner.svelte';
	import PageGlassCard from '$src/lib/components/PageGlassCard.svelte';
	import TextLinkButton from '$src/lib/components/buttons/TextLinkButton.svelte';
	import PlusSquareIcon from '$src/lib/icons/PlusSquareIcon.svelte';
	import TopLayout from '$src/lib/components/TopLayout.svelte';

	export let data;
</script>

<TopLayout>
	<PageGlassCard
		class="flex w-full max-w-screen-2xl flex-col items-start justify-start break-all rounded-md bg-gray-800 bg-opacity-70 bg-clip-padding backdrop-blur backdrop-filter"
	>
		<H2>Your campaigns as a player</H2>
		{#await data.playerCampaigns}
			<div class="flex items-center justify-center"><LoadingSpinner /></div>
		{:then playerCampaignResponse}
			{@const playerCampaigns = playerCampaignResponse.map((campaign) => campaign.campaign)}
			{#if playerCampaigns.length === 0}
				<p>No invites to player campaigns yet.</p>
			{:else}
				<div
					class="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
				>
					{#each playerCampaigns as campaign (campaign.id)}
						<a
							href={`campaign/${campaign.id}`}
							class="flex max-h-48 w-full flex-col rounded-lg bg-red-900/10 bg-opacity-20 p-4 backdrop-blur hover:bg-red-900/30"
						>
							<div class="pr-4">
								<h2 class="text-lg font-bold sm:text-xl">
									{campaign.name}
								</h2>
							</div>
							<div class="flex grow justify-end"></div>
						</a>
					{/each}
				</div>
			{/if}
		{/await}
		<div class="mt-8 flex items-center gap-2">
			<H2>Your campaigns as a dungeon master</H2>
			<TextLinkButton title="Make new campaign" href="/campaign/new"
				><PlusSquareIcon class="size-6" /></TextLinkButton
			>
		</div>
		{#await data.dmCampaigns}
			<div class="flex items-center justify-center"><LoadingSpinner /></div>
		{:then campaigns}
			{#if campaigns.length === 0}
				<p>No DM campaigns yet.</p>
			{:else}
				<div
					class="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
				>
					{#each campaigns as campaign (campaign.id)}
						<a
							href={`campaign/${campaign.id}`}
							class="flex max-h-48 w-full flex-col rounded-lg bg-red-900/10 bg-opacity-20 p-4 backdrop-blur hover:bg-red-900/30"
						>
							<div class="pr-4">
								<h2 class="text-lg font-bold sm:text-xl">
									{campaign.name}
								</h2>
							</div>
							<div class="flex grow justify-end"></div>
						</a>
					{/each}
				</div>
			{/if}
		{/await}
	</PageGlassCard>
</TopLayout>
