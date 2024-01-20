<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<!-- TODO: replace with a dialog from a library with accessibility baked in -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close on:click|self|preventDefault>
	<slot />
</dialog>
