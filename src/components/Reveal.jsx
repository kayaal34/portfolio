import { motion } from 'framer-motion';
import { useMotionLevel } from '../hooks/useMotionLevel';

const OFFSETS = {
  up: { y: 44, x: 0 },
  down: { y: -44, x: 0 },
  left: { x: 52, y: 0 },
  right: { x: -52, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-reveal wrapper.
 *
 * At 'full' the block eases in from an offset with a slight scale and blur
 * settle. At 'gentle' it simply fades — no travel, no blur — so the page
 * still comes alive for visitors who have OS animations turned off.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.9,
  distance,
  blur = true,
  once = true,
  amount = 0.25,
  className = '',
  ...rest
}) {
  const level = useMotionLevel();
  const MotionTag = motion[Tag] ?? motion.div;

  if (level === 'gentle') {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 0.6, delay: delay * 0.5, ease: 'easeOut' }}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  const base = OFFSETS[direction] ?? OFFSETS.up;
  const offset = {
    x: distance != null && base.x !== 0 ? Math.sign(base.x) * distance : base.x,
    y: distance != null && base.y !== 0 ? Math.sign(base.y) * distance : base.y,
  };

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: 0.985,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Staggering parent. Pair with <RevealItem /> children. */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  once = true,
  ...rest
}) {
  const level = useMotionLevel();
  const step = level === 'gentle' ? stagger * 0.5 : stagger;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const revealItemVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.97, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const gentleItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function RevealItem({ children, className = '', as: Tag = 'div', ...rest }) {
  const level = useMotionLevel();
  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={level === 'gentle' ? gentleItemVariants : revealItemVariants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
