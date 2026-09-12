/**
 * A chapter of the CV: a title you press, and the content that opens under it.
 *
 * Closed, the title sits quiet and small; open, it grows and inks in, so the
 * page reads as an index of four chapters rather than one long column. Only
 * one is open at a time — that is what makes opening one feel like arriving
 * somewhere.
 *
 * The height animates through `grid-template-rows` (0fr → 1fr), which is the
 * only way to transition to an unknown height without measuring it in JS.
 * Closed content is `invisible`, so it is out of the tab order and out of the
 * accessibility tree while it is collapsed.
 */
export function Chapter({ id, title, meta, open, instant = false, onToggle, children }) {
  const panelId = `${id}-panel`;
  // `instant` skips the closing animation when another chapter is taking over
  // (see Home.jsx) — a direct close still animates.
  const speed = instant ? 'duration-0' : 'duration-500';

  return (
    // Open, a chapter is at least one screen tall below the header: pressing a
    // title opens a screen, not a strip, and even the last chapter has room to
    // scroll up to the top of the window.
    //
    // That height is given instantly on open — only the content animates in.
    // If it grew over 500ms, the page would still be too short at the moment
    // Home.jsx starts scrolling, and the scroll would stop early. Closing by
    // pressing the open title again does ease the space away.
    <section
      id={id}
      className={`scroll-mt-14 border-t border-line-soft transition-[min-height] ease-out ${
        open || instant ? 'duration-0' : 'duration-500'
      } ${open ? 'min-h-[calc(100svh-3.5rem)]' : 'min-h-0'}`}
    >
      <div className="shell">
        <h2>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="group flex w-full items-baseline justify-between gap-6 py-7 text-left md:py-9"
          >
            <span
              className={`serif transition-[font-size,color] ease-out ${speed} ${
                open
                  ? 'text-[clamp(2rem,5.2vw,3.25rem)] leading-[1.05] text-ink'
                  : 'text-[clamp(1.5rem,3.6vw,2rem)] leading-[1.1] text-muted group-hover:text-ink'
              }`}
            >
              {title}
            </span>

            <span className="label tabular flex shrink-0 items-center gap-3 pt-2">
              {meta}
              {/* Plus when closed, minus when open: the upright stroke turns
                  flat onto the other one. */}
              <span aria-hidden="true" className="relative inline-block size-2.5">
                <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                <span
                  className={`absolute inset-x-0 top-1/2 h-px bg-current transition-transform ease-out ${speed} ${
                    open ? 'rotate-0' : 'rotate-90'
                  }`}
                />
              </span>
            </span>
          </button>
        </h2>

        <div
          id={panelId}
          className={`grid transition-all ease-out ${speed} ${
            open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pb-14 md:pb-20">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
