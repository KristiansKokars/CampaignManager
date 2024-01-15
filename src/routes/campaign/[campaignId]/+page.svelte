<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/Button.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import LinkButton from '$src/lib/components/LinkButton.svelte';

	export let data;
</script>

<GlassCard class="flex-col">
	{#if data.campaign}
		<p>{data.campaign?.name}</p>
		<p>{data.campaign?.description}</p>
		<form method="POST" action="/campaign/delete?" use:enhance>
			<input type="hidden" name="campaignId" value={data.campaign.id} />
			<Button>Delete</Button>
		</form>
		<LinkButton href={`/campaign/${data.campaign.id}/edit`}>Edit</LinkButton>
	{:else}
		<p>Campaign not found!</p>
	{/if}
</GlassCard>
