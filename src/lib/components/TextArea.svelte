<script lang="ts">
	export let name: string;
	export let id: string;
	export let value: string = '';
	export let required = false;
</script>

<div class="flex flex-col gap-1">
	<label for={id}><slot /></label>
	<textarea
		{name}
		{id}
		{value}
		{required}
		class="rounded-sm bg-gray-200 bg-opacity-20 px-2 py-1 focus:outline-none focus:outline-1 focus:outline-gray-300"
	/>
</div>