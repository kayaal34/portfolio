import { useEffect, useRef, useState } from 'react';

/**
 * Fades its child in once, when it first reaches the viewport.
 *
 * Deliberately the only motion on the site: 8px and 700ms, never repeated.
 * If IntersectionObserver is missing, or the visitor asked for reduced
 * motion, the content is simply visible from the start.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }

    // Anything already on screen at mount is shown straight away: waiting for
    // an observer callback there would only make the first paint look empty.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setShown(true);
          observer.unobserve(entry.target);
        });
      },
      // Starts as the element reaches the bottom edge, so fast scrolling never
      // outruns the fade and lands on blank space.
      { rootMargin: '0px 0px 5% 0px', threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
