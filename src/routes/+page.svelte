<script lang="ts">
	import CurrentForecast from '$lib/components/currentForecast.svelte';
	import DailyForecast from '$lib/components/dailyForecast.svelte';
	import Search from '$lib/components/search.svelte';
	import type { WeatherForecast } from '$lib/types/weather';

	const DUMMY_FORECAST = {
		latitude: 52.38,
		longitude: 4.8799996,
		generationtime_ms: 0.102996826171875,
		utc_offset_seconds: 3600,
		timezone: 'Europe/Amsterdam',
		timezone_abbreviation: 'CET',
		elevation: 14.0,
		current_units: {
			time: 'iso8601',
			interval: 'seconds',
			temperature_2m: '°C',
			relative_humidity_2m: '%',
			apparent_temperature: '°C',
			precipitation: 'mm',
			rain: 'mm',
			weather_code: 'wmo code',
			wind_speed_10m: 'km/h'
		},
		current: {
			time: '2023-11-18T13:45',
			interval: 900,
			temperature_2m: 7.4,
			relative_humidity_2m: 91,
			apparent_temperature: 3.0,
			precipitation: 0.2,
			rain: 0.2,
			weather_code: 61,
			wind_speed_10m: 23.3
		},
		daily_units: {
			time: 'iso8601',
			weather_code: 'wmo code',
			temperature_2m_max: '°C',
			temperature_2m_min: '°C'
		},
		daily: {
			time: [
				'2023-11-18',
				'2023-11-19',
				'2023-11-20',
				'2023-11-21',
				'2023-11-22',
				'2023-11-23',
				'2023-11-24'
			],
			weather_code: [80, 80, 80, 3, 61, 3, 80],
			temperature_2m_max: [12.7, 13.1, 12.2, 10.4, 8.5, 12.4, 11.9],
			temperature_2m_min: [4.9, 11.4, 8.3, 4.8, 1.4, 9.6, 10.8]
		}
	} as WeatherForecast;

	let location = '';
	let forecast: WeatherForecast;
</script>

<div class="flex flex-col gap-4 lg:gap-8 items-center justify-center w-11/12 md:w-4/5 mx-auto py-4">
	<Search bind:location />
	<button on:click={() => (forecast = DUMMY_FORECAST)}>Use Dummy Data</button>
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
