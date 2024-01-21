<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
	export let type: 'button' | 'submit' | 'reset' | undefined = 'submit';
	export let title = '';
</script>

<button class={cn('text-white hover:text-gray-300', className)} {type} on:click {title}>
	<slot />
</button>
