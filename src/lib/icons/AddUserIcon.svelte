<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={cn('mx-2 size-5', className)}
	><path d="M2 21a8 8 0 0 1 13.292-6" /><circle cx="10" cy="8" r="5" /><path d="M19 16v6" /><path
		d="M22 19h-6"
	/></svg
>
