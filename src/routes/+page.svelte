<script lang="ts">
	import CurrentForecast from '$lib/components/currentForecast.svelte';
	import DailyForecast from '$lib/components/dailyForecast.svelte';
	import Search from '$lib/components/search.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: forecast = data.forecast;

	let location: string;
</script>

<div class="flex flex-col gap-4 lg:gap-8 items-center justify-center w-11/12 md:w-4/5 mx-auto py-4">
	<Search bind:location />
	{#if location}
		<h2 class="font-bold text-xl md:text-2xl">
			Weather
			{#if location === 'Your Location'}
				at
			{:else}
				in
			{/if}
			<span>{location}</span>
		</h2>
	{/if}
	{#if forecast && forecast.current && forecast.current_units}
		<CurrentForecast data={forecast.current} units={forecast.current_units} />
	{/if}
	{#if forecast && forecast.daily}
		<DailyForecast data={forecast.daily} />
	{/if}
</div>
