<script lang="ts">
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import { cn } from '$src/lib/util/cn';

	let className: string = '';
	export { className as class };
</script>

<GlassCard
	class={cn('w-full max-w-screen-lg flex-col items-center justify-center break-all', className)}
>
	<slot />
</GlassCard>
