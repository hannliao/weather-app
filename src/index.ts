import './style.css';
import { getWeather } from './api';
import { showWeather, showAutocomplete, clear } from './dom';

const searchbar = document.getElementById('searchbar') as HTMLInputElement;
const loading = document.querySelector('.loading') as HTMLElement;
const section = document.querySelector('section') as HTMLElement;
const toggleButton = document.getElementById('pill') as HTMLElement;

let units: 'c' | 'f' = 'c';
let location: string = 'denver';

function search(loc?: string) {
  loading.style.display = 'block';
  section.style.display = 'none';

  location = loc || searchbar.value;
  getWeather(location);
  clear();
  showWeather(location);
}

function toggle(): void {
  toggleButton.classList.toggle('active');
  units = units === 'f' ? 'c' : 'f';
  search(location);
}

searchbar.addEventListener('keyup', (event: KeyboardEvent) => {
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
