import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { company, finmaAuthorisationLine, osfinSupervisionLine } from '../../data/company';

/**
 * FINMA decision + OSFINcontrol affiliation, shown next to the LEI badge.
 */
export function AuthorisationMarks({
  className = '',
  size = 'default',
}: {
  className?: string;
  size?: 'default' | 'compact';
}) {
  const text = size === 'compact' ? 'text-[12px] leading-[1.4]' : 'text-[13px] leading-[1.45]';

  return (
    <div className={className}>
      <p className={`text-vz-ink m-0 font-bold ${text}`}>
        <a
          href={company.regulation.registerUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-vz-ink hover:text-vz-orange"
        >
          {finmaAuthorisationLine()}
          <span className="visually-hidden"> (external link, opens in a new window)</span>
        </a>
      </p>
      <p className={`text-vz-ink m-0 mt-1.5 font-bold ${text}`}>
        <a
          href={company.regulation.supervisorUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-vz-ink hover:text-vz-orange"
        >
          {osfinSupervisionLine()}
          <span className="visually-hidden"> (external link, opens in a new window)</span>
        </a>
      </p>
      <p className={`m-0 mt-1.5 font-bold ${text}`}>
        <Link to={ROUTES.auditReports} className="text-vz-ink hover:text-vz-orange">
          {company.audit.footerLine}
        </Link>
      </p>
    </div>
  );
}
