import { flushSync } from 'react-dom';
import { useHref, useNavigate } from 'react-router-dom';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * A router link that moves between pages through the browser's View
 * Transitions API, so an element carrying the same `view-transition-name` on
 * both pages — a chapter's title — travels and grows from one to the other
 * while the rest of the page cross-fades.
 *
 * React Router's own `viewTransition` prop only works with a data router;
 * this app uses <BrowserRouter>, so the transition is started here and the
 * navigation is flushed synchronously inside it, which is what lets the
 * browser capture the new page. Where the API is missing (Firefox today) or
 * motion is reduced, it is an ordinary link.
 *
 * Modified clicks (new tab, new window) are left to the browser.
 */
export function TransitionLink({ to, onClick, children, ...rest }) {
  const href = useHref(to);
  const navigate = useNavigate();

  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    let navigated = false;
    const go = () => {
      if (navigated) return;
      navigated = true;
      flushSync(() => {
        // Scrolled here, inside the transition, the jump to the top happens
        // after the old page has been captured — so it is never seen.
        window.scrollTo(0, 0);
        navigate(to);
      });
    };

    if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
      go();
      return;
    }

    document.startViewTransition(go);
    // The browser runs `go` once it has captured a frame of the old page —
    // normally within one frame. A tab that is not drawing (hidden, throttled)
    // may never capture one; the click must still take the visitor there.
    window.setTimeout(go, 400);
  };

  return (
    <a href={href} {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
