import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useHasFinePointer } from '../hooks/useMediaQuery';

/**
 * 3D card that tilts toward the pointer, with a moving specular glare.
 *
 * Children can opt into depth with `style={{ transform: 'translateZ(40px)' }}`
 * — the card sets `transform-style: preserve-3d` on its shell.
 */
export function TiltCard({
  children,
  className = '',
  innerClassName = '',
  intensity = 12,
  scale = 1.02,
  glare = true,
  perspective = 1100,
  ...rest
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const finePointer = useHasFinePointer();
  const interactive = finePointer && !prefersReduced;

  // Normalised pointer position inside the card, -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hovered = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 18, mass: 0.4 };
  const sx = useSpring(px, springConfig);
  const sy = useSpring(py, springConfig);
  const sHover = useSpring(hovered, { stiffness: 200, damping: 26 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const cardScale = useTransform(sHover, [0, 1], [1, scale]);
  const glareOpacity = useTransform(sHover, [0, 1], [0, 0.45]);
  const glareBackground = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(420px circle at ${((x + 0.5) * 100).toFixed(1)}% ${((y + 0.5) * 100).toFixed(
        1
      )}%, rgba(255,255,255,0.6), transparent 55%)`
  );

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    px.set(nx);
    py.set(ny);
    // Feed the CSS `.spotlight` utility too, so both effects track one pointer.
    node.style.setProperty('--mx', `${((nx + 0.5) * 100).toFixed(2)}%`);
    node.style.setProperty('--my', `${((ny + 0.5) * 100).toFixed(2)}%`);
  };

  const handleEnter = () => hovered.set(1);

  const handleLeave = () => {
    hovered.set(0);
    px.set(0);
    py.set(0);
  };

  if (!interactive) {
    return (
      <div className={className}>
        <div ref={ref} className={`relative h-full ${innerClassName}`} {...rest}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ perspective }}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, scale: cardScale, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${innerClassName}`}
        {...rest}
      >
        {children}

        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
            style={{ opacity: glareOpacity, backgroundImage: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
