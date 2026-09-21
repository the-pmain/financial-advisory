import { Router } from "express";
import type { AuthedRequest } from "../../contexts/identity/guards.ts";
import type { DocumentsService } from "../../contexts/documents/service.ts";
import type { OnboardingService } from "../../contexts/onboarding/service.ts";
import type { StaffService } from "../../contexts/staff/service.ts";
import { route } from "../../platform/http.ts";

/** What a signed-in client may read: their own mandate and nothing else. */
export function createClientPortalRouter(deps: {
  onboarding: OnboardingService;
  staff: StaffService;
  documents: DocumentsService;
}) {
  const { onboarding, staff, documents } = deps;
  const router = Router();

  router.get(
    "/sample.pdf",
    route(async (_req, res) => {
      const bytes = await documents.placeholderPdf();
      res.setHeader("Content-Type", "application/pdf");
      res.send(Buffer.from(bytes));
    }, "Could not prepare this document."),
  );

  router.get(
    "/mandate",
    route(async (req, res) => {
      const user = (req as AuthedRequest).user;
      const [application, directory] = await Promise.all([
        onboarding.findByEmail(user.email),
        staff.directory(),
      ]);
      res.json({
        application,
        // The mandate names the team; their portraits are not part of it.
        people: directory.map((person) => ({
          slug: person.slug,
          name: person.name,
          role: person.role,
          photoUrl: "",
        })),
      });
    }, "Could not load your documents."),
  );

  return router;
}
