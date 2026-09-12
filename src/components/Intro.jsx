import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

const SLATS = 6;
/** Matches the last slat's delay plus its duration in index.css. */
const TOTAL_MS = 2250;

/**
 * The opening: the site's own address arrives letter by letter, leaves the
 * same way, and six slats lift the curtain off the page.
 *
 * Everything is CSS — this component only takes the layer out of the
 * document when it is over, so nothing invisible is left sitting on top of
 * the page. Under reduced motion the same beats play on opacity alone
 * (see index.css), so the opening is never simply missing.
 */
export function Intro() {
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return undefined;

    document.documentElement.classList.add('intro-locked');
    const timer = window.setTimeout(() => setPlaying(false), TOTAL_MS);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove('intro-locked');
    };
  }, [playing]);

  if (!playing) return null;

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-slats">
        {Array.from({ length: SLATS }, (_, index) => (
          <span key={index} className="intro-slat" style={{ '--j': index }} />
        ))}
      </div>

      <p className="intro-word">
        {Array.from(profile.site, (char, index) => (
          <span key={index} className="intro-char" style={{ '--i': index }}>
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}
