import { Link, useLocation } from 'react-router';
import {
  matchKnowledgeHubSlug,
  matchLegalSlug,
  matchTeamMemberSlug,
  ROUTES,
} from '../../constants/routes';
import { legalBySlug } from '../../data/legal';
import { findArticle } from '../../data/content';
import { useEmployees } from '../../hooks/useEmployees';
import { useT } from '../../i18n';
import { topicByPath } from '../../data/topics';

/** Derives the trail from the current route so every page carries a breadcrumb. */
function useTrail(): { label: string; to?: string }[] {
  const { pathname } = useLocation();
  const { bySlug } = useEmployees();
  const t = useT();
  const aboutLabel =
    t.nav.mainNavigation.find((group) => group.to === ROUTES.about)?.label ?? t.ui.about;
  const teamLabel =
    t.nav.mainNavigation
      .flatMap((group) => group.children)
      .find((link) => link.to === ROUTES.aboutTeam)?.label ?? t.ui.team;
  const trail: { label: string; to?: string }[] = [{ label: t.ui.home, to: ROUTES.home }];

  if (pathname === ROUTES.home) return trail;

  if (pathname === ROUTES.aboutTeam) {
    trail.push({ label: aboutLabel, to: ROUTES.about });
    trail.push({ label: teamLabel });
    return trail;
  }

  const memberSlug = matchTeamMemberSlug(pathname);
  if (memberSlug) {
    const member = bySlug.get(memberSlug);
    trail.push({ label: aboutLabel, to: ROUTES.about });
    trail.push({ label: teamLabel, to: ROUTES.aboutTeam });
    trail.push({ label: member?.name ?? t.ui.team });
    return trail;
  }

  const topic = topicByPath.get(pathname);
  if (topic) {
    const crumbs = t.topics[pathname]?.breadcrumb ?? topic.breadcrumb;
    crumbs.forEach((label, i) => {
      const last = i === crumbs.length - 1;
      trail.push(last ? { label } : { label, to: i === 0 ? ROUTES.about : undefined });
    });
    return trail;
  }

  const articleSlug = matchKnowledgeHubSlug(pathname);
  if (articleSlug) {
    const article = t.content.articles[articleSlug] ?? findArticle(articleSlug);
    trail.push({ label: t.ui.knowledgeHub });
    if (article) trail.push({ label: article.title });
    return trail;
  }

  const legalSlug = matchLegalSlug(pathname);
  if (legalSlug) {
    const page = t.legal[legalSlug] ?? legalBySlug.get(legalSlug);
    if (page) trail.push({ label: page.title });
    return trail;
  }

  return trail;
}

export function Breadcrumb() {
  const trail = useTrail();

  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-vz-slate m-0 flex list-none flex-wrap items-center p-0 text-[14px] leading-[16px] font-bold">
        {/* Each crumb carries a 21px trailing inset that holds the separator
            without affecting the row's height, the last one included. */}
        {trail.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="relative pr-[21px]">
            {crumb.to && i < trail.length - 1 ? (
              <Link to={crumb.to} className="hover:text-vz-orange transition-colors duration-250">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current={i === trail.length - 1 ? 'page' : undefined}>{crumb.label}</span>
            )}
            {i < trail.length - 1 && (
              <span
                aria-hidden="true"
                className="text-vz-gray-light absolute top-0 right-0 w-[21px] text-center font-normal"
              >
                ›
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
