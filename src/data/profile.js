/**
 * Language-independent data: links, dates, technology names, structural keys.
 * Every line of prose lives in `src/i18n/locales/*.js` and is looked up by
 * the keys below, so a fact is only ever written down once.
 *
 * Source of truth for all of it: the CV (EN / RU), September 2026.
 */

export const profile = {
  email: 'Yahyaeren34@yandex.ru',
  github: 'https://github.com/kayaal34',
  githubHandle: 'github.com/kayaal34',
  linkedin: 'https://www.linkedin.com/in/yahya-kayaal',
  linkedinHandle: 'linkedin.com/in/yahya-kayaal',
  telegram: 'https://t.me/kayaal34',
  telegramHandle: '@kayaal34',
  site: 'kayaal.is-a.dev',
};

/**
 * Scroll anchors on the home page, in the order they appear. Contact is not
 * among them — it is its own page, because the people who fill in a form
 * arrive looking for it rather than scrolling into it.
 */
export const sectionIds = ['experience', 'projects', 'education', 'skills'];

/** The contact page lives at its own URL. */
export const contactPath = '/contact';

/**
 * Newest first. `current` appends the localised "present" word to the period
 * instead of a second date. `secondary` is the non-engineering row — it is
 * true experience but it is not the work being applied for, so it sits last
 * and quieter, exactly as it does on the CV.
 */
export const experience = [
  {
    id: 'freelance',
    period: '07.2026 —',
    current: true,
    stack: ['React', 'TypeScript', 'Supabase'],
    bullets: 2,
    /** The studio site is live, so the bullet that mentions it links out. */
    link: 'https://otrazhenie-kam.ru/',
  },
  {
    id: 'vk',
    period: '06.2025 — 01.2026',
    stack: ['Python', 'REST API', 'VK Bridge'],
    bullets: 3,
  },
  {
    id: 'sky',
    period: '09.2024 — 09.2025',
    stack: [],
    bullets: 1,
    secondary: true,
  },
];

/**
 * CV order, which is deliberate: the two shipped apps first, then the
 * graduation project, then the rest. Names are product names and stay
 * untranslated; everything under them is localised.
 *
 * `repo` renders a link. Subscription Hunter's store listing is not linked
 * on purpose — the package page is not public while the app sits in review,
 * and a 404 costs more than the extra link buys.
 */
export const projects = [
  {
    id: 'flipru',
    name: 'FlipRU',
    stack: ['Flutter', 'Dart'],
    repo: 'https://github.com/kayaal34/FlipRU',
    bullets: 2,
  },
  {
    id: 'subscriptionHunter',
    name: 'Subscription Hunter',
    stack: ['Flutter', 'Dart'],
    repo: 'https://github.com/kayaal34/subscriptionHunter',
    bullets: 1,
  },
  {
    id: 'aiTripPlanner',
    name: 'AI Trip Planner',
    stack: ['Python', 'FastAPI', 'LangChain'],
    repo: 'https://github.com/kayaal34/AI-Tripper-backend',
    bullets: 2,
  },
  {
    id: 'tzReviewer',
    name: 'TZ Reviewer',
    stack: ['Python'],
    repo: 'https://github.com/kayaal34/aitalenthub-hackathon',
    bullets: 2,
  },
  {
    id: 'emotionDetection',
    name: 'Emotion Detection',
    stack: ['Python', 'TensorFlow'],
    repo: 'https://github.com/kayaal34/emotion-detection',
    bullets: 2,
  },
  {
    id: 'degerix',
    name: 'Değerix',
    stack: ['Python', 'FastAPI', 'Leaflet'],
    repo: 'https://github.com/kayaal34/degerix',
    bullets: 2,
    inProgress: true,
  },
  {
    id: 'projectBasedLearning',
    name: 'Project-Based Learning',
    period: '01.2025 — 12.2025',
    stack: [],
    bullets: 2,
  },
  {
    id: 'other',
    name: null, // heading comes from the locale — this row has no product name
    stack: ['Python', 'PostgreSQL', 'C#', 'C++'],
    bullets: 1,
  },
];

export const education = [
  { id: 'itmo', period: '09.2026 —', current: true, notes: 1 },
  { id: 'urfu', period: '09.2021 — 06.2026', notes: 3 },
];

/** Skill group order. Labels are localised; the values are proper nouns. */
export const skillGroups = [
  { id: 'languages', items: ['Python', 'Dart', 'JavaScript', 'TypeScript', 'SQL'] },
  {
    id: 'backend',
    items: ['FastAPI', 'Pydantic', 'Alembic', 'REST API', '.NET / C#'],
  },
  { id: 'data', items: ['PostgreSQL', 'Supabase', 'Redis'] },
  {
    id: 'infra',
    items: ['Git', 'GitHub Actions', 'pytest', 'Linux', 'Yandex Cloud'],
  },
  { id: 'mobile', items: ['Flutter', 'Dart'] },
  { id: 'frontend', items: ['React', 'HTML5', 'CSS3'] },
  {
    id: 'ai',
    items: ['OpenAI API', 'LangChain', 'TensorFlow', 'Prompt engineering', 'Computer vision'],
  },
  { id: 'familiar', items: ['Docker', 'Nginx', 'Kotlin', 'C++', 'Embedded'] },
];

export const certifications = [
  { id: 'yandex', date: '11.2025' },
  { id: 'vk', date: '2025' },
  { id: 'htmlAcademy', date: '2024' },
];

/** Order on the CV: native first. The level itself is written out. */
export const spokenLanguages = [{ id: 'turkish' }, { id: 'russian' }, { id: 'english' }];

export const socials = [
  { id: 'email', href: `mailto:${profile.email}`, value: profile.email },
  { id: 'telegram', href: profile.telegram, value: profile.telegramHandle },
  { id: 'github', href: profile.github, value: profile.githubHandle },
  { id: 'linkedin', href: profile.linkedin, value: profile.linkedinHandle },
];
