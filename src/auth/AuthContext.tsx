import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "../api/client.ts";

export type User = {
  id: string;
  email: string;
  name: string;
  role: "advisor" | "admin";
};

type AuthValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api<User>("/api/auth/me")
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      async login(email, password) {
        setUser(await api<User>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }));
      },
      async signup(name, email, password) {
        setUser(await api<User>("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        }));
      },
      async logout() {
        await api("/api/auth/logout", { method: "POST" });
        setUser(null);
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
