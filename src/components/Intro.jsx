import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

/** Matches the layer's delay plus its dissolve in index.css, plus a beat. */
const TOTAL_MS = 1900;

/**
 * The opening: the site's own address tracks into place, holds, and the
 * layer dissolves over the page already sitting underneath it.
 *
 * Everything is CSS — this component only takes the layer out of the
 * document when it is over, so nothing invisible is left on top of the
 * page. Under reduced motion the word fades instead of tracking in (see
 * index.css), so the opening is never simply missing.
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
      <p className="intro-word">{profile.site}</p>
    </div>
  );
}
