<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/Button.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import LinkButton from '$src/lib/components/LinkButton.svelte';

	export let data;
</script>

<GlassCard class="w-full max-w-96 flex-col items-center justify-center break-all">
	{#if data.campaign}
		<h2 class="text-xl font-bold">{data.campaign?.name}</h2>
		<p>{data.campaign?.description}</p>
		<form method="POST" action="/campaign/delete?" use:enhance class="py-4">
			<input type="hidden" name="campaignId" value={data.campaign.id} />
			<Button class="w-full">Delete</Button>
		</form>
		<LinkButton href={`/campaign/${data.campaign.id}/edit`}>Edit</LinkButton>
	{:else}
		<p>Campaign not found!</p>
	{/if}
</GlassCard>
