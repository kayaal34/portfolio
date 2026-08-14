import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useT } from '../i18n';
import { useMotionLevel } from '../hooks/useMotionLevel';

const EASE = [0.16, 1, 0.3, 1];
/* Slow start, hard finish — the curtain should feel weighted. */
const CURTAIN_EASE = [0.76, 0, 0.24, 1];

const SLATS = 6;

/* Timing, in one place. Bump these to slow the whole sequence down. */
const IN_DELAY = 0.12; // s — before the first letter arrives
const IN_STAGGER = 0.015; // s — between letters coming in
const IN_DURATION = 0.5; // s
const OUT_STAGGER = 0.018; // s — between letters leaving
const OUT_DURATION = 0.42; // s
const HOLD_MS = 800; // ms from mount until letters start leaving
const LIFT_AFTER_OUT_MS = 140; // ms — curtain starts while the last letters go

/**
 * Opening sequence.
 *
 *   1. "Yahya Kayaal  Portfolio" arrives letter by letter, on black.
 *   2. The letters leave in the same order — a sweep, not a block fade.
 *   3. Six vertical slats lift away in sequence, revealing the page.
 *
 * With reduced motion the same three beats play, but nothing travels or
 * blurs: letters fade, and the curtain fades instead of sliding.
 *
 * `onDone` fires as the curtain starts to go, so the hero's own entrance
 * runs underneath it rather than after it — the two overlap by design.
 */
export function Preloader({ onDone }) {
  const t = useT();
  const level = useMotionLevel();
  const gentle = level === 'gentle';

  const [open, setOpen] = useState(true);
  const [phase, setPhase] = useState('in'); // 'in' → 'out'

  // One flat list so the sweep runs continuously across both words.
  const glyphs = useMemo(() => {
    const name = Array.from(t.name.full).map((char) => ({ char, tone: 'name' }));
    const word = Array.from(t.intro.word).map((char) => ({ char, tone: 'word' }));
    return [...name, { char: ' ', tone: 'gap' }, ...word];
  }, [t]);

  useEffect(() => {
    let outTimer = 0;
    let liftTimer = 0;
    let done = false;

    const lift = () => {
      if (done) return;
      done = true;
      setOpen(false);
      onDone?.();
    };

    // Reduced motion gets a shorter hold — the point is made faster.
    const hold = gentle ? 950 : HOLD_MS;
    const tail = gentle ? 420 : glyphs.length * OUT_STAGGER * 1000 + LIFT_AFTER_OUT_MS;

    outTimer = window.setTimeout(() => {
      setPhase('out');
      liftTimer = window.setTimeout(lift, tail);
    }, hold);

    // Absolute safety net: timers still run in background tabs where the
    // animation frames do not, so the curtain can never stay shut.
    const guard = window.setTimeout(lift, hold + 4000);

    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(liftTimer);
      window.clearTimeout(guard);
      document.body.style.overflow = '';
    };
  }, [gentle, onDone, glyphs.length]);

  useEffect(() => {
    if (!open) document.body.style.overflow = '';
  }, [open]);

  const glyphIn = (i) =>
    gentle
      ? { opacity: 1, transition: { duration: 0.5, delay: 0.1 + i * 0.008, ease: 'easeOut' } }
      : {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: IN_DURATION, delay: IN_DELAY + i * IN_STAGGER, ease: EASE },
        };

  const glyphOut = (i) =>
    gentle
      ? { opacity: 0, transition: { duration: 0.35, delay: i * 0.008, ease: 'easeOut' } }
      : {
          opacity: 0,
          y: -14,
          filter: 'blur(7px)',
          transition: { duration: OUT_DURATION, delay: i * OUT_STAGGER, ease: EASE },
        };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] overflow-hidden"
          /* Held at full opacity; the slats do the leaving, not a fade. */
          exit={gentle ? { opacity: 0, transition: { duration: 0.5 } } : { opacity: 1 }}
        >
          {/* The curtain */}
          <div aria-hidden="true" className="absolute inset-0 flex">
            {Array.from({ length: SLATS }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-bg dark:bg-black"
                exit={gentle ? undefined : { y: '-102%' }}
                transition={{ duration: 0.8, delay: i * 0.045, ease: CURTAIN_EASE }}
              />
            ))}
          </div>

          {/* The title card */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
          >
            <p
              className="flex flex-wrap items-baseline justify-center text-center text-[clamp(1.15rem,3.1vw,1.9rem)] font-extralight leading-tight tracking-[-0.01em]"
              aria-label={`${t.name.full} ${t.intro.word}`}
            >
              {glyphs.map((g, i) => {
                if (g.tone === 'gap') {
                  return <span key="gap" aria-hidden="true" className="inline-block w-[0.7em]" />;
                }
                if (g.char === ' ') {
                  return (
                    <span key={`sp-${i}`} aria-hidden="true" className="inline-block w-[0.28em]" />
                  );
                }
                return (
                  <motion.span
                    key={`${g.char}-${i}`}
                    aria-hidden="true"
                    className={`inline-block ${
                      g.tone === 'word' ? 'text-gradient-accent' : 'text-fg'
                    }`}
                    initial={gentle ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(6px)' }}
                    animate={phase === 'in' ? glyphIn(i) : glyphOut(i)}
                  >
                    {g.char}
                  </motion.span>
                );
              })}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
