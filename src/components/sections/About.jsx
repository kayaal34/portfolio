import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GraduationCap, Languages as LanguagesIcon, Dumbbell, Quote } from 'lucide-react';
import { educationEntries, languageLevels } from '../../data/profile';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../Reveal';
import { SpotlightCard } from '../SpotlightCard';

/** One word of the scroll-illuminated paragraph. */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <span className="absolute inset-0 opacity-[0.14]" aria-hidden="true">
        {children}
      </span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/**
 * Paragraph that lights up word by word as it crosses the viewport —
 * the reader's eye and the animation move at the same pace.
 */
function ScrollHighlight({ text, className = '' }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.28'],
  });

  const words = text.split(' ');

  if (prefersReduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

/** Animated proficiency meter for one language. */
function LanguageRow({ name, level, value, index }) {
  const prefersReduced = useReducedMotion();

  return (
    <li className="group">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] font-medium tracking-tight text-fg">{name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          {level}
        </span>
      </div>
      <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
          initial={prefersReduced ? undefined : { scaleX: 0 }}
          whileInView={prefersReduced ? undefined : { scaleX: value / 100 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.35, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </li>
  );
}

export function About() {
  const t = useT();

  return (
    <section id="about" className="relative scroll-mt-28 py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          accent={t.about.accent}
        />

        {/* Illuminating summary */}
        <div className="mt-16 lg:mt-20">
          <ScrollHighlight
            key={t.code}
            text={t.about.summary}
            className="max-w-4xl text-[clamp(1.35rem,3.1vw,2.35rem)] font-medium leading-[1.32] tracking-[-0.03em] text-fg"
          />

          <Reveal delay={0.1} className="mt-8 max-w-2xl">
            <p className="text-[15px] leading-[1.75] text-muted sm:text-base">
              {t.about.summaryTail}
            </p>
          </Reveal>
        </div>

        {/* Detail grid */}
        <div className="mt-20 grid gap-6 lg:mt-24 lg:grid-cols-12">
          {/* Education */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-accent" strokeWidth={1.7} />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                  {t.about.educationLabel}
                </h3>
              </div>
            </Reveal>

            <RevealGroup className="flex flex-col gap-3">
              {educationEntries.map((entry) => {
                const copy = t.about.education[entry.key];
                return (
                  <RevealItem key={entry.key}>
                    <SpotlightCard
                      className={`glass rounded-2xl p-5 transition-colors duration-500 sm:p-6 ${
                        entry.current ? 'border-accent/30' : ''
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                        <div className="min-w-0">
                          {entry.current && (
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
                                <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                              </span>
                              {t.about.inProgress}
                            </span>
                          )}
                          <h4 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-fg sm:text-lg">
                            {copy.degree}
                          </h4>
                          <p className="mt-1.5 text-sm text-muted">
                            {copy.school}
                            <span className="text-faint"> · {copy.place}</span>
                          </p>
                        </div>
                        <span
                          className={`tabular shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10.5px] tracking-[0.1em] ${
                            entry.current
                              ? 'border-accent/30 text-accent'
                              : 'border-line text-faint'
                          }`}
                        >
                          {entry.period}
                        </span>
                      </div>

                      {copy.notes.length > 0 && (
                        <ul className="mt-4 space-y-2 border-t border-line pt-4">
                          {copy.notes.map((note) => (
                            <li
                              key={note}
                              className="flex gap-2.5 text-[13.5px] leading-relaxed text-fg-soft"
                            >
                              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </SpotlightCard>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          {/* Languages + traits */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal direction="left" delay={0.05}>
              <SpotlightCard className="glass h-full rounded-2xl p-6">
                <div className="mb-6 flex items-center gap-3">
                  <LanguagesIcon className="h-4 w-4 text-accent" strokeWidth={1.7} />
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                    {t.about.languagesLabel}
                  </h3>
                </div>
                <ul className="space-y-5">
                  {languageLevels.map((item, i) => (
                    <LanguageRow
                      key={item.key}
                      name={t.about.languages[item.key].name}
                      level={t.about.languages[item.key].level}
                      value={item.value}
                      index={i}
                    />
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>

            <Reveal direction="left" delay={0.12}>
              <SpotlightCard className="glass rounded-2xl p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Quote className="h-4 w-4 text-accent" strokeWidth={1.7} />
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                    {t.about.howIWorkLabel}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {t.about.softSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] tracking-tight text-fg-soft transition-colors duration-400 hover:border-accent/50 hover:text-fg"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>

            <Reveal direction="left" delay={0.18}>
              <div className="glass flex items-center gap-3 rounded-2xl px-6 py-5">
                <Dumbbell className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.7} />
                <p className="text-[13.5px] leading-snug text-fg-soft">{t.about.interests}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
