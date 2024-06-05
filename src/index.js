import './style.css';
import { getWeather } from './api.js';
import { showWeather, showAutocomplete, clear } from './dom.js';

const searchbar = document.getElementById('searchbar');

function search(location) {
  location = location || searchbar.value;
  console.log(`location: ${location}`);

  getWeather(location);
  clear();
  showWeather(location);
}

searchbar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    search();
  }
  if (searchbar.value !== '') {
    showAutocomplete();
  }
});

getWeather('denver');
showWeather('denver');

export { search };
