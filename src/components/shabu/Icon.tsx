import type {CSSProperties, ReactNode} from 'react';

const paths: Record<string, ReactNode> = {
  pot: (
    <>
      <path d="M4 11h16l-1.5 8h-13L4 11Z" />
      <path d="M2 12h2m16 0h2M7 22h10M9 7c-3-2 2-3 0-5m6 5c-3-2 2-3 0-5M3 9h18" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  left: <path d="m14 5-7 7 7 7" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  down: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C6 2 1 10 7 17c7 6 15-1 13-14Z" />
      <path d="m4 21 11-11m-5 5v-4m0 4h5" />
    </>
  ),
  beef: (
    <>
      <path d="M4 7C8 2 15 2 19 7s3 11-2 13-7-1-9-3S0 12 4 7Z" />
      <path d="M8 8c3-2 5-1 7 1s2 5 0 6-4-1-6-2-3-3-1-5Z" />
    </>
  ),
  shrimp: (
    <>
      <path d="M20 10a8 8 0 1 0-8 11h4l-1-4h-3a4 4 0 1 1 4-4l5-1-1-2Z" />
      <path d="m19 8 2-4M6 7l3 3m-5 3h4m-1 6 3-3m5 1-1 4" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  cup: (
    <>
      <path d="M5 8h12v12H5zM17 10h2a3 3 0 1 1 0 6h-2M7 2v3m5-3v3M3 22h16" />
    </>
  ),
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  ),
  truck: (
    <>
      <path d="M2 5h12v12H2zM14 9h4l4 5v3h-8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 2v6m10-6v6M3 11h18m-13 5h2m4 0h2" />
    </>
  ),
  ticket: (
    <>
      <path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5Z" />
      <path d="M15 5v3m0 3v2m0 3v3" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />
    </>
  ),
  home: (
    <>
      <path d="m2 11 10-8 10 8M5 9v12h14V9M9 21v-7h6v7" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
};
export function Icon({
  name,
  size = 22,
  className = '',
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] ?? paths.pot}
    </svg>
  );
}
