/**
 * Language-independent data.
 *
 * Everything here is identical in every locale — links, handles, dates,
 * icon names, technology names, structural keys. All prose lives in
 * `src/i18n/locales/*.js` and is looked up by the keys defined here.
 */

export const profile = {
  email: 'Yahyaeren34@yandex.ru',
  github: 'https://github.com/kayaal34',
  githubHandle: 'github.com/kayaal34',
  linkedin: 'https://www.linkedin.com/in/yahya-kayaal',
  linkedinHandle: 'linkedin.com/in/yahya-kayaal',
  telegram: 'https://t.me/kayaal34',
  telegramHandle: '@kayaal34',
};

/**
 * Sections that live on the home page. These are the scroll anchors and
 * the order they appear in.
 *
 * Contact is deliberately not here — it is its own route (see `contactPath`),
 * because the home page had grown long enough that a form at the bottom was
 * doing nobody any favours.
 */
export const sectionIds = ['home', 'about', 'stack', 'experience', 'clients', 'projects'];

/** The contact page lives at its own URL. */
export const contactPath = '/contact';

/** Newest first. `current` renders the in-progress badge. */
export const educationEntries = [
  { key: 'itmoMsc', period: '2026 —', current: true },
  { key: 'bscSoftwareEngineering', period: '2026-06' },
  { key: 'embeddedSystems', period: '2025-05' },
  { key: 'preparatoryFaculty', period: '2022-01' },
];

/** Proficiency bar widths are decorative; the level wording is translated. */
export const languageLevels = [
  { key: 'turkish', value: 100 },
  { key: 'russian', value: 92 },
  { key: 'english', value: 88 },
];

export const experienceEntries = [
  { id: 'vk', period: '2025-06 — 2026-01', company: 'VK' },
  { id: 'sky', period: '2024-09 — 2025-09', company: 'Sky Education' },
];

/**
 * The six I actually reach for. An eleven-item grid with a filter bar read
 * as a list of everything ever installed rather than a claim of skill;
 * fewer, stronger entries say more.
 *
 * Technology names are proper nouns and stay untranslated; only the
 * one-line `detail` under each is localised.
 */
export const techStack = [
  { key: 'python', name: 'Python', icon: 'CodeXml' },
  { key: 'react', name: 'React & TypeScript', icon: 'Atom' },
  { key: 'flutter', name: 'Flutter & Dart', icon: 'Smartphone' },
  { key: 'databases', name: 'PostgreSQL', icon: 'Database' },
  { key: 'ai', name: 'OpenAI & TensorFlow', icon: 'BrainCircuit' },
  { key: 'embedded', name: 'Embedded C++', icon: 'Cpu' },
];

/**
 * Project names are product names and stay untranslated. Roles and
 * descriptions are localised; tags are technology names.
 *
 * `link`: set when the project is publicly reachable — it renders a small
 * chip on the card. Leave it out and the card simply has no link.
 */
export const projects = [
  {
    id: 'aiTripPlanner',
    index: '01',
    name: 'AI Trip Planner',
    icon: 'Compass',
    tags: ['FastAPI', 'PostgreSQL', 'OpenAI', 'React', 'TypeScript'],
    repo: 'https://github.com/kayaal34/MyAiTripPlanner',
    hasHighlight: true,
  },
  {
    id: 'subscriptionHunter',
    index: '02',
    name: 'Subscription Hunter',
    icon: 'CreditCard',
    tags: ['Flutter', 'Dart', 'Material 3', 'Offline-first'],
    repo: 'https://github.com/kayaal34/subscriptionHunter',
    store: 'https://play.google.com/store/apps/details?id=com.subscriptionhunter.app',
  },
  {
    id: 'emotionDetection',
    index: '03',
    name: 'Emotion Detection',
    icon: 'BrainCircuit',
    tags: ['Python', 'TensorFlow', 'CNN', 'Computer Vision'],
    repo: 'https://github.com/kayaal34/emotion-detection',
  },
  {
    id: 'marketBot',
    index: '04',
    name: 'Borsa Takip Botu',
    icon: 'ChartLine',
    tags: ['Python', 'Telegram Bot API', 'Web Scraping'],
    repo: 'https://github.com/kayaal34/borsayk-tg-bot',
  },
  {
    id: 'stairLights',
    index: '05',
    name: 'Smart Stair Lighting',
    icon: 'Lightbulb',
    tags: ['C++', 'Mikrodenetleyici', 'IoT'],
    repo: 'https://github.com/kayaal34/smartstairlights-rtf',
  },
];

/** The Embedded Systems diploma lives under Education, not here — it is a
 *  qualification in its own right and listing it twice reads as padding. */
export const certifications = [
  { key: 'projectBasedLearning', date: '2025-12' },
  { key: 'cloudServicesEngineer', date: '2025-11' },
  { key: 'vkInternship', date: '2025-08' },
  { key: 'webFundamentals', date: '2024-03' },
  { key: 'itIntroduction', date: '2022-10' },
];

/**
 * Commercial clients.
 *
 * `url`: replace '#' with the real address — the button activates itself.
 * `logo`: drop a file in /public and point at it (e.g. '/otrajenie-logo.svg');
 *         while it is null the icon tile below is shown instead.
 */
export const clients = [
  {
    id: 'otrajenie',
    name: 'Studio Otrajenie',
    icon: 'Aperture',
    url: 'https://otrazhenie-kam.ru/',
    logo: '/otrazhenie-logo.svg',
  },
];

export const socials = [
  { id: 'email', icon: 'Mail', href: `mailto:${profile.email}`, value: profile.email },
  { id: 'linkedin', icon: 'Linkedin', href: profile.linkedin, value: profile.linkedinHandle },
  { id: 'github', icon: 'Github', href: profile.github, value: profile.githubHandle },
  { id: 'telegram', icon: 'Send', href: profile.telegram, value: profile.telegramHandle },
];
