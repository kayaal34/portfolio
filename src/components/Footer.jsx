import { profile } from '../data/profile';
import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-soft">
      <div className="shell flex flex-col gap-2 py-8 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {t.name.full} · {profile.site}
        </p>
        <p className="label">{t.footer.updated}</p>
      </div>
    </footer>
  );
}
