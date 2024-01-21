<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/buttons/Button.svelte';
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import H1 from '$src/lib/components/H1.svelte';
	import HiddenFormValue from '$src/lib/components/HiddenFormValue.svelte';
	import LoadingSpinner from '$src/lib/components/LoadingSpinner.svelte';
	import TopLayout from '$src/lib/components/TopLayout.svelte';

	export let data;
</script>

<TopLayout>
	<GlassCard class="max-w-screen-lg flex-col">
		<H1 class="pb-4">Invites</H1>
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
						<GlassCard
							class="items-center justify-center gap-x-4 bg-red-900/10 bg-opacity-20 backdrop-blur "
						>
							<p>{campaignInvite.campaign.name}</p>
							<form action="?/acceptInvite" use:enhance method="POST">
								<HiddenFormValue name="campaignId" value={campaignInvite.campaignId} />
								<TextButton class="text-emerald-400/80 hover:text-emerald-400">Accept</TextButton>
							</form>
							<form action="?/denyInvite" use:enhance method="POST">
								<HiddenFormValue name="campaignId" value={campaignInvite.campaignId} />
								<TextButton class="text-red-400/80 hover:text-red-400">Deny</TextButton>
							</form>
						</GlassCard>
					{/each}
				</div>
			{/if}
		{/await}
	</GlassCard>
</TopLayout>
