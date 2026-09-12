import { profile, resumeFiles, socials } from '../data/profile';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';

/**
 * The opening: who, what, where — then two paragraphs and the ways to
 * reach me. No slogan, no animated headline; the name is the headline.
 */
export function Hero() {
  const { t, language } = useI18n();

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

      <div className="measure mt-8 space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft">
        {t.hero.lede.map((paragraph, index) => (
          <Reveal as="p" key={paragraph.slice(0, 24)} delay={120 + index * 60}>
            {paragraph}
          </Reveal>
        ))}
      </div>

      <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
        <a className="btn" href={resumeFiles[language]} download>
          {t.hero.resume}
        </a>
        <a className="btn" href={`mailto:${profile.email}`}>
          {t.hero.email}
        </a>
      </Reveal>

      <Reveal delay={300} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
        {socials
          .filter((item) => item.id !== 'email')
          .map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="label hover:text-ink transition-colors"
            >
              {item.value}
            </a>
          ))}
      </Reveal>
    </section>
  );
}
