<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
</script>

<div
	class={cn(
		'flex rounded-md bg-gray-800 bg-opacity-70 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter',
		className
	)}
>
	<slot />
</div>
