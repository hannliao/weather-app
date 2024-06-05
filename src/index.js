import './style.css';
import { getWeather } from './api.js';
import { showWeather, showAutocomplete, clear } from './dom.js';

const searchbar = document.getElementById('searchbar');

const loading = document.querySelector('.loading');
const section = document.querySelector('section');

function search(location) {
  loading.style.display = 'block';
  section.style.display = 'none';

  location = location || searchbar.value;
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
