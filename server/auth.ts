import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { serverConfig } from './config.ts';

export type AdminSession = {
  sid: string;
  exp: number;
};

function sign(payload: string): string {
  return createHmac('sha256', serverConfig.sessionSecret).update(payload).digest('base64url');
}

export function createSessionToken(): { token: string; exp: number } {
  const sid = randomBytes(16).toString('hex');
  const exp = Date.now() + serverConfig.sessionTtlMs;
  const payload = `${sid}.${exp}`;
  return { token: `${payload}.${sign(payload)}`, exp };
}

export function parseSessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [sid, expRaw, signature] = parts;
  if (!sid || !expRaw || !signature) return null;

  const payload = `${sid}.${expRaw}`;
  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  return { sid, exp };
}

export function setSessionCookie(res: Response, token: string): void {
  res.cookie(serverConfig.sessionCookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: serverConfig.isProd,
    maxAge: serverConfig.sessionTtlMs,
    path: '/',
  });
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(serverConfig.sessionCookieName, {
    httpOnly: true,
    sameSite: 'lax',
    secure: serverConfig.isProd,
    path: '/',
  });
}

export function getSessionFromRequest(req: Request): AdminSession | null {
  const token = req.cookies?.[serverConfig.sessionCookieName] as string | undefined;
  return parseSessionToken(token);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const session = getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ ok: false, error: 'Unauthorized' });
    return;
  }
  (req as Request & { adminSession?: AdminSession }).adminSession = session;
  next();
}

export function pinsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(String(provided));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) {
    // Still run a compare to reduce trivial timing leaks on length.
    timingSafeEqual(Buffer.alloc(b.length), b);
    return false;
  }
  return timingSafeEqual(a, b);
}
