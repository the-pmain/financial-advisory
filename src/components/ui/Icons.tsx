import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon({ stroke = "currentColor", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 25" fill="none" aria-hidden="true" focusable="false" {...props}>
      <line x1="14.024" y1="14.267" x2="21.696" y2="21.94" stroke={stroke} strokeWidth="1.344" />
      <circle cx="9.713" cy="9.947" r="6.041" stroke={stroke} strokeWidth="1.344" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
