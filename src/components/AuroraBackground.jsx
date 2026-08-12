const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Ambient layer behind the page.
 *
 * Deliberately static: no drifting blooms, no pointer parallax, no
 * animation at all. Two very soft washes give the page depth, a faint
 * grid gives it structure, and a whisper of grain keeps large flat areas
 * from banding. Everything else the eye should ignore.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg" />

      {/* One cool wash top-left, one warm wash bottom-right. Nothing moves. */}
      <div
        className="absolute -top-[30vh] -left-[15vw] h-[80vw] w-[80vw] min-h-[520px] min-w-[520px] rounded-full blur-[160px]"
        style={{ background: 'radial-gradient(circle, var(--glow-a), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-[35vh] -right-[20vw] h-[70vw] w-[70vw] min-h-[460px] min-w-[460px] rounded-full blur-[170px]"
        style={{ background: 'radial-gradient(circle, var(--glow-b), transparent 70%)' }}
      />

      {/* Structural grid, fading out before it reaches the fold. */}
      <div
        className="absolute inset-0 mask-fade-b"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: NOISE_URI, opacity: 'var(--noise-opacity)' }}
      />
    </div>
  );
}
