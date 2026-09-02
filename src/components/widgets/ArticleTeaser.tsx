import { Link } from 'react-router';
import { knowledgeHubArticlePath } from '../../constants/routes';
import type { Article } from '../../data/content';
import { Tagline } from '../ui/primitives';

/**
 * News teasers. On the reference the category label lives *inside* the heading
 * anchor, so the whole tagline + title block is one link target; the standfirst
 * sits outside and is wired up with aria-describedby.
 *
 * Both teaser flavours step down a size at 1280px — not at the mobile
 * breakpoint — and switch their standfirst from 17/23.8 to 16/22.4.
 */

const teaser =
  'text-vz-ink tracking-vz-02 mt-[6px] mb-0 text-[17px] leading-[23.8px] max-desk:text-[16px] max-desk:leading-[22.4px] max-desk:tracking-vz-base';
const titleLink = 'text-vz-ink group-hover:text-vz-orange transition-colors duration-250';

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ArticleMeta({ article }: { article: Article }) {
  const date = formatDate(article.publishedDate);
  if (!date) return null;
  return <p className="text-vz-gray m-0 mt-2 text-[13px] leading-[1.3]">{date}</p>;
}

/** 34/39.1 headline, dropping to 26/30.7 below 1281px. */
export function ArticleFeatured({ article }: { article: Article }) {
  const describedBy = `teaser-${article.slug}`;

  return (
    <article className="group flex flex-col pb-6 max-mob:pb-8">
      <div>
        <Link to={knowledgeHubArticlePath(article.slug)} aria-describedby={describedBy} className="block">
          {article.image && (
            <div className="mb-[18px] overflow-hidden">
              <img
                src={article.image}
                alt={article.imageAlt ?? ''}
                className="aspect-[574/321] w-full object-cover"
              />
            </div>
          )}
          <h3 className="m-0 text-[34px] leading-[39.1px] font-bold max-desk:text-[26px] max-desk:leading-[30.7px]">
            <Tagline className="group-hover:text-vz-orange">{article.tagline}</Tagline>
            <span className={titleLink}>{article.title}</span>
          </h3>
        </Link>
        <p id={describedBy} className={teaser}>
          {article.teaser}
        </p>
        <ArticleMeta article={article} />
      </div>
    </article>
  );
}

/**
 * 26/32 headline in the stacked list under the lead story, dropping to 20/24
 * below 1281px. The separator belongs to the list item so the first row in a
 * group can omit it; on phones it becomes a 3px black-10% rule instead of the
 * 4px page-grey one.
 */
export function ArticleSlim({ article, divided = true }: { article: Article; divided?: boolean }) {
  const describedBy = `teaser-${article.slug}`;

  return (
    <article
      className={`group relative pb-6 max-mob:pb-8 ${
        divided
          ? 'border-vz-surface border-t-4 pt-[13px] max-mob:border-t-[3px] max-mob:border-t-black/10 max-mob:pt-[12px]'
          : ''
      }`}
    >
      <Link to={knowledgeHubArticlePath(article.slug)} aria-describedby={describedBy}>
        <h3 className="m-0 text-[26px] leading-[32px] font-bold max-desk:text-[20px] max-desk:leading-[24px]">
          <Tagline gap={8} className="group-hover:text-vz-orange">
            {article.tagline}
          </Tagline>
          <span className={titleLink}>{article.title}</span>
        </h3>
      </Link>
      <p id={describedBy} className={teaser}>
        {article.teaser}
      </p>
      <ArticleMeta article={article} />
    </article>
  );
}

/**
 * Markets-panel teaser: 20/25.4 semibold, no standfirst, separated by a 4px
 * white rule that reads as a gap on the pale blue panel. On phones it drops to
 * 16/21 bold and each row after the first gains its own grey hairline.
 */
export function ArticleCompact({ article, first = false }: { article: Article; first?: boolean }) {
  return (
    <div
      className={
        first ? '' : 'max-mob:mt-[12px] max-mob:border-t-[3px] max-mob:border-t-black/10 max-mob:pt-[32px]'
      }
    >
      <article className="group border-t-4 border-white pt-[12px] pb-[36px] last:pb-[27px]">
        <Link to={knowledgeHubArticlePath(article.slug)}>
          <h3 className="m-0 mb-[4px] text-[20px] leading-[25.4px] font-semibold max-mob:text-[16px] max-mob:leading-[21px] max-mob:font-bold">
            <Tagline gap={4} className="group-hover:text-vz-orange">
              {article.tagline}
            </Tagline>
            <span className={titleLink}>{article.title}</span>
          </h3>
        </Link>
      </article>
    </div>
  );
}
