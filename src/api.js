import { format, parseISO } from 'date-fns';

const API_KEY = '699e4653fb944da28ca183424240306';

async function getWeather(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10`,
    { mode: 'cors' }
  );
  let weather = await response.json();

  let city = weather.location.name;
  let region = weather.location.region;
  let country = weather.location.country;
  let temp = Math.round(weather.current.temp_f);
  let condition = weather.current.condition;
  let feelsLike = Math.round(weather.current.feelslike_f);

  let humidity = weather.current.humidity;
  let precip = weather.current.precip_in;
  let wind = weather.current.wind_mph;
  let uv = Math.round(weather.current.uv);

  let forecastDays = weather.forecast.forecastday;

  let sunrise = forecastDays[0].astro.sunrise;
  let sunset = forecastDays[0].astro.sunset;

  let forecast = [];

  forecastDays.forEach((day) => {
    let date = parseISO(day.date);
    date = format(date, 'M/d EEE');

    let dayCondition = day.day.condition;
    let high = Math.round(day.day.maxtemp_f);
    let low = Math.round(day.day.mintemp_f);
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
