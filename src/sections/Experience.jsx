import { experience } from '../data/profile';
import { useI18n } from '../i18n';
import { Entry } from '../components/Entry';

export function Experience() {
  const { t } = useI18n();

  return (
    <div className="divide-y divide-line-soft">
      {experience.map((item, index) => {
        const copy = t.experience[item.id];
        const period = item.current ? `${item.period} ${t.present}` : item.period;

        return (
          <Entry
            key={item.id}
            delay={index * 60}
            title={copy.role}
            meta={copy.org}
            period={period}
            stack={item.stack}
            bullets={copy.bullets}
            quiet={item.secondary}
            links={item.link ? [{ href: item.link, label: hostOf(item.link) }] : []}
          />
        );
      })}
    </div>
  );
}

/** 'https://otrazhenie-kam.ru/' → 'otrazhenie-kam.ru' */
function hostOf(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
