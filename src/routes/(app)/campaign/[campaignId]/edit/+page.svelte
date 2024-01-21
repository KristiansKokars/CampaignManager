<script lang="ts">
	import { enhance } from '$app/forms';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import InputField from '$src/lib/components/InputField.svelte';
	import TextArea from '$src/lib/components/TextArea.svelte';
	import TopLayout from '$src/lib/components/TopLayout.svelte';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	let nameInput = data.campaign.name;
	let descriptionInput = data.campaign?.description ?? '';
</script>

<TopLayout>
	<GlassCard class="w-full max-w-96 flex-col items-center justify-center break-all">
		<h1 class="text-2xl font-bold">Edit Campaign</h1>
		<form method="post" use:enhance class="flex w-full flex-col gap-4">
			<input type="hidden" name="campaignId" value={data.campaign.id} />
			<InputField name="name" id="name" value={nameInput}>Name*</InputField>
			<TextArea name="description" id="description" value={descriptionInput}>Description</TextArea>
			<button type="submit">Edit</button>
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
