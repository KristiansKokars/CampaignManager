<script lang="ts">
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import LoadingSpinner from '$src/lib/components/LoadingSpinner.svelte';

	export let data;
</script>

<div class="flex flex-col gap-10">
	{#await data.campaigns}
		<div class="flex items-center justify-center"><LoadingSpinner /></div>
	{:then campaigns}
		{#if campaigns.length === 0}
			<p>No campaigns yet. Make one!</p>
		{:else}
			<div class="flex flex-col gap-2">
				{#each campaigns as campaign (campaign.id)}
					<GlassCard class="bg-red-700 bg-opacity-40">
						<a href={`campaign/${campaign.id}`}>{campaign.name}</a>
					</GlassCard>
				{/each}
			</div>
		{/if}
	{/await}

	<a href="/campaign/new" class="rounded-md bg-white p-3 text-black hover:bg-gray-100"
		>Make a new campaign</a
	>
</div>
