import './style.css';

import { format, parseISO } from 'date-fns';
import { displayWeather } from './dom.js';

const API_KEY = '699e4653fb944da28ca183424240306';

let location = 'denver';
let searchbar = document.getElementById('searchbar');

async function getWeather(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10`,
    { mode: 'cors' }
  );
  let weather = await response.json();

  let city = weather.location.name;
  let region = weather.location.region;
  let country = weather.location.country;
  let temp = weather.current.temp_f;
  let condition = weather.current.condition.text;
  let feelsLike = weather.current.feelslike_f;
  let humidity = weather.current.humidity;
  let precip = weather.current.precip_in;
  let wind = weather.current.wind_mph;

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
  };

  let forecastDays = weather.forecast.forecastday;
  forecastDays.forEach((day) => {
    let date = parseISO(day.date);
    date = format(date, 'EEE');

    let high = day.day.maxtemp_f;
    let low = day.day.mintemp_f;
    console.log(
      `date: ${date}, high: ${Math.round(high)}, low: ${Math.round(low)}`
    );
  });

  console.log(`location: ${city}, ${region}, ${country}`);
  console.log(`temp: ${temp}`);
  console.log(`condition: ${condition}`);
  console.log(
    `feels like: ${feelsLike}, humidity: ${humidity}, chance of rain: ${precip}, wind: ${wind}`
  );

  return weatherData;
}

searchbar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    location = searchbar.value;
    getWeather(location);
    displayWeather();
  }
});

getWeather(location);
displayWeather();

export { getWeather, location };
