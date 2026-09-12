import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { education, experience, projects, sectionIds } from '../data/profile';
import { useI18n } from '../i18n';

import { Chapter } from '../components/Chapter';
import { Rail } from '../components/Rail';
import { Hero } from '../sections/Hero';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Education } from '../sections/Education';
import { Skills } from '../sections/Skills';

const CONTENT = {
  experience: Experience,
  projects: Projects,
  education: Education,
  skills: Skills,
};

/** '09.2024 — 09.2025' → 2024. The earliest year any entry starts in. */
function firstYear(entries) {
  return Math.min(...entries.map((entry) => Number(entry.period.match(/\d{4}/)[0])));
}

/**
 * The home page: the opening, then the CV as four chapters. One is open at a
 * time; the rail on the right and the chapter titles themselves both open
 * them.
 */
export function Home() {
  const { t } = useI18n();
  const { hash } = useLocation();

  const [open, setOpen] = useState('experience');
  // When one chapter replaces another, the old one closes instantly: if it
  // animated shut, everything below it would still be moving while the page
  // scrolls to the new one, and the scroll would land in the wrong place.
  const [switching, setSwitching] = useState(false);

  const [scrollTo, setScrollTo] = useState(null);

  const select = useCallback((id) => {
    setSwitching(true);
    setOpen(id);
    setScrollTo(id);
  }, []);

  // Measured after React has committed the new open/closed state. The chapter
  // that closed did so without a transition, so the layout read here is
  // already final and the scroll lands on the heading, not where it used to be.
  useLayoutEffect(() => {
    if (!scrollTo) return;
    const target = document.getElementById(scrollTo);
    setScrollTo(null);
    if (!target) return;

    const headerOffset = document.querySelector('header')?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [scrollTo]);

  const toggle = useCallback(
    (id) => {
      if (open === id) {
        setSwitching(false);
        setOpen(null);
      } else {
        select(id);
      }
    },
    [open, select]
  );

  // Arriving at /#projects opens that chapter; App scrolls to it.
  useEffect(() => {
    const id = hash.slice(1);
    if (sectionIds.includes(id)) setOpen(id);
  }, [hash]);

  const meta = {
    experience: `${firstYear(experience)} — ${t.present}`,
    projects: t.projects.count.replace('{n}', projects.length),
    education: `${firstYear(education)} — ${t.present}`,
    skills: null,
  };

  return (
    <>
      <Rail chapters={sectionIds} open={open} onSelect={select} />

      <Hero />

      {sectionIds.map((id) => {
        const Content = CONTENT[id];
        const isOpen = open === id;

        return (
          <Chapter
            key={id}
            id={id}
            title={t.sections[id]}
            meta={meta[id]}
            open={isOpen}
            instant={switching && !isOpen}
            onToggle={() => toggle(id)}
          >
            <Content />
          </Chapter>
        );
      })}
    </>
  );
}
