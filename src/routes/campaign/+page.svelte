<script lang="ts">
	import GlassCard from '$src/lib/components/GlassCard.svelte';

	export let data;
</script>

<GlassCard class="flex-col">
	<p>{data.username ?? 'Not logged in'}</p>
	<p>Empty</p>
</GlassCard>
