import { randomBytes, timingSafeEqual } from "node:crypto";
import { Router, type Response } from "express";
import { employeePhotoUrl, findEmployeeBySlug, listEmployeeDirectory, publicEmployee } from "./employees.ts";
import { postgrest, supabaseConfigured } from "./postgrest.ts";
import { requireAuth, type AuthedRequest } from "./requireAuth.ts";
import {
  SESSION_COOKIE,
  SESSION_HINT_COOKIE,
  sessionCookieOptions,
  sessionHintCookieOptions,
  signSession,
  type SessionUser,
} from "./session.ts";

type StoredUser = SessionUser & { password: string };

type DbUser = {
  id: string;
  email: string;
  name: string | null;
  password: string;
};

const memoryUsers = new Map<string, StoredUser>();

function publicUser(user: SessionUser): SessionUser {
  if (user.role === "employee") {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      slug: user.slug,
      photoUrl: user.photoUrl,
    };
  }
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

function passwordsMatch(stored: string, given: string): boolean {
  const a = Buffer.from(stored);
  const b = Buffer.from(given);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function fromDb(row: DbUser): StoredUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    role: "advisor",
    password: row.password,
  };
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function writeAuthCookies(res: Response, user: SessionUser) {
  res.cookie(SESSION_COOKIE, signSession(user), sessionCookieOptions());
  res.cookie(SESSION_HINT_COOKIE, "1", sessionHintCookieOptions());
}

async function findUser(email: string): Promise<StoredUser | null> {
  if (supabaseConfigured()) {
    const rows = await postgrest<DbUser[]>(
      `/users?email=eq.${encodeURIComponent(email)}&select=id,email,name,password`,
    );
    return rows[0] ? fromDb(rows[0]) : null;
  }
  return memoryUsers.get(email.toLowerCase()) ?? null;
}

async function insertUser(user: Omit<StoredUser, "id">): Promise<StoredUser> {
  if (supabaseConfigured()) {
    const rows = await postgrest<DbUser[]>("/users", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        password: user.password,
      }),
    });
    if (!rows[0]) throw new Error("User insert returned no row");
    return fromDb(rows[0]);
  }
  const created = { ...user, id: randomBytes(12).toString("hex") };
  memoryUsers.set(user.email.toLowerCase(), created);
  return created;
}

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
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
      email,
      name,
      role: "advisor",
      password,
    });

    writeAuthCookies(res, publicUser(user));
    res.status(201).json(publicUser(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create this account." });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    const user = await findUser(email);

    if (!user || user.password !== password) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    writeAuthCookies(res, publicUser(user));
    res.json(publicUser(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not sign in." });
  }
});

authRouter.get("/employee/directory", async (_req, res) => {
  try {
    res.json(await listEmployeeDirectory());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load the staff list." });
  }
});

authRouter.post("/employee/login", async (req, res) => {
  try {
    const slug = String(req.body?.slug ?? req.body?.username ?? "")
      .trim()
      .toLowerCase();
    const password = String(req.body?.password ?? "");

    if (slug.length < 2 || slug.length > 80 || !password) {
      res.status(400).json({ error: "Choose your name and enter your password." });
      return;
    }

    const employee = await findEmployeeBySlug(slug);
    if (!employee || !passwordsMatch(employee.password, password)) {
      res.status(401).json({ error: "Invalid password." });
      return;
    }

    writeAuthCookies(res, publicEmployee(employee));
    res.json(publicEmployee(employee));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not sign in." });
  }
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.clearCookie(SESSION_HINT_COOKIE, { path: "/" });
  res.status(204).end();
});

authRouter.get("/me", requireAuth, (req, res) => {
  const user = publicUser((req as AuthedRequest).user);
  if (user.role === "employee" && !user.photoUrl && user.slug) {
    user.photoUrl = employeePhotoUrl(`${user.slug}.png`);
  }
  res.cookie(SESSION_HINT_COOKIE, "1", sessionHintCookieOptions());
  res.json(user);
});
