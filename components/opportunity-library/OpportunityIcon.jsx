
const paths = {
  whatsapp: (
    <>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.3-4.6a8.5 8.5 0 1 1 16.2-3.9Z" />
      <path d="M8.5 8.5c.5 3 3 5.5 6 6l1.5-1.5-2-1.2-1 1c-1.3-.5-2.3-1.5-2.8-2.8l1-1-1.2-2-1.5 1.5Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 11v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" />
    </>
  ),
  chart: (
    <>
      <rect x="4" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="9" width="4" height="12" rx="1" />
      <rect x="16" y="3" width="4" height="18" rx="1" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M8 6h8v4H8zM9 14h.01M15 14h.01M9 18h.01M15 18h.01" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrow: <path d="M4 12h16m-7-7 7 7-7 7" />,
  sparkle: (
    <>
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
};

export default function OpportunityIcon({
  name,
  size = 24,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.sparkle}
    </svg>
  );
}
