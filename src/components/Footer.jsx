import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { socials } from '../data/profile';
import { useT } from '../i18n';
import { scrollToSection } from '../hooks/useSmoothScroll';

const ICONS = { Mail, Phone, Linkedin, Github, Send };

export function Footer({ lenisRef }) {
  const t = useT();
  const prefersReduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16 pb-10">
      {/* Oversized wordmark that bleeds off the bottom edge */}
      <motion.div
        aria-hidden="true"
        initial={prefersReduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none select-none px-4"
      >
        <span className="block text-center text-[clamp(3.5rem,17vw,15rem)] font-semibold leading-[0.78] tracking-[-0.06em] text-fg/[0.055]">
          {t.name.full}
        </span>
      </motion.div>

      <div className="shell relative mt-12">
        <div className="hairline" />

        <div className="mt-8 flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium tracking-tight text-fg">{t.name.full}</p>
            <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
              {t.role} · {t.location}
            </p>
          </div>

          {/* Social icon rail */}
          <ul className="flex items-center gap-2">
            {socials.map((item) => {
              const Icon = ICONS[item.icon] ?? Mail;
              const external = item.href.startsWith('http');
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer noopener' : undefined}
                    aria-label={t.contact.channels[item.id]}
                    title={t.contact.channels[item.id]}
                    className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-line bg-surface transition-colors duration-500 hover:border-accent/50"
                  >
                    <span className="absolute inset-0 translate-y-full bg-gradient-to-br from-accent/25 to-accent-2/25 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                    <Icon
                      className="relative h-[17px] w-[17px] text-fg-soft transition-colors duration-500 group-hover:text-accent"
                      strokeWidth={1.6}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* The language switcher lives in the fixed navbar, which is always
              on screen — repeating it here would be clipped by the footer's
              overflow mask. */}
          <button
            type="button"
            onClick={() => scrollToSection('home', lenisRef?.current)}
            className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-faint transition-colors duration-400 hover:text-fg"
          >
            {t.footer.backToTop}
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent/50">
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </span>
          </button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-7 text-center md:flex-row md:text-left">
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-faint">
            © {year} {t.name.full}. {t.footer.rights}
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-faint">
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
