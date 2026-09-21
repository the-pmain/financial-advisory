import { Router, type Response } from "express";
import type { SessionUser } from "@domain/identity/model.ts";
import { requireAuth, type AuthedRequest } from "../../contexts/identity/guards.ts";
import {
  SESSION_COOKIE,
  SESSION_HINT_COOKIE,
  sessionCookieOptions,
  sessionHintCookieOptions,
  signSession,
} from "../../contexts/identity/session.ts";
import type { IdentityService } from "../../contexts/identity/service.ts";
import type { OnboardingService } from "../../contexts/onboarding/service.ts";
import type { StaffService } from "../../contexts/staff/service.ts";
import { route } from "../../platform/http.ts";

/** The signed session, plus an unsigned hint the app reads to skip a flash of the login screen. */
function writeAuthCookies(res: Response, user: SessionUser) {
  res.cookie(SESSION_COOKIE, signSession(user), sessionCookieOptions());
  res.cookie(SESSION_HINT_COOKIE, "1", sessionHintCookieOptions());
}

export function createAuthRouter(deps: { identity: IdentityService; staff: StaffService }) {
  const { identity, staff } = deps;
  const router = Router();

  router.post(
    "/signup",
    route(async (req, res) => {
      const session = await identity.signup({
        name: String(req.body?.name ?? ""),
        email: String(req.body?.email ?? ""),
        password: String(req.body?.password ?? ""),
      });
      writeAuthCookies(res, session);
      res.status(201).json(session);
    }, "Could not create this account."),
  );

  router.post(
    "/login",
    route(async (req, res) => {
      const session = await identity.login(String(req.body?.email ?? ""), String(req.body?.password ?? ""));
      writeAuthCookies(res, session);
      res.json(session);
    }, "Could not sign in."),
  );

  router.get(
    "/employee/directory",
    route(async (_req, res) => {
      res.json(await staff.directory());
    }, "Could not load the staff list."),
  );

  router.post(
    "/employee/login",
    route(async (req, res) => {
      const session = await identity.employeeLogin(
        String(req.body?.slug ?? req.body?.username ?? ""),
        String(req.body?.password ?? ""),
      );
      writeAuthCookies(res, session);
      res.json(session);
    }, "Could not sign in."),
  );

  router.post(
    "/admin",
    route(async (req, res) => {
      const session = await identity.adminLogin(String(req.body?.password ?? ""));
      writeAuthCookies(res, session);
      res.json(session);
    }, "Could not open the console."),
  );

  router.post("/logout", (_req, res) => {
    res.clearCookie(SESSION_COOKIE, { path: "/" });
    res.clearCookie(SESSION_HINT_COOKIE, { path: "/" });
    res.status(204).end();
  });

  router.get(
    "/me",
    requireAuth,
    route(async (req, res) => {
      const session = await identity.refresh((req as AuthedRequest).user);
      writeAuthCookies(res, session);
      res.json(session);
    }, "Could not load your session."),
  );

  return router;
}

/**
 * The signed-in client's own portrait. Mounted outside the auth rate-limit
 * bucket so a page load that also hits `/me` does not spend two tokens.
 */
export function sessionPhotoHandler(deps: {
  identity: IdentityService;
  onboarding: OnboardingService;
}) {
  const { identity, onboarding } = deps;
  return route(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const fromAccount = await identity.photoPathForEmail(user.email);
    const fromApplication = fromAccount
      ? null
      : (await onboarding.findByEmail(user.email))?.photoStoragePath;
    const file = fromAccount || fromApplication || "";
    const photo = file ? await onboarding.readPhoto(file) : null;
    if (!photo) {
      res.status(404).end();
      return;
    }
    res.setHeader("Content-Type", photo.contentType);
    res.setHeader("Cache-Control", "private, max-age=86400");
    res.send(photo.body);
  }, "Could not load this picture.");
}
