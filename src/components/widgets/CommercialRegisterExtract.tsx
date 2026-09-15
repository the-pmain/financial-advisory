import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { commercialRegisterLine, company } from '../../data/company';
import { SectionTitle } from '../ui/primitives';

const btn =
  'inline-flex h-10 items-center rounded-[3px] px-4 text-[14px] font-bold no-underline transition-colors duration-150';

export function CommercialRegisterExtract({ className = '' }: { className?: string }) {
  const rec = company.commercialRegister;

  return (
    <section className={className}>
      <SectionTitle spaced={false}>Commercial register</SectionTitle>
      <p className="text-vz-ink mt-6 mb-0 max-w-[802px] text-[17px] leading-[1.5] font-bold">
        {commercialRegisterLine()}
      </p>
      <p className="text-vz-ink mt-3 mb-0 max-w-[802px] text-[16px] leading-[1.5]">
        Official extract (Handelsregisterauszug) from the {rec.office}. Company identity{' '}
        {rec.hrNumber}. The current public record is on Zefix, the federal commercial-register
        portal. A certified extract can be ordered there or requested from us.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={rec.zefixUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`${btn} bg-vz-blue hover:bg-vz-blue-mid text-white`}
        >
          View current record on Zefix
          <span className="visually-hidden"> (external link, opens in a new window)</span>
        </a>
        <a
          href={company.uidRegisterUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`${btn} border-vz-rule text-vz-blue hover:bg-vz-blue-panel border bg-white`}
        >
          UID register {rec.uid}
          <span className="visually-hidden"> (external link, opens in a new window)</span>
        </a>
        <Link
          to={ROUTES.aboutContact}
          className={`${btn} border-vz-rule text-vz-blue hover:bg-vz-blue-panel border bg-white`}
        >
          Request official extract
        </Link>
      </div>
    </section>
  );
}
