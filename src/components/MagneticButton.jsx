import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useHasFinePointer } from '../hooks/useMediaQuery';

/**
 * Button / link that drifts toward the pointer while hovered, then springs
 * back on exit. `strength` is the fraction of the pointer offset it follows.
 */
export function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as = 'button',
  ...rest
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const finePointer = useHasFinePointer();
  const active = finePointer && !prefersReduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.35 });

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      onPointerMove={active ? handleMove : undefined}
      onPointerLeave={active ? handleLeave : undefined}
      style={active ? { x: sx, y: sy } : undefined}
      whileTap={prefersReduced ? undefined : { scale: 0.96 }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
