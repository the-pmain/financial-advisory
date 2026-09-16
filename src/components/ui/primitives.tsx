import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRightIcon } from './Icons';

/* -------------------------------------------------------------------------- */
/* Layout                                                                      */
/* -------------------------------------------------------------------------- */

/** The centred 1220px measure used throughout the reference (`div.mast`). */
export function Mast({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav';
}) {
  return <Tag className={`mast ${className}`}>{children}</Tag>;
}

/**
 * Grey 28px section heading over a hairline — the divider that opens every
 * widget on the reference home page (28/32 bold #838383, 7px above a 1px
 * #999999 rule, then a 30px gap before the content).
 */
export function SectionTitle({
  children,
  id,
  spaced = true,
  variant = 'widget',
  className = '',
}: {
  children: ReactNode;
  id?: string;
  /** Column-scoped headings take their 30px gap from the column's own padding. */
  spaced?: boolean;
  /**
   * Headings belonging to a `two-columns` widget keep more of their size on
   * small screens (24/28) than free-standing widget headings (22/25.3).
   */
  variant?: 'widget' | 'columns';
  className?: string;
}) {
  const small =
    variant === 'columns'
      ? 'max-mob:text-[24px] max-mob:leading-[28px] max-mob:pb-[3px]'
      : 'max-mob:text-[22px] max-mob:leading-[25.3px] max-mob:pb-[3px]';
  const gap =
    variant === 'columns' ? 'mb-[30px] max-mob:mb-[20px]' : 'mb-[30px] max-mob:mb-[27px]';

  return (
    <h2
      id={id}
      className={`text-vz-gray-mid border-vz-gray-light vz-break-long border-b pb-[7px] text-[28px] leading-[32px] font-bold ${small} ${
        spaced ? gap : 'mb-0'
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/** Thin rule matching the reference's `#e5e5e5` hairlines. */
export function Hairline({ className = '' }: { className?: string }) {
  return <hr className={`border-vz-rule m-0 border-0 border-t ${className}`} />;
}

/* -------------------------------------------------------------------------- */
/* Links & buttons                                                             */
/* -------------------------------------------------------------------------- */

/** Small blue category label above article titles (15/17.3, 0.01em). */
export function Tagline({
  children,
  gap = 6,
  className = '',
}: {
  children: ReactNode;
  gap?: number;
  className?: string;
}) {
  return (
    <span
      className={`text-vz-blue-mid block text-[15px] leading-[17.3px] tracking-vz-01 transition-colors duration-250 ${className}`}
      style={{ marginBottom: gap }}
    >
      {children}
    </span>
  );
}

/**
 * Text link carrying the brand's orange underline. The underline is painted
 * with a box-shadow, exactly as the reference does, so it never contributes
 * to layout height. `bold` matches the "More …" links that close a section.
 */
export function UnderlineLink({
  to,
  children,
  bold = false,
  className = '',
  onClick,
}: {
  to: string;
  children: ReactNode;
  bold?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`vz-underline text-vz-ink hover:text-vz-orange tracking-vz-02 pb-[2px] text-[15px] leading-[21px] ${
        bold ? 'font-bold' : ''
      } ${className}`}
    >
      {children}
    </Link>
  );
}

/** White pill CTA — ink outline, used for appointments and primary actions. */
export const buttonOrangeClass =
  'inline-block rounded-[21px] border border-vz-blue bg-white px-4 py-3 text-center text-[14px] leading-4 font-bold text-vz-blue transition-[background-color,border-color,color] duration-250 ease-linear hover:border-vz-orange hover:bg-vz-cream hover:text-vz-blue active:bg-vz-cream-light';

export function ButtonOrange({
  to,
  children,
  className = '',
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link to={to} onClick={onClick} className={`${buttonOrangeClass} ${className}`}>
      {children}
    </Link>
  );
}

/**
 * White pill with a bold orange label — the CTA inside the cream offer cards.
 * `block` stretches it across the column, as the narrow cards do.
 * When the whole card is already a link, pass `static` so this stays a label
 * (no nested `<a>`) and still fills orange on `group-hover`.
 */
export function ButtonPill({
  to,
  children,
  block = false,
  static: isStatic = false,
  className = '',
}: {
  to?: string;
  children: ReactNode;
  block?: boolean;
  static?: boolean;
  className?: string;
}) {
  const classNameResolved = `text-vz-orange-btn rounded-[21px] border border-white bg-white px-[14px] py-[7px] text-center text-[13px] leading-4 font-bold transition-colors duration-250 ${
    isStatic
      ? 'group-hover:border-vz-orange-btn group-hover:bg-vz-orange-btn group-hover:text-white'
      : 'hover:border-vz-orange-btn hover:bg-vz-orange-btn hover:text-white'
  } ${block ? 'block' : 'inline-block self-start'} ${className}`;

  if (isStatic || !to) {
    return <span className={classNameResolved}>{children}</span>;
  }

  return (
    <Link to={to} className={classNameResolved}>
      {children}
    </Link>
  );
}

/** Footer / portal link with a trailing arrow. */
export function ArrowLink({
  to,
  children,
  className = '',
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`text-vz-blue hover:text-vz-orange group flex items-center justify-between gap-4 text-[15px] leading-[1.2] transition-colors duration-250 ${className}`}
    >
      <span>{children}</span>
      <ArrowRightIcon className="text-vz-orange h-4 w-4 shrink-0 transition-transform duration-250 group-hover:translate-x-1" />
    </Link>
  );
}

/** Plain blue nav/list link with the orange underline appearing on hover. */
export function NavTextLink({
  to,
  children,
  className = '',
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`vz-underline-hover text-vz-blue hover:text-vz-orange inline-block ${className}`}
    >
      {children}
    </Link>
  );
}
