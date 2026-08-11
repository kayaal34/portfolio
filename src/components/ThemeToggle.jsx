import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

/** Icon-swapping day/night switch with a soft glow on hover. */
export function ThemeToggle({ isDark, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line bg-surface transition-colors duration-500 hover:border-accent/50 ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: 16, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -16, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Moon
              className="h-[18px] w-[18px] text-fg-soft transition-colors group-hover:text-accent"
              strokeWidth={1.6}
            />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 16, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -16, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Sun
              className="h-[18px] w-[18px] text-fg-soft transition-colors group-hover:text-accent"
              strokeWidth={1.6}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
