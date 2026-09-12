import { useState } from 'react';
import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  isContactFormConfigured,
} from '../config/contactForm';
import { profile, socials } from '../data/profile';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';

const EMPTY = { name: '', email: '', message: '' };

/**
 * The contact page: the channels, and a form that actually delivers.
 *
 * Same layout language as the rest of the site — one column, hairlines,
 * mono labels — but on its own URL, so a link can point straight at it.
 */
export function ContactPage() {
  const { t } = useI18n();
  const copy = t.contact.form;

  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [problem, setProblem] = useState(null);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (problem) setProblem(null);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    if (!name || !email || !message) {
      setProblem(copy.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setProblem(copy.invalidEmail);
      return;
    }

    // Without an access key the form does the honest thing: it hands the
    // message to the visitor's own mail client rather than pretend it sent.
    if (!isContactFormConfigured) {
      const subject = encodeURIComponent(`${profile.site} — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `${profile.site} — ${name}`,
          from_name: profile.site,
          name,
          email,
          message,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setValues(EMPTY);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="shell pt-24 pb-20 md:pt-32">
      <Reveal as="p" className="label">
        {t.sections.contact}
      </Reveal>

      <Reveal
        as="h1"
        delay={60}
        className="serif mt-4 text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] font-normal"
      >
        {t.contact.title}
      </Reveal>

      <Reveal as="p" delay={120} className="measure mt-6 text-[0.9375rem] text-ink-soft">
        {t.contact.lede}
      </Reveal>

      <Reveal delay={180} className="mt-10 border-t border-line-soft pt-6">
        <dl className="grid gap-2 sm:grid-cols-2 sm:gap-x-10">
          {socials.map((item) => (
            <div key={item.id} className="flex items-baseline gap-3">
              <dt className="label w-20 shrink-0">{t.contact.labels[item.id]}</dt>
              <dd className="min-w-0 truncate text-[0.9375rem]">
                <a
                  className="link"
                  href={item.href}
                  target={item.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                >
                  {item.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal
        as="form"
        delay={240}
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 border-t border-line-soft pt-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="label">{copy.name}</span>
            <input
              className="field mt-1"
              type="text"
              name="name"
              autoComplete="name"
              placeholder={copy.namePlaceholder}
              value={values.name}
              onChange={update('name')}
            />
          </label>

          <label className="block">
            <span className="label">{copy.email}</span>
            <input
              className="field mt-1"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              value={values.email}
              onChange={update('email')}
            />
          </label>
        </div>

        <label className="mt-6 block">
          <span className="label">{copy.message}</span>
          <textarea
            className="field mt-1 resize-y"
            name="message"
            rows={5}
            placeholder={copy.messagePlaceholder}
            value={values.message}
            onChange={update('message')}
          />
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? copy.sending : copy.send}
          </button>

          {!isContactFormConfigured ? <span className="label">{copy.fallbackNote}</span> : null}

          <span role="status" aria-live="polite" className="text-[0.875rem]">
            {problem ? <span className="text-accent">{problem}</span> : null}
            {!problem && status === 'sent' ? <span className="text-muted">{copy.sent}</span> : null}
            {!problem && status === 'error' ? (
              <span className="text-accent">{copy.error.replace('{email}', profile.email)}</span>
            ) : null}
          </span>
        </div>
      </Reveal>
    </div>
  );
}
