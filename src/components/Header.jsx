import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { sectionIds } from '../data/profile';
import { LANGUAGES, useI18n } from '../i18n';
import { useActiveSection } from '../hooks/useActiveSection';

/**
 * A single quiet line at the top: name, section links, language, theme.
 * The hairline under it appears only once the page has been scrolled, so
 * the header is invisible against the hero and defined against the text.
 */
export function Header({ isDark, onToggleTheme }) {
  const { t, language, setLanguage } = useI18n();
  const active = useActiveSection(sectionIds);
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
        <a
          href="#top"
          className="label !tracking-[0.16em] text-ink transition-colors hover:text-accent"
        >
          {t.name.full}
        </a>

        <nav aria-label={t.sections.experience} className="hidden items-center gap-6 md:flex">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`text-[0.8125rem] transition-colors hover:text-ink ${
                active === id ? 'text-ink' : 'text-muted'
              }`}
            >
              {t.nav[id]}
            </a>
          ))}
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
