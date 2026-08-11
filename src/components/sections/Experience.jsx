import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Award, Briefcase } from 'lucide-react';
import { experienceEntries, certifications } from '../../data/profile';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../Reveal';
import { SpotlightCard } from '../SpotlightCard';

/** "VK" -> "VK", "Sky Education" -> "SE". Decorative only. */
function initials(company) {
  const words = company.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** One node on the timeline. */
function TimelineEntry({ entry, copy, index }) {
  const prefersReduced = useReducedMotion();

  return (
    <li className="relative pl-12 sm:pl-20">
      {/* Node */}
      <motion.span
        aria-hidden="true"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-2 grid h-8 w-8 place-items-center sm:left-4"
      >
        <span className="absolute inset-0 rounded-full bg-accent/25 animate-pulse-ring" />
        <span className="relative grid h-8 w-8 place-items-center rounded-full border border-line bg-elev">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-accent-2" />
        </span>
      </motion.span>

      <Reveal direction="up" delay={0.06} amount={0.2}>
        <SpotlightCard className="glass rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {copy.kind}
                </span>
                <span className="tabular font-mono text-[11px] tracking-[0.08em] text-faint">
                  {entry.period}
                </span>
              </div>

              <h3 className="mt-4 text-[clamp(1.3rem,2.6vw,1.85rem)] font-semibold leading-tight tracking-[-0.03em] text-fg">
                {copy.role}
              </h3>
              <p className="mt-2 text-sm text-muted">{copy.meta}</p>
            </div>

            {/* Company mark */}
            <span
              aria-hidden="true"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface-strong"
            >
              <span className="text-sm font-semibold tracking-[-0.02em] text-fg-soft">
                {initials(entry.company)}
              </span>
            </span>
          </div>

          <ul className="mt-7 space-y-4 border-t border-line pt-7">
            {copy.bullets.map((bullet, i) => (
              <motion.li
                key={bullet}
                initial={prefersReduced ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex gap-3.5 text-[14px] leading-[1.7] text-fg-soft sm:text-[14.5px]"
              >
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong transition-colors duration-500 group-hover:bg-accent" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap gap-2">
            {copy.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors duration-500 hover:border-accent/40 hover:text-accent"
              >
                {tag}
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] tracking-[0.2em] text-faint"
          >
            0{index + 1}
          </span>
        </SpotlightCard>
      </Reveal>
    </li>
  );
}

/** Certifications rail — rendered inside the Experience section. */
function Certifications({ label, copy }) {
  return (
    <div className="mt-24 sm:mt-32">
      <Reveal>
        <div className="mb-8 flex items-center gap-3">
          <Award className="h-4 w-4 text-accent" strokeWidth={1.7} />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">{label}</h3>
          <span className="hairline flex-1" />
        </div>
      </Reveal>

      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {certifications.map((cert) => (
          <RevealItem key={cert.key}>
            <SpotlightCard className="glass group flex h-full flex-col justify-between rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[14.5px] font-medium leading-snug tracking-[-0.01em] text-fg">
                  {copy[cert.key].name}
                </p>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  strokeWidth={1.6}
                />
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-[12.5px] text-muted">{copy[cert.key].issuer}</span>
                <span className="tabular font-mono text-[10px] tracking-[0.12em] text-faint">
                  {cert.date}
                </span>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export function Experience() {
  const t = useT();
  const trackRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.75', 'end 0.65'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="experience" className="relative scroll-mt-28 py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          accent={t.experience.accent}
          lead={t.experience.lead}
        />

        <div ref={trackRef} className="relative mt-16 lg:mt-20">
          {/* Rail */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-2 bottom-2 w-px bg-line sm:left-8"
          />
          <motion.span
            aria-hidden="true"
            style={prefersReduced ? undefined : { scaleY }}
            className="absolute left-4 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-8"
          />

          <ul className="flex flex-col gap-6">
            {experienceEntries.map((entry, i) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                copy={t.experience.entries[entry.id]}
                index={i}
              />
            ))}
          </ul>

          {/* Rail terminus */}
          <div className="relative mt-6 pl-12 sm:pl-20">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 grid h-8 w-8 place-items-center sm:left-4"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-dashed border-line bg-elev">
                <Briefcase className="h-3.5 w-3.5 text-faint" strokeWidth={1.6} />
              </span>
            </span>
            <p className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
              {t.experience.next}
            </p>
          </div>
        </div>

        <Certifications
          label={t.experience.certificationsLabel}
          copy={t.experience.certifications}
        />
      </div>
    </section>
  );
}
