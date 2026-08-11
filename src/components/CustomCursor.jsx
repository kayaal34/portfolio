import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useHasFinePointer } from '../hooks/useMediaQuery';

/**
 * Two-part cursor: a precise dot that tracks 1:1 and a lagging ring that
 * expands over interactive elements. Desktop pointers only; the native
 * cursor is restored whenever this component is not mounted.
 */
export function CustomCursor() {
  const finePointer = useHasFinePointer();
  const prefersReduced = useReducedMotion();
  const enabled = finePointer && !prefersReduced;

  const [variant, setVariant] = useState('default');
  const [visible, setVisible] = useState(false);
  // Mirrored in a ref so the pointer listener never has to re-subscribe.
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 190, damping: 20, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 190, damping: 20, mass: 0.55 });

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.classList.remove('yk-custom-cursor');
      return undefined;
    }
    root.classList.add('yk-custom-cursor');

    const interactiveSelector =
      'a, button, input, textarea, select, summary, [role="button"], [data-cursor="hover"]';

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = event.target;
      if (target instanceof Element && target.closest(interactiveSelector)) {
        const explicit = target.closest('[data-cursor]');
        setVariant(explicit?.getAttribute('data-cursor') === 'view' ? 'view' : 'hover');
      } else {
        setVariant('default');
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };
    const onDown = () => setVariant((v) => (v === 'default' ? 'press' : v));
    const onUp = () => setVariant((v) => (v === 'press' ? 'default' : v));

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      root.classList.remove('yk-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize =
    variant === 'view' ? 74 : variant === 'hover' ? 52 : variant === 'press' ? 24 : 34;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-accent"
        style={{ x: dotX, y: dotY, width: 6, height: 6, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? (variant === 'view' ? 0 : 1) : 0,
          scale: variant === 'press' ? 0.6 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99] flex items-center justify-center rounded-full border border-accent/60 backdrop-blur-[2px]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          // rgba(0,0,0,0) rather than `transparent` — the keyword is not
          // interpolatable, which makes Framer Motion warn.
          backgroundColor:
            variant === 'view'
              ? 'color-mix(in oklab, var(--c-accent) 88%, transparent)'
              : variant === 'hover'
                ? 'color-mix(in oklab, var(--c-accent) 14%, transparent)'
                : 'rgba(0, 0, 0, 0)',
          borderColor:
            variant === 'view'
              ? 'rgba(0, 0, 0, 0)'
              : 'color-mix(in oklab, var(--c-accent) 60%, transparent)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <motion.span
          className="font-mono text-[9px] font-semibold tracking-[0.18em] text-bg uppercase"
          animate={{ opacity: variant === 'view' ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          View
        </motion.span>
      </motion.div>
    </>
  );
}
