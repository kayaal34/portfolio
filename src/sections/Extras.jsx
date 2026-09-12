import { certifications, spokenLanguages } from '../data/profile';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';

/**
 * The three short lists that close the CV. Each keeps its own label in the
 * left column rather than sitting under a shared heading that would repeat
 * the same words twice.
 */
export function Extras() {
  const { t } = useI18n();

  return (
    <>
      <Section id="certifications" label={t.extras.certificationsLabel} compact>
        <ul className="space-y-2 text-[0.9375rem] text-ink-soft">
          {certifications.map((item, index) => {
            const copy = t.extras.certs[item.id];
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={index * 50}
                className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span>
                  {copy.name}
                  <span className="text-muted"> — {copy.org}</span>
                </span>
                <span className="label tabular shrink-0">{item.date}</span>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section id="languages" label={t.extras.languagesLabel} compact>
        <Reveal
          as="ul"
          className="flex flex-wrap gap-x-8 gap-y-1 text-[0.9375rem] text-ink-soft"
        >
          {spokenLanguages.map((item) => {
            const copy = t.extras.spoken[item.id];
            return (
              <li key={item.id}>
                {copy.name}
                <span className="text-muted"> — {copy.level}</span>
              </li>
            );
          })}
        </Reveal>
      </Section>

      <Section id="interests" label={t.extras.interestsLabel} compact>
        <Reveal as="p" className="measure text-[0.9375rem] text-ink-soft">
          {t.extras.interests}
        </Reveal>
      </Section>
    </>
  );
}
