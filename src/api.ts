import { format, parseISO } from 'date-fns';
import { units } from './index';

interface WeatherCondition {
  code: number;
  text: string;
}

interface WeatherForecastDay {
  date: string;
  astro: {
    sunrise: string;
    sunset: string;
  };
  day: {
    condition: WeatherCondition;
    maxtemp_f: number;
    maxtemp_c: number;
    mintemp_f: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
  };
}

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_f: number;
    temp_c: number;
    feelslike_f: number;
    feelslike_c: number;
    wind_mph: number;
    wind_kph: number;
    condition: WeatherCondition;
    humidity: number;
    uv: number;
  };
  forecast: {
    forecastday: WeatherForecastDay[];
  }
}

const apiKey: string = process.env.API_KEY!;

const loading = document.querySelector('.loading') as HTMLElement | null;
const section = document.querySelector('section') as HTMLElement | null;

async function getWeather(location: string) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10`,
    { mode: 'cors' }
  );
  let weather: WeatherData = await response.json();

  if (loading) loading.style.display = 'none';
  if (section) section.style.display = 'block';

  let city = weather.location.name;
  let region = weather.location.region;
  let country = weather.location.country;
  let temp =
    units === 'f'
      ? Math.round(weather.current.temp_f)
      : Math.round(weather.current.temp_c);
  let feelsLike =
    units === 'f'
      ? Math.round(weather.current.feelslike_f)
      : Math.round(weather.current.feelslike_c);
  let wind =
    units === 'f' ? weather.current.wind_mph : weather.current.wind_kph;
  // let condition = weather.current.condition;
  let condition = {
    code: weather.current.condition.code,
    text: weather.current.condition.text,
  }
  let humidity = weather.current.humidity;
  let uv = Math.round(weather.current.uv);
  let forecastDays: WeatherForecastDay[] = weather.forecast.forecastday;
  let sunrise = forecastDays[0].astro.sunrise;
  let sunset = forecastDays[0].astro.sunset;
  let precip = forecastDays[0].day.daily_chance_of_rain;
  let forecast: {
    date: string;
    condition: WeatherCondition;
    high: number;
    low: number;
  }[] = [];

  forecastDays.forEach((day) => {
    const unformattedDate = parseISO(day.date);
    const date = format(unformattedDate, 'M/d EEE');

    // let condition = day.day.condition;
    let condition = {
      code: day.day.condition.code,
      text: day.day.condition.text,
    }
    let high =
      units === 'f'
        ? Math.round(day.day.maxtemp_f)
        : Math.round(day.day.maxtemp_c);
    let low =
      units === 'f'
        ? Math.round(day.day.mintemp_f)
        : Math.round(day.day.mintemp_c);
    forecast.push({ date, condition, high, low });
  });

  let weatherData = {
    city,
    region,
    country,
    temp,
    condition,
    feelsLike,
    humidity,
    precip,
    wind,
    uv,
    sunrise,
    sunset,
    forecast,
  };

  return weatherData;
}

async function getSearch() {
  const searchbar = document.getElementById('searchbar') as HTMLInputElement;
  let response = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchbar.value}`,
    { mode: 'cors' }
  );
  let search = await response.json();
  return search;
}

export { getWeather, getSearch };
