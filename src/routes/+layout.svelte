<script lang="ts">
	import '$src/app.css';
	import Footer from '$src/lib/components/Footer.svelte';
	import Navbar from '$src/lib/components/Navbar.svelte';
	import Overlap from '$src/lib/components/Overlap.svelte';
	import DragonImage from '$src/lib/img/dragon.jpg?enhanced';

	export let data;
</script>

<svelte:head>
	<title>Campaign Manager</title>
</svelte:head>

<div class="min-h-lvh bg-slate-900 object-fill text-white">
	<Overlap>
		<Navbar isLoggedIn={data.isLoggedIn} />
		<enhanced:img src={DragonImage} class="h-lvh w-full object-cover object-center" alt="" />
		<main class="flex grow flex-col">
			<slot />
		</main>
	</Overlap>
	<Footer />
</div>
