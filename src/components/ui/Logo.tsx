import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { company } from '../../data/company';

/**
 * Header lockup: H mark + wordmark. Uses the brand logo image when available;
 * falls back to the inline SVG mark for compact footer use.
 */
export function Logo() {
  return (
    <Link
      to={ROUTES.home}
      rel="home"
      aria-label={`${company.groupName} — home`}
      className="text-vz-blue hover:opacity-80 mr-auto flex min-w-0 shrink items-center transition-opacity duration-250"
      title={company.groupName}
    >
      <img
        src="/images/helfenstein-logo.png"
        alt=""
        width={280}
        height={93}
        className="block h-[68px] w-auto max-h-full object-contain object-left max-desk:h-[52px] max-mob:h-[40px]"
        decoding="async"
      />
      <span className="visually-hidden">{company.groupName}</span>
    </Link>
  );
}

/** Compact H mark for footer and tight slots. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={71}
      height={71}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`block shrink-0 ${className ?? ''}`}
    >
      <title>{company.shortName}</title>
      {/* Navy pillars — sampled from brand mark */}
      <rect x="16" y="12" width="24" height="76" rx="2" fill="#0B1F33" />
      <rect x="60" y="12" width="24" height="76" rx="2" fill="#0B1F33" />
      {/* Copper bridge with concave ends */}
      <path
        d="M38 42 C45 49, 55 49, 62 42 L62 58 C55 51, 45 51, 38 58 Z"
        fill="#9A5F38"
      />
      <rect x="38" y="45" width="24" height="10" rx="1.5" fill="#B2734A" />
    </svg>
  );
}
