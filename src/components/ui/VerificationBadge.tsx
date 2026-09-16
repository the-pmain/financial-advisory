import { CheckIcon } from './Icons';

type VerificationBadgeProps = {
  href: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  alt: string;
  title: string;
  detail: string;
  hoverStatus: string;
  verifiedLabel: string;
  className?: string;
};

/**
 * Clickable register mark: logo, always-visible Verified chip, identifier,
 * and a hover line that names the official source. Opens in a new tab.
 */
export function VerificationBadge({
  href,
  logo,
  logoWidth,
  logoHeight,
  alt,
  title,
  detail,
  hoverStatus,
  verifiedLabel,
  className = '',
}: VerificationBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`group border-vz-rule hover:border-vz-blue flex min-h-[44px] flex-col rounded-[3px] border bg-white px-3.5 py-3 no-underline transition-[border-color,box-shadow] duration-250 hover:shadow-[0_0_0_1px_#070E18] ${className}`}
    >
      <img
        src={logo}
        alt={alt}
        width={logoWidth}
        height={logoHeight}
        className="block h-auto max-h-10 w-auto max-w-[160px]"
        loading="lazy"
        decoding="async"
      />
      <span className="mt-2.5 inline-flex w-fit items-center gap-1 text-[11px] leading-none font-bold tracking-[0.06em] text-[#1B6B4A] uppercase">
        <CheckIcon className="h-3 w-3" />
        {verifiedLabel}
      </span>
      <span className="text-vz-ink mt-1.5 text-[13px] leading-[1.35] font-bold">{title}</span>
      <span className="text-vz-gray-mid mt-0.5 text-[12px] leading-[1.4]">{detail}</span>
      <span className="text-vz-blue mt-2 max-h-0 overflow-hidden text-[11px] leading-[1.35] opacity-0 transition-[max-height,opacity,margin] duration-250 group-hover:mt-2 group-hover:max-h-10 group-hover:opacity-100 group-focus-visible:mt-2 group-focus-visible:max-h-10 group-focus-visible:opacity-100">
        {hoverStatus}
      </span>
      <span className="visually-hidden"> (external link, opens in a new window)</span>
    </a>
  );
}
