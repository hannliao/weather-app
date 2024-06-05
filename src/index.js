import './style.css';
import { getWeather } from './api.js';
import { showWeather, showAutocomplete, clear } from './dom.js';

const searchbar = document.getElementById('searchbar');
const loading = document.querySelector('.loading');
const section = document.querySelector('section');
const toggleButton = document.getElementById('pill');

let units = 'c';
let location = 'denver';

function search(loc) {
  loading.style.display = 'block';
  section.style.display = 'none';

  location = loc || searchbar.value;
  getWeather(location);
  clear();
  showWeather(location);
}

function toggle() {
  toggleButton.classList.toggle('active');
  units = units === 'f' ? 'c' : 'f';
  search(location);
}

searchbar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    search();
  }
  if (searchbar.value !== '') {
    showAutocomplete();
  }
});

toggleButton.addEventListener('click', () => {
  toggle();
});

getWeather(location);
showWeather(location);

export { search, units, location };
