import { Router } from "express";
import type { StaffService } from "../../contexts/staff/service.ts";
import { param, route } from "../../platform/http.ts";

/** Portraits are read without a session: they hang in the public staff list. */
export function createStaffRouter(deps: { staff: StaffService }) {
  const router = Router();

  router.get(
    "/photos/:file",
    route(async (req, res) => {
      const photo = await deps.staff.readPhoto(param(req, "file"));
      if (!photo) {
        res.status(404).end();
        return;
      }
      res.setHeader("Content-Type", photo.contentType);
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(photo.body);
    }, "Could not load this picture."),
  );

  return router;
}
