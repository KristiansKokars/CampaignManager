<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
	export let href: string;
</script>

<a {href} class={cn('text-white hover:text-gray-300', className)}>
	<slot />
</a>
