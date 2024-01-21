<script lang="ts">
	import { enhance } from '$app/forms';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import InputField from '$src/lib/components/InputField.svelte';
	import TextArea from '$src/lib/components/TextArea.svelte';
	import TopLayout from '$src/lib/components/TopLayout.svelte';
	import Button from '$src/lib/components/buttons/Button.svelte';
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	let titleInput = data.note.title ?? '';
	let textInput = data.note?.text ?? '';
</script>

<TopLayout>
	<GlassCard class="w-full max-w-screen-lg flex-col items-center justify-center break-all">
		<h1 class="text-2xl font-bold">Edit Note</h1>
		<form method="post" use:enhance class="flex w-full flex-col gap-4">
			<input type="hidden" name="campaignId" value={data.campaignId} />
			<input type="hidden" name="noteId" value={data.noteId} />
			<input type="hidden" name="sessionNumber" value={data.sessionNumber} />
			<InputField name="title" id="title" value={titleInput}>Title*</InputField>
			<TextArea name="text" id="text" value={textInput}>Text</TextArea>
			<Button class="mx-auto px-4">Edit</Button>
		</form>
		{#if form?.message}
			<p class="font-bold text-red-400">{form?.message}</p>
		{/if}
		{#if form?.error}
			{#each form?.allFieldErrors as fieldError}
				<p class="text-red-400">{fieldError.field}: {fieldError.message}</p>
			{/each}
		{/if}
	</GlassCard>
</TopLayout>
