import { Link, useParams } from 'react-router';
import { ROUTES, teamMemberPath } from '../constants/routes';
import { company } from '../data/company';
import { useLocale, useT } from '../i18n';
import { credentialLabel, expertiseLabel, languageLabel } from '../i18n/labels';
import { localizedMember } from '../i18n/localizeTeam';
import { cfaDirectoryUrl, finmaAdviserNoFor } from '../data/team';
import { useEmployees } from '../hooks/useEmployees';
import { PhoneRichText } from '../components/ui/PhoneNumberDisplay';
import { SectionTitle } from '../components/ui/primitives';
import { TeamAvatar } from '../components/ui/TeamAvatar';
import { ConsultationForm } from '../components/widgets/ConsultationForm';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { NotFoundPage } from './NotFoundPage';

export function TeamMemberPage() {
  const { slug } = useParams();
  const { locale } = useLocale();
  const t = useT();
  const { bySlug, sections, status } = useEmployees();
  const raw = slug ? bySlug.get(slug) : undefined;
  const member = raw ? localizedMember(raw, t.team.members) : undefined;

  if (status === 'loading') {
    return <p className="text-vz-gray m-0 text-[16px]">{t.ui.loading}</p>;
  }
  if (!member) return <NotFoundPage />;

  const peers = (sections.find((s) => s.id === member.section)?.members ?? [])
    .filter((peer) => peer.slug !== member.slug)
    .map((peer) => localizedMember(peer, t.team.members));
  const paragraphs = member.about
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const focus = member.focus ?? [];
  const credentials = (member.credentials ?? []).map((item) => credentialLabel(locale, item));
  const languages = (member.languages ?? []).map((item) => languageLabel(locale, item));

  return (
    <>
      <header className="max-w-[802px]">
        <p className="text-vz-blue-mid m-0 text-[15px] leading-[17px]">
          <Link to={ROUTES.aboutTeam} className="hover:text-vz-orange transition-colors duration-250">
            {t.ui.team}
          </Link>
        </p>
        <div className="mt-6 flex items-start gap-8 max-mob:flex-col max-mob:gap-5">
          {member.photo ? (
            <div className="bg-vz-blue-panel w-[280px] shrink-0 overflow-hidden max-mob:w-[196px]">
              <img
                src={member.photo}
                alt=""
                width={392}
                height={256}
                className="aspect-[49/32] w-full object-contain"
                decoding="async"
              />
            </div>
          ) : (
            <TeamAvatar member={member} size="md" />
          )}
          <div className="min-w-0 pt-1">
            <h1 className="mb-2">{member.name}</h1>
            {member.role && (
              <p className="text-vz-ink m-0 text-[24px] leading-[1.3] font-light max-mob:text-[20px]">
                {member.role}
              </p>
            )}
            {credentials.length ? (
              <p className="text-vz-blue-mid m-0 mt-3 text-[14px] leading-[1.4]">
                {credentials.join(' · ')}
              </p>
            ) : null}
            {languages.length ? (
              <p className="text-vz-gray m-0 mt-2 text-[14px] leading-[1.4]">
                {t.ui.languages}: {languages.join(', ')}
              </p>
            ) : null}
            <div className="text-vz-ink mt-4 space-y-1 text-[13px] leading-[1.45]">
              <p className="m-0 font-bold">
                {t.ui.finmaAdviserLabel}:{' '}
                <a
                  href={company.regulation.registerUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-vz-blue hover:text-vz-orange"
                >
                  {finmaAdviserNoFor(member)}
                  <span className="visually-hidden"> {t.ui.externalLinkNewWindow}</span>
                </a>
              </p>
              {member.cfaRegistryNo ? (
                <p className="m-0 font-bold">
                  {t.ui.cfaRegistryLabel}:{' '}
                  <a
                    href={cfaDirectoryUrl()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-vz-blue hover:text-vz-orange"
                  >
                    {member.cfaRegistryNo}
                    <span className="visually-hidden"> {t.ui.externalLinkNewWindow}</span>
                  </a>
                </p>
              ) : null}
              <p className="text-vz-gray m-0 text-[12px] leading-[1.4]">
                {t.ui.advisesUnder
                  .replace('{firm}', company.legalName)
                  .replace('{no}', company.regulation.finmaAuthorisationNo)}{' '}
                {t.ui.verifyFinmaRegister} (UID {company.uid})
                {member.cfaRegistryNo ? `; ${t.ui.confirmCfa}` : ''}.
              </p>
            </div>
            {member.regulatoryNote ? (
              <p className="text-vz-gray m-0 mt-2 text-[13px] leading-[1.4]">{member.regulatoryNote}</p>
            ) : null}
            {member.expertise?.length ? (
              <ul className="mt-4 mb-0 flex list-none flex-wrap gap-2 p-0">
                {member.expertise.map((tag) => (
                  <li
                    key={tag}
                    className="bg-vz-blue-panel text-vz-blue rounded-[3px] px-2.5 py-1 text-[12px] font-bold tracking-[0.02em] uppercase"
                  >
                    {expertiseLabel(locale, tag)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mt-10 max-w-[802px]">
        <section>
          <h2 className="text-vz-ink mb-3 text-[22px] leading-[1.3] font-bold">{t.ui.about}</h2>
          <div className="text-vz-ink space-y-4 text-[19px] leading-[1.55] max-mob:text-[18px]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="m-0">
                <PhoneRichText text={paragraph} />
              </p>
            ))}
          </div>
        </section>

        {focus.length > 0 && (
          <section className="mt-8">
            <h2 className="text-vz-ink mb-3 text-[22px] leading-[1.3] font-bold">{t.ui.professionalFocus}</h2>
            <ul className="text-vz-ink m-0 list-disc space-y-2 pl-5 text-[17px] leading-[1.5] max-mob:text-[16px]">
              {focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {member.results.length > 0 && (
          <section className="mt-8">
            <h2 className="text-vz-ink mb-3 text-[22px] leading-[1.3] font-bold">{t.ui.results}</h2>
            <ul className="text-vz-ink m-0 list-disc space-y-2 pl-5 text-[17px] leading-[1.5] max-mob:text-[16px]">
              {member.results.map((item) => (
                <li key={item}>
                  <PhoneRichText text={item} />
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>

      <div className="mt-12 max-lap:mt-10">
        <ConsultationForm member={member} />
      </div>

      {peers.length > 0 && (
        <section className="mt-12 max-lap:mt-10">
          <SectionTitle>{t.ui.colleagues}</SectionTitle>
          <ul className="m-0 grid list-none grid-cols-3 gap-x-8 gap-y-4 p-0 max-tab:grid-cols-2 max-mob:grid-cols-1">
            {peers.map((peer) => (
              <li key={peer.slug} className="vz-rule-b py-[10px]">
                <Link
                  to={teamMemberPath(peer.slug)}
                  className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[16px] leading-[1.3]"
                >
                  {peer.name}
                </Link>
                {peer.role && (
                  <p className="text-vz-gray m-0 mt-1 text-[13px] leading-[1.3]">{peer.role}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </>
  );
}
