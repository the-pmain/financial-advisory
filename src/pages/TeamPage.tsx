import { Link } from 'react-router';
import { teamMemberPath } from '../constants/routes';
import { type TeamMember } from '../data/team';
import { useEmployees } from '../hooks/useEmployees';
import { AppointmentButton } from '../components/appointments/AppointmentModal';
import { SectionTitle } from '../components/ui/primitives';
import { NewsletterCta } from '../components/widgets/NewsletterCta';

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Link
      to={teamMemberPath(member.slug)}
      className="group focus-visible:outline-vz-orange relative block overflow-hidden bg-white no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="bg-vz-blue-panel aspect-[49/32] overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt=""
            width={392}
            height={256}
            className="size-full object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="text-vz-blue flex size-full items-center justify-center text-[28px] font-bold tracking-wide">
            {member.name
              .split(/\s+/)
              .filter((part) => !/^(de|del|la|las|los|y)$/i.test(part))
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase() ?? '')
              .join('')}
          </div>
        )}
      </div>
      <div className="px-3 py-3">
        <h3 className="text-vz-ink m-0 text-[17px] leading-[1.25] font-bold transition-colors duration-250 group-hover:text-vz-orange max-mob:text-[16px]">
          {member.name}
        </h3>
        {member.role && (
          <p className="text-vz-gray m-0 mt-1 text-[13px] leading-[1.35]">{member.role}</p>
        )}
      </div>
      <span
        aria-hidden
        className="bg-vz-orange absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}

export function TeamPage() {
  const { featured: featuredMember, sections: teamSections, status } = useEmployees();

  return (
    <>
      <header className="max-w-[802px]">
        <h1 className="mb-3">Team</h1>
        <p className="text-vz-ink m-0 text-[42px] leading-[1.1875] font-light max-lap:text-[32px] max-mob:text-[24px]">
          Independent advisers who answer only to their clients
        </p>
      </header>

      {status === 'loading' && (
        <p className="text-vz-gray mt-12 mb-0 text-[16px]">Loading the team…</p>
      )}
      {status === 'error' && (
        <p className="text-vz-gray mt-12 mb-0 text-[16px]">The team list could not be loaded.</p>
      )}

      {featuredMember && <section className="mt-12 grid max-w-[1100px] grid-cols-[minmax(220px,320px)_minmax(0,1fr)] items-stretch gap-8 max-mob:grid-cols-1 max-mob:gap-5">
        <Link
          to={teamMemberPath(featuredMember.slug)}
          className="group focus-visible:outline-vz-orange block overflow-hidden bg-white no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <div className="bg-vz-blue-panel aspect-[49/32] overflow-hidden">
            {featuredMember.photo ? (
              <img
                src={featuredMember.photo}
                alt=""
                width={392}
                height={256}
                className="size-full object-contain"
                decoding="async"
              />
            ) : (
              <div className="text-vz-blue flex size-full items-center justify-center text-[48px] font-bold tracking-wide">
                {featuredMember.name
                  .split(/\s+/)
                  .filter((part) => !/^(de|del|la|las|los|y)$/i.test(part))
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase() ?? '')
                  .join('')}
              </div>
            )}
          </div>
          <div className="px-4 py-4">
            <p className="text-vz-gray m-0 text-[14px] leading-[1.3]">{featuredMember.role}</p>
            <h2 className="text-vz-ink m-0 mt-1 text-[22px] leading-[1.2] font-bold transition-colors duration-250 group-hover:text-vz-orange max-mob:text-[20px]">
              {featuredMember.name}
            </h2>
          </div>
        </Link>
        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-vz-ink m-0 text-[17px] leading-[1.5]">
            {featuredMember.name} leads Helfenstein’s investment philosophy and long-term capital
            allocation.
          </p>
          <p className="mt-5 mb-0">
            <Link
              to={teamMemberPath(featuredMember.slug)}
              className="text-vz-blue hover:text-vz-orange vz-underline-hover text-[15px]"
            >
              Read more
            </Link>
          </p>
        </div>
      </section>}

      {teamSections.map((section) => (
        <section key={section.id} className="mt-14 max-lap:mt-12">
          <SectionTitle>{section.title}</SectionTitle>
          <div className="mt-2 grid grid-cols-4 gap-4 max-lap:grid-cols-3 max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-3">
            {section.members.map((member) => (
              <MemberCard key={member.slug} member={member} />
            ))}
          </div>
        </section>
      ))}

      <div className="mt-12 max-w-[802px]">
        <AppointmentButton>Make an appointment</AppointmentButton>
      </div>

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </>
  );
}
