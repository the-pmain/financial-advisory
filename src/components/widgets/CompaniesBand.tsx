import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { MandatesList } from './MandatesAndProperty';
import { SectionTitle, UnderlineLink } from '../ui/primitives';

/** Home-page companies band: succession mandates + CTA. */
export function CompaniesBand() {
  return (
    <section>
      <SectionTitle>For companies</SectionTitle>
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-x-[68px] gap-y-8 max-tab:grid-cols-1">
        <div>
          <p className="text-vz-ink m-0 text-[17px] leading-[1.45]">
            Occupational pensions, succession, insurance management and company formation for Swiss
            SMEs — with the same fee-only model we use for private clients.
          </p>
          <div className="mt-6">
            <MandatesList />
          </div>
        </div>
        <div className="border-vz-rule border-t pt-5 max-tab:border-t-0 max-tab:pt-0">
          <h3 className="text-vz-ink m-0 text-[22px] leading-[1.3] font-bold">Corporate services</h3>
          <ul className="mt-4 mb-0 list-none space-y-3 p-0">
            {[
              { label: 'Pension funds', to: ROUTES.companiesPensionFunds },
              { label: 'Succession planning', to: ROUTES.companiesSuccession },
              { label: 'Insurance management', to: ROUTES.companiesInsuranceManagement },
              { label: 'Establishing a company', to: ROUTES.companiesEstablishing },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[16px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 mb-0">
            <UnderlineLink to={ROUTES.companies} bold>
              All company services
            </UnderlineLink>
          </p>
        </div>
      </div>
    </section>
  );
}
