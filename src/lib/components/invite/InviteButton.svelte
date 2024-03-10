<script lang="ts">
	import { page } from '$app/stores';
	import { pushState } from '$app/navigation';
	import { cn } from '$src/lib/util/cn';
	import InviteDropdown from './InviteDropdown.svelte';
	import type { CampaignInviteDTO } from '$src/lib/server/data/queries/campaign-invites';

	export let hasUncheckedCampaignInvites: boolean;
	export let campaignInvites: CampaignInviteDTO[];

	$: isActive = $page.state.showModal;

	function showInviteDropbox() {
		pushState('', {
			showModal: !$page.state.showModal
		});
	}
</script>

<div class="relative">
	<span class="relative inline-flex">
		<button
			class={cn(
				'text-white',
				!isActive && 'hover:text-opacity-8 text-gray-400 text-opacity-90 hover:text-white'
			)}
			on:click={showInviteDropbox}>Invites</button
		>
		{#if hasUncheckedCampaignInvites}
			<span class="absolute my-auto -ml-5 flex h-full w-3 items-center justify-center">
				<span class="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-red-400 opacity-75"
				></span>
				<span class="relative z-10 inline-flex h-3 w-3 rounded-full bg-red-500 text-[0.4rem]"
				></span>
			</span>
		{/if}
	</span>

	{#if $page.state.showModal}
		<div class="absolute top-12 w-60">
			<InviteDropdown {campaignInvites} />
		</div>
	{/if}
</div>
