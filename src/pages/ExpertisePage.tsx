import { Link } from 'react-router';
import { knowledgeHubArticlePath, ROUTES } from '../constants/routes';
import { insightArticles, sortedArticles } from '../data/content';
import { ArticleSlim } from '../components/widgets/ArticleTeaser';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { PhoneRichText } from '../components/ui/PhoneNumberDisplay';
import { SectionTitle, Tagline, UnderlineLink } from '../components/ui/primitives';

const groups = [
  { title: 'Retirement & pensions', taglines: ['Retirement', 'Pillar 3a', 'Pension fund'] },
  { title: 'Investments', taglines: ['Financial investments', 'Investments'] },
  { title: 'Taxes & real estate', taglines: ['Taxes', 'Real estate', 'Mortgages'] },
  { title: 'Regulation & protection', taglines: ['Regulation', 'Consumer protection', 'Insights'] },
];

export function ExpertisePage() {
  const horizon = insightArticles.find((a) => a.slug === 'horizon-report-2026');

  return (
    <>
      <header className="max-w-[802px]">
        <h1 className="mb-3">Expertise</h1>
        <p className="text-vz-ink m-0 text-[42px] leading-[1.1875] font-light max-lap:text-[32px] max-mob:text-[24px]">
          Knowledge, studies and tools from our specialists.
        </p>
      </header>

      {horizon && (
        <section className="bg-vz-blue-panel mt-10 px-6 py-7 max-mob:px-4">
          <Tagline>Horizon report</Tagline>
          <h2 className="text-vz-ink mt-2 mb-0 text-[28px] leading-[1.25] font-bold max-mob:text-[22px]">
            <Link
              to={knowledgeHubArticlePath(horizon.slug)}
              className="hover:text-vz-orange transition-colors duration-250"
            >
              {horizon.title}
            </Link>
          </h2>
          <p className="text-vz-ink mt-3 mb-0 max-w-[40rem] text-[17px] leading-[1.45]">
            <PhoneRichText text={horizon.teaser} />
          </p>
          <p className="mt-4 mb-0">
            <UnderlineLink to={knowledgeHubArticlePath(horizon.slug)}>Read the report</UnderlineLink>
          </p>
        </section>
      )}

      <div className="mt-12 max-lap:mt-10">
        <SectionTitle>Browse by topic</SectionTitle>
        <div className="grid grid-cols-2 gap-x-[68px] gap-y-10 max-tab:grid-cols-1">
          {groups.map((group) => {
            const articles = sortedArticles()
              .filter((a) => group.taglines.includes(a.tagline))
              .slice(0, 3);
            if (!articles.length) return null;
            return (
              <div key={group.title}>
                <h3 className="text-vz-ink m-0 mb-4 text-[20px] font-bold">{group.title}</h3>
                {articles.map((article, i) => (
                  <ArticleSlim key={article.slug} article={article} divided={i > 0} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-10 mb-0">
        <UnderlineLink to={ROUTES.insights} bold>
          All insights
        </UnderlineLink>
      </p>

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </>
  );
}
