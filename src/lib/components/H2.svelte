<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
</script>

<h2 class={cn('font-nunito text-xl font-extrabold sm:text-2xl', className)}><slot /></h2>
