import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useT } from '../i18n';

/**
 * Opening curtain: a counter races to 100 while the name types itself in,
 * then the panel splits and lifts away to reveal the hero.
 */
export function Preloader({ onDone }) {
  const t = useT();
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  const letters = useMemo(() => Array.from(t.name.full), [t]);

  useEffect(() => {
    if (prefersReduced) {
      setOpen(false);
      onDone?.();
      return undefined;
    }

    let raf = 0;
    let settle = 0;
    let done = false;
    const start = performance.now();
    const total = 1750;

    const finish = () => {
      if (done) return;
      done = true;
      setCount(100);
      setOpen(false);
      onDone?.();
    };

    const tick = (now) => {
      const t = Math.min(1, (now - start) / total);
      // Ease-out so the last digits slow down and feel deliberate.
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        settle = window.setTimeout(finish, 320);
      }
    };

    raf = requestAnimationFrame(tick);
    // Safety net: rAF is paused in background tabs, so a timer guarantees
    // the curtain always lifts even if the page loads unfocused.
    const guard = window.setTimeout(finish, total + 1400);
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearTimeout(guard);
      document.body.style.overflow = '';
    };
  }, [prefersReduced, onDone]);

  useEffect(() => {
    if (!open) document.body.style.overflow = '';
  }, [open]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex items-end justify-center overflow-hidden bg-bg"
          exit={{ opacity: 1 }}
        >
          {/* Split curtains */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-bg"
            exit={{ y: '-100%' }}
            transition={{ duration: 1.05, ease: [0.85, 0, 0.15, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
            exit={{ y: '100%' }}
            transition={{ duration: 1.05, ease: [0.85, 0, 0.15, 1] }}
          />

          {/* Ambient glow behind the loader */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, var(--glow-a), transparent 65%)' }}
          />

          <motion.div
            className="relative z-10 flex w-full flex-col items-center gap-10 pb-[12vh]"
            exit={{ opacity: 0, y: -30, filter: 'blur(12px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden">
              <motion.h1
                className="flex text-[clamp(2rem,8vw,5.5rem)] font-semibold tracking-[-0.05em]"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } } }}
              >
                {letters.map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      show: {
                        y: '0%',
                        opacity: 1,
                        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className={char === ' ' ? 'w-[0.28em]' : ''}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <div className="flex w-full max-w-md flex-col gap-3 px-6">
              <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {t.role}
                </motion.span>
                <span className="tabular text-fg">{String(count).padStart(3, '0')}</span>
              </div>

              <div className="h-px w-full overflow-hidden bg-line">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
                  style={{ scaleX: count / 100 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
