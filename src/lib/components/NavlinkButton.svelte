<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$src/lib/util/cn';

	export let href: string;
	export let isActive: boolean;
</script>

<a
	{href}
	class={cn(
		'text-white',
		!isActive && 'hover:text-opacity-8 text-gray-400 text-opacity-90 hover:text-white'
	)}
>
	<slot />
</a>
