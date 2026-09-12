import { Link } from 'react-router-dom';
import { contactPath, socials } from '../data/profile';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';

/**
 * The opening: who, where, one sentence about the work, and the ways to
 * reach me. No slogan and no animated headline — the name is the headline.
 */
export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="shell pt-24 pb-14 md:pt-32 md:pb-20">
      <Reveal as="p" className="label">
        {t.role}
        <span className="mx-2 text-line">/</span>
        {t.location}
      </Reveal>

      <Reveal
        as="h1"
        delay={60}
        className="serif mt-5 text-[clamp(2.75rem,9vw,5rem)] leading-[0.95] font-normal"
      >
        {t.name.full}
      </Reveal>

      <Reveal as="p" delay={120} className="measure mt-7 text-[1rem] leading-relaxed text-ink-soft">
        {t.hero.lede}
      </Reveal>

      <Reveal delay={180} className="mt-8">
        <Link className="btn" to={contactPath}>
          {t.hero.cta}
        </Link>
      </Reveal>

      <Reveal delay={240} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
        {socials
          .filter((item) => item.id !== 'email')
          .map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
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
