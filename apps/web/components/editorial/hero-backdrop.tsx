/**
 * Static blueprint topology for the homepage hero.
 * Decorative only — no client JavaScript or animation.
 */

export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute -right-[8%] top-[6%] h-[min(78%,30rem)] w-[min(88%,44rem)] text-accent opacity-[0.12] md:opacity-[0.16]"
        fill="none"
        viewBox="0 0 440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            height="32"
            id="hero-grid"
            patternUnits="userSpaceOnUse"
            width="32"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect fill="url(#hero-grid)" height="320" width="440" />
        <circle cx="72" cy="88" fill="currentColor" fillOpacity="0.55" r="3" />
        <circle cx="198" cy="56" fill="currentColor" fillOpacity="0.55" r="3" />
        <circle
          cx="312"
          cy="124"
          fill="currentColor"
          fillOpacity="0.55"
          r="3"
        />
        <circle
          cx="156"
          cy="196"
          fill="currentColor"
          fillOpacity="0.55"
          r="3"
        />
        <circle
          cx="284"
          cy="228"
          fill="currentColor"
          fillOpacity="0.55"
          r="3"
        />
        <circle
          cx="368"
          cy="168"
          fill="currentColor"
          fillOpacity="0.4"
          r="2.5"
        />
        <path
          d="M72 88 L198 56 L312 124 M198 56 L156 196 M312 124 L284 228 M312 124 L368 168"
          stroke="currentColor"
          strokeDasharray="4 6"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <path
          d="M24 248 H416 M24 248 V40"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
        <rect
          height="52"
          rx="1"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
          width="72"
          x="248"
          y="168"
        />
        <path
          d="M260 180 H308 M260 192 H296 M260 204 H304"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="0.75"
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_72%_18%,var(--color-accent-muted),transparent_62%)]" />
    </div>
  );
}
