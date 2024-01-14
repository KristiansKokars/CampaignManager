<script lang="ts">
	import '$src/app.css';
	import Navbar from '$src/lib/components/Navbar.svelte';

	export let data;
</script>

<svelte:head>
	<title>Campaign Manager</title>
</svelte:head>

<div
	class="flex min-h-lvh flex-col bg-slate-900 bg-[url($lib/img/dragon.jpg)] bg-cover bg-center object-fill text-white"
>
	<Navbar isLoggedIn={data.isLoggedIn} />
	<main class="flex grow items-center justify-center">
		<slot />
	</main>
</div>
