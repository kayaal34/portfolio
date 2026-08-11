import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Github,
  Inbox,
  Linkedin,
  LoaderCircle,
  Mail,
  MailOpen,
  MapPin,
  Phone,
  Send,
  TriangleAlert,
} from 'lucide-react';
import { profile, socials } from '../../data/profile';
import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  isContactFormConfigured,
} from '../../config/contactForm';
import { useT } from '../../i18n';
import { SectionHeading } from '../SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../Reveal';
import { MagneticButton } from '../MagneticButton';

const ICONS = { Mail, Phone, Linkedin, Github, Send };

function ContactRow({ item, label }) {
  const Icon = ICONS[item.icon] ?? Mail;
  const external = item.href.startsWith('http');

  return (
    <a
      href={item.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className="group relative flex items-center gap-5 border-b border-line py-5 transition-colors duration-500 hover:border-accent/40"
    >
      {/* Sliding wash */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -inset-x-4 -z-10 origin-left scale-x-0 rounded-xl bg-gradient-to-r from-accent/10 to-transparent transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />

      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface transition-colors duration-500 group-hover:border-accent/50">
        <Icon
          className="h-[17px] w-[17px] text-fg-soft transition-colors duration-500 group-hover:text-accent"
          strokeWidth={1.6}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          {label}
        </span>
        <span className="mt-1 block truncate text-[15px] tracking-tight text-fg sm:text-base">
          {item.value}
        </span>
      </span>

      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        strokeWidth={1.7}
      />
    </a>
  );
}

/** Coloured status panel shown under the form after a submit attempt. */
function StatusNote({ tone, icon: Icon, title, children }) {
  const tones = {
    success: 'border-emerald-400/30 bg-emerald-400/8 text-emerald-400',
    error: 'border-red-400/30 bg-red-400/8 text-red-400',
    info: 'border-accent/30 bg-accent/8 text-accent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className={`mt-4 flex gap-3 rounded-2xl border p-4 ${tones[tone]}`}>
        <Icon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold tracking-tight">{title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">{children}</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Working contact form.
 *
 * With `VITE_WEB3FORMS_KEY` set, submissions are relayed by Web3Forms
 * straight to the inbox the key belongs to. Without a key it degrades to
 * composing the same message in the visitor's own mail client, so the form
 * is never a dead end.
 */
function ContactForm({ copy }) {
  const [status, setStatus] = useState('idle');
  const prefersReduced = useReducedMotion();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Captured before any await — React clears currentTarget afterwards.
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: only bots fill a field they cannot see.
    if (data.get('botcheck')) return;

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim() || copy.mailSubject;
    const message = String(data.get('message') ?? '').trim();

    if (!isContactFormConfigured) {
      const body = `${message}\n\n—\n${name}\n${email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus('fallback');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Portfolio] ${subject}`,
          from_name: name,
          replyto: email,
          name,
          email,
          message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        form.reset();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const submitting = status === 'submitting';

  const fieldClass =
    'peer w-full rounded-xl border border-line bg-surface px-4 pt-6 pb-2.5 text-[14.5px] text-fg outline-none transition-colors duration-400 placeholder:text-transparent focus:border-accent/60 disabled:opacity-60';
  const labelClass =
    'pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint transition-all duration-300 peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-[12px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-accent';

  const mailLink = (
    <a
      href={`mailto:${profile.email}`}
      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {profile.email}
    </a>
  );

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--glow-b), transparent 70%)' }}
      />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-fg">{copy.formTitle}</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint">
          {isContactFormConfigured ? (
            <Inbox className="h-3 w-3" strokeWidth={1.8} />
          ) : (
            <MailOpen className="h-3 w-3" strokeWidth={1.8} />
          )}
          {isContactFormConfigured ? copy.formBadgeLive : copy.formBadgeMail}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative mt-7 flex flex-col gap-3.5"
        noValidate={false}
      >
        {/* Spam trap — hidden from people, irresistible to bots. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div className="relative">
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              maxLength={100}
              disabled={submitting}
              placeholder={copy.fields.name}
              className={fieldClass}
              autoComplete="name"
            />
            <label htmlFor="cf-name" className={labelClass}>
              {copy.fields.name}
            </label>
          </div>
          <div className="relative">
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              maxLength={150}
              disabled={submitting}
              placeholder={copy.fields.email}
              className={fieldClass}
              autoComplete="email"
            />
            <label htmlFor="cf-email" className={labelClass}>
              {copy.fields.email}
            </label>
          </div>
        </div>

        <div className="relative">
          <input
            id="cf-subject"
            name="subject"
            type="text"
            maxLength={150}
            disabled={submitting}
            placeholder={copy.fields.subject}
            className={fieldClass}
            autoComplete="off"
          />
          <label htmlFor="cf-subject" className={labelClass}>
            {copy.fields.subject}
          </label>
        </div>

        <div className="relative">
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required
            maxLength={4000}
            disabled={submitting}
            placeholder={copy.fields.message}
            className={`${fieldClass} resize-none`}
          />
          <label htmlFor="cf-message" className={labelClass}>
            {copy.fields.message}
          </label>
        </div>

        <MagneticButton
          type="submit"
          strength={0.2}
          disabled={submitting}
          className="group relative mt-2 inline-flex items-center justify-center gap-2 self-start overflow-hidden rounded-full bg-fg px-6 py-3.5 text-sm font-medium tracking-tight text-bg disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
          <span className="relative">{submitting ? copy.submitting : copy.submit}</span>
          {submitting ? (
            <LoaderCircle
              className={`relative h-4 w-4 ${prefersReduced ? '' : 'animate-spin'}`}
              strokeWidth={1.8}
            />
          ) : (
            <Send
              className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          )}
        </MagneticButton>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <StatusNote key="success" tone="success" icon={Check} title={copy.successTitle}>
                {copy.successBody}
              </StatusNote>
            )}

            {status === 'error' && (
              <StatusNote key="error" tone="error" icon={TriangleAlert} title={copy.errorTitle}>
                {copy.errorBefore}
                {mailLink}
                {copy.errorAfter}
              </StatusNote>
            )}

            {status === 'fallback' && (
              <StatusNote key="fallback" tone="info" icon={MailOpen} title={copy.fallbackTitle}>
                {copy.fallbackBefore}
                {mailLink}
                {copy.fallbackAfter}
              </StatusNote>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

export function Contact() {
  const t = useT();

  return (
    <section id="contact" className="relative scroll-mt-28 py-28 sm:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          accent={t.contact.accent}
          lead={t.contact.lead}
        />

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Channels */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.035em] text-fg">
                {t.contact.statement}{' '}
                <span className="text-gradient-accent">{t.contact.statementAccent}</span>
              </p>
            </Reveal>

            <RevealGroup className="mt-10" stagger={0.07}>
              {socials.map((item) => (
                <RevealItem key={item.id}>
                  <ContactRow item={item} label={t.contact.channels[item.id]} />
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-8">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.7} />
                {t.location}
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal direction="left" delay={0.08} className="lg:col-span-6">
            <ContactForm copy={t.contact} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
