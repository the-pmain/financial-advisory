import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');
const port = 4173;
const host = '0.0.0.0';

const mimeTypes = {
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

function resolveFile(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0] || '/');
  const clean = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (clean === '' || clean === '/') {
    return join(root, 'index.html');
  }

  const direct = join(root, clean);
  if (existsSync(direct) && statSync(direct).isFile()) {
    return direct;
  }

  const withIndex = join(root, clean, 'index.html');
  if (existsSync(withIndex)) {
    return withIndex;
  }

  const notFound = join(root, '404.html');
  if (existsSync(notFound)) {
    return notFound;
  }

  return join(root, 'index.html');
}

if (!existsSync(root)) {
  console.error(`Missing build output at ${root}. Run "npm run build" first.`);
  process.exit(1);
}

const server = createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  if (req.url === '/health' || req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }

  try {
    const filePath = resolveFile(req.url);
    const ext = extname(filePath);
    const type = mimeTypes[ext] || 'application/octet-stream';
    const body = readFileSync(filePath);
    const status = filePath.endsWith('404.html') && !req.url.endsWith('404.html') ? 404 : 200;

    res.writeHead(status, { 'Content-Type': type });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end('Internal server error');
  }
});

server.listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
