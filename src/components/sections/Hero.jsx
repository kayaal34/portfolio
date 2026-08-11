import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { heroStats, profile } from '../../data/profile';
import { useT } from '../../i18n';
import { MagneticButton } from '../MagneticButton';
import { TiltCard } from '../TiltCard';
import { scrollToSection } from '../../hooks/useSmoothScroll';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Every entrance in the hero is gated on `play`, which flips as the
 * preloader lifts — so the sequence starts exactly when it becomes visible
 * instead of racing behind the curtain.
 */
const fadeVariants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, delay, ease: EASE },
  }),
};

/** Letter-by-letter mask reveal used for the two headline lines. */
function AnimatedLine({ text, delay = 0, play }) {
  const prefersReduced = useReducedMotion();
  // Defensive: a missing translation key must never take the page down.
  const chars = Array.from(text ?? '');

  if (prefersReduced || chars.length === 0) {
    return <span>{text ?? ''}</span>;
  }

  return (
    <>
      {/* Real, uninterrupted text for assistive tech and copy/paste. */}
      <span className="sr-only">{text}</span>
      <motion.span
        key={text}
        aria-hidden="true"
        className="inline-flex overflow-hidden pb-[0.08em]"
        initial="hidden"
        animate={play ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: delay } } }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '108%', opacity: 0 },
              show: {
                y: '0%',
                opacity: 1,
                transition: { duration: 1.05, ease: EASE },
              },
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.span>
    </>
  );
}

/**
 * Cycling discipline label inside the sub-headline.
 *
 * An invisible sizer holding the longest word reserves the width, so the
 * sentence never reflows — and it adapts automatically when the language
 * changes and the words get longer or shorter.
 */
function RotatingWord({ words, interval = 2400 }) {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  const longest = useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), words[0] ?? ''),
    [words]
  );

  // Restart from the first word whenever the language changes.
  useEffect(() => {
    setIndex(0);
  }, [words]);

  useEffect(() => {
    if (prefersReduced) return undefined;
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words, interval, prefersReduced]);

  if (prefersReduced) {
    return <span className="text-gradient-accent font-semibold">{words[0]}</span>;
  }

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 whitespace-nowrap font-semibold"
      >
        {longest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '115%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-115%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-gradient-accent col-start-1 row-start-1 whitespace-nowrap font-semibold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Syntax-tinted snippet card — every value in it comes from the CV. */
function CodeCard({ comment }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl shadow-card">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-[11px] text-faint">engineer.py</span>
      </div>

      <pre className="overflow-x-auto px-4 py-5 font-mono text-[11.5px] leading-[1.85] sm:text-xs">
        <code>
          <span className="text-accent-2">from</span>
          <span className="text-fg-soft"> urfu </span>
          <span className="text-accent-2">import</span>
          <span className="text-fg-soft"> SoftwareEngineering, EmbeddedSystems</span>
          {'\n'}
          <span className="text-accent-2">from</span>
          <span className="text-fg-soft"> itmo </span>
          <span className="text-accent-2">import</span>
          <span className="text-fg-soft"> ArtificialIntelligence</span>
          {'\n\n'}
          <span className="text-accent-2">class</span>
          <span className="text-accent"> YahyaKayaal</span>
          <span className="text-fg-soft">(</span>
          {'\n'}
          <span className="text-fg-soft">
            {'        '}SoftwareEngineering, EmbeddedSystems, ArtificialIntelligence
          </span>
          {'\n'}
          <span className="text-fg-soft">):</span>
          {'\n'}
          <span className="text-fg-soft">{'    '}stack </span>
          <span className="text-faint">=</span>
          <span className="text-fg-soft"> [</span>
          <span className="text-accent-3">&quot;FastAPI&quot;</span>
          <span className="text-fg-soft">, </span>
          <span className="text-accent-3">&quot;Flutter&quot;</span>
          <span className="text-fg-soft">, </span>
          <span className="text-accent-3">&quot;PostgreSQL&quot;</span>
          <span className="text-fg-soft">]</span>
          {'\n'}
          <span className="text-fg-soft">{'    '}trained_at </span>
          <span className="text-faint">=</span>
          <span className="text-fg-soft"> [</span>
          <span className="text-accent-3">&quot;VK&quot;</span>
          <span className="text-fg-soft">, </span>
          <span className="text-accent-3">&quot;Yandex&quot;</span>
          <span className="text-fg-soft">]</span>
          {'\n'}
          <span className="text-fg-soft">{'    '}speaks </span>
          <span className="text-faint">=</span>
          <span className="text-fg-soft"> [</span>
          <span className="text-accent-3">&quot;tr&quot;</span>
          <span className="text-fg-soft">, </span>
          <span className="text-accent-3">&quot;ru&quot;</span>
          <span className="text-fg-soft">, </span>
          <span className="text-accent-3">&quot;en&quot;</span>
          <span className="text-fg-soft">]</span>
          {'\n\n'}
          <span className="text-fg-soft">{'    '}</span>
          <span className="text-accent-2">def</span>
          <span className="text-accent"> solve</span>
          <span className="text-fg-soft">(self, challenge):</span>
          {'\n'}
          <span className="text-faint">
            {'        '}
            {comment}
          </span>
          {'\n'}
          <span className="text-fg-soft">{'        '}</span>
          <span className="text-accent-2">while</span>
          <span className="text-fg-soft"> challenge.unsolved:</span>
          {'\n'}
          <span className="text-fg-soft">{'            '}self.learn()</span>
          {'\n'}
          <span className="text-fg-soft">{'        '}</span>
          <span className="text-accent-2">return</span>
          <span className="text-fg-soft"> ship(challenge)</span>
        </code>
      </pre>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent/12 to-transparent"
      />
    </div>
  );
}

export function Hero({ lenisRef, ready }) {
  const t = useT();
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Gentle depth: the hero settles back as the page moves on.
  const y = useTransform(scrollYProgress, [0, 0.16], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.13], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.16], [1, 0.965]);

  const play = ready || prefersReduced;

  const fade = (delay) =>
    prefersReduced
      ? {}
      : {
          variants: fadeVariants,
          custom: delay,
          initial: 'hidden',
          animate: play ? 'show' : 'hidden',
        };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      <motion.div
        style={prefersReduced ? undefined : { y, opacity, scale }}
        className="shell relative w-full"
      >
        {/* Availability */}
        <motion.div {...fade(0.1)} className="mb-8 flex flex-wrap items-center gap-3">
          <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-fg-soft">
              {t.hero.available}
            </span>
          </span>

          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.7} />
            {t.location}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-[clamp(3.1rem,13.5vw,11rem)] font-semibold leading-[0.82] tracking-[-0.055em]">
          <span className="block">
            <AnimatedLine text={t.name.lineOne} delay={0.15} play={play} />
          </span>
          <span className="block text-gradient">
            <AnimatedLine text={t.name.lineTwo} delay={0.32} play={play} />
          </span>
        </h1>

        {/* Sub-headline, CTAs, stats and code card */}
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              {...fade(0.72)}
              className="max-w-xl text-[clamp(1.15rem,2.2vw,1.6rem)] leading-[1.35] tracking-[-0.02em] text-fg-soft"
            >
              {t.hero.leadBefore}
              <RotatingWord words={t.hero.rotating} />
              {t.hero.leadAfter}
            </motion.p>

            <motion.div {...fade(0.86)} className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton
                type="button"
                onClick={() => scrollToSection('projects', lenisRef?.current)}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-3.5 text-sm font-medium tracking-tight text-bg"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                <span className="relative">{t.hero.ctaPrimary}</span>
                <ArrowDown
                  className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5"
                  strokeWidth={1.8}
                />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`mailto:${profile.email}`}
                strength={0.25}
                className="spotlight ring-gradient glass group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-tight text-fg"
              >
                <span className="relative">{t.hero.ctaSecondary}</span>
                <ArrowUpRight
                  className="relative h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.dl
              {...fade(1)}
              className="mt-14 grid max-w-xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
            >
              {heroStats.map((stat) => (
                // column-reverse keeps <dt> before <dd> in the DOM while the
                // number reads above its label.
                <div key={stat.key} className="flex flex-col-reverse border-l border-line pl-4">
                  <dt className="mt-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-faint">
                    {t.hero.stats[stat.key]}
                  </dt>
                  <dd className="tabular text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-[1.75rem]">
                    {stat.value}
                    <span className="text-accent">{stat.suffix}</span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div {...fade(1.1)} className="hidden lg:col-span-5 lg:block">
            <TiltCard intensity={9} scale={1.015} className="h-full">
              <CodeCard comment={t.hero.codeComment} />
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('about', lenisRef?.current)}
        initial={{ opacity: 0 }}
        animate={{ opacity: play ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-label={t.a11y.scrollToAbout}
      >
        <span className="font-mono text-[9.5px] uppercase tracking-[0.34em] text-faint transition-colors group-hover:text-fg">
          {t.hero.scroll}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-accent to-transparent"
            animate={prefersReduced ? undefined : { y: ['-100%', '260%'] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>

      <Sparkles
        aria-hidden="true"
        className="absolute right-6 top-28 hidden h-4 w-4 text-accent/50 lg:block"
        strokeWidth={1.4}
      />
    </section>
  );
}
