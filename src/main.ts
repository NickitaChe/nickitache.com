import './style.css';

type Language = 'ru' | 'en';

interface PublicProjectStats {
  name: string;
  commits: number;
  linesAdded: number;
  linesDeleted: number;
}

interface PublicStatsPayload {
  totals: {
    commits: number;
    linesAdded: number;
    linesDeleted: number;
  };
  projects: PublicProjectStats[];
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    skip: 'К содержимому',
    role: 'Разработчик программного обеспечения.',
    'about.title': 'Обо мне',
    'about.work': 'Работаю в',
    'about.blog': 'Блог',
    'about.dotabuff': 'Дотабафф',
    'about.shikimori': 'Шикимори',
    'projects.title': 'Проекты',
    'projects.flatform': 'Быстронастраиваемая SaaS-система.',
    'projects.marmelad': 'Discord-бот.',
    'projects.lal': 'Локальный ИИ-агент и эксперименты с локальными coding agents.',
    'projects.tdf': 'Экстракшен MMO RPG.',
    'tools.title': 'Инструменты',
    'stats.loading': 'статистика загружается…',
    'stats.unavailable': 'статистика недоступна',
    'stats.commits': 'коммитов',
    'stats.lines': 'строки',
    'history.title': 'История',
    'history.present': 'н.в.',
    'contact.title': 'Связь',
    'footer.present': 'сейчас'
  },
  en: {
    skip: 'Skip to content',
    role: 'Software developer.',
    'about.title': 'About',
    'about.work': 'Working at',
    'about.blog': 'Blog',
    'about.dotabuff': 'Dotabuff',
    'about.shikimori': 'Shikimori',
    'projects.title': 'Projects',
    'projects.flatform': 'A rapidly configurable SaaS system.',
    'projects.marmelad': 'Discord bot.',
    'projects.lal': 'A local AI agent and experiments with local coding agents.',
    'projects.tdf': 'Extraction MMORPG.',
    'tools.title': 'Tools',
    'stats.loading': 'loading statistics…',
    'stats.unavailable': 'statistics unavailable',
    'stats.commits': 'commits',
    'stats.lines': 'lines',
    'history.title': 'History',
    'history.present': 'present',
    'contact.title': 'Contact',
    'footer.present': 'present'
  }
};

const languageButtons = document.querySelectorAll<HTMLButtonElement>('[data-language]');
const translatedNodes = document.querySelectorAll<HTMLElement>('[data-i18n]');
const number = new Intl.NumberFormat('en-US');

let currentLanguage: Language = 'ru';

const renderStats = (stats: PublicStatsPayload): void => {
  const projects = new Map(stats.projects.map((project) => [project.name, project]));

  document.querySelectorAll<HTMLElement>('[data-project-stats]').forEach((node) => {
    const project = projects.get(node.dataset.projectStats ?? '');
    if (!project) return;

    const added = node.querySelector<HTMLElement>('[data-lines-added]');
    const deleted = node.querySelector<HTMLElement>('[data-lines-deleted]');

    if (added) added.textContent = `+${number.format(project.linesAdded)}`;
    if (deleted) deleted.textContent = `−${number.format(project.linesDeleted)}`;
    node.hidden = false;
  });

  const state = document.querySelector<HTMLElement>('[data-stats-state]');
  const values = document.querySelector<HTMLElement>('[data-stats-values]');
  const commits = document.querySelector<HTMLElement>('[data-total-commits]');
  const added = document.querySelector<HTMLElement>('[data-total-lines-added]');
  const deleted = document.querySelector<HTMLElement>('[data-total-lines-deleted]');

  if (commits) commits.textContent = number.format(stats.totals.commits);
  if (added) added.textContent = `+${number.format(stats.totals.linesAdded)}`;
  if (deleted) deleted.textContent = `−${number.format(stats.totals.linesDeleted)}`;
  if (state) state.hidden = true;
  if (values) values.hidden = false;
};

const showStatsError = (): void => {
  const state = document.querySelector<HTMLElement>('[data-stats-state]');
  if (!state) return;

  state.dataset.i18n = 'stats.unavailable';
  state.textContent = translations[currentLanguage]['stats.unavailable'];
};

const loadStats = async (): Promise<void> => {
  try {
    const response = await fetch('https://stats.nickitache.com/api/stats', {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    renderStats(await response.json() as PublicStatsPayload);
  } catch {
    showStatsError();
  }
};

const applyLanguage = (language: Language): void => {
  currentLanguage = language;
  const dictionary = translations[language];

  document.documentElement.lang = language;
  localStorage.setItem('language', language);

  translatedNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (key && dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  const description =
    language === 'ru'
      ? 'Nickita Che — разработчик программного обеспечения. Проекты, ссылки и контакты.'
      : 'Nickita Che — software developer. Projects, links and contact information.';

  document.title = 'Nickita Che';
  document
    .querySelector<HTMLMetaElement>('meta[name="description"]')
    ?.setAttribute('content', description);
};

const storedLanguage = localStorage.getItem('language');
const initialLanguage: Language = storedLanguage === 'en' ? 'en' : 'ru';

applyLanguage(initialLanguage);

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const language = button.dataset.language;
    if (language === 'ru' || language === 'en') {
      applyLanguage(language);
    }
  });
});

void loadStats();
