<script lang="ts">
	import GlassCard from '$src/lib/components/GlassCard.svelte';

	export let data;

	$: areCampaignsEmpty = data.campaigns.length === 0;
</script>

<div class="flex flex-col gap-10">
	{#if areCampaignsEmpty}
		<p>No campaigns yet. Make one!</p>
	{:else}
		<div class="flex flex-col gap-2">
			{#each data.campaigns as campaign (campaign.id)}
				<GlassCard class="bg-red-700 bg-opacity-40">
					<a href={`campaign/${campaign.id}`}>{campaign.name}</a>
				</GlassCard>
			{/each}
		</div>
	{/if}

	<a href="/campaign/new" class="rounded-md bg-white p-3 text-black hover:bg-gray-100"
		>Make a new campaign</a
	>
</div>
