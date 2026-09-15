import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { build as viteBuild } from 'vite';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function pageFile(distDir: string, url: string): string {
  if (url === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, url.slice(1), 'index.html');
}

function ssgPreviewIndexes(): Plugin {
  return {
    name: 'ssg-preview-indexes',
    configurePreviewServer(server) {
      const distDir = path.resolve(rootDir, 'dist');
      server.middlewares.use((req, _res, next) => {
        const [pathname, search] = (req.url ?? '').split('?');
        if (!pathname || pathname === '/' || path.extname(pathname)) {
          next();
          return;
        }
        const clean = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
        if (existsSync(path.join(distDir, clean, 'index.html'))) {
          req.url = search ? `${clean}/index.html?${search}` : `${clean}/index.html`;
        }
        next();
      });
    },
  };
}

function ssgPrerender(siteUrl: string): Plugin {
  let isSsrBuild = false;

  return {
    name: 'ssg-prerender',
    apply: 'build',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    async closeBundle() {
      if (isSsrBuild) return;

      const distDir = path.resolve(rootDir, 'dist');
      const ssrDir = path.resolve(rootDir, 'dist-ssr');
      const template = readFileSync(path.join(distDir, 'index.html'), 'utf8');

      await viteBuild({
        configFile: path.resolve(rootDir, 'vite.config.ts'),
        build: {
          ssr: path.resolve(rootDir, 'src/entry-server.tsx'),
          outDir: ssrDir,
          emptyOutDir: true,
          cssCodeSplit: false,
        },
      });

      const { render, getStaticPaths } = (await import(
        pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
      )) as {
        render: (url: string) => {
          html: string;
          meta: { title: string; description: string; robots: string };
          jsonLd?: Record<string, unknown>;
        };
        getStaticPaths: () => string[];
      };

      const routes = getStaticPaths();
      const origin = siteUrl.replace(/\/$/, '');

      for (const url of routes) {
        const { html, meta, jsonLd: jsonLdData } = render(url);
        if (!template.includes('<!--app-html-->')) {
          throw new Error('index.html is missing the <!--app-html--> placeholder');
        }

        let page = template.replace('<!--app-html-->', html);
        page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
        page = page.replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${escapeAttr(meta.description)}" />`,
        );
        page = page.replace(
          /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
          `<meta name="robots" content="${escapeAttr(meta.robots)}" />`,
        );

        const canonical = origin ? `${origin}${url}` : url;
        const jsonLd = JSON.stringify(jsonLdData ?? {}).replace(/</g, '\\u003c');
        const extraHead = [
          origin ? `<link rel="canonical" href="${escapeAttr(canonical)}" />` : '',
          `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
          `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
          `<meta property="og:type" content="${url === '/' ? 'website' : 'article'}" />`,
          origin ? `<meta property="og:url" content="${escapeAttr(canonical)}" />` : '',
          page.includes('helfenstein-jsonld-org')
            ? ''
            : `<script type="application/ld+json" id="helfenstein-jsonld-org">${jsonLd}</script>`,
        ]
          .filter(Boolean)
          .join('\n    ');

        page = page.replace('</head>', `    ${extraHead}\n  </head>`);

        const file = pageFile(distDir, url);
        mkdirSync(path.dirname(file), { recursive: true });
        writeFileSync(file, page);
      }

      const { html: notFoundHtml, meta: notFoundMeta } = render('/__not-found__');
      let notFoundPage = template.replace('<!--app-html-->', notFoundHtml);
      notFoundPage = notFoundPage.replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escapeAttr(notFoundMeta.title)}</title>`,
      );
      notFoundPage = notFoundPage.replace(
        /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
        `<meta name="robots" content="noindex, follow" />`,
      );
      writeFileSync(path.join(distDir, '404.html'), notFoundPage);

      const sitemapUrls = routes
        .map((url) => {
          const loc = origin ? `${origin}${url}` : url;
          const priority = url === '/' ? '1.0' : '0.7';
          return `  <url>\n    <loc>${escapeAttr(loc)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join('\n');

      writeFileSync(
        path.join(distDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
      );

      const sitemapLine = origin ? `${origin}/sitemap.xml` : '/sitemap.xml';
      writeFileSync(
        path.join(distDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${sitemapLine}\n`,
      );

      rmSync(ssrDir, { recursive: true, force: true });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '');
  const siteUrl = env.VITE_SITE_URL ?? '';

  return {
    plugins: [react(), tailwindcss(), ssgPreviewIndexes(), ssgPrerender(siteUrl)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ['pdfjs-dist', 'pdf-lib'],
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3001',
          changeOrigin: true,
        },
      },
      watch: {
        ignored: ['**/_refdump/**', '**/_verify/**'],
      },
    },
  };
});
