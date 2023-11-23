import type { WeatherForecast } from '$lib/types/weather.js';

export const load = async ({ url, fetch }) => {
	const latLong = url.searchParams.get('location')?.split(',') ?? null;
	if (latLong) {
		const timezone = 'timezone=auto';
		const forecast_days = 'forecast_days=10';
		const current =
			'current=weather_code,temperature_2m,precipitation,apparent_temperature,wind_speed_10m,relative_humidity_2m';
		const daily = 'daily=weather_code,temperature_2m_max,temperature_2m_min';

		const res = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latLong[0]}&longitude=${latLong[1]}&${timezone}&${current}&${daily}&${forecast_days}`
		);
		if (res.ok) {
			return {
				forecast: (await res.json()) as WeatherForecast
			};
		}
	}
};
