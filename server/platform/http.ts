import type { Request, RequestHandler, Response } from "express";
import { DomainError, type FailureCode } from "./errors.ts";

const STATUS: Record<FailureCode, number> = {
  invalid: 400,
  unauthorized: 401,
  forbidden: 403,
  "not-found": 404,
  conflict: 409,
  unavailable: 503,
};

/** Every failure leaves as `{ error }`. */
export function fail(res: Response, status: number, message: string): void {
  res.status(status).json({ error: message });
}

/**
 * Wraps a route so services can throw. A `DomainError` becomes its own status
 * and message; anything else is logged and answered with `whenBroken`, which
 * keeps stack traces off the wire.
 */
export function route(
  handler: (req: Request, res: Response) => Promise<void> | void,
  whenBroken: string,
): RequestHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      if (err instanceof DomainError) {
        fail(res, STATUS[err.code], err.message);
        return;
      }
      console.error(err);
      if (!res.headersSent) fail(res, 500, whenBroken);
    }
  };
}

export function param(req: Request, name: string): string {
  return String(req.params[name] ?? "");
}
