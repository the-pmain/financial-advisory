import type { TeamMember } from '../data/team';
import type { Translations } from './types';

export function localizedMember(
  member: TeamMember,
  members: Translations['team']['members'],
): TeamMember {
  const copy = members[member.slug];
  if (!copy) return member;
  return {
    ...member,
    role: copy.role || member.role,
    about: copy.about || member.about,
    results: copy.results.length ? copy.results : member.results,
    focus: copy.focus?.length ? copy.focus : member.focus,
    regulatoryNote: copy.regulatoryNote || member.regulatoryNote,
  };
}
