import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import en from './locales/en';
import tr from './locales/tr';
import ru from './locales/ru';

const DICTIONARIES = { en, tr, ru };

/** Order shown in the switcher. Native names, never flags — flags are countries. */
export const LANGUAGES = [
  { code: 'en', short: 'EN', native: 'English', english: 'English' },
  { code: 'tr', short: 'TR', native: 'Türkçe', english: 'Turkish' },
  { code: 'ru', short: 'RU', native: 'Русский', english: 'Russian' },
];

export const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'yk-lang';

/** Milliseconds the copy fades out before it is swapped, and back in after. */
export const SWITCH_FADE_MS = 190;

function isSupported(code) {
  return Object.prototype.hasOwnProperty.call(DICTIONARIES, code);
}

/** Stored choice wins; otherwise fall back to the browser's preference. */
function detectLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isSupported(stored)) return stored;
  } catch {
    /* storage can be blocked — fall through to detection */
  }

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of candidates) {
    if (!tag) continue;
    const base = String(tag).toLowerCase().split('-')[0];
    if (isSupported(base)) return base;
  }

  return DEFAULT_LANGUAGE;
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(detectLanguage);
  const [fading, setFading] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const t = DICTIONARIES[language] ?? DICTIONARIES[DEFAULT_LANGUAGE];

  // Keep the document in sync: <html lang>, <title> and the meta description
  // all have to follow the active language for SEO and screen readers.
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', t.meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.meta.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', t.meta.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', t.htmlLang);

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore write failures */
    }
  }, [language, t]);

  /**
   * Swaps the language behind a short cross-fade so the copy never snaps.
   * Nothing remounts and the scroll position is untouched.
   */
  const setLanguage = useCallback(
    (next) => {
      if (!isSupported(next) || next === language) return;

      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        setLanguageState(next);
        return;
      }

      clearTimers();
      setFading(true);
      timers.current.push(
        window.setTimeout(() => {
          setLanguageState(next);
          setFading(false);
        }, SWITCH_FADE_MS)
      );
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, fading, languages: LANGUAGES }),
    [language, setLanguage, t, fading]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>');
  return context;
}

/** Shorthand for components that only need the dictionary. */
export function useT() {
  return useI18n().t;
}
