import { company } from '../../data/company';
import { FinmaLink } from '../ui/FinmaLink';
import { SectionTitle } from '../ui/primitives';

export function VerifyFinma() {
  return (
    <section className="bg-vz-blue-panel px-6 py-7 max-mob:px-4">
      <SectionTitle spaced={false}>Verify our authorisation</SectionTitle>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-8 max-mob:grid-cols-1">
        <div>
          <p className="text-vz-ink m-0 text-[17px] leading-[1.5]">
            Clients can check whether {company.legalName} appears on the official FINMA register of
            authorised institutions. Prefer the register on finma.ch over search ads or unsolicited
            messages.
          </p>
          <ol className="text-vz-ink mt-4 mb-0 list-decimal space-y-2 pl-5 text-[16px] leading-[1.45]">
            <li>
              Open the{' '}
              <a
                href={company.regulation.registerUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-vz-blue hover:text-vz-orange vz-underline-hover"
              >
                FINMA register
              </a>
              .
            </li>
            <li>
              Search for <strong>{company.legalName}</strong> (UID {company.uid} / LEI {company.lei}
              ).
            </li>
            <li>Confirm the authorisation type and any public warnings before you engage.</li>
          </ol>
          <p className="text-vz-gray-mid mt-4 mb-0 text-[14px] leading-[1.4]">
            {company.legalName} is {company.regulation.summary} Advisory conduct is also subject to
            the Swiss Financial Services Act (FinSA).
          </p>
        </div>
        <FinmaLink className="justify-self-end max-mob:justify-self-start" />
      </div>
    </section>
  );
}
