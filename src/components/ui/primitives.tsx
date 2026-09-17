import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "./Icons.tsx";

export function Mast({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
}) {
  return <Tag className={`mast ${className}`}>{children}</Tag>;
}

export function SectionTitle({
  children,
  id,
  spaced = true,
  variant = "widget",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  spaced?: boolean;
  variant?: "widget" | "columns";
  className?: string;
}) {
  const small =
    variant === "columns"
      ? "max-mob:text-[24px] max-mob:leading-[28px] max-mob:pb-[3px]"
      : "max-mob:text-[22px] max-mob:leading-[25.3px] max-mob:pb-[3px]";
  const gap =
    variant === "columns" ? "mb-[30px] max-mob:mb-[20px]" : "mb-[30px] max-mob:mb-[27px]";

  return (
    <h2
      id={id}
      className={`text-vz-gray-mid border-vz-gray-light vz-break-long border-b pb-[7px] text-[28px] leading-[32px] font-bold ${small} ${
        spaced ? gap : "mb-0"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return <hr className={`border-vz-rule m-0 border-0 border-t ${className}`} />;
}

export function Tagline({
  children,
  gap = 6,
  className = "",
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

export function UnderlineLink({
  to,
  children,
  bold = false,
  className = "",
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
        bold ? "font-bold" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export const buttonOrangeClass =
  "inline-block rounded-[21px] border border-vz-blue bg-white px-4 py-3 text-center text-[14px] leading-4 font-bold text-vz-blue transition-[background-color,border-color,color] duration-250 ease-linear hover:border-vz-orange hover:bg-vz-cream hover:text-vz-blue active:bg-vz-cream-light";

export function ButtonOrange({
  to,
  children,
  className = "",
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

export function ButtonPill({
  to,
  children,
  block = false,
  static: isStatic = false,
  className = "",
}: {
  to?: string;
  children: ReactNode;
  block?: boolean;
  static?: boolean;
  className?: string;
}) {
  const classNameResolved = `text-vz-orange-btn rounded-[21px] border border-white bg-white px-[14px] py-[7px] text-center text-[13px] leading-4 font-bold transition-colors duration-250 ${
    isStatic
      ? "group-hover:border-vz-orange-btn group-hover:bg-vz-orange-btn group-hover:text-white"
      : "hover:border-vz-orange-btn hover:bg-vz-orange-btn hover:text-white"
  } ${block ? "block" : "inline-block self-start"} ${className}`;

  if (isStatic || !to) {
    return <span className={classNameResolved}>{children}</span>;
  }

  return (
    <Link to={to} className={classNameResolved}>
      {children}
    </Link>
  );
}

export function ArrowLink({
  to,
  children,
  className = "",
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

export function NavTextLink({
  to,
  children,
  className = "",
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

export const buttonNavyClass =
  "inline-flex h-11 items-center justify-center rounded-[3px] bg-vz-blue px-4 text-[14px] leading-4 font-bold text-white shadow-vz-btn transition-colors duration-250 hover:bg-vz-blue-mid disabled:opacity-60";

export function ButtonNavy({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="submit" className={`${buttonNavyClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function FormField({
  label,
  className = "",
  invalid = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid?: boolean;
}) {
  return (
    <label className={`appointment-form__field ${className}`}>
      <span className="appointment-form__label">{label}</span>
      <input className={`appointment-form__control ${invalid ? "is-invalid" : ""}`} {...props} />
    </label>
  );
}
