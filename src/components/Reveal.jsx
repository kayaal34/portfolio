import { motion, useReducedMotion } from 'framer-motion';

const OFFSETS = {
  up: { y: 44, x: 0 },
  down: { y: -44, x: 0 },
  left: { x: 52, y: 0 },
  right: { x: -52, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-reveal wrapper. Nothing on this site arrives flat — every block
 * eases in from an offset with a slight scale and blur settle.
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
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;

  if (prefersReduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
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
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggering parent. Pair with <RevealItem /> children.
 */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  once = true,
  ...rest
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
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

export function RevealItem({ children, className = '', as: Tag = 'div', ...rest }) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;

  if (prefersReduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag className={className} variants={revealItemVariants} {...rest}>
      {children}
    </MotionTag>
  );
}
