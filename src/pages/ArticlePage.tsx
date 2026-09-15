import { useParams, Link } from 'react-router';
import { ROUTES } from '../constants/routes';
import { allArticles, findArticle } from '../data/content';
import { ArticleSlim } from '../components/widgets/ArticleTeaser';
import { AdviceDisclaimer } from '../components/widgets/AdviceDisclaimer';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { PhoneRichText } from '../components/ui/PhoneNumberDisplay';
import { SectionTitle, Tagline } from '../components/ui/primitives';
import { NotFoundPage } from './NotFoundPage';

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = slug ? findArticle(slug) : undefined;

  if (!article) return <NotFoundPage />;

  const more = allArticles
    .filter((item) => item.slug !== article.slug && item.kind !== 'video')
    .slice(0, 2);

  const meta = [
    formatDate(article.publishedDate),
    article.author,
    article.readingTimeMinutes ? `${article.readingTimeMinutes} min read` : null,
  ].filter(Boolean);

  return (
    <>
      <article className="max-w-[802px]">
        <header>
          <p className="text-vz-blue-mid m-0 text-[14px] leading-[1.3]">
            <Link to={ROUTES.insights} className="hover:text-vz-orange transition-colors duration-250">
              Insights
            </Link>
            {' · '}
            <span>{article.tagline}</span>
          </p>
          <Tagline className="mt-3">{article.tagline}</Tagline>
          <h1 className="mt-2">{article.title}</h1>
          <p className="text-vz-ink m-0 text-[21px] leading-[1.45] max-mob:text-[19px]">
            <PhoneRichText text={article.teaser} />
          </p>
          {meta.length > 0 && (
            <p className="text-vz-gray m-0 mt-4 text-[14px] leading-[1.4]">{meta.join(' · ')}</p>
          )}
          {article.lastReviewed && (
            <p className="text-vz-gray m-0 mt-1 text-[13px]">
              Last reviewed {formatDate(article.lastReviewed)}
            </p>
          )}
        </header>

        {article.image && (
          <img
            src={article.image}
            alt={article.imageAlt ?? ''}
            className="mt-8 w-full"
          />
        )}

        <div className="mt-8">
          {(article.body ?? []).map((paragraph, i) => (
            <p key={i} className="text-vz-ink text-[19px] leading-[1.55] max-mob:text-[18px]">
              <PhoneRichText text={paragraph} />
            </p>
          ))}
        </div>

        <AdviceDisclaimer className="mt-10" />
      </article>

      <section className="mt-12 max-lap:mt-10">
        <SectionTitle>More articles</SectionTitle>
        <div className="grid grid-cols-2 gap-x-[68px] max-tab:grid-cols-1 max-tab:gap-x-0">
          {more.map((item) => (
            <ArticleSlim key={item.slug} article={item} />
          ))}
        </div>
      </section>

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </>
  );
}
