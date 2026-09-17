import { createHmac, timingSafeEqual } from "node:crypto";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "advisor" | "admin";
};

export type SessionPayload = SessionUser & {
  exp: number;
};

const COOKIE = "sid";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function secret(): string {
  return process.env.SESSION_SECRET || "dev-insecure-change-me";
}

export function signSession(user: SessionUser): string {
  const payload: SessionPayload = { ...user, exp: Date.now() + WEEK_MS };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifySession(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  const expected = createHmac("sha256", secret()).update(data).digest("base64url");
  const a = createHmac("sha256", secret()).update(sig).digest();
  const b = createHmac("sha256", secret()).update(expected).digest();
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: WEEK_MS,
  };
}

export function readSession(cookieHeader: string | undefined): SessionPayload | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`));
  return verifySession(match?.slice(COOKIE.length + 1));
}

export { COOKIE as SESSION_COOKIE };
