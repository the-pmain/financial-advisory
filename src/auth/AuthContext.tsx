import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { api } from "../api/client.ts";
import { clearSessionHint, hasSessionHint } from "./sessionHint.ts";

const BOOT_MS = 1600;

export type User = {
  id: string;
  email: string;
  name: string;
  role: "advisor" | "admin" | "employee";
  slug?: string;
  photoUrl?: string;
};

type AuthValue = {
  user: User | null;
  ready: boolean;
  entering: boolean;
  login: (email: string, password: string) => Promise<void>;
  employeeLogin: (slug: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

function bootHoldMs(startedAt: number): number {
  if (typeof window === "undefined") return 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  return Math.max(240, BOOT_MS - (performance.now() - startedAt));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [entering, setEntering] = useState(hasSessionHint);
  const startedAt = useRef(typeof performance === "undefined" ? 0 : performance.now());

  useEffect(() => {
    api<User>("/api/auth/me")
      .then(setUser)
      .catch(() => {
        clearSessionHint();
        setUser(null);
        setEntering(false);
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      setEntering(false);
      return;
    }
    const hold = window.setTimeout(() => setEntering(false), bootHoldMs(startedAt.current));
    return () => window.clearTimeout(hold);
  }, [ready, user]);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      entering,
      async login(email, password) {
        const next = await api<User>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        startedAt.current = performance.now();
        setEntering(true);
        setUser(next);
      },
      async employeeLogin(slug, password) {
        const next = await api<User>("/api/auth/employee/login", {
          method: "POST",
          body: JSON.stringify({ slug, password }),
        });
        startedAt.current = performance.now();
        setEntering(true);
        setUser(next);
      },
      async signup(name, email, password) {
        const next = await api<User>("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });
        startedAt.current = performance.now();
        setEntering(true);
        setUser(next);
      },
      async logout() {
        await api("/api/auth/logout", { method: "POST" });
        clearSessionHint();
        setUser(null);
        setEntering(false);
      },
    }),
    [user, ready, entering],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
