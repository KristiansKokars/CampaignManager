<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
</script>

<button
	class={cn(
		'flex items-center justify-center rounded-md bg-white p-2 text-black hover:bg-gray-200',
		className
	)}
>
	<slot />
</button>
