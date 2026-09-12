import { education } from '../data/profile';
import { useI18n } from '../i18n';
import { Entry, Section } from '../components/Section';

export function Education() {
  const { t } = useI18n();

  return (
    <Section id="education" label={t.sections.education}>
      <div className="divide-y divide-line-soft">
        {education.map((item, index) => {
          const copy = t.education[item.id];
          const period = item.current ? `${item.period} ${t.present}` : item.period;

          return (
            <Entry
              key={item.id}
              delay={index * 60}
              title={copy.degree}
              meta={`${copy.org} · ${copy.city}`}
              period={period}
              bullets={copy.notes}
            />
          );
        })}
      </div>
    </Section>
  );
}
