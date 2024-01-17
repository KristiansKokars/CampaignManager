<script lang="ts">
	import GitHubIcon from '$src/lib/icons/GitHubIcon.svelte';

	const links = [
		{
			path: '/campaign',
			text: 'Campaigns'
		}
	];
</script>

<div
	class="flex min-h-48 flex-col items-center justify-center gap-y-6 bg-slate-900 py-12 text-sm sm:text-base"
>
	<div class="mx-auto flex gap-x-16">
		{#each links as link}
			<a
				href={link.path}
				class="hover:text-opacity-8 text-white text-opacity-90 hover:text-gray-300"
			>
				{link.text}
			</a>
		{/each}
	</div>
	<div class="flex">
		<a href="https://github.com/KristiansKokars/CampaignManager" target="_blank">
			<GitHubIcon class="size-8 hover:stroke-gray-300" />
		</a>
	</div>
	<div>
		<p>© 2024 Kristiāns Kokars. All rights reserved.</p>
	</div>
</div>
