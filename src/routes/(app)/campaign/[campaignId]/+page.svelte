<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { cn } from '$src/lib/util/cn.js';
	import Button from '$src/lib/components/buttons/Button.svelte';
	import Dialog from '$src/lib/components/Dialog.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import dayjs from 'dayjs';
	import TopLayout from '$src/lib/components/TopLayout.svelte';
	import Overlap from '$src/lib/components/Overlap.svelte';
	import EditIcon from '$src/lib/icons/EditIcon.svelte';
	import TextButton from '$src/lib/components/buttons/TextButton.svelte';
	import TextLinkButton from '$src/lib/components/buttons/TextLinkButton.svelte';
	import DeleteTextButton from '$src/lib/components/buttons/DeleteTextButton.svelte';
	import LeaveIcon from '$src/lib/icons/LeaveIcon.svelte';
	import AddUserIcon from '$src/lib/icons/AddUserIcon.svelte';
	import AddNoteIcon from '$src/lib/icons/AddNoteIcon.svelte';
	import Divider from '$src/lib/components/Divider.svelte';
	import InputField from '$src/lib/components/InputField.svelte';

	export let data;

	let dialog: HTMLDialogElement;
	let playerQuery = '';
	let foundPlayers: { username: string; userId: string }[] = [];
	// TODO: only local cache for now
	let sentInvitesToPlayers: Map<string, boolean> = new Map();

	let timeout: NodeJS.Timeout | undefined;
	let wereNoPlayersFound = false;

	function onSearchForPlayers() {
		if (!browser) return;

		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(async () => {
			if (!playerQuery) {
				foundPlayers = [];
				wereNoPlayersFound = false;
				return;
			}

			const response = await fetch(`/api/player?username=${playerQuery}`);
			const playersInResponse = await response.json();
			foundPlayers = playersInResponse;
			wereNoPlayersFound = playersInResponse.length === 0;
		}, 300);
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
		<p slot="title" class="text-lg font-bold">Search for players</p>
		<div class="p-4">
			<InputField
				id="text"
				type="text"
				name="player"
				bind:value={playerQuery}
				on:input={onSearchForPlayers}
			/>
			{#if wereNoPlayersFound}
				<p class="pt-4">No players were found with name {playerQuery}!</p>
			{/if}
			{#if foundPlayers.length !== 0}
				<div class="flex flex-col gap-y-2 pt-4">
					{#each foundPlayers as foundPlayer (foundPlayer.userId)}
						<div class="flex justify-between gap-x-4">
							<p>{foundPlayer.username}</p>
							{#if sentInvitesToPlayers.get(foundPlayer.userId)}
								<p>Invite sent</p>
							{:else}
								<TextButton on:click={() => sendInvite(foundPlayer.userId)}>Send invite</TextButton>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
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
				<div class="flex h-full justify-between">
					<p
						class={cn(
							'h-fit max-h-24 w-fit overflow-y-auto rounded-md pr-4',
							data.campaign.bannerUrl && 'bg-slate-900/20 backdrop-blur'
						)}
					>
						{data.campaign?.description}
					</p>
					<form method="POST" action="?/addSession" use:enhance class="flex items-end">
						<input type="hidden" name="campaignId" value={data.campaign.id} />
						<Button class="">Add Session</Button>
					</form>
				</div>
			</div>
		</Overlap>
		<div class="w-full p-4">
			{#if data.campaign?.sessions.length !== 0}
				<div
					class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
				>
					{#each data.campaign?.sessions as campaignSession (`${data.campaign?.id}${campaignSession.sessionNumber}`)}
						<div
							class="scrollbar-thumb-slate-800 scrollbar-track-slate-900 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thin flex max-h-48 flex-col overflow-y-auto rounded-lg bg-red-900/10 bg-opacity-20 backdrop-blur"
						>
							<div
								class="sticky top-0 flex items-center border-b border-gray-600/20 border-opacity-40 bg-gray-800/70 bg-opacity-70 bg-clip-padding p-4 backdrop-blur backdrop-filter"
							>
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
							<div class="flex h-full flex-col gap-y-2 p-4 py-2">
								{#each campaignSession.notes as note (note.id)}
									<a
										class="w-full rounded-md bg-slate-900/70 p-2 hover:bg-slate-900/85"
										href={`/campaign/${data.id}/${campaignSession.sessionNumber}/note/${note.id}`}
									>
										<p class="font-bold">{note.title}</p>
										<Divider />
										<p class="text-end text-sm font-light">{note.author.username}</p></a
									>
								{:else}
									<p class="h-full inline-flex justify-center items-center">No notes yet!</p>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<h2 class="inline-flex h-48 w-full items-center justify-center">No sessions yet!</h2>
			{/if}
		</div>
	</div>
</TopLayout>
