import { useState } from 'react';
import { Aperture, ArrowUpRight, Quote } from 'lucide-react';
import { clients } from '../../data/profile';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { SpotlightCard } from '../SpotlightCard';

const ICONS = { Aperture };

/**
 * Logo tile. Renders the file `logo` points at in /public; if that file is
 * missing or fails to decode it falls back to the gradient icon tile, so
 * swapping the logo can never leave a broken image on the page.
 */
function ClientLogo({ client }) {
  const Icon = ICONS[client.icon] ?? Aperture;
  const [failed, setFailed] = useState(false);

  if (client.logo && !failed) {
    return (
      <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-line bg-surface-strong">
        <img
          src={client.logo}
          alt={client.name}
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-line bg-surface-strong">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent-2/15 to-accent-3/25"
      />
      <Icon className="relative h-6 w-6 text-fg-soft" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}

function ClientCard({ client, copy, visitLabel, badgeLabel }) {
  // While the URL is still the '#' placeholder, keep the button from
  // jumping the page to the top. Set a real address in profile.js and it
  // starts behaving like an ordinary external link.
  const isPlaceholder = !client.url || client.url === '#';

  return (
    <SpotlightCard className="glass rounded-3xl p-8 shadow-card sm:p-10 lg:p-12">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--glow-b), transparent 70%)' }}
      />

      <div className="relative">
        <Quote
          aria-hidden="true"
          className="h-8 w-8 text-accent/45 sm:h-10 sm:w-10"
          strokeWidth={1.3}
        />

        <blockquote className="mt-6">
          <p className="max-w-3xl text-[clamp(1.1rem,2.5vw,1.65rem)] font-medium leading-[1.45] tracking-[-0.025em] text-fg">
            {copy.quote}
          </p>
        </blockquote>

        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <ClientLogo client={client} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[16px] font-semibold tracking-[-0.02em] text-fg">
                  {client.name}
                </p>
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
                  {badgeLabel}
                </span>
              </div>
              <p className="mt-1 text-[13px] text-muted">{copy.descriptor}</p>
            </div>
          </div>

          <a
            href={client.url}
            onClick={isPlaceholder ? (event) => event.preventDefault() : undefined}
            target={isPlaceholder ? undefined : '_blank'}
            rel={isPlaceholder ? undefined : 'noreferrer noopener'}
            aria-disabled={isPlaceholder || undefined}
            className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-line bg-surface px-5 py-3 text-[13.5px] font-medium tracking-tight text-fg transition-colors duration-500 hover:border-accent/50 md:self-auto"
          >
            {visitLabel}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Clients() {
  const t = useT();

  return (
    <section id="clients" className="relative scroll-mt-28 py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow={t.clients.eyebrow}
          title={t.clients.title}
          accent={t.clients.accent}
          lead={t.clients.lead}
        />

        <div className="mt-14 flex flex-col gap-4 lg:mt-16">
          {clients.map((client, i) => (
            <Reveal key={client.id} delay={i * 0.08}>
              <ClientCard
                client={client}
                copy={t.clients.entries[client.id]}
                visitLabel={t.clients.visit}
                badgeLabel={t.clients.badge}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
