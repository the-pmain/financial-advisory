import { existsSync } from "node:fs";
import path from "node:path";
import cookieParser from "cookie-parser";
import express from "express";
import { SERVER_VERSION } from "../src/version.ts";
import { authRouter } from "./auth.ts";
import { documentsRouter } from "./documents.ts";
import { rateLimit } from "./rateLimit.ts";

const app = express();
const port = Number(process.env.PORT) || 3001;
const distDir = path.resolve("dist");
const isProd = process.env.NODE_ENV === "production" || existsSync(path.join(distDir, "index.html"));

app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, serverVersion: SERVER_VERSION });
});

app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }), authRouter);
app.use("/api/documents", documentsRouter);

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
  console.log(`API listening on http://127.0.0.1:${port}`);
});

server.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
