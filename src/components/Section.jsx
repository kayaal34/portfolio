import { Reveal } from './Reveal';

/**
 * The page's only layout: a hairline, a mono label in the left column, and
 * the content in the right one. Every section is built from it, which is
 * what makes the whole thing line up.
 */
export function Section({ id, label, children, compact = false }) {
  return (
    <section id={id} className="border-t border-line-soft">
      <div
        className={`shell grid gap-5 md:grid-cols-[8rem_1fr] md:gap-12 ${
          compact ? 'py-8 md:py-10' : 'py-14 md:py-20'
        }`}
      >
        <Reveal as="h2" className="label md:pt-[0.35rem]">
          {label}
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}

/**
 * One entry: title on the left, date on the right, notes underneath.
 * Used by experience, work and education alike — a CV row is a CV row.
 */
export function Entry({
  title,
  meta,
  period,
  stack,
  note,
  bullets = [],
  links = [],
  quiet = false,
  delay = 0,
}) {
  return (
    <Reveal as="article" delay={delay} className="py-7 first:pt-0 last:pb-0">
      {/* Title and organisation stay together; the date moves to the right of
          them on wide screens and below them on a phone, where a date wedged
          between the two would break the reading order. */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <h3
            className={`text-[1.0625rem] leading-snug ${quiet ? 'font-normal text-ink-soft' : 'font-medium text-ink'}`}
          >
            {title}
            {note ? <span className="label ml-2 align-[0.15em] normal-case">{note}</span> : null}
          </h3>
          {meta ? <p className="mt-0.5 text-[0.875rem] text-muted">{meta}</p> : null}
        </div>
        {period ? <p className="label tabular shrink-0 sm:text-right">{period}</p> : null}
      </div>

      {stack?.length ? (
        <p className="label mt-2 normal-case tracking-[0.06em]">{stack.join(' · ')}</p>
      ) : null}

      {bullets.length ? (
        <ul className="measure mt-3 space-y-2 text-[0.9375rem] text-ink-soft">
          {bullets.map((line, index) => (
            <li key={index} className="relative pl-5">
              <span aria-hidden="true" className="absolute top-0 left-0 text-faint">
                —
              </span>
              {line}
            </li>
          ))}
        </ul>
      ) : null}

      {links.length ? (
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="label hover:text-ink transition-colors"
            >
              {item.label} ↗
            </a>
          ))}
        </p>
      ) : null}
    </Reveal>
  );
}
