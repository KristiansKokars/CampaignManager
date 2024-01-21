<script lang="ts">
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import XIcon from '$src/lib/icons/XIcon.svelte';

	export let dialog: HTMLDialogElement;
</script>

<!-- TODO: replace with a dialog from a library with accessibility baked in -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close
	on:click|self|preventDefault
	class="w-full max-w-screen-sm rounded-lg bg-gray-800/70 text-white backdrop-blur-lg backdrop:bg-black/40"
>
	<div class="flex items-center justify-between p-4">
		<slot name="title" />
		<TextButton on:click={() => dialog.close()}><XIcon class="size-6" /></TextButton>
	</div>
	<slot />
</dialog>
