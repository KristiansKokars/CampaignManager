<script lang="ts">
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
</script>

<div class={cn('grid [&>*]:col-start-1 [&>*]:row-start-1', className)}>
	<slot />
</div>
