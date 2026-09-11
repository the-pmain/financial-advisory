import type { Request, Response, NextFunction } from 'express';

type Bucket = { count: number; resetAt: number };

export function rateLimitLogin(maxAttempts = 10, windowMs = 15 * 60 * 1000) {
  return rateLimit({
    max: maxAttempts,
    windowMs,
    error: 'Too many login attempts. Try again later.',
  });
}

/** Public intake POST — 20 requests per minute per IP. */
export function rateLimitClients() {
  return rateLimit({
    max: 20,
    windowMs: 60_000,
    error: 'Too many requests.',
  });
}

function rateLimit({
  max,
  windowMs,
  error,
}: {
  max: number;
  windowMs: number;
  error: string;
}) {
  const buckets = new Map<string, Bucket>();
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    let bucket = buckets.get(key);
    if (!bucket || now > bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    if (bucket.count > max) {
      res.status(429).json({
        ok: false,
        error,
        retryAfterMs: bucket.resetAt - now,
      });
      return;
    }
    next();
  };
}
