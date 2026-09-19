import { Link } from 'react-router';
import { teamMemberPath } from '../../constants/routes';
import { useEmployees } from '../../hooks/useEmployees';
import type { ExpertiseTag } from '../../data/topics';
import { SectionTitle } from '../ui/primitives';

export function SpecialistsBand({ tags }: { tags?: ExpertiseTag[] }) {
  const { specialists } = useEmployees();
  const members = specialists(tags);
  if (!members.length) return null;

  return (
    <section>
      <SectionTitle>Meet our specialists</SectionTitle>
      <ul className="m-0 grid list-none grid-cols-4 gap-4 p-0 max-lap:grid-cols-2 max-mob:grid-cols-1">
        {members.map((member) => (
          <li key={member.slug}>
            <Link
              to={teamMemberPath(member.slug)}
              className="group border-vz-rule hover:border-vz-orange block border-t pt-3 no-underline transition-colors duration-250"
            >
              <p className="text-vz-ink group-hover:text-vz-orange m-0 text-[16px] leading-[1.3] font-bold transition-colors duration-250">
                {member.name}
              </p>
              <p className="text-vz-gray m-0 mt-1 text-[13px] leading-[1.35]">{member.role}</p>
              {member.credentials?.length ? (
                <p className="text-vz-blue-mid m-0 mt-2 text-[12px] leading-[1.35]">
                  {member.credentials.join(' · ')}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
