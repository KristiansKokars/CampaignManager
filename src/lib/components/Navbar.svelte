<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { cn } from '$src/lib/util/cn';

	export let isLoggedIn: boolean = false;

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
	class="flex h-12 w-full border-b border-gray-800 border-opacity-40 bg-gray-800 bg-opacity-70 bg-clip-padding p-2 backdrop-blur-sm backdrop-filter"
>
	<nav class="mx-auto flex w-full max-w-[90rem] items-center justify-between px-4">
		<div class="flex gap-x-4">
			{#each links as link}
				<a
					href={link.path}
					class={cn(
						'text-white',
						$page.url.pathname !== link.path &&
							'hover:text-opacity-8 text-gray-400 text-opacity-90 hover:text-white'
					)}
				>
					{link.text}
				</a>
			{/each}
		</div>
		{#if !isLoggedIn}
			<!-- TODO: once Svelte snippets come around, make this into a reusable navlink in this component -->
			<div class="flex gap-x-4">
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
			</div>
		{:else}
			<form method="POST" class="flex gap-x-4" action="/signout?" use:enhance>
				<button class="hover:text-opacity-8 text-red-400 text-opacity-90 hover:text-red-300">
					Sign out
				</button>
			</form>
		{/if}
	</nav>
</div>