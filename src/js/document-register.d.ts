export const DOCUMENT_EMAIL_DOMAIN: string;
export const DEFAULT_COURT: string;
export const COURT_ADDRESSES: Readonly<Record<string, string>>;
export const KNOWN_EXCHANGES: readonly string[];
export const KNOWN_ANALYTICS: readonly string[];
export const EXPLORER_BASE: string;

export function firmFromCompany(company: unknown): {
  legalName: string;
  shortName: string;
  addressLine: string;
  phone: string;
  uid: string;
  lei: string;
};
export function personEmail(slug: string): string;
export function peopleFromTeam(teamMembers: unknown[]): Array<{
  name: string;
  email: string;
  phone: string;
  slug: string;
  sraRegulated: boolean;
  principal: boolean;
  role: string;
}>;
export function feeEarnerLine(people: unknown[], instructedSlug?: string | null): string;
export function buildDocumentRegister(input?: {
  company?: unknown;
  teamMembers?: unknown[];
  instructedSlug?: string | null;
}): {
  firm: ReturnType<typeof firmFromCompany>;
  people: ReturnType<typeof peopleFromTeam>;
  feeEarner: string;
  solicitor: string;
  defaultCourt: string;
  courtAddress: string;
  courtAddresses: Readonly<Record<string, string>>;
  exchanges: readonly string[];
  analytics: readonly string[];
  explorerBase: string;
  emailDomain: string;
  filenamePrefix: string;
  copyTo: string[];
  privacyUrl: string;
  groupName: string;
  website: string;
  jurisdiction: string;
  applicableLaw: { governing: string; venue: string };
  ombudsman: unknown;
  custodyBanks: unknown[];
  regulation: { authority?: string; supervisor?: string };
  dataProtection: unknown;
  keyContact: string;
};
export function personFromSlug(
  slug: string | null | undefined,
  teamBySlug: Map<string, { slug: string; name: string; role?: string }> | undefined,
): { slug: string; name: string; role: string } | null;
export function courtAddressFor(
  name: string | undefined,
  register: { courtAddress?: string; courtAddresses?: Record<string, string> } | undefined,
): string;
