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
