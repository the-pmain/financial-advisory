import type { NextFunction, Request, Response } from "express";
import { isAdmin, isClient, isEmployee, type SessionUser } from "@domain/identity/model.ts";
import { fail } from "../../platform/http.ts";
import { SESSION_COOKIE, verifySession } from "./session.ts";

export type AuthedRequest = Request & { user: SessionUser };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const user = verifySession(req.cookies?.[SESSION_COOKIE]);
  if (!user) {
    fail(res, 401, "Not signed in.");
    return;
  }
  (req as AuthedRequest).user = user;
  next();
}

export function requireEmployee(req: Request, res: Response, next: NextFunction) {
  const user = (req as AuthedRequest).user;
  if (!isEmployee(user) || !user.slug) {
    fail(res, 403, "Employee access required.");
    return;
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!isAdmin((req as AuthedRequest).user)) {
    fail(res, 403, "Super admin access required.");
    return;
  }
  next();
}

export function requireClient(req: Request, res: Response, next: NextFunction) {
  if (!isClient((req as AuthedRequest).user)) {
    fail(res, 403, "Client access required.");
    return;
  }
  next();
}

/** Inside a guarded router the slug is there; this keeps the narrowing local. */
export function employeeSlug(req: Request): string {
  const user = (req as AuthedRequest).user;
  return isEmployee(user) && user.slug ? user.slug : "";
}
