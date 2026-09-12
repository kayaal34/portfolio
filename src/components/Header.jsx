import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { contactPath, sectionIds } from '../data/profile';
import { LANGUAGES, useI18n } from '../i18n';
import { useActiveSection } from '../hooks/useActiveSection';

/**
 * A single quiet line at the top: name, sections, contact, language, theme.
 * The hairline under it appears only once the page has been scrolled, so the
 * header is invisible against the opening and defined against the text.
 */
export function Header({ isDark, onToggleTheme }) {
  const { t, language, setLanguage } = useI18n();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const activeSection = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-bg/85 backdrop-blur-sm transition-colors duration-300 ${
        scrolled ? 'border-line-soft' : 'border-transparent'
      }`}
    >
      <div className="shell flex h-14 items-center justify-between gap-4">
        <Link to="/" className="label !tracking-[0.16em] text-ink transition-colors hover:text-accent">
          {t.name.full}
        </Link>

        <nav aria-label={t.a11y.primaryNav} className="hidden items-center gap-6 md:flex">
          {sectionIds.map((id) => {
            const active = isHome && activeSection === id;
            const className = `text-[0.8125rem] transition-colors hover:text-ink ${
              active ? 'text-ink' : 'text-muted'
            }`;

            // On the home page these are plain anchors, so the browser keeps
            // its own smooth scrolling; from the contact page they have to go
            // through the router first.
            return isHome ? (
              <a key={id} href={`#${id}`} aria-current={active ? 'true' : undefined} className={className}>
                {t.nav[id]}
              </a>
            ) : (
              <Link key={id} to={`/#${id}`} className={className}>
                {t.nav[id]}
              </Link>
            );
          })}

          <Link
            to={contactPath}
            aria-current={!isHome ? 'page' : undefined}
            className={`text-[0.8125rem] transition-colors hover:text-ink ${
              isHome ? 'text-muted' : 'text-ink'
            }`}
          >
            {t.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
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
