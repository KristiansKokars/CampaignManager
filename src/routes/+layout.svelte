<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import '$src/app.css';
	import { pusher } from '$src/lib/client-pusher.js';
	import Footer from '$src/lib/components/Footer.svelte';
	import Navbar from '$src/lib/components/Navbar.svelte';
	import Overlap from '$src/lib/components/Overlap.svelte';
	import DragonImage from '$src/lib/img/dragon.jpg?enhanced';
	import { logger } from '$src/lib/logger.js';
	import { enableViewTransitionsForSupportedBrowsers } from '$src/lib/util/enable-view-transitions.js';
	import { onMount } from 'svelte';

	export let data;

	enableViewTransitionsForSupportedBrowsers();

	onMount(() => {
		if (!browser || !data.userId) return;

		logger.info('Subscribed to Pusher notifications');
		pusher.subscribe(data.userId);
		pusher.bind('invite', () => {
			invalidate('invite:hasUncheckedCampaignInvites');
		});
	});
</script>

<svelte:head>
	<title>Campaign Manager</title>
	<meta name="description" content="D&D Campaign and Session collaborative note tracker" />
</svelte:head>

<div class="min-h-lvh bg-slate-900 object-fill text-white">
	<Overlap>
		<Navbar
			isLoggedIn={data.isLoggedIn}
			hasUncheckedCampaignInvites={data.hasUncheckedCampaignInvites}
		/>
		<enhanced:img src={DragonImage} class="h-lvh w-full object-cover object-center" alt="" />
		<main class="flex grow flex-col">
			<slot />
		</main>
	</Overlap>
	<Footer />
</div>
