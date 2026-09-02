import type { Request, Response, NextFunction } from 'express';

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Simple in-memory rate limit for login attempts. */
export function rateLimitLogin(maxAttempts = 10, windowMs = 15 * 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    let bucket = buckets.get(key);
    if (!bucket || now > bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    if (bucket.count > maxAttempts) {
      res.status(429).json({
        ok: false,
        error: 'Too many login attempts. Try again later.',
        retryAfterMs: bucket.resetAt - now,
      });
      return;
    }
    next();
  };
}
