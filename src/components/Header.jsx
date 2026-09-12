import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { contactPath } from '../data/profile';
import { LANGUAGES, useI18n } from '../i18n';
import { TransitionLink } from './TransitionLink';

/**
 * A single quiet line at the top. Language and theme are always there. The
 * name (the way home) and the contact link appear only where they are not
 * already on the page: the opening screen has the big name and its own
 * contact link, and the contact page does not link to itself.
 *
 * The hairline under it appears once the page has been scrolled, and fills in
 * left to right as you read. It carries its own view-transition-name so it
 * holds still while pages change underneath it.
 */
export function Header({ isDark, onToggleTheme }) {
  const { t, language, setLanguage } = useI18n();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const onContact = pathname === contactPath;
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;

      setScrolled(doc.scrollTop > 24);
      setProgress(scrollable > 40 ? Math.min(doc.scrollTop / scrollable, 1) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-bg/85 backdrop-blur-sm transition-colors duration-300 ${
        scrolled ? 'border-line-soft' : 'border-transparent'
      }`}
      style={{ viewTransitionName: 'site-header' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-accent/55"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="shell flex h-14 items-center justify-between gap-4">
        {isHome ? (
          <span />
        ) : (
          <TransitionLink
            to="/"
            className="label !tracking-[0.16em] text-ink transition-colors hover:text-accent"
          >
            {t.name.full}
          </TransitionLink>
        )}

        <div className="flex items-center gap-5">
          {isHome || onContact ? null : (
            <>
              <TransitionLink
                to={contactPath}
                className="text-[0.8125rem] text-muted transition-colors hover:text-ink"
              >
                {t.nav.contact}
              </TransitionLink>
              <span aria-hidden="true" className="h-3.5 w-px bg-line-soft" />
            </>
          )}

          <div
            role="group"
            aria-label={t.a11y.chooseLanguage}
            className="flex items-center divide-x divide-line-soft"
          >
            {LANGUAGES.map(({ code, short, native }) => (
              <button
                key={code}
                type="button"
                lang={code}
                title={native}
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
                className={`label px-2 transition-colors first:pl-0 last:pr-0 hover:text-ink ${
                  language === code ? 'text-ink' : ''
                }`}
              >
                {short}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? t.a11y.toLightMode : t.a11y.toDarkMode}
            className="text-muted transition-colors hover:text-ink"
          >
            {isDark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </header>
  );
}
