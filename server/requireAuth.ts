import type { NextFunction, Request, Response } from "express";
import { SESSION_COOKIE, verifySession, type SessionUser } from "./session.ts";

export type AuthedRequest = Request & { user: SessionUser };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const user = verifySession(req.cookies?.[SESSION_COOKIE]);
  if (!user) {
    res.status(401).json({ error: "Not signed in." });
    return;
  }
  (req as AuthedRequest).user = user;
  next();
}

export function requireEmployee(req: Request, res: Response, next: NextFunction) {
  const user = (req as AuthedRequest).user;
  if (!user || user.role !== "employee" || !user.slug) {
    res.status(403).json({ error: "Employee access required." });
    return;
  }
  next();
}

export function requireClient(req: Request, res: Response, next: NextFunction) {
  const user = (req as AuthedRequest).user;
  if (!user || user.role === "employee") {
    res.status(403).json({ error: "Client access required." });
    return;
  }
  next();
}
