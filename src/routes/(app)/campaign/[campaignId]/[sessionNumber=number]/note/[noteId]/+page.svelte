<script lang="ts">
	import { enhance } from '$app/forms';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import Divider from '$src/lib/components/Divider.svelte';
	import TextLinkButton from '$src/lib/components/buttons/TextLinkButton.svelte';
	import EditIcon from '$src/lib/icons/EditIcon.svelte';
	import DeleteTextButton from '$src/lib/components/buttons/DeleteTextButton.svelte';

	export let data;
</script>

<div class="mt-40 flex justify-center">
	<GlassCard class="w-full max-w-screen-lg flex-col break-all">
		{#if data.note}
			<div class="item-scenter flex justify-between">
				<h1 class="text-3xl font-bold">{data.note.title}</h1>
				<div class="flex items-center gap-x-2">
					<TextLinkButton
						title="Edit note"
						href={`/campaign/${data.campaignId}/${data.sessionNumber}/note/${data.noteId}/edit`}
					>
						<EditIcon />
					</TextLinkButton>
					<form
						method="POST"
						action={`/campaign/${data.campaignId}/${data.sessionNumber}/note/${data.noteId}/delete?`}
						use:enhance
					>
						<input type="hidden" name="campaignId" value={data.campaignId} />
						<input type="hidden" name="noteId" value={data.noteId} />
						<DeleteTextButton />
					</form>
				</div>
			</div>
			<Divider />
			<p>{data.note.text}</p>
		{:else}
			<p>Note not found!</p>
		{/if}
	</GlassCard>
</div>
