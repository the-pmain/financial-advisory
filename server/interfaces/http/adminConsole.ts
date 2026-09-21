import { raw, Router } from "express";
import { toClientSummary, type ClientApplication } from "@domain/onboarding/model.ts";
import { paginate, parsePageQuery } from "@domain/shared/page.ts";
import {
  countClientFilters,
  matchesClientFilter,
  parseClientFilter,
  parseEmployeeAccountPatch,
  type ClientPage,
  type ClientWithAdviser,
  type EmployeeAccount,
  type EmployeeAccountWithClients,
  type EmployeeProfile,
} from "@domain/staff/model.ts";
import type { RevealedSecret } from "@domain/identity/model.ts";
import type { IdentityService } from "../../contexts/identity/service.ts";
import type { OnboardingService } from "../../contexts/onboarding/service.ts";
import type { StaffService } from "../../contexts/staff/service.ts";
import { invalid } from "../../platform/errors.ts";
import { param, route } from "../../platform/http.ts";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// Image bytes, not JSON: the app-wide parser ignores this content type and leaves the stream alone.
const photoBody = raw({ type: "image/png", limit: "3mb" });

/** The browser squares and re-encodes the picture, so only PNG bytes arrive here. */
function readPhoto(body: unknown): Buffer {
  if (!Buffer.isBuffer(body) || body.length === 0) {
    throw invalid("Upload a PNG image.");
  }
  if (!body.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
    throw invalid("That file is not a readable PNG image.");
  }
  return body;
}

function toProfile(account: EmployeeAccount): EmployeeProfile {
  return { slug: account.slug, name: account.name, role: account.role, photoUrl: account.photoUrl };
}

/** The super admin console: staff records, each with the clients they hold. */
export function createAdminConsoleRouter(deps: {
  staff: StaffService;
  onboarding: OnboardingService;
  identity: IdentityService;
}) {
  const { staff, onboarding, identity } = deps;
  const router = Router();

  router.get(
    "/employees",
    route(async (_req, res) => {
      const [accounts, applications] = await Promise.all([staff.accounts(), onboarding.all()]);

      const detail: EmployeeAccountWithClients[] = accounts.map((account) => ({
        ...account,
        clients: applications
          .filter((row) => row.instructedPersonSlug === account.slug)
          .map(toClientSummary),
      }));

      res.json(detail);
    }, "Could not load the staff list."),
  );

  function attachAdviser(
    application: ClientApplication,
    advisers: Map<string, EmployeeProfile>,
  ): ClientWithAdviser {
    return {
      ...toClientSummary(application),
      adviser: advisers.get(application.instructedPersonSlug ?? "") ?? null,
    };
  }

  /** Attaches the adviser a client is filed against, or null when nobody holds them. */
  async function withAdvisers(): Promise<ClientWithAdviser[]> {
    const [accounts, applications] = await Promise.all([staff.accounts(), onboarding.all()]);
    const advisers = new Map(accounts.map((account) => [account.slug, toProfile(account)]));
    return applications.map((application) => attachAdviser(application, advisers));
  }

  async function oneWithAdviser(application: ClientApplication): Promise<ClientWithAdviser> {
    const accounts = await staff.accounts();
    const advisers = new Map(accounts.map((account) => [account.slug, toProfile(account)]));
    return attachAdviser(application, advisers);
  }

  /**
   * Every application the firm holds, whoever it belongs to, one page at a
   * time. The employees endpoint only reaches clients filed against a staff
   * slug that still exists; this one also shows the ones nobody is instructed
   * on.
   *
   * The page is cut here rather than in SQL: both `registered` and `adviser`
   * are answered by other contexts, so neither is a predicate the applications
   * table could filter or count on.
   */
  router.get(
    "/clients",
    route(async (req, res) => {
      const status = parseClientFilter(req.query.status);
      const clients = await withAdvisers();
      const page: ClientPage = {
        ...paginate(
          clients.filter((client) => matchesClientFilter(status, client)),
          parsePageQuery(req.query),
        ),
        status,
        totals: countClientFilters(clients),
      };

      res.json(page);
    }, "Could not load the client list."),
  );

  // Before `/clients/:id`, so a portrait is never read as a record id.
  router.get(
    "/clients/photos/:file",
    route(async (req, res) => {
      const photo = await onboarding.readPhoto(param(req, "file"));
      if (!photo) {
        res.status(404).end();
        return;
      }
      res.setHeader("Content-Type", photo.contentType);
      // Private: a client portrait is not the public staff directory.
      res.setHeader("Cache-Control", "private, max-age=86400");
      res.send(photo.body);
    }, "Could not load this picture."),
  );

  router.get(
    "/clients/:id",
    route(async (req, res) => {
      res.json(await oneWithAdviser(await onboarding.find(param(req, "id"))));
    }, "Could not load this client."),
  );

  /**
   * The stored portal password, loaded only when a super admin asks to see it.
   * List and record payloads stay without it.
   */
  router.get(
    "/clients/:id/password",
    route(async (req, res) => {
      const application = await onboarding.find(param(req, "id"));
      const secret: RevealedSecret = { password: await identity.passwordForEmail(application.email) };
      res.json(secret);
    }, "Could not load this password."),
  );

  router.put(
    "/clients/:id/photo",
    photoBody,
    route(async (req, res) => {
      res.json(await oneWithAdviser(await onboarding.replacePhoto(param(req, "id"), readPhoto(req.body))));
    }, "Could not save this picture."),
  );

  router.get(
    "/employees/:slug/password",
    route(async (req, res) => {
      const secret: RevealedSecret = { password: await staff.passwordFor(param(req, "slug")) };
      res.json(secret);
    }, "Could not load this password."),
  );

  router.patch(
    "/employees/:slug",
    route(async (req, res) => {
      const patch = parseEmployeeAccountPatch(req.body);
      if (!patch.ok) throw invalid(patch.error);
      res.json(await staff.update(param(req, "slug"), patch.value));
    }, "Could not save this staff record."),
  );

  router.put(
    "/employees/:slug/photo",
    photoBody,
    route(async (req, res) => {
      res.json(await staff.replacePhoto(param(req, "slug"), readPhoto(req.body)));
    }, "Could not save this picture."),
  );

  router.delete(
    "/employees/:slug/photo",
    route(async (req, res) => {
      res.json(await staff.clearPhoto(param(req, "slug")));
    }, "Could not remove this picture."),
  );

  router.delete(
    "/employees/:slug",
    route(async (req, res) => {
      await staff.remove(param(req, "slug"));
      res.status(204).end();
    }, "Could not remove this staff record."),
  );

  return router;
}
