import { useEffect, useState } from 'react';

/**
 * Tracks which section currently owns the viewport, for navbar highlighting.
 * Uses a band across the upper-middle of the screen so a section becomes
 * "active" as it settles into reading position rather than the instant it
 * peeks in from the bottom.
 */
export function useActiveSection(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let best = null;
        let bestRatio = 0;
        ids.forEach((id) => {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (best) setActive(best);
        else if (window.scrollY < 120) setActive(ids[0]);
      },
      { rootMargin, threshold: [0, 0.05, 0.25, 0.5, 0.75, 1] }
    );

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
