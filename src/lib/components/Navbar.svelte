<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$src/lib/util/cn';

	const links = [
		{
			path: '/register',
			text: 'Register'
		},
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
		<div class="flex gap-x-8">
			{#each links as link}
				<a
					href={link.path}
					class={cn(
						'text-white',
						$page.url.pathname !== link.path &&
							'hover:text-opacity-8 text-gray-400 text-opacity-90 hover:text-white'
					)}>{link.text}</a
				>
			{/each}
		</div>
	</nav>
</div>
