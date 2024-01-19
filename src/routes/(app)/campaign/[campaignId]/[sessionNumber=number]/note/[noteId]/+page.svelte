<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/Button.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import LinkButton from '$src/lib/components/LinkButton.svelte';

	export let data;
</script>

<GlassCard class="w-full max-w-96 flex-col items-center justify-center break-all">
	{#if data.note}
		<h2 class="text-xl font-bold">{data.note.title}</h2>
		<p>{data.note.text}</p>

		<form method="POST" action="/campaign/delete?" use:enhance class="py-4">
			<input type="hidden" name="campaignId" value={data.campaignId} />
			<input type="hidden" name="sessionNumber" value={data.sessionNumber} />
			<input type="hidden" name="noteId" value={data.noteId} />
			<Button class="w-full">Delete</Button>
		</form>
		<LinkButton href={`/campaign/${data.campaignId}/${data.sessionNumber}/note/${data.noteId}/edit`}
			>Edit</LinkButton
		>
	{:else}
		<p>Note not found!</p>
	{/if}
</GlassCard>
