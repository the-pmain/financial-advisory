import { Link, useLocation } from 'react-router';
import {
  matchKnowledgeHubSlug,
  matchLegalSlug,
  ROUTES,
} from '../../constants/routes';
import { legalBySlug } from '../../data/legal';
import { findArticle } from '../../data/content';
import { topicByPath } from '../../data/topics';

/** Derives the trail from the current route so every page carries a breadcrumb. */
function useTrail(): { label: string; to?: string }[] {
  const { pathname } = useLocation();
  const trail: { label: string; to?: string }[] = [{ label: 'Home', to: ROUTES.home }];

  if (pathname === ROUTES.home) return trail;

  const topic = topicByPath.get(pathname);
  if (topic) {
    topic.breadcrumb.forEach((label, i) => {
      const last = i === topic.breadcrumb.length - 1;
      trail.push(last ? { label } : { label });
    });
    return trail;
  }

  const articleSlug = matchKnowledgeHubSlug(pathname);
  if (articleSlug) {
    const article = findArticle(articleSlug);
    trail.push({ label: 'Knowledge hub' });
    if (article) trail.push({ label: article.title });
    return trail;
  }

  const legalSlug = matchLegalSlug(pathname);
  if (legalSlug) {
    const page = legalBySlug.get(legalSlug);
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
