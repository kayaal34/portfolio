import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'yk-theme';

function readInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* localStorage can be blocked — fall through to the default. */
  }
  // Dark is the intended default, regardless of the OS preference.
  return 'dark';
}

/**
 * Theme state kept in sync with the `dark` class on <html>.
 * The initial class is applied by an inline script in index.html so there
 * is never a flash of the wrong theme before React mounts.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore write failures (private mode, disabled storage) */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' };
}
