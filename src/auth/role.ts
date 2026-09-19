import type { User } from "./AuthContext.tsx";

export function isEmployee(user: User | null): user is User & { role: "employee" } {
  return user?.role === "employee";
}
