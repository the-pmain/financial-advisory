import type { IncomingMessage, ServerResponse } from 'node:http';

export class HttpError extends Error {
  status: number;
  body: { error: string; [key: string]: unknown };
  responseHeaders?: Headers;
  constructor(status: number, error: string, extra?: Record<string, unknown>);
}

export function sendJson(res: ServerResponse, status: number, body: unknown): void;
export function sendNoContent(res: ServerResponse, extraHeaders?: Record<string, string>): void;
export function requestUrl(req: IncomingMessage): URL;
export function requestPath(req: IncomingMessage): string;
export function readJsonBody(req: IncomingMessage, maxBytes?: number): Promise<unknown>;
export function clientIp(req: IncomingMessage): string;
export function getBearerToken(req: IncomingMessage): string | null;
export function timingSafeEqualString(provided: string, expected: string): boolean;
export function authorizeAdmin(
  req: IncomingMessage,
): { ok: true } | { ok: false; status: number; body: { error: string } };
export function createIpRateLimiter(options?: { max?: number; windowMs?: number }): (ip: string) =>
  | { ok: true }
  | { ok: false; retryAfterMs: number };
export function sendError(res: ServerResponse, err: unknown): void;
