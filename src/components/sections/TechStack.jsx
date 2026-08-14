import { Atom, BrainCircuit, CodeXml, Cpu, Database, Smartphone } from 'lucide-react';
import { techStack } from '../../data/profile';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { RevealGroup, RevealItem } from '../Reveal';

const ICONS = { Atom, BrainCircuit, CodeXml, Cpu, Database, Smartphone };

/**
 * One tool. No filter bar above the grid any more — with six entries there
 * is nothing to filter, and the row of pills was doing more to suggest
 * "here is everything I ever installed" than to help anyone read.
 */
function TechCard({ item, index, detail }) {
  const Icon = ICONS[item.icon] ?? CodeXml;

  const handleMove = (event) => {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    node.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <RevealItem>
      <li
        onPointerMove={handleMove}
        className="spotlight ring-gradient glass group relative isolate h-full overflow-hidden rounded-2xl p-6 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent/40 sm:p-7"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition-colors duration-700 group-hover:bg-accent/20"
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

        <h3 className="relative mt-6 text-[16px] font-normal leading-snug tracking-[-0.02em] text-fg">
          {item.name}
        </h3>
        <p className="relative mt-2 text-[13px] font-light leading-relaxed text-muted">{detail}</p>
      </li>
    </RevealItem>
  );
}

export function TechStack() {
  const t = useT();

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

        <RevealGroup
          as="ul"
          className="mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {techStack.map((item, i) => (
            <TechCard key={item.key} item={item} index={i} detail={t.stack.details[item.key]} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
