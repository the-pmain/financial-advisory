import { allArticles, offers, property, solutions, testimonial, newsletterCta } from '../data/content';
import { legalPages } from '../data/legal';
import { actionLinks, legalLinks, mainNavigation, quickLinks, topMenu } from '../data/navigation';
import { featuredMember, teamMembers, teamSections } from '../data/team';
import { topics } from '../data/topics';
import type { ArticleT, LegalPageT, TeamMemberT, TopicT, Translations } from './types';

function articleFromSlug(slug: string): ArticleT | undefined {
  const a = allArticles.find((item) => item.slug === slug);
  if (!a) return undefined;
  return {
    slug: a.slug,
    tagline: a.tagline,
    title: a.title,
    teaser: a.teaser,
    imageAlt: a.imageAlt,
    body: a.body,
    videoNote: a.videoNote,
  };
}

function topicsRecord(): Record<string, TopicT> {
  return Object.fromEntries(
    topics.map((topic) => [
      topic.path,
      {
        path: topic.path,
        breadcrumb: topic.breadcrumb,
        title: topic.title,
        subtitle: topic.subtitle,
        intro: topic.intro,
        highlights: topic.highlights,
        ctaLabel: topic.ctaLabel,
      },
    ]),
  );
}

function legalRecord(): Record<string, LegalPageT> {
  return Object.fromEntries(
    legalPages.map((page) => [
      page.slug,
      { slug: page.slug, title: page.title, sections: page.sections },
    ]),
  );
}

function teamRecord(): Record<string, TeamMemberT> {
  return Object.fromEntries(
    teamMembers.map((m) => [
      m.slug,
      { slug: m.slug, role: m.role, about: m.about, results: m.results },
    ]),
  );
}

const articleSlugs = [
  'fee-only-financial-advisors',
  'asset-custody-explained',
  'alternatives-risk-analysis',
  'finma-regulation-guide',
  'single-contact-risk',
  'financial-portal-analysis',
  'appointment-data-collection',
  'performance-fee-analysis',
  'testimonial-verification',
  'swiss-advantage-truth',
] as const;

/** Build the English catalog from existing data modules (single source of truth). */
export function buildEnglishCatalog(ui: Translations['ui'], meta: Translations['meta']): Translations {
  const articles: Record<string, ArticleT> = {};
  for (const slug of articleSlugs) {
    const a = articleFromSlug(slug);
    if (a) articles[slug] = a;
  }

  return {
    meta,
    ui,
    nav: {
      mainNavigation,
      quickLinks,
      topMenu,
      actionLinks,
      legalLinks,
    },
    home: {
      testimonial: {
        quote: testimonial.quote,
        positionLabel: testimonial.positionLabel,
        position: testimonial.position,
        imageAlt: testimonial.imageAlt ?? '',
        ctaLabel: testimonial.ctaLabel,
      },
      newsletter: {
        text: newsletterCta.text,
        linkLabel: newsletterCta.linkLabel,
      },
    },
    content: {
      articles,
      offers: offers.map((o) => ({
        id: o.id,
        title: o.title,
        tag: o.tag,
        teaser: o.teaser,
        cta: o.cta,
        imageAlt: o.imageAlt,
      })),
      solutions,
      property: {
        type: property.type,
        imageAlt: property.imageAlt,
        specs: property.specs.map((s) => ({ label: s.label })),
      },
    },
    topics: topicsRecord(),
    legal: legalRecord(),
    team: {
      sections: {
        investment: teamSections.find((s) => s.id === 'investment')!.title,
        business: teamSections.find((s) => s.id === 'business')!.title,
        investors: teamSections.find((s) => s.id === 'investors')!.title,
      },
      members: teamRecord(),
      featuredLead: `${featuredMember.name} leads Helfenstein’s investment philosophy and long-term capital allocation.`,
    },
  };
}

export { articleSlugs };
