# HELFENSTEIN GROUP CURSOR PROMPT MANUAL

Read this file before creating, rewriting, or wiring Insights / articles.

## Quick Start Commands

1. Open Cursor → Cmd+L / Ctrl+L (chat)
2. Paste an article outline (title, URL slug, sections, SEO keywords, CTA)
3. Tell the agent to follow this manual
4. Review and adjust content
5. Persist the article in `src/data/articles.ts` — **not** a standalone `/articles/[slug].html`

This site is React + Vite. Article pages render from the catalog via `ArticlePage`. Do not generate static HTML files or a parallel article tree.

## Design System Reference

- Primary color: `#0B1F33` (navy / `vz-blue`)
- Accent color: orange (`vz-orange`) for CTAs and hover states
- Font: system stack (Tailwind / existing `vz-*` utilities)
- Spacing: Tailwind `px-[30px]`, `py-[25px]` patterns; article column `max-w-[802px]`
- Prefix: use existing `vz-*` classes; do not invent a new design system for articles

## Where articles live

| Concern | File |
| --- | --- |
| Canonical catalog | `src/data/articles.ts` (`insightCatalog`, `article()` helper) |
| Types + re-exports | `src/data/content.ts` (`Article`, `allArticles`, `findArticle`) |
| URL | `/articles/:slug` via `knowledgeHubArticlePath()` in `src/constants/routes.ts` |
| Article UI | `src/pages/ArticlePage.tsx` |
| Insights index | `src/pages/InsightsPage.tsx` |
| Home teaser block | `newsFeatured`, `newsSlim`, `newsSecondary` from the catalog |
| Expertise list | `src/pages/ExpertisePage.tsx` |
| Search hits | `src/components/layout/SearchPanel.tsx` |
| Topic “related” slugs | `src/data/topics.ts` |
| i18n slug list | `src/i18n/fromData.ts` (`articleSlugs`) |
| Old URL map | `OLD_ARTICLE_REDIRECTS` in `src/data/articles.ts` |
| SEO title / description | `src/seo.ts` + `src/components/seo/DocumentMeta.tsx` |

Home “Guidance for confident decisions” is **not** a separate article store. It reads the same catalog slices.

## Article object

Use `article({ ... })` in `insightCatalog`. Required shape:

```ts
{
  slug: 'kebab-case',
  tagline: 'Client education', // also used as Insights filter
  title: 'Sentence-case title',
  teaser: 'One or two sentences for cards, search, and meta description',
  publishedDate: 'YYYY-MM-DD',
  readingTimeMinutes: 10,
  body: ['Introduction paragraphs'],
  sections: [{ heading: 'Section title', paragraphs: ['...'] }],
  cta: { label: 'Visible CTA', to: ROUTES.appointments },
  image?: '/images/...',
  imageAlt?: '...',
}
```

Canonical URL is `/articles/[slug]`. After adding a slug:

1. Keep `insightCatalog` as the single source — `allArticles` must equal that list (no duplicates, no leftover old pieces).
2. Update home slices if the story should appear in Guidance (`newsFeatured` / `newsSlim` / `newsSecondary`).
3. Add the slug to `articleSlugs` in `src/i18n/fromData.ts`.
4. Point topic `relatedSlugs` at the new slug where relevant.
5. If replacing an old URL, add `OLD_ARTICLE_REDIRECTS[oldSlug] = newSlug`.
6. Use real routes for CTAs (`ROUTES.appointments`, `ROUTES.alternativeInvestments`, `ROUTES.banking`, `ROUTES.aboutTeam`, `ROUTES.aboutClientStories`). Do not invent downloadable PDF/Excel files that do not exist.
7. Do not add DE/FR/IT article bodies unless the user asks. Locale `content.articles` stays empty so English catalog copy is used.

## Voice

Write client-education pieces in the firm’s voice: candid about fees, custody, alternatives, regulation, and process. Do **not** write exposés of Helfenstein, Friedrich Hartmann, or fabricated “dark web” / conspiracy claims. Cover every requested section without attacking the firm.

## Current catalog (do not resurrect retired slugs)

| Slug | Title focus |
| --- | --- |
| `fee-only-financial-advisors` | Fee-only vs commission; total cost |
| `asset-custody-explained` | “We never hold your assets” |
| `alternatives-risk-analysis` | Private equity and hedge funds |
| `finma-regulation-guide` | FINMA licences and verification |
| `single-contact-risk` | Key-person / team due diligence |
| `financial-portal-analysis` | Client portal security |
| `appointment-data-collection` | Onboarding data before KYC |
| `performance-fee-analysis` | Performance-fee drag |
| `testimonial-verification` | How to verify social proof |
| `swiss-advantage-truth` | What “Swiss-based” actually means |

Retired slugs (3a, compulsory insurance, pension-fund feature, horizon report, FinSA explainer, etc.) only exist as `OLD_ARTICLE_REDIRECTS` keys.

## Navigation updates (when the user asks)

1. Add an Insights dropdown with all article links (`topMenu` Insights is currently a plain link to `/insights`).
2. Update the footer with article categories (footer today repeats `mainNavigation`).
3. Article breadcrumbs: `Home › Insights › [title]`. `Breadcrumb.tsx` still labels the hub “Knowledge hub” and does not link it — fix that when touching breadcrumbs.
4. Add a table of contents on long article pages (`sections[].heading`).

Do not do these as drive-by work unless the prompt is about Insights navigation or article UX.

## SEO checklist per article

- [ ] Unique title tag (60 chars max; `getPageMeta` currently uses `{title} \| {SITE_NAME}` — keep the article title tight)
- [ ] Meta description (155 chars max; teaser is clipped in `seo.ts`)
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Canonical URL `/articles/[slug]`
- [ ] Internal links to 2–3 other pages (`cta.to` plus in-body routes)
- [ ] External links to authoritative sources (FINMA, Bloomberg) only when they add verification value

Keywords belong in the teaser/body, not as a stuffed meta keywords tag.

## Expected output for a new article prompt

- Full `insightCatalog` entry with intro `body`, requested `sections`, and a real-route `cta`
- Wired everywhere that list is consumed (home / Insights / Expertise / search / topics) if the user says “use it everywhere”
- Tailwind / `vz-*` only — no new article HTML template
- Responsive: article column already stacks on mobile; do not break `ArticlePage`
- Bump `CLIENT_VERSION` and `SERVER_VERSION` after the prompt (workspace rule)
