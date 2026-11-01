
const icons = {
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="3" />
      <path d="M3 10h18M7 6V4h11M16 15h2" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h8l4 4v14H5V3h2Z" />
      <path d="M14 3v5h5M8 12h8M8 16h8" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h17" />
      <rect x="5" y="12" width="3" height="8" rx="1" />
      <rect x="11" y="8" width="3" height="12" rx="1" />
      <rect x="17" y="4" width="3" height="16" rx="1" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M8.2 14.5A7 7 0 1 1 15.8 14.5c-.8.7-1.3 1.4-1.5 2.5h-4.6c-.2-1.1-.7-1.8-1.5-2.5Z" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M5.8 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12.2-2" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M8 6h8v4H8zM9 14h.01M15 14h.01M9 18h.01M15 18h.01" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
};

export default function FinanceIcon({ name, size = 24 }) {
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
      {icons[name] || icons.wallet}
    </svg>
  );
}
