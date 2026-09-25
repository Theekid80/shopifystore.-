import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = ({ size = 20, ...props }: IconProps) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);

export const AccountIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8.5" r="3.75" />
    <path d="M4.5 20c1.2-3.6 4-5.25 7.5-5.25S18.3 16.4 19.5 20" />
  </svg>
);

export const BagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.5 8h13l-1 12.25h-11L5.5 8Z" />
    <path d="M9 10V6.75a3 3 0 0 1 6 0V10" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7.5-4.6-7.5-10.1A4.15 4.15 0 0 1 12 7.4a4.15 4.15 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

/* Feature / category glyphs — thin, quiet line icons. */
export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10Z" />
  </svg>
);
export const PlaneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10.5 13.5 4 11l1.5-1.5 7 1 4-4.5c.8-.8 2.2-1 2.7-.5s.3 1.9-.5 2.7l-4.5 4 1 7L13.7 21l-2.5-6.5L8 17.5V20l-1.5 1-1-3.5L2 16.5 3 15h2.5l3-3" />
  </svg>
);
export const BedIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 18V7M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5" />
    <circle cx="7" cy="11" r="1.75" />
  </svg>
);
export const CarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 16v-3.5L6 8h12l2 4.5V16H4Z" />
    <circle cx="7.5" cy="16.5" r="1.75" />
    <circle cx="16.5" cy="16.5" r="1.75" />
  </svg>
);
export const BriefcaseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
    <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
  </svg>
);
export const LayersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 4 8.5 4.5L12 13 3.5 8.5 12 4Z" />
    <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
  </svg>
);
export const SparkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </svg>
);
export const CircleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="7.5" />
  </svg>
);

/* Social — simplified generic glyphs (not official logos). */
export const InstagramIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.75" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
);
export const TikTokIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 4c.4 2.6 2.1 4.2 5 4.5" />
  </svg>
);
export const PinterestIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M11 9.5c0-1.5 3.5-2 4 .5.4 2-1 4-2.6 3.7-1-.2-1.2-1.2-1.2-1.2L9.5 20" />
  </svg>
);
