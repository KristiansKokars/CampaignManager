<script lang="ts">
	import { enhance } from '$app/forms';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import TextLinkButton from '$src/lib/components/buttons/TextLinkButton.svelte';

	export let data;
</script>

<div class="mt-40 flex justify-center">
	<GlassCard class="w-full max-w-screen-lg flex-col break-all">
		{#if data.note}
			<div class="item-scenter flex justify-between">
				<h1 class="text-3xl font-bold">{data.note.title}</h1>
				<div class="flex items-center gap-x-4">
					<form
						method="POST"
						action={`/campaign/${data.campaignId}/${data.sessionNumber}/note/${data.noteId}/delete?`}
						use:enhance
					>
						<input type="hidden" name="campaignId" value={data.campaignId} />
						<input type="hidden" name="noteId" value={data.noteId} />
						<TextButton>Delete</TextButton>
					</form>
					<TextLinkButton
						href={`/campaign/${data.campaignId}/${data.sessionNumber}/note/${data.noteId}/edit`}
					>
						Edit
					</TextLinkButton>
				</div>
			</div>
			<div class="my-1 h-0.5 bg-gray-200/20 bg-opacity-40" />
			<p>{data.note.text}</p>
		{:else}
			<p>Note not found!</p>
		{/if}
	</GlassCard>
</div>
