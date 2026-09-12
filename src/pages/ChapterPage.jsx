import {
  chapterIds,
  chapterPath,
  contactPath,
  education,
  experience,
  projects,
} from '../data/profile';
import { useDocumentTitle, useI18n } from '../i18n';
import { TransitionLink } from '../components/TransitionLink';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Education } from '../sections/Education';
import { Skills } from '../sections/Skills';

const CONTENT = {
  experience: Experience,
  projects: Projects,
  education: Education,
  skills: Skills,
};

/** '09.2024 — 09.2025' → 2024. The earliest year any entry starts in. */
function firstYear(entries) {
  return Math.min(...entries.map((entry) => Number(entry.period.match(/\d{4}/)[0])));
}

/**
 * One chapter of the CV on its own screen.
 *
 * The heading shares its `view-transition-name` with the chapter's title on
 * the opening screen, so arriving from there the title grows into this
 * heading. It is kept out of <Reveal> for the same reason: the transition
 * captures the new page immediately, and a heading at opacity 0 would be
 * captured as nothing.
 *
 * At the foot, the neighbouring chapters — and after the last one, contact —
 * so a reader can go straight on without returning to the index.
 */
export function ChapterPage({ id }) {
  const { t } = useI18n();
  useDocumentTitle(`${t.sections[id]} — ${t.name.full}`);

  const Content = CONTENT[id];
  const index = chapterIds.indexOf(id);
  const previous = chapterIds[index - 1];
  const nextId = chapterIds[index + 1];
  const next = nextId
    ? { to: chapterPath(nextId), label: t.sections[nextId] }
    : { to: contactPath, label: t.nav.contact };

  const meta = {
    experience: `${firstYear(experience)} — ${t.present}`,
    projects: t.projects.count.replace('{n}', projects.length),
    education: `${firstYear(education)} — ${t.present}`,
    skills: null,
  }[id];

  return (
    <div className="shell pt-24 pb-16 md:pt-32 md:pb-24">
      <TransitionLink to="/" className="label transition-colors hover:text-ink">
        ← {t.chapter.back}
      </TransitionLink>

      <h1 className="mt-8">
        <span
          className="serif inline-block text-[clamp(2.75rem,7vw,4.75rem)] leading-[1.1] text-ink"
          style={{ viewTransitionName: `chapter-${id}` }}
        >
          {t.sections[id]}
        </span>
      </h1>

      {meta ? <p className="label tabular mt-4">{meta}</p> : null}

      <div className="mt-12 border-t border-line-soft pt-10 md:mt-16 md:pt-14">
        <Content />
      </div>

      <nav
        aria-label={t.a11y.primaryNav}
        className="mt-20 grid grid-cols-2 gap-6 border-t border-line-soft pt-8 md:mt-28"
      >
        {previous ? (
          <TransitionLink to={chapterPath(previous)} className="group">
            <span className="label">← {t.chapter.previous}</span>
            <span className="serif mt-2 block text-[clamp(1.25rem,2.4vw,1.75rem)] text-ink-soft transition-colors group-hover:text-ink">
              {t.sections[previous]}
            </span>
          </TransitionLink>
        ) : (
          <span />
        )}

        <TransitionLink to={next.to} className="group text-right">
          <span className="label">{t.chapter.next} →</span>
          <span className="serif mt-2 block text-[clamp(1.25rem,2.4vw,1.75rem)] text-ink-soft transition-colors group-hover:text-ink">
            {next.label}
          </span>
        </TransitionLink>
      </nav>
    </div>
  );
}
