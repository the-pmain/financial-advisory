import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { Router } from "express";
import { postgrest, supabaseConfigured } from "./postgrest.ts";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
  type SessionUser,
  verifySession,
} from "./session.ts";

const scryptAsync = promisify(scrypt);

type StoredUser = SessionUser & { passwordHash: string };

const memoryUsers = new Map<string, StoredUser>();

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${buf.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hash, "hex");
  return expected.length === buf.length && timingSafeEqual(expected, buf);
}

function publicUser(user: SessionUser): SessionUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function findUser(email: string): Promise<StoredUser | null> {
  if (supabaseConfigured()) {
    const rows = await postgrest<StoredUser[]>(
      `/users?email=eq.${encodeURIComponent(email)}&select=id,email,name,role,passwordHash`,
    );
    return rows[0] ?? null;
  }
  return memoryUsers.get(email.toLowerCase()) ?? null;
}

async function insertUser(user: StoredUser): Promise<StoredUser> {
  if (supabaseConfigured()) {
    const rows = await postgrest<StoredUser[]>("/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
    return rows[0] ?? user;
  }
  memoryUsers.set(user.email.toLowerCase(), user);
  return user;
}

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");

  if (!name || !isEmail(email) || password.length < 8) {
    res.status(400).json({ error: "Enter a name, valid email, and password (8+ characters)." });
    return;
  }

  if (await findUser(email)) {
    res.status(409).json({ error: "An account with this email already exists." });
    return;
  }

  const user = await insertUser({
    id: randomBytes(12).toString("hex"),
    email,
    name,
    role: "advisor",
    passwordHash: await hashPassword(password),
  });

  res.cookie(SESSION_COOKIE, signSession(publicUser(user)), sessionCookieOptions());
  res.status(201).json(publicUser(user));
});

authRouter.post("/login", async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  const user = await findUser(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  res.cookie(SESSION_COOKIE, signSession(publicUser(user)), sessionCookieOptions());
  res.json(publicUser(user));
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.status(204).end();
});

authRouter.get("/me", (req, res) => {
  const user = verifySession(req.cookies?.[SESSION_COOKIE]);
  if (!user) {
    res.status(401).json({ error: "Not signed in." });
    return;
  }
  res.json(publicUser(user));
});
