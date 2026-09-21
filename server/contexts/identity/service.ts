import {
  isEmail,
  publicSession,
  PASSWORD_MIN,
  SUPER_ADMIN_ID,
  type SessionUser,
} from "@domain/identity/model.ts";
import { conventionPhotoFile, photoUrl, photoUrlFor } from "@domain/staff/model.ts";
import { conflict, invalid, unauthorized, unavailable } from "../../platform/errors.ts";
import { secretsMatch } from "../../platform/secrets.ts";
import type { EmployeeRecord } from "../staff/ports.ts";
import type {
  AccountRecord,
  AccountRepository,
  ClientNameLookup,
  StaffAuthenticator,
} from "./ports.ts";

export type IdentityService = ReturnType<typeof createIdentityService>;

/** The super admin is a PIN session, not a row in `users`. */
function adminSession(): SessionUser {
  return { id: SUPER_ADMIN_ID, email: "", name: "Super admin", role: "admin" };
}

function employeeSession(record: EmployeeRecord): SessionUser {
  return {
    id: record.id,
    email: "",
    name: record.name,
    role: "employee",
    slug: record.slug,
    photoUrl: photoUrlFor(record.slug, record.photoStoragePath),
  };
}

function accountSession(account: AccountRecord): SessionUser {
  return { id: account.id, email: account.email, name: account.name, role: "advisor" };
}

/** An email or a blank in the name column is not a name to greet anyone by. */
function personName(value: string | null | undefined, email: string): string | null {
  const name = (value ?? "").trim();
  if (!name) return null;
  if (name.toLowerCase() === email.trim().toLowerCase()) return null;
  if (isEmail(name)) return null;
  return name;
}

export function createIdentityService(deps: {
  accounts: AccountRepository;
  staff: StaffAuthenticator;
  clientNames: ClientNameLookup;
}) {
  const { accounts, staff, clientNames } = deps;

  /** Clients who signed up without a name borrow the one on their application. */
  async function clientSession(base: SessionUser): Promise<SessionUser> {
    const published = publicSession(base);
    const fromAccount = personName(published.name, published.email);
    if (fromAccount) return { ...published, name: fromAccount };
    const fromApplication = personName(await clientNames.nameForEmail(published.email), published.email);
    return fromApplication ? { ...published, name: fromApplication } : published;
  }

  return {
    async signup(input: { name: string; email: string; password: string }): Promise<SessionUser> {
      const name = input.name.trim();
      const email = input.email.trim().toLowerCase();

      if (!name || !isEmail(email) || input.password.length < PASSWORD_MIN) {
        throw invalid(`Enter a name, valid email, and password (${PASSWORD_MIN}+ characters).`);
      }
      if (await accounts.findByEmail(email)) {
        throw conflict("An account with this email already exists.");
      }

      const created = await accounts.insert({ email, name, password: input.password });
      return clientSession(accountSession(created));
    },

    async login(email: string, password: string): Promise<SessionUser> {
      const account = await accounts.findByEmail(email.trim().toLowerCase());
      if (!account || account.password !== password) {
        throw unauthorized("Invalid email or password.");
      }
      return clientSession(accountSession(account));
    },

    async employeeLogin(slug: string, password: string): Promise<SessionUser> {
      const handle = slug.trim().toLowerCase();
      if (handle.length < 2 || handle.length > 80 || !password) {
        throw invalid("Choose your name and enter your password.");
      }

      const record = await staff.authenticate(handle, password);
      if (!record) throw unauthorized("Invalid password.");
      return employeeSession(record);
    },

    /** The gate to the console. The PIN lives in `ADMIN_PIN`, never in code. */
    async adminLogin(pin: string): Promise<SessionUser> {
      const expected = String(process.env.ADMIN_PIN ?? "").trim();
      if (!expected) throw unavailable("The admin PIN is not configured.");

      const given = pin.trim();
      if (!given || !secretsMatch(expected, given)) throw unauthorized("Incorrect PIN.");
      return adminSession();
    },

    /**
     * The column as stored, for the console. Null when this email holds no
     * portal account. Sessions and list payloads never carry this.
     */
    async passwordForEmail(email: string): Promise<string | null> {
      const needle = email.trim().toLowerCase();
      if (!needle) return null;
      const account = await accounts.findByEmail(needle);
      return account?.password ?? null;
    },

    /**
     * Re-reads the session on every `/me` so a renamed client or a new portrait
     * shows up without signing out.
     */
    async refresh(session: SessionUser): Promise<SessionUser> {
      if (session.role === "admin") return adminSession();

      if (session.role === "employee") {
        const published = publicSession(session);
        if (published.photoUrl || !published.slug) return published;
        return { ...published, photoUrl: photoUrl(conventionPhotoFile(published.slug)) };
      }

      const stored = await accounts.findByEmail(session.email);
      return clientSession(stored ? accountSession(stored) : session);
    },
  };
}
