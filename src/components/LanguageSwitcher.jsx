import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useI18n } from '../i18n';

/**
 * Language switcher: a glass pill that opens a compact dropdown.
 * Full keyboard support (Arrow keys / Home / End / Enter / Escape),
 * click-outside to dismiss, and a shared-layout highlight on the
 * active row so the selection glides rather than jumps.
 */
export function LanguageSwitcher({ className = '', align = 'right' }) {
  const { language, setLanguage, languages, t } = useI18n();
  const [open, setOpen] = useState(false);
  // Menu asagi sigmiyorsa yukari acilir; anahtar sol-alt kosede de duruyor.
  const [dropUp, setDropUp] = useState(false);
  const [focusIndex, setFocusIndex] = useState(() =>
    Math.max(
      0,
      languages.findIndex((item) => item.code === language)
    )
  );

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const prefersReduced = useReducedMotion();

  const active = languages.find((item) => item.code === language) ?? languages[0];

  // Dismiss on outside pointer or Escape.
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Move real DOM focus with the roving index while the list is open.
  useEffect(() => {
    if (!open) return;
    optionRefs.current[focusIndex]?.focus();
  }, [open, focusIndex]);

  const openList = () => {
    // Kaba bir tahmin degil: satir yuksekligi x dil sayisi + kenar bosluklari.
    const menuHeight = languages.length * 42 + 16;
    const rect = triggerRef.current?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - (rect?.bottom ?? 0);
    setDropUp(spaceBelow < menuHeight + 16);
    setFocusIndex(
      Math.max(
        0,
        languages.findIndex((item) => item.code === language)
      )
    );
    setOpen(true);
  };

  const choose = (code) => {
    setLanguage(code);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event) => {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      openList();
    }
  };

  const onOptionKeyDown = (event, index) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusIndex((index + 1) % languages.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusIndex((index - 1 + languages.length) % languages.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setFocusIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setFocusIndex(languages.length - 1);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.a11y.language}: ${active.native}`}
        title={t.a11y.chooseLanguage}
        className="group relative flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface pl-2.5 pr-2 transition-colors duration-500 hover:border-accent/50"
      >
        <Globe
          className="h-[15px] w-[15px] text-fg-soft transition-colors duration-500 group-hover:text-accent"
          strokeWidth={1.6}
        />
        <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-fg">
          {active.short}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          <ChevronDown className="h-3.5 w-3.5 text-faint" strokeWidth={1.8} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t.a11y.chooseLanguage}
            initial={
              prefersReduced ? { opacity: 0 } : { opacity: 0, y: dropUp ? 8 : -8, scale: 0.94 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: dropUp ? 6 : -6, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.6 }}
            style={{
              transformOrigin: `${dropUp ? 'bottom' : 'top'} ${align === 'right' ? 'right' : 'left'}`,
            }}
            className={`glass-strong absolute z-50 w-[11.5rem] overflow-hidden rounded-2xl p-1.5 shadow-float ${
              dropUp ? 'bottom-[calc(100%+0.6rem)]' : 'top-[calc(100%+0.6rem)]'
            } ${align === 'right' ? 'right-0' : 'left-0'}`}
          >
            {languages.map((item, index) => {
              const isActive = item.code === language;
              return (
                <li key={item.code} role="none">
                  <button
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    lang={item.code}
                    tabIndex={index === focusIndex ? 0 : -1}
                    onClick={() => choose(item.code)}
                    onKeyDown={(event) => onOptionKeyDown(event, index)}
                    onPointerEnter={() => setFocusIndex(index)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-300 ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="lang-active"
                        className="absolute inset-0 -z-10 rounded-xl border border-line-strong bg-surface"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}

                    <span className="font-mono text-[10px] tracking-[0.14em] text-faint">
                      {item.short}
                    </span>
                    <span className="flex-1 text-[13.5px] font-medium tracking-tight">
                      {item.native}
                    </span>

                    <span className="grid h-4 w-4 place-items-center">
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.4} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
