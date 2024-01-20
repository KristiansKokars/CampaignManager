<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/Button.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import HiddenFormValue from '$src/lib/components/HiddenFormValue.svelte';
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
					<GlassCard class="gap-x-4 bg-red-700 bg-opacity-40">
						<p>{campaignInvite.campaignId}</p>
						<form action="?/acceptInvite" use:enhance method="POST">
							<HiddenFormValue name="campaignId" value={campaignInvite.campaignId} />
							<Button>Accept</Button>
						</form>
						<form action="?/denyInvite" use:enhance method="POST">
							<HiddenFormValue name="campaignId" value={campaignInvite.campaignId} />
							<Button>Deny</Button>
						</form>
					</GlassCard>
				{/each}
			</div>
		{/if}
	{/await}
</div>
