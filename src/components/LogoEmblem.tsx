export function LogoEmblem({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M24 10c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" />
        <path d="M11.5 11.5l4.5 4.5M26.5 26.5l4.5 4.5M11.5 36.5l4.5-4.5M26.5 11.5l4.5 4.5" />
      </g>
    </svg>
  );
}
