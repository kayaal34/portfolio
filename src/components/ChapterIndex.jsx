import { chapterIds, chapterPath } from '../data/profile';
import { useI18n } from '../i18n';
import { TransitionLink } from './TransitionLink';

/**
 * The index on the right of the opening screen: the four chapters, large, in
 * the same face as the name.
 *
 * Each title carries a `view-transition-name` that the chapter page's heading
 * shares, so pressing one sends the title across the screen and grows it into
 * the heading of the page it opens.
 *
 * Deliberately no entrance animation: an element sitting at opacity 0 when the
 * transition captures it would morph into nothing on the way back.
 */
export function ChapterIndex() {
  const { t } = useI18n();

  return (
    <nav aria-label={t.a11y.primaryNav}>
      <ul className="flex flex-col gap-2 lg:gap-3">
        {chapterIds.map((id) => (
          <li key={id}>
            <TransitionLink
              to={chapterPath(id)}
              className="group flex items-center gap-5 py-1.5"
            >
              <span
                aria-hidden="true"
                className="h-px w-6 shrink-0 bg-line transition-all duration-500 ease-out group-hover:w-14 group-hover:bg-ink"
              />
              <span
                className="serif inline-block text-[clamp(1.875rem,2.9vw,2.75rem)] leading-[1.1] text-ink-soft transition-colors duration-300 group-hover:text-ink"
                style={{ viewTransitionName: `chapter-${id}` }}
              >
                {t.sections[id]}
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
