import { projects } from '../data/profile';
import { useI18n } from '../i18n';
import { Entry } from '../components/Entry';

/**
 * The CV's project list, in the CV's order. Every entry that has a public
 * repository links to it; the ones that do not simply say less.
 */
export function Projects() {
  const { t } = useI18n();

  return (
    <div className="divide-y divide-line-soft">
      {projects.map((item, index) => {
        const copy = t.projects[item.id];

        return (
          <Entry
            key={item.id}
            delay={Math.min(index, 4) * 50}
            title={item.name ?? copy.name}
            meta={copy.summary}
            period={item.period}
            stack={item.stack}
            note={item.inProgress ? `· ${t.projects.inProgress}` : null}
            bullets={copy.bullets}
            links={item.repo ? [{ href: item.repo, label: t.projects.repo }] : []}
          />
        );
      })}
    </div>
  );
}
