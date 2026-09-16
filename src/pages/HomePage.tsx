import { newsFeatured, newsSecondary, newsSlim, offers } from '../data/content';
import { ROUTES } from '../constants/routes';
import { ArticleFeatured, ArticleSlim } from '../components/widgets/ArticleTeaser';
import { AudienceBands, Hero } from '../components/widgets/Hero';
import { CaseStudiesBand } from '../components/widgets/CaseStudiesBand';
import { HomeServices } from '../components/widgets/HomeServices';
import { MarketsSection } from '../components/widgets/MarketsSection';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { OffersGallery } from '../components/widgets/OffersGallery';
import { PortalPreview } from '../components/widgets/PortalPreview';
import { TwoColumns } from '../components/widgets/TwoColumns';
import { UnderlineLink } from '../components/ui/primitives';

const gap = 'mt-12 max-lap:mt-10';

/**
 * Home keeps every section. Spacing matches the rest of the site
 * (`mt-12` / `mt-10`), not an invented wider gap.
 */
export function HomePage() {
  return (
    <>
      <Hero />

      <div className={gap}>
        <AudienceBands />
      </div>

      <div className={gap}>
        <TwoColumns
          title="Guidance for confident decisions"
          left={
            <>
              <ArticleFeatured article={newsFeatured} compact />
              <div className="border-vz-surface border-t-4 pt-[13px] max-mob:border-t-[3px] max-mob:border-t-black/10 max-mob:pt-[12px]">
                {newsSlim.map((article, i) => (
                  <ArticleSlim key={article.slug} article={article} divided={i > 0} compact />
                ))}
              </div>
              <p className="mt-4 mb-0">
                <UnderlineLink to={ROUTES.insights} bold>
                  Explore all insights
                </UnderlineLink>
              </p>
            </>
          }
          right={<ArticleFeatured article={newsSecondary} compact />}
        />
      </div>

      <div className={gap}>
        <OffersGallery offers={offers} />
      </div>

      <div className={gap}>
        <CaseStudiesBand title="Advice made personal" limit={3} compact />
      </div>

      <div className={gap}>
        <MarketsSection />
      </div>

      <div className={gap}>
        <HomeServices />
      </div>

      <div className={gap}>
        <PortalPreview />
      </div>

      <div className={gap}>
        <NewsletterCta />
      </div>
    </>
  );
}
