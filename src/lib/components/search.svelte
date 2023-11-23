<script lang="ts">
	import type { SearchResult } from '$lib/types/weather';
	import { SearchIcon } from 'lucide-svelte';

	export let location: string;

	let searchValue = '';
	let searchOptionsOpen = false;

	let searchResults: SearchResult[] = [];

	function searchBlurred() {}

	function handleOptionSelected(option: SearchResult) {
		location = `${option.name}, ${option.country_code.toUpperCase()}`;
	}

	function geoLocateUser() {
		location = 'Your Location';
	}
</script>

<div class="w-full flex gap-4 lg:gap-8 items-center">
	<!-- Searchbox with debounced type-ahead search -->
	<div class="w-full relative grow">
		<div class="flex relative w-full grow">
			<SearchIcon class="absolute top-[1.3rem] left-[1rem] text-slate-400 h-6 w-6" />
			<input
				placeholder="Search for a location"
				bind:value={searchValue}
				on:blur={searchBlurred}
				on:focus={() => (searchOptionsOpen = true)}
				class="pl-12 pr-2 py-5 bg-white grow rounded-xl text-lg"
			/>
		</div>
		{#if searchResults && searchOptionsOpen}
			<ul class="absolute w-full bg-white">
				{#each searchResults as option}
					<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li
						tabIndex={0}
						role="button"
						on:click={() => handleOptionSelected(option)}
						class="px-2 py-4 border w-full grid grid-cols-[min-content_1fr] items-center text-slate-700 hover:text-black hover:bg-slate-200 cursor-pointer"
					>
						<span class="tracking-wider font-bold text-lg uppercase mr-4 font-mono"
							>{option.country_code}</span
						>
						<span class="tracking-wider">
							{option.name}
							{option.admin1 ? `, ${option.admin1}` : ''}
						</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Get current location -->
	<button
		class="w-16 h-16 rounded bg-slate-200 hover:bg-slate-300 text-slate-700"
		on:click={geoLocateUser}
		title="Use your current location"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-5 h-5 m-auto"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-Width="2"
			stroke-Linecap="round"
			stroke-Linejoin="round"
		>
			<polygon points="3 11 22 2 13 21 11 13 3 11" />
		</svg>
	</button>
</div>
