import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  knowledgeHubArticlePath,
  legalPagePath,
  teamMemberPath,
} from '../../constants/routes';
import { allArticles } from '../../data/content';
import { legalPages } from '../../data/legal';
import { teamMembers } from '../../data/team';
import { topics } from '../../data/topics';
import { CloseIcon, SearchIcon } from '../ui/Icons';

type Result = { label: string; to: string; context: string; weight: number; haystack: string };

function buildIndex(): Result[] {
  const items: Result[] = [
    ...topics.map((topic) => ({
      label: topic.title,
      to: topic.path,
      context: topic.breadcrumb.join(' › '),
      weight: 3,
      haystack: [
        topic.title,
        topic.subtitle,
        ...topic.intro,
        ...topic.highlights.flatMap((h) => [h.title, h.text]),
      ]
        .join(' ')
        .toLowerCase(),
    })),
    ...allArticles.map((article) => ({
      label: article.title,
      to: knowledgeHubArticlePath(article.slug),
      context: article.tagline,
      weight: 2,
      haystack: [article.title, article.tagline, article.teaser, ...(article.body ?? [])]
        .join(' ')
        .toLowerCase(),
    })),
    ...teamMembers.map((member) => ({
      label: member.name,
      to: teamMemberPath(member.slug),
      context: member.role,
      weight: 2,
      haystack: [member.name, member.role, member.about, ...(member.credentials ?? [])]
        .join(' ')
        .toLowerCase(),
    })),
    ...legalPages.map((page) => ({
      label: page.title,
      to: legalPagePath(page.slug),
      context: 'Legal',
      weight: 1,
      haystack: [
        page.title,
        ...page.sections.flatMap((s) => [s.heading ?? '', ...s.paragraphs]),
      ]
        .join(' ')
        .toLowerCase(),
    })),
  ];
  return items;
}

const index = buildIndex();

/**
 * Search drawer that drops out of the header. Weighted title matches first.
 */
export function SearchPanel({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) input.current?.focus({ preventScroll: true });
    else setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .map((item) => {
        const titleHit = item.label.toLowerCase().includes(q);
        const contextHit = item.context.toLowerCase().includes(q);
        const bodyHit = item.haystack.includes(q);
        if (!titleHit && !contextHit && !bodyHit) return null;
        const score = (titleHit ? 100 : 0) + (contextHit ? 40 : 0) + (bodyHit ? 10 : 0) + item.weight;
        return { ...item, score };
      })
      .filter((item): item is Result & { score: number } => Boolean(item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [query]);

  return (
    <div
      id={id}
      hidden={!open}
      className={`absolute top-full -right-[30px] -left-[30px] z-90 bg-white px-[30px] pt-[14px] pb-[18px] transition-[opacity,visibility] duration-250 max-lap:fixed max-lap:top-[var(--nav-sheet-top,74px)] max-lap:left-[var(--nav-sheet-left,0px)] max-lap:w-[var(--nav-sheet-width,100%)] max-lap:right-auto max-lap:bottom-auto max-lap:h-[calc(100dvh-var(--nav-sheet-top,74px))] max-lap:overflow-y-auto max-lap:overscroll-y-contain max-lap:px-[25px] max-lap:pb-[max(2.5rem,env(safe-area-inset-bottom))] max-mob:px-[12.5px] ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      } after:pointer-events-none after:absolute after:-bottom-1 after:right-0 after:left-0 after:block after:h-1 after:bg-gradient-to-b after:from-black/15 after:to-transparent max-lap:after:hidden`}
    >
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="vz-search-input" className="visually-hidden">
          Search the website
        </label>
        <div className="border-vz-rule bg-vz-blue-panel-faint focus-within:border-vz-blue focus-within:shadow-[0_0_0_3px_rgba(7,14,24,0.08)] flex min-h-12 items-center gap-3 rounded-[4px] border px-3.5 transition-[border-color,box-shadow,background-color] duration-250 focus-within:bg-white">
          <SearchIcon className="text-vz-blue-soft pointer-events-none h-5 w-5 shrink-0" />
          <input
            ref={input}
            id="vz-search-input"
            type="search"
            value={query}
            placeholder="What are you looking for?"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
            onChange={(event) => setQuery(event.target.value)}
            className="text-vz-ink placeholder:text-vz-gray-light h-12 min-w-0 flex-1 bg-transparent text-[17px] leading-[1.3] outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                input.current?.focus();
              }}
              aria-label="Clear search"
              className="text-vz-gray-mid hover:text-vz-blue flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/80 transition-colors duration-250"
            >
              <CloseIcon className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      </form>

      {query.trim().length < 2 && (
        <p className="text-vz-gray-mid mt-3 mb-0 hidden text-[14px] leading-[1.4] max-lap:block">
          Type at least two characters to search the site.
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-3">
          {results.map((result) => (
            <li key={result.to + result.label} className="vz-rule-b">
              <Link
                to={result.to}
                onClick={onClose}
                className="hover:bg-vz-blue-panel group block px-2 py-[10px] transition-colors duration-250"
              >
                <span className="text-vz-blue group-hover:text-vz-orange block text-[17px] leading-[1.3] transition-colors duration-250">
                  {result.label}
                </span>
                {result.context && (
                  <span className="text-vz-gray block text-[13px] leading-[1.3]">
                    {result.context}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <p className="text-vz-gray mt-3 mb-0 text-[15px]">No results for “{query.trim()}”.</p>
      )}
    </div>
  );
}
