<script lang="ts">
	import { page } from '$app/stores';
	import NavlinkButton from './NavlinkButton.svelte';

	export let hasUncheckedCampaignInvites: boolean;
</script>

<span class="relative inline-flex">
	<NavlinkButton href="/invites" isActive={$page.url.pathname === '/invites'}>
		Invites
	</NavlinkButton>
	{#if hasUncheckedCampaignInvites}
		<span class="absolute my-auto -ml-5 flex h-full w-3 items-center justify-center">
			<span class="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-red-400 opacity-75"
			></span>
			<span class="relative z-10 inline-flex h-3 w-3 rounded-full bg-red-500 text-[0.4rem]"></span>
		</span>
	{/if}
</span>
