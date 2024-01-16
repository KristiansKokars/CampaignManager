<script lang="ts">
	import { enhance } from '$app/forms';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import InputField from '$src/lib/components/InputField.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<GlassCard class="w-96 flex-col items-center justify-center">
	<h1 class="text-2xl font-bold">New Campaign</h1>
	<form method="post" use:enhance class="flex w-full flex-col gap-4">
		<InputField name="name" id="name">Name*</InputField>
		<InputField name="description" id="description">Description</InputField>
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
