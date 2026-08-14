import { useRef } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useT } from '../../i18n';
import { useMotionLevel } from '../../hooks/useMotionLevel';
import { Link } from 'react-router-dom';
import { contactPath } from '../../data/profile';
import { scrollToSection } from '../../hooks/useSmoothScroll';

const EASE = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ *
 * Entrance: each letter rises out of a mask.
 * ------------------------------------------------------------------ */
const charRise = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1.15, ease: EASE } },
};

/**
 * One letter of the name.
 *
 * Two nested layers, on purpose: the outer one is driven by scroll
 * (dissolve), the inner one by the entrance variant (mask reveal). Keeping
 * them apart means the two animations never fight over `y`.
 *
 * Each letter gets its own slice of the scroll range, so the name comes
 * apart as a left-to-right wave instead of fading out as one flat block.
 */
function DissolveChar({ char, index, total, progress }) {
  const start = (index / Math.max(total, 1)) * 0.34;
  const end = start + 0.4;

  const opacity = useTransform(progress, [start, end], [1, 0]);
  const y = useTransform(progress, [start, end], [0, -60]);
  const blurPx = useTransform(progress, [start, end], [0, 12]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  if (char === ' ') {
    return <span className="inline-block w-[0.26em]" aria-hidden="true" />;
  }

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity, y, filter }}
      className="inline-block will-change-[transform,opacity,filter]"
    >
      {/* Mask. The padding keeps descenders (y, ğ, у) from being clipped. */}
      <span className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em]">
        <motion.span variants={charRise} className="inline-block">
          {char}
        </motion.span>
      </span>
    </motion.span>
  );
}

/** Quiet text link with an underline that redraws on hover. */
function QuietLink({ children, onClick, href, to }) {
  const Tag = to ? Link : href ? 'a' : 'button';
  return (
    <Tag
      to={to}
      href={href}
      onClick={onClick}
      type={to || href ? undefined : 'button'}
      className="group relative inline-block py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-soft transition-colors duration-500 hover:text-fg sm:py-2 sm:text-[10.5px]"
    >
      {children}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-2.5 h-px bg-line sm:bottom-1" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-2.5 h-px origin-right scale-x-0 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 sm:bottom-1"
      />
    </Tag>
  );
}

export function Hero({ lenisRef, ready }) {
  const t = useT();
  const level = useMotionLevel();
  const gentle = level === 'gentle';
  const sectionRef = useRef(null);

  // 0 while the hero fills the viewport, 1 once it has scrolled fully past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const letters = Array.from(t.name.full);
  const play = ready;

  // Everything under the name leaves together, a beat after the letters.
  const tailOpacity = useTransform(scrollYProgress, [0, 0.34], [1, 0]);
  const tailY = useTransform(scrollYProgress, [0, 0.34], [0, -34]);

  const fade = (delay) =>
    gentle
      ? {
          initial: { opacity: 0 },
          animate: play ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.7, delay: delay * 0.5, ease: 'easeOut' },
        }
      : {
          initial: { opacity: 0, y: 14 },
          animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-32 lg:px-40"
    >
      {/* The stage. Pure black in dark mode, dissolving into the page below
          so the section boundary is never a hard edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black opacity-0 transition-opacity duration-700 dark:opacity-100"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 68%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 68%, transparent)',
        }}
      />

      <div className="relative flex w-full max-w-5xl flex-col items-center text-center">
        {/* The name */}
        <motion.h1
          className="font-serif text-[clamp(2.75rem,11vw,8.5rem)] font-normal leading-[1] tracking-[-0.03em] text-fg"
          initial="hidden"
          animate={play ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}
        >
          {/* Uninterrupted text for assistive tech, search engines and copy/paste. */}
          <span className="sr-only">{t.name.full}</span>

          {gentle ? (
            <span aria-hidden="true">{t.name.full}</span>
          ) : (
            letters.map((char, i) => (
              <DissolveChar
                key={`${char}-${i}`}
                char={char}
                index={i}
                total={letters.length}
                progress={scrollYProgress}
              />
            ))
          )}
        </motion.h1>

        {/* Title, directly beneath the name */}
        <motion.div
          style={gentle ? undefined : { opacity: tailOpacity, y: tailY }}
          className="flex flex-col items-center"
        >
          <motion.p
            {...fade(0.3)}
            className="mt-8 font-mono text-[clamp(0.6rem,1.6vw,0.78rem)] uppercase tracking-[0.42em] text-muted sm:mt-10"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-12 h-px w-14 bg-line-strong" />

          <motion.div {...fade(0.55)} className="mt-10 flex items-center gap-8 sm:mt-12 sm:gap-10">
            <QuietLink onClick={() => scrollToSection('projects', lenisRef?.current)}>
              {t.hero.ctaPrimary}
            </QuietLink>
            <QuietLink to={contactPath}>{t.hero.ctaSecondary}</QuietLink>
          </motion.div>

          {/* Location and availability, centred under the links. They used to
              sit in the bottom corners; the side rail and the theme/language
              controls own those corners now. */}
          <motion.p
            {...fade(0.68)}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[9.5px] uppercase tracking-[0.28em] text-faint"
          >
            <span>{t.location}</span>
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        {...fade(0.82)}
        type="button"
        onClick={() => scrollToSection('about', lenisRef?.current)}
        aria-label={t.a11y.scrollToAbout}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-faint">
          {t.hero.scroll}
        </span>
        {/* A light travels down the line, once every few seconds. */}
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-fg-soft to-transparent"
            initial={{ y: '-100%' }}
            animate={gentle ? undefined : { y: ['-100%', '260%'] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.6,
            }}
          />
        </span>
      </motion.button>
    </section>
  );
}
