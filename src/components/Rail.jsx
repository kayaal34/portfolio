import { Link } from 'react-router-dom';
import { contactPath } from '../data/profile';
import { useI18n } from '../i18n';

/**
 * The navigation, on the right edge rather than across the top: one line per
 * chapter, a rule that extends into the active one.
 *
 * Shown from 1440px up, where the page's centred column leaves a margin wide
 * enough for the longest label (Russian "Избранные проекты") without touching
 * the dates on the right of the content. Below that the chapter titles are
 * the navigation — they are large, in order, and already on screen.
 */
export function Rail({ chapters, open, onSelect }) {
  const { t } = useI18n();

  return (
    <nav
      aria-label={t.a11y.primaryNav}
      className="fixed top-1/2 right-8 z-40 hidden -translate-y-1/2 min-[1440px]:block"
    >
      <ul className="flex flex-col gap-3.5">
        {chapters.map((id) => {
          const active = open === id;

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={active ? 'true' : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ease-out ${
                    active ? 'w-8 bg-accent' : 'w-3 bg-line group-hover:w-6 group-hover:bg-ink'
                  }`}
                />
                <span
                  className={`font-mono text-[0.75rem] tracking-[0.12em] uppercase transition-colors duration-300 ${
                    active ? 'text-ink' : 'text-faint group-hover:text-ink'
                  }`}
                >
                  {t.sections[id]}
                </span>
              </button>
            </li>
          );
        })}

        <li className="mt-2">
          <Link to={contactPath} className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-3 bg-line transition-all duration-300 ease-out group-hover:w-6 group-hover:bg-ink"
            />
            <span className="font-mono text-[0.75rem] tracking-[0.12em] text-faint uppercase transition-colors duration-300 group-hover:text-ink">
              {t.nav.contact}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
