<script lang="ts">
	import type { DailyForecast } from '$lib/types/weather';
	import { arrayTransformDailyForecastData } from '$lib/utils';
	import WeatherCard from './weatherCard.svelte';

	export let data: DailyForecast;
	const arrayData = arrayTransformDailyForecastData(data);
</script>

<div class="w-full flex flex-col gap-4 lg:gap-8 items-center">
	<h3 class="font-bold text-xl md:text-2xl text-slate-700">10-Day Forecast</h3>
	<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
		{#each arrayData as day}
			<WeatherCard data={day} />
		{/each}
	</div>
</div>
