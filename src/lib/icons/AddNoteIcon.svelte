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
	><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path
		d="M14 2v4a2 2 0 0 0 2 2h4"
	/><path d="M9 15h6" /><path d="M12 18v-6" /></svg
>
