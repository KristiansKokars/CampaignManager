<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/buttons/Button.svelte';
	import Dialog from '$src/lib/components/Dialog.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import LinkButton from '$src/lib/components/buttons/LinkButton.svelte';
	import dayjs from 'dayjs';
	import TopLayout from '$src/lib/components/TopLayout.svelte';
	import PageGlassCard from '$src/lib/components/PageGlassCard.svelte';
	import Overlap from '$src/lib/components/Overlap.svelte';
	import EditIcon from '$src/lib/icons/EditIcon.svelte';
	import DeleteIcon from '$src/lib/icons/DeleteIcon.svelte';
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import TextLinkButton from '$src/lib/components/buttons/TextLinkButton.svelte';
	import DeleteTextButton from '$src/lib/components/buttons/DeleteTextButton.svelte';
	import { cn } from '$src/lib/util/cn.js';
	import LeaveIcon from '$src/lib/icons/LeaveIcon.svelte';
	import AddUserIcon from '$src/lib/icons/AddUserIcon.svelte';
	import AddNoteIcon from '$src/lib/icons/AddNoteIcon.svelte';

	export let data;

	let dialog: HTMLDialogElement;
	let playerQuery = '';
	let foundPlayers: { username: string; userId: string }[] = [];
	// TODO: only local cache for now
	let sentInvitesToPlayers: Map<string, boolean> = new Map();

	$: onSearchForPlayers(playerQuery);
	async function onSearchForPlayers(username: string) {
		if (!browser) return;

		const response = await fetch(`/api/player?username=${username}`);
		foundPlayers = await response.json();
	}

	async function sendInvite(userId: string) {
		const response = await fetch('/api/invite', {
			method: 'POST',
			body: JSON.stringify({ campaignId: data.id, userId: userId })
		});
		sentInvitesToPlayers.set(userId, true);
		sentInvitesToPlayers = sentInvitesToPlayers;
	}
</script>

{#if data.isDungeonMasterForCampaign}
	<Dialog bind:dialog on:click={() => dialog.close()}>
		<div class="p-4">
			<p>Search for players</p>
			<input type="text" name="player" bind:value={playerQuery} />
			{#each foundPlayers as foundPlayer (foundPlayer.userId)}
				<div class="flex gap-x-4">
					<p>{foundPlayer.username}#{foundPlayer.userId}</p>
					{#if sentInvitesToPlayers.get(foundPlayer.userId)}
						<p>Invite sent</p>
					{:else}
						<button on:click={() => sendInvite(foundPlayer.userId)}>Send invite</button>
					{/if}
				</div>
			{/each}
		</div>
	</Dialog>
{/if}

<TopLayout>
	<div
		class="flex w-full max-w-screen-2xl flex-col items-center justify-center break-all rounded-md bg-gray-800 bg-opacity-70 bg-clip-padding backdrop-blur backdrop-filter"
	>
		<Overlap class="w-full">
			{#if data.campaign.bannerUrl}
				<img
					src={data.campaign.bannerUrl}
					alt="Campaign Banner"
					class="h-40 w-screen rounded-t-md object-cover"
				/>
			{:else}
				<GlassCard class="-z-10 h-40" />
			{/if}
			<div class="flex flex-col p-4">
				<div class="flex justify-between">
					<h1 class="text-2xl font-bold sm:text-3xl">{data.campaign?.name}</h1>
					<div class="flex items-center justify-center rounded-md bg-slate-900/20 backdrop-blur-lg">
						{#if data.isDungeonMasterForCampaign}
							<TextButton on:click={() => dialog.showModal()} title="Invite players to campaign">
								<AddUserIcon />
							</TextButton>
							<TextLinkButton href={`/campaign/${data.campaign.id}/edit`} title="Edit"
								><EditIcon /></TextLinkButton
							>
							<form method="POST" action="?/delete" use:enhance class="flex justify-center">
								<input type="hidden" name="campaignId" value={data.campaign.id} />
								<DeleteTextButton />
							</form>
						{:else}
							<form method="POST" action="?/leave" use:enhance class="flex justify-center">
								<input type="hidden" name="campaignId" value={data.campaign.id} />
								<TextButton class="text-red-400/80 hover:text-red-400" title="Leave campaign"
									><LeaveIcon /></TextButton
								>
							</form>
						{/if}
					</div>
				</div>
				<p
					class={cn(
						'max-h-24 w-fit overflow-y-auto rounded-md  pr-4 ',
						data.campaign.bannerUrl && 'bg-slate-900/20 backdrop-blur'
					)}
				>
					{data.campaign?.description}
				</p>
			</div>
		</Overlap>
		<div class="w-full p-4">
			<div class="flex flex-wrap justify-evenly gap-4">
				{#each data.campaign?.sessions as campaignSession (`${data.campaign?.id}${campaignSession.sessionNumber}`)}
					<div
						class="flex w-full flex-col rounded-lg bg-red-900/10 bg-opacity-20 p-4 backdrop-blur sm:w-48"
					>
						<div class="flex items-center">
							<div class="pr-4">
								<h2 class="text-lg font-bold sm:text-xl">
									Session {campaignSession.sessionNumber}
								</h2>
								<p class="font-light">{dayjs(campaignSession.date).format('DD/MM/YYYY')}</p>
							</div>
							<div class="flex grow justify-end">
								<TextLinkButton
									title="Add note to session"
									href={`/campaign/${data.id}/${campaignSession.sessionNumber}/note/create`}
									><AddNoteIcon class="size-6" /></TextLinkButton
								>
							</div>
						</div>
						<div class="flex gap-y-2 py-2">
							{#each campaignSession.notes as note (note.id)}
								<LinkButton
									href={`/campaign/${data.id}/${campaignSession.sessionNumber}/note/${note.id}`}
									>Note: {note.title}</LinkButton
								>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<form method="POST" action="?/addSession" use:enhance class="flex w-full justify-center py-4">
				<input type="hidden" name="campaignId" value={data.campaign.id} />
				<Button class="">Add Session</Button>
			</form>
		</div>
	</div>
</TopLayout>
