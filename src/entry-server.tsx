import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { LocaleProvider } from './i18n';
import { financialServiceJsonLd, getPageMeta, type PageMeta } from './seo';

export function render(url: string): {
  html: string;
  meta: PageMeta;
  jsonLd: Record<string, unknown>;
} {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </StaticRouter>
    </StrictMode>,
  );

  return { html, meta: getPageMeta(url), jsonLd: financialServiceJsonLd() };
}

export { getStaticPaths } from './seo';
