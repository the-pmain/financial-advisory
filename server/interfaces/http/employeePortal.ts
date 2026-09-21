import { Router } from "express";
import type { DocumentsService } from "../../contexts/documents/service.ts";
import { employeeSlug } from "../../contexts/identity/guards.ts";
import type { OnboardingService } from "../../contexts/onboarding/service.ts";
import type { StaffService } from "../../contexts/staff/service.ts";
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

  return router;
}
