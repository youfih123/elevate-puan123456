
const paths = {
  experiment: (
    <>
      <path d="M9 3h6M10 3v7l-5.5 8.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 10V3" />
      <path d="M8 15h8" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="3" />
      <path d="M3 10h18M7 6V4h11M16 15h2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V5M4 20h17" />
      <path d="m8 15 4-4 3 2 5-7M17 6h3v3" />
    </>
  ),
  star: (
    <path d="m12 2 2.9 6.1 6.7.9-4.8 4.7 1.2 6.7-6-3.2-6 3.2 1.2-6.7L2.4 9l6.7-.9L12 2Z" />
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M8.2 14.5A7 7 0 1 1 15.8 14.5c-.8.7-1.3 1.4-1.5 2.5h-4.6c-.2-1.1-.7-1.8-1.5-2.5Z" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M5.8 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12.2-2" />
    </>
  ),
  edit: (
    <>
      <path d="m4 20 4.5-1 11-11a2 2 0 0 0-3-3l-11 11L4 20Z" />
      <path d="m14.5 7.5 3 3" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5" />
    </>
  ),
  message: (
    <path d="M20 11a8 8 0 0 1-8 8 9 9 0 0 1-4-.9L3 20l1.9-5A8 8 0 1 1 20 11Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  close: <path d="M5 5l14 14M19 5 5 19" />,
};

export default function OverviewIcon({ name, size = 24 }) {
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
      aria-hidden="true"
    >
      {paths[name] || paths.star}
    </svg>
  );
}
