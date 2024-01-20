<script lang="ts">
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import LoadingSpinner from '$src/lib/components/LoadingSpinner.svelte';

	export let data;
</script>

<div class="flex flex-col gap-10">
	{#await data.campaignInvites}
		<div class="flex items-center justify-center"><LoadingSpinner /></div>
	{:then campaignInvites}
		{#if campaignInvites.length === 0}
			<GlassCard>
				<p>No received invites.</p>
			</GlassCard>
		{:else}
			<div class="flex flex-col gap-2">
				{#each campaignInvites as campaignInvite (campaignInvite.campaignId)}
					<GlassCard class="bg-red-700 bg-opacity-40">
						<p>{campaignInvite.campaignId}</p>
					</GlassCard>
				{/each}
			</div>
		{/if}
	{/await}
</div>
