/**
 * Identity: who is signed in and what they may reach.
 *
 * Three ways in, one session shape. A client signs in with email and password,
 * an employee with a slug and password, and the super admin with a password that
 * belongs to no row at all.
 */

export type Role = "advisor" | "employee" | "admin";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  /** Employees only: the directory handle their clients are filed against. */
  slug?: string;
  photoUrl?: string;
};

/** The admin session has no user row, so it carries a fixed id instead. */
export const SUPER_ADMIN_ID = "super-admin";
export const PASSWORD_MIN = 8;

export function isClient(user: SessionUser | null | undefined): user is SessionUser & { role: "advisor" } {
  return user?.role === "advisor";
}

export function isEmployee(user: SessionUser | null | undefined): user is SessionUser & { role: "employee" } {
  return user?.role === "employee";
}

export function isAdmin(user: SessionUser | null | undefined): user is SessionUser & { role: "admin" } {
  return user?.role === "admin";
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** A stored password, only for the console and only behind a dedicated route. */
export type RevealedSecret = {
  password: string | null;
};

/** Only the fields a session is allowed to publish. Never a password. */
export function publicSession(user: SessionUser): SessionUser {
  const base = { id: user.id, email: user.email, name: user.name, role: user.role };
  if (user.role === "employee") return { ...base, slug: user.slug, photoUrl: user.photoUrl };
  if (user.role === "advisor") return { ...base, photoUrl: user.photoUrl };
  return base;
}

/** The signed-in client reads their own file; the admin route is not for them. */
export function clientSessionPhotoUrl(file: string | null | undefined): string {
  const name = String(file ?? "").trim();
  return name ? `/api/me/photo?v=${encodeURIComponent(name)}` : "/api/me/photo";
}
