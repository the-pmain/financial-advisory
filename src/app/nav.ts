import { Briefcase, ClipboardList, FileText, LayoutDashboard, Mail, UserCog, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const APP_NAV = [
  { to: "/overview", key: "overview" as const, end: true, icon: LayoutDashboard },
  { to: "/holdings", key: "holdings" as const, end: true, icon: Briefcase },
  { to: "/documents", key: "documents" as const, end: false, icon: FileText },
  { to: "/messages", key: "messages" as const, end: true, icon: Mail },
] as const satisfies ReadonlyArray<{
  to: string;
  key: "overview" | "holdings" | "documents" | "messages";
  end: boolean;
  icon: LucideIcon;
}>;

export const EMPLOYEE_NAV = [
  { to: "/", key: "applications" as const, end: true, icon: ClipboardList },
  { to: "/clients", key: "clients" as const, end: true, icon: Users },
] as const satisfies ReadonlyArray<{
  to: string;
  key: "applications" | "clients";
  end: boolean;
  icon: LucideIcon;
}>;

export const ADMIN_NAV = [
  { to: "/admin/employees", key: "employees" as const, end: false, icon: UserCog },
  { to: "/admin/clients", key: "allClients" as const, end: false, icon: Users },
] as const satisfies ReadonlyArray<{
  to: string;
  key: "employees" | "allClients";
  end: boolean;
  icon: LucideIcon;
}>;

export type AppNavKey =
  | (typeof APP_NAV)[number]["key"]
  | (typeof EMPLOYEE_NAV)[number]["key"]
  | (typeof ADMIN_NAV)[number]["key"];

export function navItemsForRole(role: string | undefined) {
  if (role === "employee") return EMPLOYEE_NAV;
  if (role === "admin") return ADMIN_NAV;
  return APP_NAV;
}

export function homePathForRole(role: string | undefined): string {
  if (role === "employee") return "/";
  if (role === "admin") return "/admin/employees";
  return "/overview";
}

export function navKeyFromPath(pathname: string, role?: string): AppNavKey {
  if (role === "admin") {
    return pathname.startsWith("/admin/clients") ? "allClients" : "employees";
  }
  if (role === "employee") {
    if (pathname === "/clients" || pathname.startsWith("/clients/")) return "clients";
    return "applications";
  }
  if (pathname === "/documents" || pathname.startsWith("/documents/")) return "documents";
  const match = APP_NAV.find((item) => item.to === pathname);
  return match?.key ?? "overview";
}
