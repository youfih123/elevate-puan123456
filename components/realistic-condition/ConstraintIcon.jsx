
export default function ConstraintIcon({ name, size = 24 }) {
  const paths = {
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="6" width="18" height="14" rx="3" />
        <path d="M3 10h18M7 6V4h11M16 15h2" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8v9H3v-9Z" />
        <path d="M9 20v-7h6v7" />
      </>
    ),
    laptop: (
      <>
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <path d="M2 20h20l-2-4H4l-2 4Z" />
        <path d="m10 10 2 2 3-4" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 2 2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2Z" />
        <path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17Z" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.sparkles}
    </svg>
  );
}
