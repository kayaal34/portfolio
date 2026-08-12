import { motion } from 'framer-motion';
import { useMotionLevel } from '../hooks/useMotionLevel';

/**
 * Shared section header.
 *
 * Same typographic system as the About statement: a mono eyebrow, a serif
 * display line, and the trailing clause in muted italic. Nothing animates
 * on a loop — the only motion is the entrance.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  lead,
  align = 'left',
  className = '',
}) {
  const gentle = useMotionLevel() === 'gentle';
  const centered = align === 'center';

  const container = { hidden: {}, show: { transition: { staggerChildren: gentle ? 0.05 : 0.09 } } };

  const item = gentle
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
      };

  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'} ${className}`}
    >
      <motion.p
        variants={item}
        className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint"
      >
        {index ? `${index} — ` : ''}
        {eyebrow}
      </motion.p>

      <motion.h2
        variants={item}
        className="mt-10 font-serif text-[clamp(1.9rem,5vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.02em] text-fg sm:mt-12"
      >
        {title}
        {accent && (
          <>
            {' '}
            <span className="italic text-muted">{accent}</span>
          </>
        )}
      </motion.h2>

      {lead && (
        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-[15px] font-light leading-[1.75] text-muted sm:text-base"
        >
          {lead}
        </motion.p>
      )}
    </motion.header>
  );
}
