import { certifications, skillGroups, spokenLanguages } from '../data/profile';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';

/**
 * Everything the CV says about capability, in one chapter: the skill groups
 * exactly as the CV groups them ("familiar with" included and labelled as
 * such), then certifications, languages and interests.
 */
export function Skills() {
  const { t } = useI18n();

  const rows = [
    ...skillGroups.map((group) => ({
      id: group.id,
      label: t.skills[group.id],
      value: (
        <span lang="en">{group.items.join(', ')}</span>
      ),
    })),
    {
      id: 'certifications',
      label: t.extras.certificationsLabel,
      value: (
        <ul className="space-y-1.5">
          {certifications.map((item) => {
            const copy = t.extras.certs[item.id];
            return (
              <li
                key={item.id}
                className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span>
                  {copy.name}
                  <span className="text-muted"> — {copy.org}</span>
                </span>
                <span className="label tabular shrink-0">{item.date}</span>
              </li>
            );
          })}
        </ul>
      ),
    },
    {
      id: 'languages',
      label: t.extras.languagesLabel,
      value: (
        <ul className="flex flex-wrap gap-x-8 gap-y-1">
          {spokenLanguages.map((item) => {
            const copy = t.extras.spoken[item.id];
            return (
              <li key={item.id}>
                {copy.name}
                <span className="text-muted"> — {copy.level}</span>
              </li>
            );
          })}
        </ul>
      ),
    },
    { id: 'interests', label: t.extras.interestsLabel, value: t.extras.interests },
  ];

  return (
    <dl className="divide-y divide-line-soft">
      {rows.map((row, index) => (
        <Reveal
          key={row.id}
          delay={Math.min(index, 5) * 40}
          className="grid gap-1 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-8"
        >
          <dt className="label sm:pt-[0.2rem]">{row.label}</dt>
          <dd className="measure text-[0.9375rem] text-ink-soft">{row.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
