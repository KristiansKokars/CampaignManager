<script lang="ts">
	export let dialog: HTMLDialogElement;
	let className = '';
	export { className as class };
</script>

<dialog bind:this={dialog} on:close class={className}>
	<slot />
</dialog>
