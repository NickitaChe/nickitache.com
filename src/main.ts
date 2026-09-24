import './style.css';

type Language = 'ru' | 'en';

const translations: Record<Language, Record<string, string>> = {
  ru: {
    skip: 'К содержимому',
    role: 'Программист.',
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
    'history.title': 'История',
    'history.present': 'н.в.',
    'contact.title': 'Связь',
    'footer.present': 'сейчас'
  },
  en: {
    skip: 'Skip to content',
    role: 'Programmer.',
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
    'history.title': 'History',
    'history.present': 'present',
    'contact.title': 'Contact',
    'footer.present': 'present'
  }
};

const languageButtons = document.querySelectorAll<HTMLButtonElement>('[data-language]');
const translatedNodes = document.querySelectorAll<HTMLElement>('[data-i18n]');

const applyLanguage = (language: Language): void => {
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
      ? 'Nickita Che — программист. Проекты, ссылки и контакты.'
      : 'Nickita Che — programmer. Projects, links and contact information.';

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
