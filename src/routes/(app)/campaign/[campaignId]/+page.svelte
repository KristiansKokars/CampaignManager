<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Button from '$src/lib/components/Button.svelte';
	import Dialog from '$src/lib/components/Dialog.svelte';
	import GlassCard from '$src/lib/components/GlassCard.svelte';
	import LinkButton from '$src/lib/components/LinkButton.svelte';

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

<GlassCard class="w-full max-w-96 flex-col items-center justify-center break-all">
	{#if data.campaign}
		<h2 class="text-xl font-bold">{data.campaign?.name}</h2>
		<p>{data.campaign?.description}</p>
		{#if data.isDungeonMasterForCampaign}
			<div class="bg-red-500">
				<button on:click={() => dialog.showModal()}>Invite players</button>
			</div>
		{/if}
		<div class="flex gap-x-8">
			{#each data.campaign?.sessions as campaignSession (`${data.campaign?.id}${campaignSession.sessionNumber}`)}
				<div class="flex flex-col gap-y-4">
					<p>Session: {campaignSession.sessionNumber}</p>
					{#each campaignSession.notes as note (note.id)}
						<LinkButton
							href={`/campaign/${data.id}/${campaignSession.sessionNumber}/note/${note.id}`}
							>Note: {note.title}</LinkButton
						>
					{/each}
					<LinkButton href={`/campaign/${data.id}/${campaignSession.sessionNumber}/note/create`}
						>Create Note</LinkButton
					>
				</div>
			{/each}
		</div>
		{#if data.isDungeonMasterForCampaign}
			<form method="POST" action="?/delete" use:enhance class="py-4">
				<input type="hidden" name="campaignId" value={data.campaign.id} />
				<Button class="w-full">Delete</Button>
			</form>
			<LinkButton href={`/campaign/${data.campaign.id}/edit`}>Edit</LinkButton>
		{:else}
			<form method="POST" action="?/leave" use:enhance class="py-4">
				<input type="hidden" name="campaignId" value={data.campaign.id} />
				<Button class="w-full">Leave</Button>
			</form>
		{/if}
		<form method="POST" action="?/addSession" use:enhance class="py-4">
			<input type="hidden" name="campaignId" value={data.campaign.id} />
			<Button class="w-full">Add Session</Button>
		</form>
	{:else}
		<p>Campaign not found!</p>
	{/if}
</GlassCard>
