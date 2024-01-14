<script lang="ts">
	import '$src/app.css';
	import Navbar from '$src/lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Campaign Manager</title>
</svelte:head>

<div
	class="flex min-h-lvh flex-col bg-slate-900 bg-[url(img/dragon.jpg)] bg-cover bg-center object-fill text-white"
>
	<Navbar />
	<main class="flex grow items-center justify-center">
		<slot />
	</main>
</div>
