import { I18nProvider, useI18n } from './i18n';
import { useTheme } from './hooks/useTheme';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Hero } from './sections/Hero';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Extras } from './sections/Extras';
import { Contact } from './sections/Contact';

function Site() {
  const { t, fading } = useI18n();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.a11y.skip}
      </a>

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
          <Hero />
          <Experience />
          <Projects />
          <Education />
          <Skills />
          <Extras />
          <Contact />
        </main>

        <Footer />
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
