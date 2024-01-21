<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
</script>

<h1 class={cn('font-nunito text-2xl font-extrabold sm:text-3xl', className)}><slot /></h1>
