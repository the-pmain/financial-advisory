import { newsFeatured, newsSecondary, newsSlim, offers, solutions } from '../data/content';
import { ROUTES } from '../constants/routes';
import { ArticleFeatured, ArticleSlim } from '../components/widgets/ArticleTeaser';
import { AudienceBands, Hero } from '../components/widgets/Hero';
import { CaseStudiesBand } from '../components/widgets/CaseStudiesBand';
import { CompaniesBand } from '../components/widgets/CompaniesBand';
import { MarketsSection } from '../components/widgets/MarketsSection';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { OffersGallery } from '../components/widgets/OffersGallery';
import { TextTeasers } from '../components/widgets/TextTeasers';
import { TwoColumns } from '../components/widgets/TwoColumns';
import { UnderlineLink } from '../components/ui/primitives';

const gap = 'mt-12';

export function HomePage() {
  return (
    <>
      <Hero />

      <div className={gap}>
        <AudienceBands />
      </div>

      <div className={gap}>
        <TwoColumns
          title="News"
          left={
            <>
              <ArticleFeatured article={newsFeatured} />
              <div className="border-vz-surface border-t-4 pt-[13px] max-mob:border-t-[3px] max-mob:border-t-black/10 max-mob:pt-[12px]">
                {newsSlim.map((article, i) => (
                  <ArticleSlim key={article.slug} article={article} divided={i > 0} />
                ))}
              </div>
              <p className="mt-4 mb-0">
                <UnderlineLink to={ROUTES.insights} bold>
                  All insights
                </UnderlineLink>
              </p>
            </>
          }
          right={<ArticleFeatured article={newsSecondary} />}
        />
      </div>

      <div className={gap}>
        <OffersGallery offers={offers} />
      </div>

      <div className={gap}>
        <CompaniesBand />
      </div>

      <div className={gap}>
        <CaseStudiesBand limit={3} />
      </div>

      <div className={gap}>
        <MarketsSection />
      </div>

      <div className={gap}>
        <TextTeasers title="Our offering" items={solutions} />
      </div>

      <div className={gap}>
        <NewsletterCta />
      </div>
    </>
  );
}
