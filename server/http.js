import { timingSafeEqual } from 'node:crypto';
import { adminApiKey } from './env.js';

export class HttpError extends Error {
  constructor(status, error, extra = {}) {
    super(error);
    this.name = 'HttpError';
    this.status = status;
    this.body = { error, ...extra };
  }
}

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
};

export function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    ...JSON_HEADERS,
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

export function sendNoContent(res, extraHeaders = {}) {
  res.writeHead(204, {
    'X-Robots-Tag': 'noindex, nofollow',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  });
  res.end();
}

export function requestUrl(req) {
  const host = req.headers.host || '127.0.0.1';
  return new URL(req.url || '/', `http://${host}`);
}

export function requestPath(req) {
  let pathname = requestUrl(req).pathname || '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  return pathname;
}

const BODY_MAX = 1024 * 1024;

export function readJsonBody(req, maxBytes = BODY_MAX) {
  return new Promise((resolve, reject) => {
    const declared = Number(req.headers['content-length']);
    if (Number.isFinite(declared) && declared > maxBytes) {
      reject(new HttpError(413, 'Request body is too large.'));
      return;
    }

    const chunks = [];
    let size = 0;
    let done = false;

    const fail = (err) => {
      if (done) return;
      done = true;
      reject(err);
    };

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        req.destroy();
        fail(new HttpError(413, 'Request body is too large.'));
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (done) return;
      done = true;
      const raw = Buffer.concat(chunks).toString('utf8').trim();
      if (!raw) {
        reject(new HttpError(400, 'Invalid JSON.'));
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        resolve(parsed);
      } catch {
        reject(new HttpError(400, 'Invalid JSON.'));
      }
    });

    req.on('error', () => fail(new HttpError(400, 'Invalid JSON.')));
  });
}

export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function getBearerToken(req) {
  const header = req.headers.authorization;
  if (typeof header !== 'string') return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export function timingSafeEqualString(provided, expected) {
  const a = Buffer.from(String(provided));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) {
    timingSafeEqual(Buffer.alloc(b.length), b);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function authorizeAdmin(req) {
  const expected = adminApiKey();
  if (!expected) {
    return { ok: false, status: 500, body: { error: 'Missing ADMIN_API_KEY.' } };
  }
  const token = getBearerToken(req);
  if (!token || !timingSafeEqualString(token, expected)) {
    return { ok: false, status: 401, body: { error: 'Unauthorized.' } };
  }
  return { ok: true };
}

export function createIpRateLimiter({ max = 20, windowMs = 60_000 } = {}) {
  const buckets = new Map();

  return function check(ip) {
    const now = Date.now();
    let bucket = buckets.get(ip);
    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(ip, bucket);
    }
    bucket.count += 1;
    if (buckets.size > 20_000) {
      for (const [key, value] of buckets) {
        if (now >= value.resetAt) buckets.delete(key);
      }
    }
    if (bucket.count > max) {
      return {
        ok: false,
        retryAfterMs: Math.max(0, bucket.resetAt - now),
      };
    }
    return { ok: true };
  };
}

export function sendError(res, err) {
  if (err instanceof HttpError) {
    sendJson(res, err.status, err.body);
    return;
  }
  console.error(err instanceof Error ? err.message : 'Unhandled error');
  sendJson(res, 500, { error: 'Internal server error.' });
}
