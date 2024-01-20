<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/Button.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import InputField from '$src/lib/components/InputField.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<GlassCard class="w-full max-w-96 flex-col items-center justify-center">
	<h1 class="text-2xl font-bold">Sign up</h1>
	<form method="post" use:enhance class="flex w-full flex-col gap-4">
		<InputField type="email" name="email" id="email">Email</InputField>
		<InputField name="username" id="username">Username</InputField>
		<InputField type="password" name="password" id="password">Password</InputField>
		<Button>Register</Button>
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
