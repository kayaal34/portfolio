import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { TechStack } from '../components/sections/TechStack';
import { Experience } from '../components/sections/Experience';
import { Clients } from '../components/sections/Clients';
import { Projects } from '../components/sections/Projects';

/**
 * The home page: everything except contact, which lives at its own URL.
 */
export function Home({ lenisRef, ready }) {
  return (
    <>
      <Hero lenisRef={lenisRef} ready={ready} />
      <About />
      <TechStack />
      <Experience />
      <Clients />
      <Projects />
    </>
  );
}
