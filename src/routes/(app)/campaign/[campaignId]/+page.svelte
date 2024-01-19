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
		<div class="flex gap-x-8">
			{#each data.campaign?.sessions as campaignSession (`${data.campaign?.id}${campaignSession.sessionNumber}`)}
				<div class="flex flex-col gap-y-4">
					<p>Session: {campaignSession.sessionNumber}</p>
					{#each campaignSession.notes as note (note.id)}
						<LinkButton
							href={`/campaign/${data.id}/${campaignSession.sessionNumber}/note/${note.id}`}
							>Note: {note.title}</LinkButton
						>
					{/each}
					<LinkButton href={`/campaign/${data.id}/${campaignSession.sessionNumber}/note/create`}
						>Create Note</LinkButton
					>
				</div>
			{/each}
		</div>
		<form method="POST" action="/campaign/delete?" use:enhance class="py-4">
			<input type="hidden" name="campaignId" value={data.campaign.id} />
			<Button class="w-full">Delete</Button>
		</form>
		<LinkButton href={`/campaign/${data.campaign.id}/edit`}>Edit</LinkButton>
		<form method="POST" action="?/addSession" use:enhance class="py-4">
			<input type="hidden" name="campaignId" value={data.campaign.id} />
			<Button class="w-full">Add Session</Button>
		</form>
	{:else}
		<p>Campaign not found!</p>
	{/if}
</GlassCard>
