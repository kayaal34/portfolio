import { skillGroups } from '../data/profile';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';

/**
 * Grouped exactly as the CV groups them, "familiar with" included and
 * labelled as such — a flat wall of logos claims the same fluency for
 * everything on it.
 */
export function Skills() {
  const { t } = useI18n();

  return (
    <Section id="skills" label={t.sections.skills}>
      <dl className="divide-y divide-line-soft">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={Math.min(index, 4) * 50}
            className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
          >
            <dt className="label sm:pt-[0.2rem]">{t.skills[group.id]}</dt>
            <dd className="text-[0.9375rem] text-ink-soft">{group.items.join(', ')}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
