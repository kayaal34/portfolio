import {
  ArrowUpRight,
  BrainCircuit,
  ChartLine,
  Compass,
  CreditCard,
  Github,
  Lightbulb,
  Server,
} from 'lucide-react';
import { projects, profile } from '../../data/profile';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../Reveal';
import { TiltCard } from '../TiltCard';
import { MagneticButton } from '../MagneticButton';

const ICONS = { BrainCircuit, ChartLine, Compass, CreditCard, Lightbulb, Server };

/** Small outbound chip — source, store listing, anything public. */
function LinkChip({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(event) => event.stopPropagation()}
      className="group/chip inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors duration-400 hover:border-accent/50 hover:text-accent sm:min-h-0 sm:px-3 sm:py-1.5"
    >
      {children}
      <ArrowUpRight
        className="h-3 w-3 transition-transform duration-400 group-hover/chip:-translate-y-0.5 group-hover/chip:translate-x-0.5"
        strokeWidth={1.9}
      />
    </a>
  );
}

function ProjectCard({ project, copy, repoLabel }) {
  const Icon = ICONS[project.icon] ?? Server;

  return (
    <RevealItem className="h-full">
      <TiltCard intensity={9} scale={1.012} className="h-full">
        <article className="spotlight ring-gradient glass group relative isolate flex h-full flex-col overflow-hidden rounded-3xl p-7 shadow-card sm:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/18"
          />

          <header
            className="relative flex items-start justify-between gap-4"
            style={{ transform: 'translateZ(34px)' }}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface-strong transition-colors duration-500 group-hover:border-accent/45">
              <Icon
                className="h-5 w-5 text-fg-soft transition-colors duration-500 group-hover:text-accent"
                strokeWidth={1.55}
              />
            </span>
            <span className="tabular font-mono text-[11px] tracking-[0.16em] text-faint">
              {project.index}
            </span>
          </header>

          <div className="relative mt-8 flex-1" style={{ transform: 'translateZ(20px)' }}>
            <h3 className="text-[clamp(1.2rem,2.2vw,1.5rem)] font-normal leading-[1.2] tracking-[-0.025em] text-fg">
              {project.name}
            </h3>

            <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
              {copy.role}
            </p>

            {copy.highlight && (
              <p className="mt-4 inline-flex rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-[11px] tracking-tight text-accent">
                {copy.highlight}
              </p>
            )}

            <p className="mt-5 text-[14px] font-light leading-[1.75] text-muted">
              {copy.description}
            </p>
          </div>

          <footer
            className="relative mt-8 border-t border-line pt-6"
            style={{ transform: 'translateZ(12px)' }}
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

            {(project.repo || project.store) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.store && <LinkChip href={project.store}>Google Play</LinkChip>}
                {project.repo && <LinkChip href={project.repo}>{repoLabel}</LinkChip>}
              </div>
            )}
          </footer>
        </article>
      </TiltCard>
    </RevealItem>
  );
}

export function Projects() {
  const t = useT();

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

        {/* No category filter: with five projects it filtered nothing and
            read as scaffolding for a list that was not there. */}
        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2" stagger={0.08}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              copy={t.projects.entries[project.id]}
              repoLabel={t.projects.repoLabel}
            />
          ))}
        </RevealGroup>

        {/* GitHub call-out */}
        <Reveal delay={0.08} className="mt-14">
          <div className="glass relative overflow-hidden rounded-3xl px-7 py-9 sm:px-10 sm:py-11">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--glow-a), transparent 70%)' }}
            />
            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <p className="max-w-xl text-[15px] font-light leading-[1.7] text-fg-soft sm:text-base">
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
