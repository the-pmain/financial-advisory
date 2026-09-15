import type { ReactNode } from 'react';
import { company } from '../../data/company';
import { useT } from '../../i18n';
import { VerificationBadge } from '../ui/VerificationBadge';

function TrustCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-vz-rule rounded-[3px] border bg-white px-3.5 py-3 ${className}`}>
      {children}
    </div>
  );
}

export function VerificationRegisterCards() {
  const t = useT();
  const verified = t.ui.verified;
  const cards = [
    {
      href: company.regulation.registerUrl,
      logo: '/images/finma-badge.svg',
      logoWidth: 180,
      logoHeight: 48,
      alt: t.ui.finmaAlt,
      title: 'FINMA Portfolio Manager',
      detail: `No. ${company.regulation.finmaAuthorisationNo} · ${company.regulation.finmaDecisionDate}`,
      hoverStatus: t.ui.verifiedFinma,
    },
    {
      href: company.leiIssuerUrl,
      logo: '/images/bloomberg-lei-logo.png',
      logoWidth: 148,
      logoHeight: 50,
      alt: `Bloomberg LEI record for ${company.legalName}`,
      title: 'Legal Entity Identifier',
      detail: company.lei,
      hoverStatus: t.ui.verifiedLei,
    },
    {
      href: company.uidProfileUrl,
      logo: '/images/help-ch-logo.svg',
      logoWidth: 112,
      logoHeight: 21,
      alt: `help.ch company profile for ${company.legalName}, UID ${company.uid}`,
      title: 'HELP.ch directory',
      detail: company.uid,
      hoverStatus: t.ui.verifiedHelp,
    },
    {
      href: company.audit.zefixUrl,
      logo: '/images/zefix-badge.svg',
      logoWidth: 180,
      logoHeight: 48,
      alt: 'Zefix commercial-register record — statutory auditor',
      title: 'Statutory auditor',
      detail: company.audit.footerLine,
      hoverStatus: t.ui.verifiedAudit,
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <li key={card.href}>
          <VerificationBadge {...card} verifiedLabel={verified} className="h-full" />
        </li>
      ))}
    </>
  );
}

/**
 * Footer trust band: FINMA, LEI, HELP.ch, Zefix, office, ombudsman.
 * Two columns on desktop; stacked on small screens.
 */
export function TrustSignals({ className = '' }: { className?: string }) {
  const t = useT();
  const office = company.ombudsman;

  return (
    <section aria-label={t.ui.trustSignals} className={className}>
      <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-4 p-0 max-tab:grid-cols-1">
        <VerificationRegisterCards />
        <li>
          <TrustCard className="h-full">
            <p className="text-vz-gray-mid m-0 text-[13px] leading-[1.3]">{t.ui.officeAddress}</p>
            <p className="text-vz-ink m-0 mt-1.5 text-[13px] leading-[1.4] font-bold">
              {company.legalName}
            </p>
            <p className="text-vz-ink m-0 mt-1 text-[13px] leading-[1.45]">
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
              <br />
              {company.address.country}
            </p>
            <p className="m-0 mt-1.5">
              <a href={company.phoneHref} className="text-vz-blue hover:text-vz-orange text-[13px]">
                {company.phone}
              </a>
            </p>
          </TrustCard>
        </li>
        <li>
          <TrustCard className="h-full">
            <p className="text-vz-gray-mid m-0 text-[13px] leading-[1.3]">{t.ui.ombudsmanHeading}</p>
            <p className="text-vz-ink m-0 mt-1.5 text-[13px] leading-[1.4] font-bold">{office.name}</p>
            <p className="text-vz-ink m-0 mt-1 text-[12px] leading-[1.45]">{office.addressLine}</p>
            <p className="text-vz-ink m-0 mt-1 text-[12px] leading-[1.45]">
              <a href={office.phoneHref} className="text-vz-blue hover:text-vz-orange">
                {office.phone}
              </a>
              {' · '}
              <a href={`mailto:${office.email}`} className="text-vz-blue hover:text-vz-orange">
                {office.email}
              </a>
            </p>
            <p className="m-0 mt-1.5">
              <a
                href={office.website}
                target="_blank"
                rel="noreferrer noopener"
                className="text-vz-blue hover:text-vz-orange text-[12px]"
              >
                {office.websiteLabel}
                <span className="visually-hidden"> {t.ui.externalLinkNewWindow}</span>
              </a>
            </p>
            <p className="text-vz-ink m-0 mt-2 text-[12px] leading-[1.4] font-bold">
              {t.ui.ombudsmanReference}: {office.reference}
            </p>
          </TrustCard>
        </li>
      </ul>
    </section>
  );
}
