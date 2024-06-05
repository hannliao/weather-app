import { format, parseISO } from 'date-fns';
import { units } from './index.js';

const API_KEY = '699e4653fb944da28ca183424240306';

const loading = document.querySelector('.loading');
const section = document.querySelector('section');

async function getWeather(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10`,
    { mode: 'cors' }
  );
  let weather = await response.json();

  loading.style.display = 'none';
  section.style.display = 'block';

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
  let condition = weather.current.condition;
  let humidity = weather.current.humidity;
  let uv = Math.round(weather.current.uv);
  let forecastDays = weather.forecast.forecastday;
  let sunrise = forecastDays[0].astro.sunrise;
  let sunset = forecastDays[0].astro.sunset;
  let precip = forecastDays[0].day.daily_chance_of_rain;
  let forecast = [];

  forecastDays.forEach((day) => {
    let date = parseISO(day.date);
    date = format(date, 'M/d EEE');

    let dayCondition = day.day.condition;
    let high =
      units === 'f'
        ? Math.round(day.day.maxtemp_f)
        : Math.round(day.day.maxtemp_c);
    let low =
      units === 'f'
        ? Math.round(day.day.mintemp_f)
        : Math.round(day.day.mintemp_c);
    forecast.push({ date, dayCondition, high, low });
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
  const searchbar = document.getElementById('searchbar');
  let response = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchbar.value}`,
    { mode: 'cors' }
  );
  let search = await response.json();
  return search;
}

export { getWeather, getSearch };
