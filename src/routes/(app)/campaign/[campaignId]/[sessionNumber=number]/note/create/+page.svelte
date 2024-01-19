<script lang="ts">
	import { enhance } from '$app/forms';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import InputField from '$src/lib/components/InputField.svelte';
	import type { ActionData } from './$types.js';

	export let data;
	export let form: ActionData;
</script>

<GlassCard class="w-full max-w-96 flex-col items-center justify-center break-all">
	<h1 class="text-2xl font-bold">Add Note</h1>
	<form method="post" use:enhance class="flex w-full flex-col gap-4">
		<input type="hidden" name="campaignId" value={data.campaignId} />
		<input type="hidden" name="sessionNumber" value={data.sessionNumber} />
		<InputField name="title" id="title" value="">Title</InputField>
		<InputField name="text" id="text" value="">Text</InputField>
		<button type="submit">Create</button>
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
