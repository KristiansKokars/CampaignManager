<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { cn } from '$src/lib/util/cn';
	import InviteButton from './buttons/InviteButton.svelte';
	import NavlinkButton from './buttons/NavlinkButton.svelte';

	export let isLoggedIn: boolean = false;
	export let hasUncheckedCampaignInvites: boolean;

	const links = [
		{
			path: '/',
			text: 'Home'
		},
		{
			path: '/campaign',
			text: 'Campaigns'
		}
	];
</script>

<div
	class="sticky top-0 z-40 flex h-14 border-b border-gray-200/10 border-opacity-40 bg-gray-800 bg-opacity-70 bg-clip-padding p-2 text-sm backdrop-blur backdrop-filter sm:text-base"
>
	<nav class="mx-auto flex w-full max-w-[90rem] items-center justify-between px-4">
		<div class="flex gap-x-4 sm:gap-x-8">
			{#each links as link}
				<NavlinkButton href={link.path} isActive={$page.url.pathname === link.path}
					>{link.text}</NavlinkButton
				>
			{/each}
		</div>
		<div class="flex gap-x-4 sm:gap-x-8">
			{#if !isLoggedIn}
				<!-- TODO: once Svelte snippets come around, make this into a reusable navlink in this component -->
				<a
					href="/login"
					class={cn(
						'text-white',
						$page.url.pathname !== '/login' &&
							'hover:text-opacity-8 text-gray-400 text-opacity-90 hover:text-white'
					)}
				>
					Login
				</a>
				<a
					href="/register"
					class={cn(
						'text-white',
						$page.url.pathname !== '/register' &&
							'hover:text-opacity-8 text-gray-400 text-opacity-90 hover:text-white'
					)}
				>
					Register
				</a>
			{:else}
				<InviteButton {hasUncheckedCampaignInvites} />
				<form method="POST" class="flex gap-x-4" action="/signout?" use:enhance>
					<button class="hover:text-opacity-8 text-red-400 text-opacity-90 hover:text-red-300">
						Sign out
					</button>
				</form>
			{/if}
		</div>
	</nav>
</div>
