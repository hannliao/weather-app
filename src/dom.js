import { getWeather, location } from './index.js';
import icons from './icons.js';
import sunriseIcon from './img/sunrise.png';
import sunsetIcon from './img/sunset.png';
import humidityIcon from './img/humidity.png';
import precipIcon from './img/rain.png';
import windIcon from './img/wind.png';
import uvIcon from './img/sun.png';

const locationName = document.getElementById('location');
const conditionIconDiv = document.getElementById('condition-icon');
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

function createIcon(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

function findIcon(code) {
  const iconObject = icons.find((icon) => icon.codes.includes(code));
  return iconObject.icon;
}

async function displayWeather() {
  try {
    const weatherData = await getWeather(location);

    locationName.textContent = `${weatherData.city}, ${weatherData.region}, ${weatherData.country}`;

    const conditionIcon = createIcon(
      findIcon(weatherData.condition.code),
      weatherData.condition.text
    );
    conditionIconDiv.appendChild(conditionIcon);

    temp.textContent = `${weatherData.temp}\u00B0F`;
    condition.textContent = `${weatherData.condition.text}`;

    feelsLike.textContent = `Feels like: ${weatherData['feelsLike']}\u00B0`;
    high.textContent = `High: ${weatherData['forecast'][0]['high']}\u00B0`;
    low.textContent = `Low: ${weatherData['forecast'][0]['low']}\u00B0`;

    sunrise.innerHTML = `Sunrise<br>${weatherData['sunrise']}`;
    sunrise.append(createIcon(sunriseIcon, 'sunrise'));

    sunset.innerHTML = `Sunset<br>${weatherData['sunset']}`;
    sunset.append(createIcon(sunsetIcon, 'sunset'));

    humidity.innerHTML = `Humidity<br>${weatherData['humidity']}%`;
    humidity.append(createIcon(humidityIcon, 'humidity'));

    precip.innerHTML = `Chance of rain<br>${weatherData['precip']}%`;
    precip.append(createIcon(precipIcon, 'precipitation'));

    wind.innerHTML = `Wind<br>${weatherData['wind']} mph`;
    wind.append(createIcon(windIcon, 'wind'));

    uv.innerHTML = `UV index<br>${weatherData['uv']}`;
    uv.append(createIcon(uvIcon, 'uv'));

    const forecast = weatherData['forecast'];

    forecast.forEach((day) => {
      const dayForecast = createDiv('day');
      const date = day.date;
      const dayCondition = createIcon(
        findIcon(day.dayCondition.code),
        day.dayCondition.text
      );
      const dayHigh = day.high;
      const dayLow = day.low;
      const hiLo = createDiv('hi-lo');
      hiLo.textContent = `${dayLow}\u00B0 - ${dayHigh}\u00B0`;

      dayForecast.append(date, dayCondition, hiLo);

      tenDayForecast.appendChild(dayForecast);
    });
  } catch (err) {
    console.error(`Error displaying weather data: `, err);
  }
}

function clear() {
  conditionIconDiv.textContent = '';
  tenDayForecast.textContent = '';
}

export { displayWeather, clear };
