/**
 * HTTP host. Middleware, one mount per portal, static files in production.
 * Anything that reasons about the business lives under `contexts/`.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import cookieParser from "cookie-parser";
import express from "express";
import { SERVER_VERSION } from "../src/version.ts";
import { buildContainer } from "./container.ts";
import { requireAdmin, requireAuth, requireClient, requireEmployee } from "./contexts/identity/guards.ts";
import { createAdminConsoleRouter } from "./interfaces/http/adminConsole.ts";
import { createAuthRouter, sessionPhotoHandler } from "./interfaces/http/auth.ts";
import { createClientPortalRouter } from "./interfaces/http/clientPortal.ts";
import { createEmployeePortalRouter } from "./interfaces/http/employeePortal.ts";
import { createStaffRouter } from "./interfaces/http/staff.ts";
import { rateLimit } from "./platform/rateLimit.ts";

const app = express();
const container = buildContainer();
const port = Number(process.env.PORT) || 3001;
const distDir = path.resolve("dist");
const isProd = process.env.NODE_ENV === "production" || existsSync(path.join(distDir, "index.html"));

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, serverVersion: SERVER_VERSION, store: container.store });
});

// The admin password is a single shared secret, so the gate gets a tighter bucket than the rest of auth.
app.use("/api/auth/admin", rateLimit({ windowMs: 15 * 60 * 1000, max: 8 }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }), createAuthRouter(container));
app.get("/api/me/photo", requireAuth, requireClient, sessionPhotoHandler(container));
app.use("/api/staff", createStaffRouter(container));
app.use("/api/documents", requireAuth, requireClient, createClientPortalRouter(container));
app.use("/api/employees", requireAuth, requireEmployee, createEmployeePortalRouter(container));
app.use("/api/admin", requireAuth, requireAdmin, createAdminConsoleRouter(container));

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

if (isProd) {
  app.use(express.static(distDir));
  app.get("/{*path}", (req, res) => {
    const nested = path.join(distDir, req.path, "index.html");
    if (existsSync(nested)) {
      res.sendFile(nested);
      return;
    }
    res.sendFile(path.join(distDir, "index.html"));
  });
}

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`API listening on http://127.0.0.1:${port} (${container.store})`);
});

server.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
