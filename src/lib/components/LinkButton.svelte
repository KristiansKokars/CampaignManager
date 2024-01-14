<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
	export let href: string;
</script>

<a
	{href}
	class={cn(
		'flex items-center justify-center rounded-md bg-white p-2 text-black hover:bg-gray-100',
		className
	)}
>
	<slot />
</a>
