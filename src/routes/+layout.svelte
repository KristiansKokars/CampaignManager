<script lang="ts">
	import '$src/app.css';
	import Footer from '$src/lib/components/Footer.svelte';
	import Navbar from '$src/lib/components/Navbar.svelte';
	import Overlap from '$src/lib/components/Overlap.svelte';
	import DragonImage from '$src/lib/img/dragon.jpg?enhanced';
	import { enableViewTransitionsForSupportedBrowsers } from '$src/lib/util/enable-view-transitions.js';

	export let data;

	enableViewTransitionsForSupportedBrowsers();
</script>

<svelte:head>
	<title>Campaign Manager</title>
	<meta name="description" content="D&D Campaign and Session collaborative note tracker" />
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
