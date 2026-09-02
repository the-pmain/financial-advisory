import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Header search glyph — matches the reference's 24×25 line+circle construction. */
export function SearchIcon({ stroke = 'currentColor', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 25" fill="none" aria-hidden="true" focusable="false" {...props}>
      <line x1="14.024" y1="14.267" x2="21.696" y2="21.94" stroke={stroke} strokeWidth="1.344" />
      <circle cx="9.713" cy="9.947" r="6.041" stroke={stroke} strokeWidth="1.344" />
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

export function EnvelopeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <rect x="1" y="1" width="30" height="22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 2l15 12L31 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** 24×24 monitor+play glyph that leads video titles on the reference. */
export function VideoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 14V7L15 10.7338L10 14Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5017 3C2.67017 3 2 3.69175 2 4.55004V17.45C2 18.3082 2.67017 19 3.5017 19H20.4983C21.3298 19 22 18.3082 22 17.45V4.55004C22 3.69175 21.3298 3 20.4983 3H3.5017ZM3.5017 4.55004H20.4983V17.45H3.5017V4.55004Z"
        fill="currentColor"
      />
      <path d="M18 20H6V21H18V20Z" fill="currentColor" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Offer-card icons                                                            */
/* -------------------------------------------------------------------------- */

export function ChecklistIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...props}>
      <rect x="9" y="5" width="30" height="38" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 15h8M14 24h8M14 33h8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M27 14l2.4 2.4L34 12M27 23l2.4 2.4L34 21M27 32l2.4 2.4L34 30"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...props}>
      <rect x="6" y="10" width="36" height="32" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 19h36" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 6v8M33 6v8" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="25" width="5" height="5" fill="currentColor" />
      <rect x="22" y="25" width="5" height="5" fill="currentColor" />
      <rect x="31" y="25" width="5" height="5" fill="currentColor" />
      <rect x="13" y="34" width="5" height="4" fill="currentColor" />
      <rect x="22" y="34" width="5" height="4" fill="currentColor" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M24 4l16 6v13c0 10-6.6 17.5-16 21C14.6 40.5 8 33 8 23V10l16-6z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M16 24l5.5 5.5L33 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M6 42V6M6 42h36" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="27" width="6" height="11" fill="currentColor" />
      <rect x="23" y="19" width="6" height="19" fill="currentColor" />
      <rect x="33" y="11" width="6" height="27" fill="currentColor" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...props}>
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.6" />
      <path d="M31 17l-4.6 10.4L16 32l4.6-10.4L31 17z" fill="currentColor" />
    </svg>
  );
}

export const offerIcons = {
  checklist: ChecklistIcon,
  calendar: CalendarIcon,
  shield: ShieldIcon,
  chart: ChartIcon,
  compass: CompassIcon,
} as const;

/* -------------------------------------------------------------------------- */
/* Social glyphs                                                               */
/* -------------------------------------------------------------------------- */

export function SocialIcon({ name, ...props }: IconProps & { name: string }) {
  const paths: Record<string, ReactNode> = {
    Youtube: (
      <path
        d="M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77C22 15.2 22 12 22 12s0-3.2-.4-4.8zM9.9 15.02V8.98L15.2 12l-5.3 3.02z"
        fill="currentColor"
      />
    ),
    LinkedIn: (
      <path
        d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.2 8.4h3.6V21H3.2V8.4zm5.9 0h3.45v1.72h.05c.48-.9 1.66-1.86 3.42-1.86 3.66 0 4.33 2.34 4.33 5.4V21h-3.6v-6.4c0-1.53-.03-3.5-2.14-3.5-2.14 0-2.47 1.66-2.47 3.38V21H9.1V8.4z"
        fill="currentColor"
      />
    ),
    Facebook: (
      <path
        d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.8-.1-1.7-.15-2.6-.15-2.6 0-4.3 1.56-4.3 4.44V9.9H7.4V13h2.4v8h3.7z"
        fill="currentColor"
      />
    ),
    Instagram: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {paths[name] ?? null}
    </svg>
  );
}
