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

/** Section ids — also the anchor targets and the nav order. */
export const sectionIds = [
  'home',
  'about',
  'stack',
  'experience',
  'clients',
  'projects',
  'contact',
];

/** Hero counters. Only the caption is translated. */
export const heroStats = [
  { key: 'diplomas', value: '2', suffix: 'x' },
  { key: 'msc', value: '1', suffix: '' },
  { key: 'projects', value: '7', suffix: '+' },
  { key: 'languages', value: '3', suffix: '' },
];

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
 * Technology names are proper nouns and stay untranslated; only the
 * one-line `detail` under each is localised.
 */
export const techStack = [
  { key: 'python', name: 'Python', icon: 'CodeXml', group: 'backend' },
  { key: 'flutter', name: 'Flutter & Dart', icon: 'Smartphone', group: 'mobile' },
  { key: 'embedded', name: 'Embedded Systems', icon: 'Cpu', group: 'embedded' },
  { key: 'databases', name: 'PostgreSQL & MySQL', icon: 'Database', group: 'backend' },
  { key: 'algorithms', name: 'Algorithms & OOP', icon: 'Binary', group: 'core' },
  { key: 'dotnet', name: '.NET Core & C#', icon: 'Layers', group: 'backend' },
  { key: 'yandexCloud', name: 'Yandex Cloud', icon: 'Cloud', group: 'cloud' },
  { key: 'web', name: 'HTML5, CSS3 & ReactJS', icon: 'Atom', group: 'web' },
  { key: 'kotlin', name: 'Kotlin & Java', icon: 'Coffee', group: 'mobile' },
  { key: 'git', name: 'Git & GitHub', icon: 'GitBranch', group: 'core' },
  { key: 'linux', name: 'Linux Microprocessors', icon: 'Terminal', group: 'embedded' },
];

export const techGroups = ['all', 'backend', 'mobile', 'embedded', 'cloud', 'web', 'core'];

/**
 * Project names stay in English in every locale — that is how they appear
 * in both the English and the Russian CV. Roles and descriptions are
 * localised; tags are technology names.
 */
export const projects = [
  {
    id: 'aiTravel',
    index: '01',
    name: 'AI Travel Itinerary Planner',
    icon: 'Compass',
    category: 'ai',
    tags: ['Python', 'FastAPI', 'LangChain', 'Google Maps API'],
  },
  {
    id: 'libraryAi',
    index: '02',
    name: 'AI Personal Library Assistant',
    icon: 'BrainCircuit',
    category: 'ai',
    tags: ['Python', 'Neural Networks', 'Recommender Systems'],
    hasHighlight: true,
  },
  {
    id: 'sentiment',
    index: '03',
    name: 'AI Sentiment Analysis Pipeline',
    icon: 'MessageSquareText',
    category: 'ai',
    tags: ['Python', 'NLP', 'Machine Learning', 'Text Classification'],
  },
  {
    id: 'financeBot',
    index: '04',
    name: 'Financial Market Tracking Service',
    icon: 'ChartLine',
    category: 'backend',
    tags: ['Python', 'PostgreSQL', 'Web Scraping', 'Telegram Bot API'],
  },
  {
    id: 'commercePlatform',
    index: '05',
    name: 'E-Commerce & Fitness Platform Backend',
    icon: 'Server',
    category: 'backend',
    tags: ['Python', 'REST API', 'Domain Modelling', 'PostgreSQL'],
  },
  {
    id: 'subscriptions',
    index: '06',
    name: 'Subscription Management App',
    icon: 'CreditCard',
    category: 'mobile',
    tags: ['Flutter', 'Dart', '.NET Core', 'C#'],
  },
  {
    id: 'smartHome',
    index: '07',
    name: 'Smart Building Lighting Controller',
    icon: 'Lightbulb',
    category: 'iot',
    tags: ['Embedded Linux', 'IoT', 'Microcontrollers', 'Automation'],
  },
];

export const projectCategories = ['all', 'ai', 'backend', 'mobile', 'iot'];

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
