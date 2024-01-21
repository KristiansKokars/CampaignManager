<script lang="ts">
	import { cn } from '$src/lib/util/cn';
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import DeleteIcon from '$src/lib/icons/DeleteIcon.svelte';

	let className: string = '';
	export { className as class };
</script>

<TextButton class="text-red-400/80 hover:text-red-400" title="Delete"
	><DeleteIcon class={className} /></TextButton
>
