import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { company } from '../../data/company';

/** Header lockup at a compact height, native 1710×311 ratio. */
export function Logo() {
  return (
    <Link
      to={ROUTES.home}
      rel="home"
      aria-label={`${company.groupName} — home`}
      className="mr-auto flex min-w-0 shrink items-center transition-opacity duration-250 hover:opacity-80"
      title={company.groupName}
    >
      <img
        src="/images/helfenstein-logo.png"
        alt=""
        width={1710}
        height={311}
        className="block h-12 w-auto max-w-full object-contain object-left max-desk:h-10 max-lap:h-9 max-mob:h-8 max-mob:max-w-[min(100%,calc(100vw-9.5rem))]"
        decoding="async"
      />
      <span className="visually-hidden">{company.groupName}</span>
    </Link>
  );
}

/** Compact square H — gold on light, white on dark. */
export function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <img
      src={onDark ? '/images/helfenstein-mark-light.png' : '/images/helfenstein-mark.png'}
      alt=""
      width={71}
      height={71}
      className={`block shrink-0 object-contain ${className ?? ''}`}
      decoding="async"
    />
  );
}
