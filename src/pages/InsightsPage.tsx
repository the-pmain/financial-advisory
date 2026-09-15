import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { knowledgeHubArticlePath } from '../constants/routes';
import { sortedArticles } from '../data/content';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { PhoneRichText } from '../components/ui/PhoneNumberDisplay';
import { SectionTitle, Tagline } from '../components/ui/primitives';

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function InsightsPage() {
  const articles = useMemo(() => sortedArticles().filter((a) => a.kind !== 'video'), []);
  const tags = useMemo(
    () => ['All', ...Array.from(new Set(articles.map((a) => a.tagline))).sort()],
    [articles],
  );
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? articles : articles.filter((a) => a.tagline === filter);

  return (
    <>
      <header className="max-w-[802px]">
        <h1 className="mb-3">Insights</h1>
        <p className="text-vz-ink m-0 text-[42px] leading-[1.1875] font-light max-lap:text-[32px] max-mob:text-[24px]">
          Articles, guides and regulatory explainers.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={`cursor-pointer rounded-[3px] px-3 py-1.5 text-[14px] transition-colors duration-250 ${
              filter === tag
                ? 'bg-vz-blue text-white'
                : 'bg-vz-blue-panel text-vz-blue hover:bg-vz-blue hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <section className="mt-10">
        <SectionTitle>
          {filter === 'All' ? 'All articles' : filter}
        </SectionTitle>
        <ul className="m-0 list-none p-0">
          {visible.map((article) => (
            <li key={article.slug} className="border-vz-rule border-b py-5">
              <Link to={knowledgeHubArticlePath(article.slug)} className="group block no-underline">
                <Tagline className="group-hover:text-vz-orange">{article.tagline}</Tagline>
                <h2 className="text-vz-ink group-hover:text-vz-orange m-0 mt-1 text-[24px] leading-[1.25] font-bold transition-colors duration-250 max-mob:text-[20px]">
                  {article.title}
                </h2>
                <p className="text-vz-ink mt-2 mb-0 text-[16px] leading-[1.45]">
                  <PhoneRichText text={article.teaser} />
                </p>
                <p className="text-vz-gray m-0 mt-2 text-[13px]">
                  {[formatDate(article.publishedDate), article.author, article.readingTimeMinutes
                    ? `${article.readingTimeMinutes} min read`
                    : null]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </>
  );
}
