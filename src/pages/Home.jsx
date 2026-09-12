import { Hero } from '../sections/Hero';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Education } from '../sections/Education';
import { Skills } from '../sections/Skills';
import { Extras } from '../sections/Extras';

/** Everything except contact, which has its own page. */
export function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <Extras />
    </>
  );
}
