import { useCallback, useState } from 'react';
import { sectionIds } from './data/profile';
import { I18nProvider, useI18n } from './i18n';
import { useTheme } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useActiveSection } from './hooks/useActiveSection';

import { AuroraBackground } from './components/AuroraBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { TechStack } from './components/sections/TechStack';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Clients } from './components/sections/Clients';
import { Contact } from './components/sections/Contact';

function Site() {
  const { t, fading } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const lenisRef = useSmoothScroll(true);
  const active = useActiveSection(sectionIds);

  // Gates the hero's entrance so it starts as the preloader lifts away.
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

      <Preloader onDone={handleReady} />

      <AuroraBackground />
      <ScrollProgress />
      <CustomCursor />

      {/*
        Language changes cross-fade the whole document instead of remounting
        it — the copy swaps behind the dip, so nothing jumps and the scroll
        position is preserved. `opacity` alone is used here on purpose: it
        does not create a containing block, so the fixed navbar keeps
        working while the fade runs.
      */}
      <div
        className={`transition-opacity ease-out ${
          fading ? 'opacity-30 duration-150' : 'opacity-100 duration-300'
        }`}
      >
        <Navbar active={active} isDark={isDark} onToggleTheme={toggleTheme} lenisRef={lenisRef} />

        <main id="main">
          <Hero lenisRef={lenisRef} ready={ready} />
          <About />
          <TechStack />
          <Experience />
          <Clients />
          <Projects />
          <Contact />
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
