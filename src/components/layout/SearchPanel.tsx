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
      className={`absolute top-full -right-[30px] -left-[30px] z-10 bg-white px-[30px] pt-[14px] pb-[18px] transition-[opacity,visibility] duration-250 max-lap:-right-[25px] max-lap:-left-[25px] max-lap:px-[25px] ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      } after:pointer-events-none after:absolute after:-bottom-1 after:right-0 after:left-0 after:block after:h-1 after:bg-gradient-to-b after:from-black/15 after:to-transparent`}
    >
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex items-center gap-3"
      >
        <label htmlFor="vz-search-input" className="visually-hidden">
          Search the website
        </label>
        <input
          ref={input}
          id="vz-search-input"
          type="search"
          value={query}
          placeholder="What are you looking for?"
          onChange={(event) => setQuery(event.target.value)}
          className="border-vz-rule text-vz-ink placeholder:text-vz-gray-light focus:border-vz-blue h-[42px] flex-1 rounded-[3px] border bg-white px-3 text-[17px] outline-none"
        />
        <button
          type="reset"
          onClick={() => setQuery('')}
          className="text-vz-blue hover:text-vz-orange cursor-pointer text-[15px] transition-colors duration-250"
        >
          Reset
        </button>
        <button
          type="submit"
          className="bg-vz-blue hover:bg-vz-blue-mid h-[42px] cursor-pointer rounded-[3px] px-5 text-[15px] font-bold text-white transition-colors duration-250"
        >
          Search
        </button>
      </form>

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
