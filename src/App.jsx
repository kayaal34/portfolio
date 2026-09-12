import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { chapterIds, chapterPath, contactPath } from './data/profile';
import { I18nProvider, useI18n } from './i18n';
import { useTheme } from './hooks/useTheme';

import { Intro } from './components/Intro';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { ChapterPage } from './pages/ChapterPage';
import { ContactPage } from './pages/ContactPage';

const SITE_URL = 'https://kayaal.is-a.dev';

/**
 * Per-route housekeeping: land where the visitor asked to land, and keep the
 * canonical URL pointing at the page actually being shown — without the
 * second part every route claims to be the home page and search engines
 * drop /contact as a duplicate.
 */
function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Arriving from another page with /#projects: scroll to that section.
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const href = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;

    document.querySelector('meta[property="og:url"]')?.setAttribute('content', href);
  }, [pathname]);

  return null;
}

function Site() {
  const { t, fading } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  // The opening screen is one screen and ends there; every other page has a
  // footer.
  const isHome = useLocation().pathname === '/';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.a11y.skip}
      </a>

      {/* Above the routes, so it plays once per visit rather than on every
          navigation. */}
      <Intro />
      <RouteEffects />

      {/*
        Changing language cross-fades the document rather than remounting it:
        the copy swaps behind the dip, so the scroll position is kept and
        nothing jumps. `opacity` alone is used on purpose — it creates no
        containing block, so the fixed header keeps working mid-fade.
      */}
      <div
        className={`transition-opacity ease-out ${
          fading ? 'opacity-40 duration-150' : 'opacity-100 duration-300'
        }`}
      >
        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            {chapterIds.map((id) => (
              <Route key={id} path={chapterPath(id)} element={<ChapterPage id={id} />} />
            ))}
            <Route path={contactPath} element={<ContactPage />} />
            {/* Unknown URL: home, rather than a dead end. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {isHome ? null : <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  );
}
