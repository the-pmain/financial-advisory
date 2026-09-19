export type FieldDef = {
  name: string;
  label: string;
  type?: string;
  options?: string[];
  showWhen?: string;
  locked?: boolean;
  placeholder?: string;
};

export const AGREEMENT_DEFAULTS: Readonly<{
  servicesIncluded: string;
  servicesExcluded: string;
  advisoryFeeRate: string;
  discretionaryFeeRate: string;
  hourlyFeeRate: string;
  projectFeeRate: string;
  retainerFeeRate: string;
  expenseReimbursement: string;
  additionalWorkRate: string;
}>;
export const DOCUMENT_FIELD_GROUPS: Record<string, Array<{ title: string; fields: FieldDef[] }>>;
export function fieldsForKindDef(kind: string): FieldDef[];
export function emptyFormValues(kind: string): Record<string, string>;
export function showWhenMatches(spec: string | undefined, values: Record<string, string>): boolean;
export function initialsFromName(name: string): string;
export function todayIso(): string;
export function agreementFromRecord(client: unknown, register: unknown): Record<string, string>;
export function valuesForCompose(
  kind: string,
  client: unknown,
  documents: unknown,
  register: unknown,
): Record<string, string>;
export function parseMoney(value: unknown): number | null;
export function formatMoney(amount: number): string;
export function formatUkDate(iso: string): string;
export function addDaysIso(iso: string, days: number): string;
export function addYearsIso(iso: string, years: number): string;
