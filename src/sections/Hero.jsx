import { contactPath, socials } from '../data/profile';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';
import { TransitionLink } from '../components/TransitionLink';

/**
 * The left half of the opening screen: the name, the two things I am hired
 * as, one sentence about the work, and the ways to reach me. The name is the
 * headline. Layout (width, placement) belongs to Home.
 */
export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top">
      <Reveal
        as="h1"
        className="serif text-[clamp(2.75rem,9vw,5rem)] leading-[0.95] font-normal"
      >
        {t.name.full}
      </Reveal>

      {/* The two titles stack under the name rather than running into one
          line: each is a role in its own right, and a slash would make them
          read as one job with two names. */}
      <Reveal delay={60} className="mt-6 flex flex-col gap-1.5">
        {t.roles.map((role) => (
          <p
            key={role}
            className="font-mono text-[0.8125rem] tracking-[0.14em] text-ink-soft uppercase"
          >
            {role}
          </p>
        ))}
        <p className="label mt-1">{t.location}</p>
      </Reveal>

      <Reveal as="p" delay={120} className="measure mt-8 text-[1rem] leading-relaxed text-ink-soft">
        {t.hero.lede}
      </Reveal>

      <Reveal delay={180} className="mt-9">
        <TransitionLink className="cta" to={contactPath}>
          {t.hero.cta}
          <span aria-hidden="true" className="cta-arrow">
            →
          </span>
        </TransitionLink>
      </Reveal>

      {/* The ways to reach me live here, not on the contact page — that page
          is for the visitor to write; this is where they find me. */}
      <Reveal delay={240} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {socials.map((item) => (
          <a
            key={item.id}
            lang="en"
            href={item.href}
            target={item.id === 'email' ? undefined : '_blank'}
            rel="noreferrer"
            className="label transition-colors hover:text-ink"
          >
            {item.value}
          </a>
        ))}
      </Reveal>
    </section>
  );
}
