<script lang="ts">
	import { page } from '$app/stores';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
</script>

<div class="flex min-h-lvh flex-col items-center justify-center px-4">
	<GlassCard class="flex-col ">
		<h1 class="text-red-600">{$page.status}</h1>
		<p>{$page.error.message}</p>
	</GlassCard>
</div>
