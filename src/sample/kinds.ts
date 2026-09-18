import { FileCheck, FileText, Receipt, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DocKind } from "./portal.ts";

export const DOC_KIND_ICON: Record<DocKind, LucideIcon> = {
  Statement: FileText,
  Tax: Receipt,
  Advice: FileCheck,
  Contract: ScrollText,
};
