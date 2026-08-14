import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { contactPath, sectionIds } from '../data/profile';
import { useT } from '../i18n';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useMotionLevel } from '../hooks/useMotionLevel';
import { scrollToSection } from '../hooks/useSmoothScroll';

const EASE = [0.16, 1, 0.3, 1];

/**
 * One row of the side rail: label on the left, a rule on the right.
 *
 * The rule is the whole interaction — it grows toward the label on hover
 * and stays long while the section is in view. No boxes, no pills.
 */
function RailItem({ label, active, onClick, delay, gentle }) {
  return (
    <motion.li
      initial={gentle ? { opacity: 0 } : { opacity: 0, x: 14 }}
      animate={gentle ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={{ duration: gentle ? 0.5 : 0.8, delay, ease: EASE }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? 'true' : undefined}
        className="group flex w-full items-center justify-end gap-3.5 py-1.5"
      >
        <span
          className={`text-[13.5px] font-light tracking-[0.01em] whitespace-nowrap transition-colors duration-500 ${
            active ? 'text-fg' : 'text-faint group-hover:text-fg'
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`h-px shrink-0 origin-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? 'w-9 bg-fg' : 'w-3.5 bg-line-strong group-hover:w-9 group-hover:bg-fg-soft'
          }`}
        />
      </button>
    </motion.li>
  );
}

/**
 * Navigation.
 *
 * Above 1024px there is no top bar at all: the section rail runs down the
 * right edge and the language and theme controls sit in the bottom-left.
 * Below that it collapses to a compact top bar and a full-screen sheet,
 * where a rail would not fit.
 */
export function Navbar({ active, isDark, onToggleTheme, lenisRef }) {
  const t = useT();
  const gentle = useMotionLevel() === 'gentle';
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  const navItems = useMemo(() => sectionIds.map((id) => ({ id, label: t.nav[id] })), [t]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id) => {
    setMenuOpen(false);

    if (!onHome) {
      // Come home first, then scroll once the sections actually exist.
      navigate('/');
      // The sections only exist after the home route renders.
      window.setTimeout(() => scrollToSection(id, lenisRef?.current, { immediate: true }), 140);
      return;
    }

    // Let the overflow lock lift before Lenis measures the document.
    window.setTimeout(() => scrollToSection(id, lenisRef?.current), 10);
  };

  const goContact = () => {
    setMenuOpen(false);
    navigate(contactPath);
  };

  const fadeIn = (delay) => ({
    initial: gentle ? { opacity: 0 } : { opacity: 0, y: -10 },
    animate: gentle ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: gentle ? 0.5 : 0.8, delay, ease: EASE },
  });

  return (
    <>
      {/* ---------------- Desktop: corners + right rail ---------------- */}

      {/* Section rail, right edge */}
      <nav
        aria-label={t.a11y.primaryNav}
        className="fixed right-7 top-1/2 z-[80] hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col items-end gap-1.5">
          {navItems.map((item, i) => (
            <RailItem
              key={item.id}
              label={item.label}
              active={active === item.id}
              onClick={() => go(item.id)}
              delay={0.25 + i * 0.06}
              gentle={gentle}
            />
          ))}

          <motion.li
            initial={gentle ? { opacity: 0 } : { opacity: 0, x: 14 }}
            animate={gentle ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{
              duration: gentle ? 0.5 : 0.8,
              delay: 0.25 + navItems.length * 0.06,
              ease: EASE,
            }}
            className="mt-4 flex w-full justify-end"
          >
            <button
              type="button"
              onClick={goContact}
              aria-current={active === 'contact' ? 'page' : undefined}
              className={`group relative overflow-hidden rounded-full px-4 py-2 text-[12px] font-light tracking-[0.02em] whitespace-nowrap transition-colors duration-500 ${
                active === 'contact'
                  ? 'border border-fg bg-fg text-bg'
                  : 'border border-fg/25 text-fg hover:border-fg/60'
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-fg transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative transition-colors duration-500 group-hover:text-bg">
                {t.nav.cta}
              </span>
            </button>
          </motion.li>
        </ul>
      </nav>

      {/* Language + theme, bottom-left */}
      <motion.div
        {...fadeIn(0.35)}
        className="fixed bottom-7 left-7 z-[80] hidden items-center gap-2 lg:flex"
      >
        <LanguageSwitcher align="left" />
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </motion.div>

      {/* ---------------- Mobile / tablet: compact top bar ---------------- */}
      <motion.header
        {...fadeIn(0.15)}
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 lg:hidden"
      >
        <div className="glass-strong flex w-full items-center justify-between gap-3 rounded-full px-3 py-2 shadow-float">
          <button
            type="button"
            onClick={() => go('home')}
            aria-label={t.a11y.backToTop}
            className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface">
              <span className="font-mono text-[11px] font-medium tracking-tight text-fg">
                {t.name.monogram}
              </span>
            </span>
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface"
            >
              {menuOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[75] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-bg/90 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />

            {/* Scroll container + min-h-full list: the menu stays centred on
                tall screens and scrolls instead of clipping on short ones. */}
            <div className="relative h-full overflow-y-auto overscroll-contain">
              <motion.ul
                className="flex min-h-full flex-col justify-center gap-1 px-8 py-24"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: {
                    transition: { staggerChildren: gentle ? 0.03 : 0.06, delayChildren: 0.08 },
                  },
                }}
              >
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: gentle ? { opacity: 0 } : { opacity: 0, y: 26, filter: 'blur(8px)' },
                      show: gentle
                        ? { opacity: 1, transition: { duration: 0.45 } }
                        : {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            transition: { duration: 0.55, ease: EASE },
                          },
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => go(item.id)}
                      className="flex w-full items-baseline gap-4 border-b border-line py-4 text-left"
                    >
                      <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                      <span
                        className={`font-serif text-[clamp(1.6rem,7vw,2.1rem)] font-normal tracking-[-0.02em] ${
                          active === item.id ? 'text-fg italic' : 'text-muted'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}

                <motion.li
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 0.5 } },
                  }}
                  className="mt-10"
                >
                  <button
                    type="button"
                    onClick={() => {
                      goContact();
                    }}
                    className="w-full rounded-full border border-fg/25 py-3.5 text-[13px] font-light tracking-[0.02em] text-fg transition-colors duration-500 hover:border-fg/60"
                  >
                    {t.nav.cta}
                  </button>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
