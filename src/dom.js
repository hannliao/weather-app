import { getWeather, location } from './index.js';

const locationName = document.getElementById('location');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const high = document.getElementById('high');
const low = document.getElementById('low');
const feelsLike = document.getElementById('feels-like');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const humidity = document.getElementById('humidity');
const precip = document.getElementById('precip');
const wind = document.getElementById('wind');
const uv = document.getElementById('uv');

const tenDayForecast = document.querySelector('.forecast');

function createDiv(className) {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

async function displayWeather() {
  try {
    const weatherData = await getWeather(location);

    locationName.textContent = `${weatherData.city}, ${weatherData.region}, ${weatherData.country}`;
    temp.textContent = `${weatherData.temp}\u00B0F`;
    condition.textContent = `${weatherData.condition}`;

    feelsLike.textContent = `Feels like: ${weatherData['feelsLike']}\u00B0`;
    high.textContent = `High: ${weatherData['forecast'][0]['high']}\u00B0`;
    low.textContent = `Low: ${weatherData['forecast'][0]['low']}\u00B0`;

    humidity.textContent = `Humidity: ${weatherData['humidity']}%`;
    precip.textContent = `Chance of rain: ${weatherData['precip']}%`;
    wind.textContent = `Wind: ${weatherData['wind']} mph`;
    uv.textContent = `UV index: ${weatherData['uv']}`;

    sunrise.textContent = `Sunrise: ${weatherData['sunrise']}`;
    sunset.textContent = `Sunset: ${weatherData['sunset']}`;

    const forecast = weatherData['forecast'];

    forecast.forEach((day) => {
      const dayForecast = createDiv('day');
      const date = day.date;
      const dayCondition = day.dayCondition;
      const dayHigh = day.high;
      const dayLow = day.low;
      dayForecast.textContent = `${date} ${dayCondition} ${dayLow}\u00B0 - ${dayHigh}\u00B0`;
      tenDayForecast.appendChild(dayForecast);
    });
  } catch (err) {
    console.error(`Error displaying weather data: `, err);
  }
}

export { displayWeather };
