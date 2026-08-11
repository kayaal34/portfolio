import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { profile, sectionIds } from '../data/profile';
import { useT } from '../i18n';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { scrollToSection } from '../hooks/useSmoothScroll';

/**
 * Floating glass navigation. Condenses once the page scrolls, marks the
 * active section with a shared-layout pill, and collapses to a full-screen
 * sheet under 1024px — seven localised labels need the room.
 */
export function Navbar({ active, isDark, onToggleTheme, lenisRef }) {
  const t = useT();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(() => sectionIds.map((id) => ({ id, label: t.nav[id] })), [t]);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setCondensed(value > 40);
  });

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
    // Let the overflow lock lift before Lenis measures the document.
    window.setTimeout(() => scrollToSection(id, lenisRef?.current), 10);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 sm:pt-5"
      >
        <nav
          aria-label={t.a11y.primaryNav}
          className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-700 sm:px-4 ${
            condensed
              ? 'glass-strong shadow-float'
              : 'border border-transparent bg-transparent backdrop-blur-0'
          }`}
        >
          {/* Monogram */}
          <button
            type="button"
            onClick={() => go('home')}
            className="group flex shrink-0 items-center gap-2.5 rounded-full pl-1 pr-2 py-1"
            aria-label={t.a11y.backToTop}
          >
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-line bg-surface">
              <span className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent-2/20 to-accent-3/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative font-mono text-[11px] font-semibold tracking-tight text-fg">
                {t.name.monogram}
              </span>
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg xl:block">
              {t.name.full}
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight whitespace-nowrap transition-colors duration-300 ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-surface-strong"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <a
              href={`mailto:${profile.email}`}
              className="hidden whitespace-nowrap rounded-full bg-fg px-4 py-2 text-[13px] font-medium tracking-tight text-bg transition-transform duration-300 hover:scale-[1.04] xl:inline-block"
            >
              {t.nav.cta}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface lg:hidden"
            >
              {menuOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </nav>
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
              className="absolute inset-0 bg-bg/85 backdrop-blur-2xl"
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
                    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                  },
                }}
              >
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
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
                        className={`text-[clamp(1.5rem,7vw,2rem)] font-semibold tracking-[-0.04em] ${
                          active === item.id ? 'text-gradient-accent' : 'text-fg'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}

                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="mt-8"
                >
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-mono text-xs tracking-[0.2em] text-muted uppercase"
                  >
                    {profile.email}
                  </a>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
