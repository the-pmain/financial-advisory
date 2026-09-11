export const TEXT_FIELD_MAX: number;
export const NAME_MAX: number;
export const EMAIL_MAX: number;
export const PHONE_MAX: number;
export const PHONE_MIN_DIGITS: number;
export const PHONE_MAX_DIGITS: number;
export const CLIENTS_SELECT: string;

export type ClientInsert = {
  name: string;
  email: string;
  phone: string;
  consent: true;
  instructed_person_slug: string | null;
  is_test: false;
};

export type ClientRecord = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  consent: boolean;
  instructed_person_slug: string | null;
  is_test: boolean;
};

export type ParseOk<T> = { ok: true; value: T };
export type ParseErr = { ok: false; error: string };

export function normalizeIsTest(value: unknown): boolean;
export function normalizeConsent(value: unknown): boolean;
export function normalizeName(value: unknown): string | null;
export function normalizeEmail(value: unknown): string | null;
export function normalizePhone(value: unknown): string | null;
export function normalizeInstructedPersonSlug(value: unknown): string | null;
export function phoneDigitCount(phone: string): number;
export function shapeClient(row: unknown): ClientRecord | null;
export function parseClientInput(body: unknown): ParseOk<ClientInsert> | ParseErr;
export function parseListQuery(
  searchParams: URLSearchParams,
): ParseOk<{ page: number; per_page: number; is_test: boolean | undefined }> | ParseErr;
export function parseIsTestPatch(body: unknown): ParseOk<{ id: string; is_test: boolean }> | ParseErr;
