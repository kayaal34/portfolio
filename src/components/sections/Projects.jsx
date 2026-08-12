import { forwardRef, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  ChartLine,
  Compass,
  CreditCard,
  Github,
  Glasses,
  Lightbulb,
  MessageSquareText,
  Server,
} from 'lucide-react';
import { projects, projectCategories, profile } from '../../data/profile';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { TiltCard } from '../TiltCard';
import { MagneticButton } from '../MagneticButton';

const ICONS = {
  BrainCircuit,
  ChartLine,
  Compass,
  CreditCard,
  Glasses,
  Lightbulb,
  MessageSquareText,
  Server,
};

/** Forwards its ref so AnimatePresence's popLayout mode can measure the card. */
const ProjectCard = forwardRef(function ProjectCard({ project, copy, categoryLabel }, ref) {
  const Icon = ICONS[project.icon] ?? Server;
  const prefersReduced = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 40, scale: 0.96, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={prefersReduced ? undefined : { opacity: 0, y: -20, scale: 0.96, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard intensity={10} scale={1.015} className="h-full" data-cursor="hover">
        <article className="spotlight ring-gradient glass group relative isolate flex h-full flex-col overflow-hidden rounded-3xl p-7 shadow-card sm:p-8">
          {/* Corner bloom */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/20"
          />

          <header
            className="relative flex items-start justify-between gap-4"
            style={{ transform: 'translateZ(38px)' }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface-strong transition-colors duration-500 group-hover:border-accent/45">
              <Icon
                className="h-5 w-5 text-fg-soft transition-colors duration-500 group-hover:text-accent"
                strokeWidth={1.55}
              />
            </span>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint transition-colors duration-500 group-hover:border-accent/40 group-hover:text-accent">
                {categoryLabel}
              </span>
              <span className="tabular font-mono text-[11px] tracking-[0.16em] text-faint">
                {project.index}
              </span>
            </div>
          </header>

          <div className="relative mt-8 flex-1" style={{ transform: 'translateZ(24px)' }}>
            <h3 className="text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-fg">
              {project.name}
            </h3>

            <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
              {copy.role}
            </p>

            <p className="mt-5 text-[14px] leading-[1.72] text-muted">{copy.description}</p>

            {copy.highlight && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-[11.5px] tracking-tight text-accent">
                {copy.highlight}
              </p>
            )}
          </div>

          <footer
            className="relative mt-8 border-t border-line pt-6"
            style={{ transform: 'translateZ(16px)' }}
          >
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[10px] tracking-[0.06em] text-fg-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </footer>

          {/* Sweep highlight on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        </article>
      </TiltCard>
    </motion.li>
  );
});

export function Projects() {
  const t = useT();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative scroll-mt-28 py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          accent={t.projects.accent}
          lead={t.projects.lead}
        />

        <Reveal delay={0.05} className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {projectCategories.map((category) => {
              const isActive = filter === category;
              const count =
                category === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;
              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => setFilter(category)}
                    aria-pressed={isActive}
                    className={`relative inline-flex items-center gap-2 min-h-11 rounded-full px-4 py-2.5 text-[13px] font-medium tracking-tight transition-colors duration-400 sm:min-h-0 sm:py-2 sm:text-[12.5px] ${
                      isActive ? 'text-bg' : 'border border-line text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-fg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {t.projects.categories[category]}
                    <span
                      className={`tabular text-[10px] ${isActive ? 'text-bg/60' : 'text-faint'}`}
                    >
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <motion.ul layout className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                copy={t.projects.entries[project.id]}
                categoryLabel={t.projects.categories[project.category]}
              />
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* GitHub call-out */}
        <Reveal delay={0.08} className="mt-14">
          <div className="glass relative overflow-hidden rounded-3xl px-7 py-9 sm:px-10 sm:py-11">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--glow-a), transparent 70%)' }}
            />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <p className="max-w-xl text-[15px] leading-[1.7] text-fg-soft sm:text-base">
                {t.projects.note}
              </p>

              <MagneticButton
                as="a"
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-fg px-6 py-3.5 text-sm font-medium tracking-tight text-bg"
              >
                <Github className="h-4 w-4" strokeWidth={1.7} />
                {profile.githubHandle}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
