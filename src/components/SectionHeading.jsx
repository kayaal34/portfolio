import { motion, useReducedMotion } from 'framer-motion';

/**
 * Shared section header: mono eyebrow with an index, an oversized title,
 * an animated hairline, and an optional lead paragraph.
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
  const prefersReduced = useReducedMotion();
  const centered = align === 'center';

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };

  const item = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      <motion.div
        variants={item}
        className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inset-0 rounded-full bg-accent/60 animate-pulse-ring" />
          <span className="relative h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          {index ? `${index} — ` : ''}
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        variants={item}
        className="mt-5 text-[clamp(2.25rem,6.2vw,4.25rem)] leading-[0.95] font-semibold tracking-[-0.04em]"
      >
        {title}
        {accent && (
          <>
            {' '}
            <span className="text-gradient-accent italic font-normal">{accent}</span>
          </>
        )}
      </motion.h2>

      <motion.div
        variants={item}
        className={`mt-7 h-px w-full max-w-md origin-left bg-gradient-to-r from-accent/70 via-accent-2/40 to-transparent ${
          centered ? 'mx-auto origin-center' : ''
        }`}
      />

      {lead && (
        <motion.p variants={item} className="mt-7 text-base leading-relaxed text-muted sm:text-lg">
          {lead}
        </motion.p>
      )}
    </motion.header>
  );
}
