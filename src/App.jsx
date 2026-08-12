import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { contactPath, sectionIds } from './data/profile';
import { I18nProvider, useI18n } from './i18n';
import { useTheme } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useActiveSection } from './hooks/useActiveSection';

import { AuroraBackground } from './components/AuroraBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { ContactPage } from './pages/ContactPage';

/**
 * Every route change starts at the top. Lenis keeps its own scroll
 * position, so it has to be told as well — otherwise you land halfway
 * down the new page.
 */
function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Both, deliberately: Lenis keeps its own position, and the native
    // scroll is the fallback when Lenis is off (reduced motion) or has not
    // taken over yet.
    window.scrollTo(0, 0);
    lenisRef?.current?.scrollTo(0, { immediate: true });
  }, [pathname, lenisRef]);

  return null;
}

function Site() {
  const { t, fading } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const lenisRef = useSmoothScroll(true);
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const activeSection = useActiveSection(sectionIds);
  // On the contact route nothing is being scroll-spied; the rail should
  // simply mark contact.
  const active = isHome ? activeSection : 'contact';

  // Gates the hero's entrance so it starts as the intro curtain lifts.
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.a11y.skip}
      </a>

      {/* Mounted above the routes, so it plays once per visit rather than
          on every navigation. */}
      <Preloader onDone={handleReady} />

      <AuroraBackground />
      <ScrollProgress />
      <ScrollToTop lenisRef={lenisRef} />

      {/*
        Language changes cross-fade the whole document instead of remounting
        it — the copy swaps behind the dip, so nothing jumps and the scroll
        position is preserved. `opacity` alone is used here on purpose: it
        does not create a containing block, so the fixed navigation keeps
        working while the fade runs.
      */}
      <div
        className={`transition-opacity ease-out ${
          fading ? 'opacity-30 duration-150' : 'opacity-100 duration-300'
        }`}
      >
        <Navbar active={active} isDark={isDark} onToggleTheme={toggleTheme} lenisRef={lenisRef} />

        <main id="main">
          <Routes>
            <Route path="/" element={<Home lenisRef={lenisRef} ready={ready} />} />
            <Route path={contactPath} element={<ContactPage />} />
            {/* Unknown URL: send people home rather than to a dead end. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer lenisRef={lenisRef} />
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
