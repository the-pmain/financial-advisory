import { useState } from 'react';
import { Link } from 'react-router';
import { ROUTES, teamMemberPath } from '../constants/routes';
import { company } from '../data/company';
import { useEmployees } from '../hooks/useEmployees';
import { topicByPath } from '../data/topics';
import { AuthorisationMarks } from '../components/ui/AuthorisationMarks';
import { PhoneRichText } from '../components/ui/PhoneNumberDisplay';
import { BloombergLeiLink } from '../components/ui/BloombergLeiLink';
import { AppointmentButton } from '../components/appointments/AppointmentModal';
import { SectionTitle } from '../components/ui/primitives';
import { AdviceDisclaimer } from '../components/widgets/AdviceDisclaimer';
import { DocumentsList } from '../components/widgets/DocumentsList';
import { OmbudsmanDisclosure } from '../components/widgets/OmbudsmanDisclosure';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { TextTeasers } from '../components/widgets/TextTeasers';
import { VerifyFinma } from '../components/widgets/VerifyFinma';
import { useT } from '../i18n';
import { usePublicCompany } from '../hooks/usePublicCompany';
import { formatStatusLabel } from '../lib/publicCompany';

const highlightTo: Record<string, string> = {
  'Our team': ROUTES.aboutTeam,
  'Regulatory compliance': `${ROUTES.about}#regulatory-compliance`,
  'Independent advice': ROUTES.aboutIndependentAdvice,
  'Client stories': ROUTES.aboutClientStories,
};

function memberInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => !/^(de|del|la|las|los|y)$/i.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * About us landing: company portrait, a single team introduction, and the
 * public regulatory record — including the Bloomberg LEI mark.
 */
export function AboutPage() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const { featured: featuredMember } = useEmployees();
  const record = usePublicCompany();
  const t = useT();
  const topic = topicByPath.get(ROUTES.about);
  if (!topic) return null;
  const copy = t.topics[ROUTES.about];
  const title = copy?.title ?? topic.title;
  const subtitle = copy?.subtitle ?? topic.subtitle;
  const intro = copy?.intro ?? topic.intro;
  const highlights = copy?.highlights ?? topic.highlights;

  return (
    <>
      <header className="max-w-[802px]">
        <h1 className="mb-3">{title}</h1>
        <p className="text-vz-ink m-0 text-[42px] leading-[1.1875] font-light max-lap:text-[32px] max-mob:text-[24px]">
          {subtitle}
        </p>
      </header>

      <div className="mt-10 max-w-[802px]">
        {intro.map((paragraph) => (
          <p key={paragraph} className="text-vz-ink text-[19px] leading-[1.45] max-mob:text-[18px]">
            <PhoneRichText text={paragraph} />
          </p>
        ))}
        <AppointmentButton className="mt-2">{t.ui.makeAppointment}</AppointmentButton>
      </div>

      <div className="mt-12 max-lap:mt-10">
        <TextTeasers
          title="What we do for you"
          items={highlights.map((item, i) => ({
            title: item.title,
            text: item.text,
            to: highlightTo[topic.highlights[i]?.title] ?? highlightTo[item.title] ?? ROUTES.about,
          }))}
        />
      </div>

      <section id="our-team" className="mt-12 scroll-mt-[132px] max-lap:mt-10">
        <SectionTitle>Our team</SectionTitle>
        {featuredMember && <div className="grid max-w-[1100px] grid-cols-[minmax(220px,320px)_minmax(0,1fr)] items-stretch gap-8 max-mob:grid-cols-1 max-mob:gap-5">
          <Link
            to={teamMemberPath(featuredMember.slug)}
            className="group focus-visible:outline-vz-orange block overflow-hidden bg-white no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <div className="bg-vz-blue-panel aspect-[49/32] overflow-hidden">
              {featuredMember.photo && !photoFailed ? (
                <img
                  src={featuredMember.photo}
                  alt=""
                  width={392}
                  height={256}
                  className="size-full object-contain"
                  decoding="async"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="text-vz-blue flex size-full items-center justify-center text-[48px] font-bold tracking-wide">
                  {memberInitials(featuredMember.name)}
                </div>
              )}
            </div>
            <div className="px-4 py-4">
              <p className="text-vz-gray m-0 text-[14px] leading-[1.3]">{featuredMember.role}</p>
              <h3 className="text-vz-ink m-0 mt-1 text-[22px] leading-[1.2] font-bold transition-colors duration-250 group-hover:text-vz-orange max-mob:text-[20px]">
                {featuredMember.name}
              </h3>
            </div>
          </Link>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-vz-ink m-0 text-[17px] leading-[1.5]">
              {featuredMember.name} leads the investment team from our Lucerne office. Advice is
              delivered by specialists who stay with clients over the long term — paid only by those
              clients, with no product sales targets.
            </p>
            <p className="text-vz-ink mt-4 mb-0 text-[17px] leading-[1.5]">
              The first meeting is with the people who will do the work. We advise private
              individuals and families only, in German, French, Italian and English.
            </p>
            <p className="mt-5 mb-0">
              <Link
                to={ROUTES.aboutTeam}
                className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
              >
                Meet the team
              </Link>
            </p>
          </div>
        </div>}
      </section>

      <section id="regulatory-compliance" className="mt-12 scroll-mt-[132px] max-lap:mt-10">
        <SectionTitle>Regulatory compliance</SectionTitle>
        <div className="max-w-[802px]">
          <p className="text-vz-ink m-0 text-[19px] leading-[1.45] max-mob:text-[18px]">
            {record.legalName} (trading as {company.groupName}) is{' '}
            {company.regulation.summary} Advisory conduct is subject to the Swiss Financial Services
            Act (FinSA). We do not hold client assets — custody stays with the bank you choose, under your control.
          </p>
        </div>

        <dl className="mt-8 max-w-[802px]">
          <RegRow term="Legal name" detail={record.legalName} />
          <RegRow term="Swiss UID" detail={record.uid} href={record.uidRegisterUrl} />
          <RegRow term="LEI" detail={record.lei} href={record.gleifUrl} />
          <RegRow
            term="FINMA authorisation"
            detail={`No. ${company.regulation.finmaAuthorisationNo} · Decision ${company.regulation.finmaDecisionDate}`}
            href={company.regulation.registerUrl}
          />
          <RegRow
            term="OSFINcontrol"
            detail={`Affiliation ${company.regulation.osfinAffiliationRef} · Since ${company.regulation.osfinSince}`}
            href={company.regulation.supervisorUrl}
          />
          <RegRow term="Ombudsman" detail={`${company.ombudsman.name} · ${company.ombudsman.reference}`} />
          <RegRow term="Office" detail={record.addressLine} />
          {record.leiStatus ? (
            <RegRow
              term="LEI status"
              detail={
                record.entityStatus
                  ? `${formatStatusLabel(record.leiStatus)} · ${formatStatusLabel(record.entityStatus)}`
                  : formatStatusLabel(record.leiStatus)
              }
            />
          ) : null}
          {record.leiRenewalDate ? (
            <RegRow term="LEI renewal" detail={record.leiRenewalDate} />
          ) : null}
        </dl>

        {record.source === 'gleif' ? (
          <p className="text-vz-gray-mid mt-4 mb-0 max-w-[802px] text-[14px] leading-[1.4]">
            Legal name, UID, address and LEI status are read from the{' '}
            <a
              href={record.gleifUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-vz-blue hover:text-vz-orange vz-underline-hover"
            >
              GLEIF LEI register
              <span className="visually-hidden"> (external link, opens in a new window)</span>
            </a>
            {record.updatedAt ? ` (golden copy ${record.updatedAt})` : ''}.
          </p>
        ) : null}

        <AuthorisationMarks className="mt-8 max-w-[802px]" />

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <BloombergLeiLink size="large" />
          <p className="text-vz-gray-mid m-0 max-w-[420px] text-[14px] leading-[1.4]">
            Confirm our Legal Entity Identifier on the Bloomberg LEI register — the issuing LOU’s
            record for {record.legalName}.
          </p>
        </div>

        <p className="mt-6 mb-0">
          <Link
            to={ROUTES.regulatoryAndCompliance}
            className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
          >
            Full regulatory and compliance hub
          </Link>
        </p>
      </section>

      <div className="mt-12 max-lap:mt-10">
        <VerifyFinma />
      </div>

      <div className="mt-12 max-lap:mt-10">
        <OmbudsmanDisclosure />
      </div>

      <div className="mt-12 max-lap:mt-10">
        <DocumentsList />
      </div>

      <div className="mt-12 max-w-[802px] max-lap:mt-10">
        <AdviceDisclaimer />
      </div>

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </>
  );
}

function RegRow({
  term,
  detail,
  href,
}: {
  term: string;
  detail: string;
  href?: string;
}) {
  return (
    <div className="border-vz-rule grid grid-cols-[minmax(120px,200px)_minmax(0,1fr)] items-baseline gap-4 border-b py-4 max-mob:grid-cols-1 max-mob:gap-1">
      <dt className="text-vz-gray-mid m-0 text-[14px] leading-[1.3]">{term}</dt>
      <dd className="m-0">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[16px] leading-[1.4]"
          >
            {detail}
            <span className="visually-hidden"> (external link, opens in a new window)</span>
          </a>
        ) : (
          <span className="text-vz-ink text-[16px] leading-[1.4]">{detail}</span>
        )}
      </dd>
    </div>
  );
}
