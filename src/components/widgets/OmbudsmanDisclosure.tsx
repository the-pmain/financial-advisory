import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { company } from '../../data/company';
import { clientDocuments } from '../../data/documents';
import { PhoneNumberDisplay } from '../ui/PhoneNumberDisplay';
import { SectionTitle } from '../ui/primitives';

const brochure = clientDocuments.find((doc) => doc.id === 'finsa-brochure');

export function OmbudsmanDisclosure({
  variant = 'full',
  className = '',
}: {
  variant?: 'full' | 'compact';
  className?: string;
}) {
  const office = company.ombudsman;

  if (variant === 'compact') {
    return (
      <div className={className}>
        <p className="text-vz-gray-mid m-0 text-[13px] leading-[1.3]">Dispute resolution</p>
        <p className="text-vz-ink m-0 mt-1.5 text-[12px] leading-[1.45]">
          <span className="font-bold">{office.name}</span>
          <span className="text-vz-gray-mid"> — {office.description}</span>
        </p>
        <p className="text-vz-ink m-0 mt-1 text-[12px] leading-[1.45]">
          {office.addressLine}
          <br />
          <PhoneNumberDisplay
            visibleNumber={office.phone}
            indexedNumber={office.phone}
            jsonLd={false}
            inline
            className="text-[12px]"
          />
          {' · '}
          <a href={`mailto:${office.email}`} className="text-vz-blue hover:text-vz-orange">
            {office.email}
          </a>
          {' · '}
          <a
            href={office.website}
            target="_blank"
            rel="noreferrer noopener"
            className="text-vz-blue hover:text-vz-orange"
          >
            {office.websiteLabel}
            <span className="visually-hidden"> (external link, opens in a new window)</span>
          </a>
        </p>
        <p className="text-vz-ink m-0 mt-1 text-[12px] leading-[1.45] font-bold">
          Reference Number: {office.reference}
        </p>
      </div>
    );
  }

  return (
    <section className={className}>
      <SectionTitle spaced={false}>Ombudsman</SectionTitle>
      <p className="text-vz-ink mt-6 mb-0 max-w-[802px] text-[17px] leading-[1.5]">
        If a complaint cannot be resolved with us directly, you may start a mediation procedure with
        the independent ombudsman office to which {company.legalName} is affiliated under article 77
        of the Financial Services Act. The procedure is informal and does not replace the courts.
      </p>
      <dl className="mt-6 max-w-[802px]">
        <OmbudsRow term="Ombudsman" detail={office.name} note={office.description} />
        <OmbudsRow term="Address" detail={office.addressLine} />
        <OmbudsRow term="Phone">
          <PhoneNumberDisplay
            visibleNumber={office.phone}
            indexedNumber={office.phone}
            jsonLd={false}
            className="text-[16px] leading-[1.4]"
          />
        </OmbudsRow>
        <OmbudsRow term="Email" detail={office.email} href={`mailto:${office.email}`} />
        <OmbudsRow term="Website" detail={office.websiteLabel} href={office.website} external />
        <OmbudsRow term="Reference Number" detail={office.reference} />
      </dl>
      <p className="text-vz-ink mt-6 mb-0 max-w-[802px] text-[16px] leading-[1.5]">
        The same details are set out in our{' '}
        {brochure ? (
          <a href={brochure.href} className="text-vz-blue hover:text-vz-orange vz-underline-hover">
            {brochure.title}
          </a>
        ) : (
          'FinSA client brochure'
        )}
        . You can also write to us first at {company.address.line},{' '}
        <PhoneNumberDisplay inline jsonLd={false} className="text-[16px]" />.
      </p>
      <p className="mt-3 mb-0">
        <Link
          to={ROUTES.aboutHowWeAreRegulated}
          className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
        >
          How we are regulated
        </Link>
      </p>
    </section>
  );
}

function OmbudsRow({
  term,
  detail,
  note,
  href,
  external,
  children,
}: {
  term: string;
  detail?: string;
  note?: string;
  href?: string;
  external?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="border-vz-rule grid grid-cols-[minmax(120px,200px)_minmax(0,1fr)] items-baseline gap-4 border-b py-3 max-mob:grid-cols-1 max-mob:gap-1">
      <dt className="text-vz-gray-mid m-0 text-[14px] leading-[1.3]">{term}</dt>
      <dd className="m-0">
        {children ? (
          children
        ) : href && detail ? (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[16px] leading-[1.4]"
          >
            {detail}
            {external ? (
              <span className="visually-hidden"> (external link, opens in a new window)</span>
            ) : null}
          </a>
        ) : (
          <span className="text-vz-ink text-[16px] leading-[1.4]">{detail}</span>
        )}
        {note ? <span className="text-vz-gray-mid block text-[14px] leading-[1.4]">{note}</span> : null}
      </dd>
    </div>
  );
}
