import { Link } from 'react-router-dom';
import { contactPath } from '../data/profile';
import { useI18n } from '../i18n';

/**
 * The navigation, on the right edge rather than across the top: one line per
 * chapter, a rule that extends into the active one.
 *
 * Shown from 1536px up. At 14px the longest label, Russian "Избранные
 * проекты", with its active rule drawn out, is 231px wide; at 1440px that
 * left 16px between it and the dates on the right of the content, at 1536px
 * it leaves 64px. Below that the chapter titles are the navigation — they are
 * large, in order, and already on screen.
 */
export function Rail({ chapters, open, onSelect }) {
  const { t } = useI18n();

  return (
    <nav
      aria-label={t.a11y.primaryNav}
      className="fixed top-1/2 right-10 z-40 hidden -translate-y-1/2 min-[1536px]:block"
    >
      <ul className="flex flex-col gap-5">
        {chapters.map((id) => {
          const active = open === id;

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={active ? 'true' : undefined}
                className="group flex items-center gap-4"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ease-out ${
                    active ? 'w-12 bg-accent' : 'w-4 bg-line group-hover:w-8 group-hover:bg-ink'
                  }`}
                />
                <span
                  className={`font-mono text-[0.875rem] tracking-[0.1em] uppercase transition-colors duration-300 ${
                    active ? 'text-ink' : 'text-faint group-hover:text-ink'
                  }`}
                >
                  {t.sections[id]}
                </span>
              </button>
            </li>
          );
        })}

        <li className="mt-3">
          <Link to={contactPath} className="group flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-4 bg-line transition-all duration-300 ease-out group-hover:w-8 group-hover:bg-ink"
            />
            <span className="font-mono text-[0.875rem] tracking-[0.1em] text-faint uppercase transition-colors duration-300 group-hover:text-ink">
              {t.nav.contact}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
