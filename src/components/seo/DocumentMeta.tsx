import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { matchKnowledgeHubSlug } from '../../constants/routes';
import { allArticles } from '../../data/content';
import { getPageMeta, SITE_NAME } from '../../seo';

function upsertMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertJsonLd(id: string, data: Record<string, unknown> | null) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** Keeps <title>, description and article JSON-LD in sync after navigations. */
export function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    upsertMeta('description', meta.description);
    upsertMeta('robots', meta.robots);

    const articleSlug = matchKnowledgeHubSlug(pathname);
    if (articleSlug) {
      const article = allArticles.find((item) => item.slug === articleSlug);
      if (article) {
        upsertJsonLd('helfenstein-jsonld-article', {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.teaser,
          datePublished: article.publishedDate,
          dateModified: article.lastReviewed ?? article.publishedDate,
          author: {
            '@type': 'Organization',
            name: article.author ?? SITE_NAME,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
        });
        return;
      }
    }
    upsertJsonLd('helfenstein-jsonld-article', null);
  }, [pathname]);

  return null;
}
