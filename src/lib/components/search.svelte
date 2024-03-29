<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { SearchResult } from '$lib/types/weather';
	import { SearchIcon } from 'lucide-svelte';

	export let location: string;
	export let isLoading = false;

	let searchValue = '';
	let searchOptionsOpen = false;
	let timeout: number;
	let searchResults: SearchResult[] = [];

	function searchBlurred(e: FocusEvent) {
		// If a list option is chosen, don't do anything as handleSelected will sort out click
		if (e.relatedTarget) return;
		searchOptionsOpen = false;
	}

	async function search() {
		const res = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}&count=10&language=en&format=json`
		);
		const data = await res.json();
		searchResults = data.results as SearchResult[];
	}

	function handleSearch() {
		if (!searchValue) {
			searchResults = [];
			return;
		}

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(search, 500);
	}

	function handleOptionSelected(option: SearchResult) {
		// Set search params
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('location', `${option.latitude},${option.longitude}`);

		goto(newUrl);

		// Notify parent for title change
		location = `${option.name}, ${option.country_code.toUpperCase()}`;
		isLoading = false;

		// Reset search state
		searchOptionsOpen = false;
		searchResults = [];
		searchValue = '';
	}

	function geoLocateUser() {
		function success(position: GeolocationPosition) {
			const newUrl = new URL($page.url);
			newUrl?.searchParams?.set(
				'location',
				`${position.coords.latitude},${position.coords.longitude}`
			);

			goto(newUrl);

			// Notify parent for title change
			location = 'Your Location';
			isLoading = false;

			// Reset state
			searchOptionsOpen = false;
			searchResults = [];
			searchValue = '';
		}

		function error() {
			alert('Could not locate user');
		}

		if (!navigator.geolocation) {
			alert('Geolocation not supported by your browser');
		} else {
			isLoading = true;
			navigator.geolocation.getCurrentPosition(success, error);
		}
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
				on:input={handleSearch}
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
