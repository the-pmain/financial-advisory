import { Briefcase, FileText, LayoutDashboard, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const APP_NAV = [
  { to: "/overview", key: "overview" as const, end: true, icon: LayoutDashboard },
  { to: "/holdings", key: "holdings" as const, end: true, icon: Briefcase },
  { to: "/documents", key: "documents" as const, end: true, icon: FileText },
  { to: "/messages", key: "messages" as const, end: true, icon: Mail },
] as const satisfies ReadonlyArray<{
  to: string;
  key: "overview" | "holdings" | "documents" | "messages";
  end: boolean;
  icon: LucideIcon;
}>;

export type AppNavKey = (typeof APP_NAV)[number]["key"];

export function navKeyFromPath(pathname: string): AppNavKey {
  const match = APP_NAV.find((item) => item.to === pathname);
  return match?.key ?? "overview";
}
