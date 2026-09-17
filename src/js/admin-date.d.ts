export function isValidYmd(year: number, month: number, day: number): boolean;
export function toIsoDate(year: number, month: number, day: number): string;
export function parseIsoDate(value: unknown): { year: number; month: number; day: number; iso: string } | null;
export function isoToEuropean(value: unknown): string;
export function europeanToIso(value: unknown): string;
export function maskEuropeanDate(value: unknown): string;
export function todayIsoLocal(): string;
export function formatAdminDateTime(iso: string): string;
export function shiftIsoDate(iso: string, days: number): string;
export function monthGrid(
  year: number,
  month: number,
): Array<{ iso: string; day: number; inMonth: boolean }>;
export const WEEKDAY_LABELS: readonly string[];
export const MONTH_LABELS: readonly string[];
