import { forwardRef, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Atom,
  Binary,
  Cloud,
  CodeXml,
  Coffee,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Smartphone,
  Terminal,
} from 'lucide-react';
import { techStack, techGroups } from '../../data/profile';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';

const ICONS = {
  Atom,
  Binary,
  Cloud,
  CodeXml,
  Coffee,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Smartphone,
  Terminal,
};

/**
 * A single glowing technology badge.
 * Forwards its ref so AnimatePresence's popLayout mode can measure it.
 */
const TechBadge = forwardRef(function TechBadge({ item, index, detail, groupLabel }, ref) {
  const Icon = ICONS[item.icon] ?? CodeXml;
  const prefersReduced = useReducedMotion();

  const handleMove = (event) => {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <motion.li
      ref={ref}
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 26, scale: 0.94, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={prefersReduced ? undefined : { opacity: 0, y: -14, scale: 0.94, filter: 'blur(6px)' }}
      transition={{ duration: 0.55, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handleMove}
      className="spotlight ring-gradient glass group relative isolate overflow-hidden rounded-2xl p-5 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent/40 sm:p-6"
    >
      {/* Glow bloom behind the icon */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition-colors duration-700 group-hover:bg-accent/25"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-strong transition-colors duration-500 group-hover:border-accent/40">
          <Icon
            className="h-5 w-5 text-fg-soft transition-colors duration-500 group-hover:text-accent"
            strokeWidth={1.6}
          />
        </span>
        <span className="tabular font-mono text-[10px] tracking-[0.16em] text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="relative mt-5 text-[15px] font-semibold leading-snug tracking-[-0.02em] text-fg">
        {item.name}
      </h3>
      <p className="relative mt-1.5 text-[12.5px] leading-relaxed text-muted">{detail}</p>

      <span className="relative mt-4 inline-flex rounded-full border border-line px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint transition-colors duration-500 group-hover:border-accent/40 group-hover:text-accent">
        {groupLabel}
      </span>
    </motion.li>
  );
});

export function TechStack() {
  const t = useT();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? techStack : techStack.filter((item) => item.group === filter)),
    [filter]
  );

  return (
    <section id="stack" className="relative scroll-mt-28 py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow={t.stack.eyebrow}
          title={t.stack.title}
          accent={t.stack.accent}
          lead={t.stack.lead}
        />

        {/* Filters */}
        <Reveal delay={0.05} className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {techGroups.map((group) => {
              const isActive = filter === group;
              return (
                <li key={group}>
                  <button
                    type="button"
                    onClick={() => setFilter(group)}
                    aria-pressed={isActive}
                    className={`relative min-h-11 rounded-full px-4 py-2.5 text-[13px] font-medium tracking-tight transition-colors duration-400 sm:min-h-0 sm:py-2 sm:text-[12.5px] ${
                      isActive ? 'text-bg' : 'border border-line text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="stack-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-fg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {t.stack.groups[group]}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Grid */}
        <motion.ul
          layout
          className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <TechBadge
                key={item.key}
                item={item}
                index={i}
                detail={t.stack.details[item.key]}
                groupLabel={t.stack.groups[item.group]}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
