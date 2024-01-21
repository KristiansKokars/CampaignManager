<script lang="ts">
	import { enhance } from '$app/forms';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import InputField from '$src/lib/components/InputField.svelte';
	import PageGlassCard from '$src/lib/components/PageGlassCard.svelte';
	import TextArea from '$src/lib/components/TextArea.svelte';
	import TopLayout from '$src/lib/components/TopLayout.svelte';
	import Button from '$src/lib/components/buttons/Button.svelte';
	import type { ActionData } from './$types.js';

	export let data;
	export let form: ActionData;
</script>

<TopLayout>
	<PageGlassCard>
		<h1 class="text-2xl font-bold">Add Note</h1>
		<form method="post" use:enhance class="flex w-full flex-col gap-4">
			<input type="hidden" name="campaignId" value={data.campaignId} />
			<input type="hidden" name="sessionNumber" value={data.sessionNumber} />
			<InputField name="title" id="title" value="">Title</InputField>
			<TextArea name="text" id="text" value="">Text</TextArea>
			<Button class="mx-auto px-4">Create</Button>
		</form>

		{#if form?.error}
			{#each form?.allFieldErrors as fieldError}
				<p class="text-red-400">{fieldError.field}: {fieldError.message}</p>
			{/each}
		{/if}
	</PageGlassCard>
</TopLayout>
