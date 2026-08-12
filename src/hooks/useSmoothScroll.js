import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

/**
 * Momentum ("buttery") page scrolling via Lenis, exposed through a ref so
 * the navbar can hand off anchor navigation to the same instance.
 * Disabled entirely when the user prefers reduced motion.
 */
export function useSmoothScroll(enabled = true) {
  const lenisRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, prefersReduced]);

  return lenisRef;
}

/**
 * Scrolls to a section id, using Lenis when available and falling back to
 * the platform's own smooth scrolling otherwise.
 */
export function scrollToSection(id, lenis) {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = window.innerWidth < 768 ? -80 : -96;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.35 });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * "Get in touch" everywhere on the site means the same thing: take me to
 * the form and put the cursor in it. Opening a mail client instead loses
 * people who read their mail in a browser tab.
 */
export function goToContactForm(lenis) {
  scrollToSection('contact', lenis);

  // Focus once the scroll has settled, so the browser does not fight it by
  // jumping straight to the field.
  window.setTimeout(() => {
    const field = document.getElementById('cf-name');
    if (!field) return;
    field.focus({ preventScroll: true });
  }, 900);
}
