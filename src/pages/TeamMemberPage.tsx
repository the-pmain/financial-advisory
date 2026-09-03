import { Link, useParams } from 'react-router';
import { ROUTES, teamMemberPath } from '../constants/routes';
import { teamBySlug, teamSections } from '../data/team';
import { SectionTitle } from '../components/ui/primitives';
import { TeamAvatar } from '../components/ui/TeamAvatar';
import { ConsultationForm } from '../components/widgets/ConsultationForm';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { NotFoundPage } from './NotFoundPage';

export function TeamMemberPage() {
  const { slug } = useParams();
  const member = slug ? teamBySlug.get(slug) : undefined;

  if (!member) return <NotFoundPage />;

  const peers = (teamSections.find((s) => s.id === member.section)?.members ?? []).filter(
    (m) => m.slug !== member.slug,
  );

  return (
    <>
      <header className="max-w-[802px]">
        <p className="text-vz-blue-mid m-0 text-[15px] leading-[17px]">
          <Link to={ROUTES.aboutTeam} className="hover:text-vz-orange transition-colors duration-250">
            Team
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
            {member.credentials?.length ? (
              <p className="text-vz-blue-mid m-0 mt-3 text-[14px] leading-[1.4]">
                {member.credentials.join(' · ')}
              </p>
            ) : null}
            {member.languages?.length ? (
              <p className="text-vz-gray m-0 mt-2 text-[14px] leading-[1.4]">
                Languages: {member.languages.join(', ')}
              </p>
            ) : null}
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
                    {tag.replace('-', ' ')}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mt-10 max-w-[802px]">
        <section>
          <h2 className="text-vz-ink mb-3 text-[22px] leading-[1.3] font-bold">About</h2>
          <p className="text-vz-ink m-0 text-[19px] leading-[1.55] max-mob:text-[18px]">
            {member.about}
          </p>
        </section>

        {member.results.length > 0 && (
          <section className="mt-8">
            <h2 className="text-vz-ink mb-3 text-[22px] leading-[1.3] font-bold">Results</h2>
            <ul className="text-vz-ink m-0 list-disc space-y-2 pl-5 text-[17px] leading-[1.5] max-mob:text-[16px]">
              {member.results.map((item) => (
                <li key={item}>{item}</li>
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
          <SectionTitle>Colleagues</SectionTitle>
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
