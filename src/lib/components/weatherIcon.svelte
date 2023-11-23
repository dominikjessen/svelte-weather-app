<script lang="ts">
	import {
		Cloud,
		CloudDrizzle,
		CloudFog,
		CloudHail,
		CloudRain,
		CloudSnow,
		CloudSun,
		Cloudy,
		Haze,
		Sun,
		Tornado
	} from 'lucide-svelte';

	// These are needed because no switch in Svelte markup
	const sunCodes = [0, 1, 2];
	const cloudSunCodes = [3];
	const tornadoCodes = [30, 31, 32, 33, 34, 35];
	const hazeCodes = [5];
	const cloudFogCodes = [6, 7, 8, 9, 10, 11, 12, 28, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
	const cloudyCodes = [4, 13, 14, 15, 16, 17, 18, 19];
	const cloudDrizzleCodes = [20, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 66, 68, 80, 83, 91];
	const cloudRainCodes = [21, 24, 25, 29, 61, 62, 63, 64, 65, 67, 69, 81, 82, 84, 92, 95, 97];
	const cloudSnowCodes = [
		22, 23, 26, 36, 37, 38, 39, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 85, 86, 87, 88, 93, 94
	];
	const cloudHailCodes = [27, 89, 90, 96, 99];
	const cloudCodes = [98];

	export let weather_code: number;
	export let className: string;
</script>

{#if sunCodes.includes(weather_code)}
	<Sun class={className} />
{:else if cloudSunCodes.includes(weather_code)}
	<CloudSun class={className} />
{:else if tornadoCodes.includes(weather_code)}
	<Tornado class={className} />
{:else if hazeCodes.includes(weather_code)}
	<Haze class={className} />
{:else if cloudFogCodes.includes(weather_code)}
	<CloudFog class={className} />
{:else if cloudyCodes.includes(weather_code)}
	<Cloudy class={className} />
{:else if cloudDrizzleCodes.includes(weather_code)}
	<CloudDrizzle class={className} />
{:else if cloudRainCodes.includes(weather_code)}
	<CloudRain class={className} />
{:else if cloudSnowCodes.includes(weather_code)}
	<CloudSnow class={className} />
{:else if cloudHailCodes.includes(weather_code)}
	<CloudHail class={className} />
{:else if cloudCodes.includes(weather_code)}
	<Cloud class={className} />
{/if}
