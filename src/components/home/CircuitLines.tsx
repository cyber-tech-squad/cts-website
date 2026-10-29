export function CircuitLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 90"
      className="cts-circuit w-56 sm:w-64 md:w-80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M160 0 V80" />
      <path d="M128 0 V26 L100 54 V80" />
      <path d="M192 0 V26 L220 54 V80" />
      <path d="M96 0 V14 L56 54 V80" />
      <path d="M224 0 V14 L264 54 V80" />
      <g fill="currentColor" stroke="none">
        <circle cx="160" cy="80" r="3.5" />
        <circle cx="100" cy="80" r="3.5" />
        <circle cx="220" cy="80" r="3.5" />
        <circle cx="56" cy="80" r="3.5" />
        <circle cx="264" cy="80" r="3.5" />
      </g>
    </svg>
  );
}