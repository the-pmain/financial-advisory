import { useLocation } from 'react-router';
import { ROUTES } from '../constants/routes';
import { findArticle } from '../data/content';
import { topicByPath } from '../data/topics';
import { useT } from '../i18n';
import { AdviceDisclaimer } from '../components/widgets/AdviceDisclaimer';
import { ArticleSlim } from '../components/widgets/ArticleTeaser';
import { CaseStudiesBand } from '../components/widgets/CaseStudiesBand';
import { ChallengesBenefits } from '../components/widgets/ChallengesBenefits';
import { CustodyBanks } from '../components/widgets/CustodyBanks';
import { DocumentsList } from '../components/widgets/DocumentsList';
import { OmbudsmanDisclosure } from '../components/widgets/OmbudsmanDisclosure';
import { PortalPreview } from '../components/widgets/PortalPreview';
import { RegulatoryHistory } from '../components/widgets/RegulatoryHistory';
import { NewsletterCta } from '../components/widgets/NewsletterCta';
import { SpecialistsBand } from '../components/widgets/SpecialistsBand';
import { TextTeasers } from '../components/widgets/TextTeasers';
import { VerifyFinma } from '../components/widgets/VerifyFinma';
import { AppointmentButton } from '../components/appointments/AppointmentModal';
import { PhoneRichText } from '../components/ui/PhoneNumberDisplay';
import { ButtonOrange, SectionTitle } from '../components/ui/primitives';
import { NotFoundPage } from './NotFoundPage';

/**
 * One template for every navigation destination. It reuses the home page's
 * widgets so type, rhythm and rules stay identical across the site.
 */
export function TopicPage() {
  const { pathname } = useLocation();
  const t = useT();
  const topic = topicByPath.get(pathname);

  if (!topic) return <NotFoundPage />;
  const copy = t.topics[pathname];
  const title = copy?.title ?? topic.title;
  const subtitle = copy?.subtitle ?? topic.subtitle;
  const intro = copy?.intro ?? topic.intro;
  const highlights = copy?.highlights ?? topic.highlights;
  const ctaLabel = copy?.ctaLabel ?? topic.ctaLabel;

  const related = (topic.relatedSlugs ?? [])
    .map((slug) => findArticle(slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));

  return (
    <>
      <header className="max-w-[802px]">
        <h1 className="mb-3">{title}</h1>
        <p className="text-vz-ink m-0 text-[42px] leading-[1.1875] font-light max-lap:text-[32px] max-mob:text-[24px]">
          {subtitle}
        </p>
      </header>

      <div className="mt-10 max-w-[802px]">
        {intro.map((paragraph, i) => (
          <p key={i} className="text-vz-ink text-[19px] leading-[1.45] max-mob:text-[18px]">
            <PhoneRichText text={paragraph} />
          </p>
        ))}
        {topic.ctaLabel === 'Subscribe now' ||
        topic.ctaLabel === 'Sign up for free' ||
        topic.ctaLabel === 'Order for free' ? (
          <ButtonOrange
            to={
              topic.ctaLabel === 'Subscribe now'
                ? ROUTES.newsletter
                : topic.ctaLabel === 'Sign up for free'
                  ? ROUTES.financialPortal
                  : pathname
            }
            className="mt-2"
          >
            {ctaLabel}
          </ButtonOrange>
        ) : (
          <AppointmentButton className="mt-2">{ctaLabel ?? 'Make an appointment'}</AppointmentButton>
        )}
      </div>

      <div className="mt-12 max-lap:mt-10">
        <TextTeasers
          title="What we do for you"
          items={highlights.map((item) => ({
            title: item.title,
            text: item.text,
            to: pathname,
          }))}
        />
      </div>

      {(topic.challenges || topic.benefits) && (
        <div className="mt-12 max-lap:mt-10">
          <ChallengesBenefits challenges={topic.challenges} benefits={topic.benefits} />
        </div>
      )}

      {topic.showVerifyFinma && (
        <div className="mt-12 max-lap:mt-10">
          <VerifyFinma />
        </div>
      )}

      {topic.showRegulatoryHistory && (
        <div className="mt-12 max-lap:mt-10">
          <RegulatoryHistory />
        </div>
      )}

      {topic.showCustodyBanks && (
        <div className="mt-12 max-lap:mt-10">
          <CustodyBanks />
        </div>
      )}

      {topic.showPortalPreview && (
        <div className="mt-12 max-lap:mt-10">
          <PortalPreview />
        </div>
      )}

      {topic.showOmbudsman && (
        <div className="mt-12 max-lap:mt-10">
          <OmbudsmanDisclosure />
        </div>
      )}

      {topic.showDocuments && (
        <div className="mt-12 max-lap:mt-10">
          <DocumentsList />
        </div>
      )}

      {topic.showCaseStudies && (
        <div className="mt-12 max-lap:mt-10">
          <CaseStudiesBand />
        </div>
      )}

      {topic.expertiseTags && (
        <div className="mt-12 max-lap:mt-10">
          <SpecialistsBand tags={topic.expertiseTags} />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-12 max-lap:mt-10">
          <SectionTitle>Related articles</SectionTitle>
          <div className="grid grid-cols-2 gap-x-[68px] max-tab:grid-cols-1 max-tab:gap-x-0">
            {related.map((article) => (
              <ArticleSlim key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {topic.adviceDisclaimer && (
        <div className="mt-12 max-w-[802px] max-lap:mt-10">
          <AdviceDisclaimer />
        </div>
      )}

      <div className="mt-12 max-lap:mt-10">
        <NewsletterCta />
      </div>
    </>
  );
}
