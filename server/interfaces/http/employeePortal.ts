import { Router } from "express";
import type { DocumentsService } from "../../contexts/documents/service.ts";
import { employeeSlug } from "../../contexts/identity/guards.ts";
import type { OnboardingService } from "../../contexts/onboarding/service.ts";
import type { StaffService } from "../../contexts/staff/service.ts";
import { invalid } from "../../platform/errors.ts";
import { param, route } from "../../platform/http.ts";

/** An employee sees the applications and clients filed against their own slug. */
export function createEmployeePortalRouter(deps: {
  onboarding: OnboardingService;
  staff: StaffService;
  documents: DocumentsService;
}) {
  const { onboarding, staff, documents } = deps;
  const router = Router();

  router.get(
    "/applications",
    route(async (req, res) => {
      res.json(await onboarding.applicationsFor(employeeSlug(req)));
    }, "Could not load applications."),
  );

  router.get(
    "/clients",
    route(async (req, res) => {
      res.json(await onboarding.clientsFor(employeeSlug(req)));
    }, "Could not load clients."),
  );

  router.get(
    "/clients/:clientId/documents/agreement",
    route(async (req, res) => {
      const client = await onboarding.clientFor(employeeSlug(req), param(req, "clientId"));
      const packed = await documents.agreementFor(client, await staff.directory());
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${packed.filename}"`);
      res.send(Buffer.from(packed.bytes));
    }, "Could not prepare the client agreement."),
  );

  router.get(
    "/clients/:clientId/documents/p2p",
    route(async (req, res) => {
      const client = await onboarding.clientFor(employeeSlug(req), param(req, "clientId"));
      const packed = await documents.p2pFor(client, await staff.directory());
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${packed.filename}"`);
      res.send(Buffer.from(packed.bytes));
    }, "Could not prepare the P2P agreement."),
  );

  router.put(
    "/clients/:clientId/documents/:kind",
    route(async (req, res) => {
      const kind = param(req, "kind");
      const client = await onboarding.clientFor(employeeSlug(req), param(req, "clientId"));
      const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};
      if (body.kind && body.kind !== kind) {
        throw invalid("kind in the URL and the body must match.");
      }
      if (!body.fields || typeof body.fields !== "object" || Array.isArray(body.fields)) {
        throw invalid("fields must be an object.");
      }
      const documentsBag = await documents.saveKind(client, kind, body.fields);
      res.json({ documents: documentsBag });
    }, "Could not save this document."),
  );

  return router;
}
