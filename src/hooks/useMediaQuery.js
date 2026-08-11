import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query. Returns false during SSR / first paint
 * so components can render a safe, motion-free baseline.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const list = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);

    setMatches(list.matches);

    if (list.addEventListener) {
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    }
    // Safari < 14
    list.addListener(onChange);
    return () => list.removeListener(onChange);
  }, [query]);

  return matches;
}

/** True only on devices with a real, hoverable pointer (desktop mice). */
export function useHasFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
