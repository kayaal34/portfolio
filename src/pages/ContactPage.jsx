import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  Send,
  TriangleAlert,
} from 'lucide-react';
import { profile, socials } from '../data/profile';
import {
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  isContactFormConfigured,
} from '../config/contactForm';
import { useT } from '../i18n';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { useMotionLevel } from '../hooks/useMotionLevel';

const ICONS = { Mail, Linkedin, Github, Send };

/** Quiet inline channel link, sitting under the form. */
function ChannelLink({ item, label }) {
  const Icon = ICONS[item.icon] ?? Mail;
  const external = item.href.startsWith('http');

  return (
    <a
      href={item.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className="group inline-flex min-h-11 items-center gap-2.5 py-3 transition-colors duration-500 sm:min-h-0 sm:py-2"
      title={item.value}
    >
      <Icon
        className="h-4 w-4 shrink-0 text-faint transition-colors duration-500 group-hover:text-fg"
        strokeWidth={1.5}
      />
      <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-fg">
        {label}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
        />
      </span>
      <ArrowUpRight
        className="h-3 w-3 shrink-0 text-faint opacity-0 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
        strokeWidth={1.8}
      />
    </a>
  );
}

/** Coloured status panel shown under the form after a submit attempt. */
function StatusNote({ tone, icon: Icon, title, children, gentle }) {
  const tones = {
    success: 'border-emerald-400/30 bg-emerald-400/8 text-emerald-400',
    error: 'border-red-400/30 bg-red-400/8 text-red-400',
    info: 'border-accent/30 bg-accent/8 text-accent',
  };

  return (
    <motion.div
      initial={gentle ? { opacity: 0 } : { opacity: 0, y: 10, height: 0 }}
      animate={gentle ? { opacity: 1 } : { opacity: 1, y: 0, height: 'auto' }}
      exit={gentle ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
      transition={{ duration: gentle ? 0.35 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className={`mt-6 flex gap-3 rounded-2xl border p-4 text-left ${tones[tone]}`}>
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
 *
 * Labels sit above their fields rather than floating inside them — at this
 * width that reads faster and leaves the inputs completely clean.
 */
function ContactForm({ copy }) {
  const [status, setStatus] = useState('idle');
  const gentle = useMotionLevel() === 'gentle';

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Captured before any await — React clears currentTarget afterwards.
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: only bots fill a field they cannot see.
    if (data.get('botcheck')) return;

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = copy.mailSubject;

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
          subject: `[Portfolio] ${subject} — ${name}`,
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

  const labelClass =
    'mb-2.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-faint transition-colors duration-300';
  const fieldClass =
    'w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-[16px] font-light text-fg outline-none transition-colors duration-400 placeholder:text-faint/60 focus:border-fg/40 disabled:opacity-60 sm:text-[15px]';

  const mailLink = (
    <a
      href={`mailto:${profile.email}`}
      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {profile.email}
    </a>
  );

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl text-left">
      {/* Spam trap — hidden from people, irresistible to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {copy.fields.name}
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            maxLength={100}
            disabled={submitting}
            autoComplete="name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {copy.fields.email}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={150}
            disabled={submitting}
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="cf-message" className={labelClass}>
          {copy.fields.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={7}
          required
          maxLength={4000}
          disabled={submitting}
          className={`${fieldClass} resize-y min-h-40`}
        />
      </div>

      {/* Delivery mode, stated plainly rather than hidden in a badge. */}
      <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
        {isContactFormConfigured ? (
          <Inbox className="h-3 w-3" strokeWidth={1.8} />
        ) : (
          <MailOpen className="h-3 w-3" strokeWidth={1.8} />
        )}
        {isContactFormConfigured ? copy.formBadgeLive : copy.formBadgeMail}
      </p>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={submitting}
          className="group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full border border-fg/25 px-9 py-3.5 text-[14px] font-light tracking-[0.02em] text-fg transition-colors duration-500 hover:border-fg/60 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {/* Fill sweeps in from the left on hover. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-fg transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
          />
          <span className="relative transition-colors duration-500 group-hover:text-bg">
            {submitting ? copy.submitting : copy.submit}
          </span>
          {submitting ? (
            <LoaderCircle
              className={`relative h-4 w-4 ${gentle ? '' : 'animate-spin'}`}
              strokeWidth={1.6}
            />
          ) : (
            <Send
              className="relative h-4 w-4 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-bg"
              strokeWidth={1.6}
            />
          )}
        </button>
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <StatusNote
              key="success"
              tone="success"
              icon={Check}
              title={copy.successTitle}
              gentle={gentle}
            >
              {copy.successBody}
            </StatusNote>
          )}

          {status === 'error' && (
            <StatusNote
              key="error"
              tone="error"
              icon={TriangleAlert}
              title={copy.errorTitle}
              gentle={gentle}
            >
              {copy.errorBefore}
              {mailLink}
              {copy.errorAfter}
            </StatusNote>
          )}

          {status === 'fallback' && (
            <StatusNote
              key="fallback"
              tone="info"
              icon={MailOpen}
              title={copy.fallbackTitle}
              gentle={gentle}
            >
              {copy.fallbackBefore}
              {mailLink}
              {copy.fallbackAfter}
            </StatusNote>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export function ContactPage() {
  const t = useT();

  return (
    // A page, not a section: it owns the viewport, so it needs the top
    // padding the fixed mobile bar would otherwise sit on top of.
    <section
      id="contact"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-32 pb-24 sm:pt-36 lg:px-0 lg:pt-40 lg:pb-32"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          accent={t.contact.accent}
          align="center"
        />

        <Reveal delay={0.06} className="mx-auto mt-8 max-w-xl">
          <p className="text-center text-[15px] font-light leading-[1.75] text-muted sm:text-base">
            {t.contact.pageLead}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 sm:mt-16">
          <ContactForm copy={t.contact} />
        </Reveal>

        {/* Channels — quiet, secondary to the form. */}
        <Reveal delay={0.14} className="mx-auto mt-20 max-w-2xl">
          <div className="h-px w-full bg-line" />
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-9 gap-y-2">
            {socials.map((item) => (
              <li key={item.id}>
                <ChannelLink item={item} label={t.contact.channels[item.id]} />
              </li>
            ))}
          </ul>

          <p className="mt-8 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
            {t.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
