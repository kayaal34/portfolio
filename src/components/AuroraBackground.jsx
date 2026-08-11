import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useHasFinePointer } from '../hooks/useMediaQuery';

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Fixed ambient layer behind everything: three drifting aurora blooms with a
 * gentle pointer parallax, a technical grid, and a film-grain overlay.
 */
export function AuroraBackground() {
  const prefersReduced = useReducedMotion();
  const finePointer = useHasFinePointer();
  const parallax = finePointer && !prefersReduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.9 });

  const blobAX = useTransform(sx, [-0.5, 0.5], [-70, 70]);
  const blobAY = useTransform(sy, [-0.5, 0.5], [-55, 55]);
  const blobBX = useTransform(sx, [-0.5, 0.5], [50, -50]);
  const blobBY = useTransform(sy, [-0.5, 0.5], [42, -42]);
  const blobCX = useTransform(sx, [-0.5, 0.5], [-32, 32]);
  const blobCY = useTransform(sy, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    if (!parallax) return undefined;
    const onMove = (event) => {
      mx.set(event.clientX / window.innerWidth - 0.5);
      my.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [parallax, mx, my]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* Aurora blooms */}
      <motion.div
        style={parallax ? { x: blobAX, y: blobAY } : undefined}
        className="absolute -top-[22vh] -left-[12vw] h-[62vw] w-[62vw] min-h-[420px] min-w-[420px] rounded-full blur-[130px] animate-drift"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, var(--glow-a), transparent 68%)' }}
        />
      </motion.div>

      <motion.div
        style={
          parallax ? { x: blobBX, y: blobBY, animationDelay: '-9s' } : { animationDelay: '-9s' }
        }
        className="absolute top-[28vh] -right-[16vw] h-[58vw] w-[58vw] min-h-[380px] min-w-[380px] rounded-full blur-[140px] animate-drift"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, var(--glow-b), transparent 68%)' }}
        />
      </motion.div>

      <motion.div
        style={
          parallax ? { x: blobCX, y: blobCY, animationDelay: '-17s' } : { animationDelay: '-17s' }
        }
        className="absolute bottom-[-18vh] left-[22vw] h-[52vw] w-[52vw] min-h-[340px] min-w-[340px] rounded-full blur-[150px] animate-drift"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, var(--glow-c), transparent 68%)' }}
        />
      </motion.div>

      {/* Technical grid */}
      <div
        className="absolute inset-0 mask-fade-b"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Vignette keeps the centre of the page calm */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, transparent 40%, color-mix(in oklab, var(--c-bg) 78%, transparent) 100%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: NOISE_URI, opacity: 'var(--noise-opacity)' }}
      />
    </div>
  );
}
