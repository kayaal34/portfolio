import { useState } from 'react';
import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  isContactFormConfigured,
} from '../config/contactForm';
import { profile } from '../data/profile';
import { useDocumentTitle, useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';

const EMPTY = { name: '', email: '', message: '' };

/**
 * The contact page: a form that actually delivers, and nothing else. My own
 * addresses are under the opening on the home page; this page is only for
 * the visitor to write.
 */
export function ContactPage() {
  const { t } = useI18n();
  useDocumentTitle(`${t.contact.title} — ${t.name.full}`);
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

      <Reveal
        as="form"
        delay={180}
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
