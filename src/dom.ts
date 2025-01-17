import { search, units } from './index';
import { getWeather, getSearch } from './api';
import icons from './icons';
import sunriseIcon from './img/sunrise.png';
import sunsetIcon from './img/sunset.png';
import humidityIcon from './img/humidity.png';
import precipIcon from './img/rain.png';
import windIcon from './img/wind.png';
import uvIcon from './img/sun.png';
import arrowUp from './img/arrow-up.svg';
import arrowDown from './img/arrow-down.svg';

interface WeatherCondition {
  code: number;
  text: string;
}

interface WeatherForecast {
  date: string;
  condition: WeatherCondition;
  high: number;
  low: number;
}

interface WeatherData {
  city: string;
  region: string;
  country: string;
  condition: WeatherCondition;
  temp: number;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  humidity: number;
  precip: number;
  wind: number;
  uv: number;
  forecast: WeatherForecast[];
}

interface AutocompleteResult {
  name: string;
  region: string;
  country: string;
}

const locationName = document.getElementById('location') as HTMLElement;
const conditionIconDiv = document.getElementById('condition-icon') as HTMLElement;
const temp = document.getElementById('temp') as HTMLElement;
const condition = document.getElementById('condition') as HTMLElement;
const high = document.getElementById('high') as HTMLElement;
const low = document.getElementById('low') as HTMLElement;
const feelsLike = document.getElementById('feels-like') as HTMLElement;
const sunrise = document.getElementById('sunrise') as HTMLElement;
const sunset = document.getElementById('sunset') as HTMLElement;
const humidity = document.getElementById('humidity') as HTMLElement;
const precip = document.getElementById('precip') as HTMLElement;
const wind = document.getElementById('wind') as HTMLElement;
const uv = document.getElementById('uv') as HTMLElement;
const tenDayForecast = document.querySelector('.forecast') as HTMLElement;
const autocompletions = document.querySelector('.autocompletions') as HTMLElement;
const searchbar = document.getElementById('searchbar') as HTMLInputElement;

function createDiv(className: string): HTMLDivElement {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

function createIcon(src: string, alt: string): HTMLImageElement {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

function findIcon(code: number): string {
  const iconObject = icons.find((icon: {
    codes: number[];
    icon: string;
}) => icon.codes.includes(code));
  return iconObject?.icon || '';
}

async function showWeather(location: string): Promise<void> {
  try {
    const weatherData: WeatherData = await getWeather(location);

    locationName.innerHTML = `${weatherData.city}, ${weatherData.region}<br>${weatherData.country}`;

    const conditionIcon = createIcon(
      findIcon(weatherData.condition.code),
      weatherData.condition.text
    );
    conditionIconDiv.appendChild(conditionIcon);

    temp.textContent =
      units === 'f'
        ? `${weatherData.temp}\u00B0F`
        : `${weatherData.temp}\u00B0C`;
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
    precip.append(createIcon(precipIcon, 'chance-of-rain'));

    wind.innerHTML =
      units === 'f'
        ? `Wind<br>${weatherData['wind']} mph`
        : `Wind<br>${weatherData['wind']} kph`;
    wind.append(createIcon(windIcon, 'wind'));

    uv.innerHTML = `UV index<br>${weatherData['uv']}`;
    uv.append(createIcon(uvIcon, 'uv'));

    const forecast = weatherData['forecast'];

    forecast.forEach((day) => {
      const dayForecast = createDiv('day');
      const date = day.date;
      const conditionIcon = createIcon(
        findIcon(day.condition.code),
        day.condition.text
      );
      const conditionDiv = createDiv('smaller');
      conditionDiv.textContent = day.condition.text;

      const lowIcon = createIcon(arrowDown, "low");
      const highIcon = createIcon(arrowUp, "high");
      const dayLow = day.low;
      const dayHigh = day.high;
      const lowDiv = createDiv('lowTemp');
      lowDiv.append(lowIcon, `${dayLow}\u00B0`)
      const highDiv = createDiv('highTemp');
      highDiv.append(highIcon, `${dayHigh}\u00B0`)

      dayForecast.append(date, conditionIcon, conditionDiv, lowDiv, highDiv);

      tenDayForecast.appendChild(dayForecast);
    });
  } catch (err) {
    console.error(`Error displaying weather data: `, err);
  }
}

async function showAutocomplete(): Promise<void> {
  try {
    let result: AutocompleteResult[] = await getSearch();

    autocompletions.textContent = '';

    if (result !== null && result.length !== 0) {
      result.forEach((autocomplete) => {
        const autocompletion = document.createElement('button');
        autocompletion.classList.add('autocompletion');
        autocompletion.textContent = `${autocomplete.name}, ${autocomplete.region}, ${autocomplete.country}`;
        autocompletions.appendChild(autocompletion);

        autocompletion.addEventListener('click', () => {
          search(`${autocompletion.textContent}`);
        });
      });
    }
  } catch (err) {
    console.log(`Autocompletion error: ${err}`);
  }
}

function clear(): void {
  conditionIconDiv.textContent = '';
  tenDayForecast.textContent = '';
  autocompletions.textContent = '';
  searchbar.value = '';
}

export { showWeather, showAutocomplete, clear };
