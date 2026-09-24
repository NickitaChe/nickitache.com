import './style.css';

type Theme = 'light' | 'dark';

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
const year = document.querySelector<HTMLElement>('#year');

const storedTheme = localStorage.getItem('theme') as Theme | null;

if (storedTheme) {
  root.dataset.theme = storedTheme;
}

year && (year.textContent = new Date().getFullYear().toString());

toggle?.addEventListener('click', () => {
  const currentTheme =
    root.dataset.theme ??
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';

  root.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
});
