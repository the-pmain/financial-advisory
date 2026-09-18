import { BookUser, CarFront, House, IdCard, Landmark, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const DOC_SLUGS = [
  "passport",
  "driver-license",
  "identity-card",
  "proof-of-address",
  "tax-id",
  "bank-reference",
] as const;

export type DocSlug = (typeof DOC_SLUGS)[number];

export type DocFieldKey =
  | "fullName"
  | "number"
  | "nationality"
  | "expiry"
  | "issuer"
  | "address"
  | "city"
  | "postal"
  | "issued"
  | "taxCountry"
  | "bank"
  | "iban";

export type DocField = {
  key: DocFieldKey;
  type: "text" | "date";
  autoComplete?: string;
};

export type DocKind = {
  slug: DocSlug;
  icon: LucideIcon;
  fields: readonly DocField[];
};

export const DOC_CATALOG: readonly DocKind[] = [
  {
    slug: "passport",
    icon: BookUser,
    fields: [
      { key: "fullName", type: "text", autoComplete: "name" },
      { key: "number", type: "text" },
      { key: "nationality", type: "text" },
      { key: "expiry", type: "date" },
    ],
  },
  {
    slug: "driver-license",
    icon: CarFront,
    fields: [
      { key: "fullName", type: "text", autoComplete: "name" },
      { key: "number", type: "text" },
      { key: "issuer", type: "text" },
      { key: "expiry", type: "date" },
    ],
  },
  {
    slug: "identity-card",
    icon: IdCard,
    fields: [
      { key: "fullName", type: "text", autoComplete: "name" },
      { key: "number", type: "text" },
      { key: "issuer", type: "text" },
      { key: "expiry", type: "date" },
    ],
  },
  {
    slug: "proof-of-address",
    icon: House,
    fields: [
      { key: "fullName", type: "text", autoComplete: "name" },
      { key: "address", type: "text", autoComplete: "street-address" },
      { key: "city", type: "text", autoComplete: "address-level2" },
      { key: "postal", type: "text", autoComplete: "postal-code" },
      { key: "issued", type: "date" },
    ],
  },
  {
    slug: "tax-id",
    icon: Receipt,
    fields: [
      { key: "fullName", type: "text", autoComplete: "name" },
      { key: "number", type: "text" },
      { key: "taxCountry", type: "text" },
    ],
  },
  {
    slug: "bank-reference",
    icon: Landmark,
    fields: [
      { key: "fullName", type: "text", autoComplete: "name" },
      { key: "bank", type: "text" },
      { key: "iban", type: "text" },
    ],
  },
];

export function isDocSlug(value: string): value is DocSlug {
  return DOC_SLUGS.includes(value as DocSlug);
}

export function getDocKind(slug: string): DocKind | undefined {
  return DOC_CATALOG.find((item) => item.slug === slug);
}
