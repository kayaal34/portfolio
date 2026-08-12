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
 * the platform's own scrolling otherwise.
 *
 * `immediate` jumps instead of gliding. Use it when arriving from another
 * route: the page has only just rendered, so a 1.3s glide from the very top
 * is both slow and easy to interrupt.
 */
export function scrollToSection(id, lenis, { immediate = false } = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = window.innerWidth < 768 ? -80 : -96;
  const top = target.getBoundingClientRect().top + window.scrollY + offset;

  // Always move the native scroll position too. Lenis can be off (reduced
  // motion) or not yet running, and without this the click does nothing.
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });

  if (lenis) {
    lenis.scrollTo(target, immediate ? { offset, immediate: true } : { offset, duration: 1.35 });
  }
}
