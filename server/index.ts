import express from 'express';
import cookieParser from 'cookie-parser';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serverConfig } from './config.ts';
import { createApiRouter } from './routes.ts';
import { LEGACY_REDIRECTS } from '../src/constants/routes.ts';
import { SERVER_VERSION } from '../src/version.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function resolveStaticFile(urlPath: string): { file: string; status: number } {
  const pathname = decodeURIComponent(urlPath.split('?')[0] || '/');
  const clean = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  if (clean === '/' || clean === '') {
    return { file: join(distDir, 'index.html'), status: 200 };
  }

  const direct = join(distDir, clean);
  if (existsSync(direct) && statSync(direct).isFile()) {
    return { file: direct, status: 200 };
  }

  const withIndex = join(distDir, clean, 'index.html');
  if (existsSync(withIndex)) {
    return { file: withIndex, status: 200 };
  }

  // SPA fallback for client-only routes such as /admin
  const spa = join(distDir, 'index.html');
  if (existsSync(spa)) {
    return { file: spa, status: 200 };
  }

  const notFound = join(distDir, '404.html');
  if (existsSync(notFound)) {
    return { file: notFound, status: 404 };
  }

  return { file: spa, status: 200 };
}

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '32kb' }));
  app.use(cookieParser());

  app.get('/health', (_req, res) => {
    res.type('text').send('ok');
  });
  app.get('/healthz', (_req, res) => {
    res.type('text').send('ok');
  });

  app.use('/api', createApiRouter());

  // Withdrawn URLs answer with a permanent redirect so search engines and old
  // bookmarks land on the replacement page rather than the SPA shell.
  app.get(Object.keys(LEGACY_REDIRECTS), (req, res) => {
    const target = LEGACY_REDIRECTS[req.path.replace(/\/$/, '') || req.path];
    if (!target) {
      res.status(404).end();
      return;
    }
    res.redirect(301, target);
  });

  const serveStatic = serverConfig.isProd || process.env.SERVE_STATIC === '1';
  if (serveStatic) {
    if (!existsSync(distDir)) {
      throw new Error(`Missing build output at ${distDir}. Run "npm run build" first.`);
    }

    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        next();
        return;
      }
      if (req.path.startsWith('/api')) {
        next();
        return;
      }

      try {
        const { file, status } = resolveStaticFile(req.path);
        const type = mimeTypes[extname(file)] || 'application/octet-stream';
        res.status(status).type(type).send(readFileSync(file));
      } catch (error) {
        next(error);
      }
    });
  }

  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      if (
        err &&
        typeof err === 'object' &&
        'status' in err &&
        (err as { status?: number }).status === 400 &&
        'type' in err &&
        (err as { type?: string }).type === 'entity.parse.failed'
      ) {
        res.status(400).json({ ok: false, error: 'Invalid JSON body.' });
        return;
      }
      console.error(err);
      res.status(500).json({ ok: false, error: 'Internal server error' });
    },
  );

  return app;
}

export function startServer() {
  const app = createApp();
  const serveStatic = serverConfig.isProd || process.env.SERVE_STATIC === '1';
  const port = serveStatic ? serverConfig.port : serverConfig.apiPort;

  app.listen(port, serverConfig.host, () => {
    const mode = serveStatic ? 'full' : 'api';
    console.log(
      `Helfenstein ${mode} server ${SERVER_VERSION} listening on http://${serverConfig.host}:${port}`,
    );
  });
}

startServer();
