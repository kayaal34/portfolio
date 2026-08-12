import { useReducedMotion } from 'framer-motion';

/**
 * Motion has two levels here, not an on/off switch.
 *
 *   'full'   — the whole choreography: travel, blur, stagger, parallax.
 *   'gentle' — opacity only. No movement, no blur, no scale.
 *
 * The OS "reduce motion" setting asks us to stop *moving* things, which is
 * what triggers discomfort — it does not ask us to strip the page bare.
 * Fading is widely considered safe under that preference, so 'gentle' keeps
 * the site feeling alive for the very many people who have the setting on
 * (on Windows it is off by default in several performance presets) without
 * ignoring what they asked for.
 */
export function useMotionLevel() {
  return useReducedMotion() ? 'gentle' : 'full';
}
