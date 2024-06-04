import { getWeather, location } from './index.js';

const currentWeatherDiv = document.querySelector('.current');
const tenDayForecast = document.querySelector('.forecast');

const locationName = document.getElementById('location');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');

function createDiv(className) {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

async function displayWeather() {
  try {
    const weatherData = await getWeather(location);

    locationName.textContent = `${weatherData.city}, ${weatherData.region}, ${weatherData.country}`;
    temp.textContent = `${weatherData.temp} \u00B0F`;
    condition.textContent = `${weatherData.condition}`;

    for (const key in weatherData) {
      const dataDiv = createDiv(key);
      dataDiv.textContent = weatherData[key];
      currentWeatherDiv.appendChild(dataDiv);
    }
  } catch (err) {
    console.error(`Error displaying weather data: `, err);
  }
}

export { displayWeather };
