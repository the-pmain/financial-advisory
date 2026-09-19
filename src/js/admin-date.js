const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const EU_RE = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;

function pad(value) {
  return String(value).padStart(2, '0');
}

export function isValidYmd(year, month, day) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (year < 1800 || year > 2200 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function toIsoDate(year, month, day) {
  if (!isValidYmd(year, month, day)) return '';
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function parseIsoDate(value) {
  const match = String(value ?? '').trim().match(ISO_RE);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!isValidYmd(year, month, day)) return null;
  return { year, month, day, iso: `${match[1]}-${match[2]}-${match[3]}` };
}

export function isoToEuropean(value) {
  const parsed = parseIsoDate(value);
  if (!parsed) return '';
  return `${pad(parsed.day)}.${pad(parsed.month)}.${parsed.year}`;
}

export function europeanToIso(value) {
  const raw = String(value ?? '').trim();
  const iso = parseIsoDate(raw);
  if (iso) return iso.iso;

  const dotted = raw.match(EU_RE);
  if (dotted) {
    return toIsoDate(Number(dotted[3]), Number(dotted[2]), Number(dotted[1]));
  }

  const digits = raw.replace(/\D/g, '');
  if (digits.length === 8) {
    return toIsoDate(Number(digits.slice(4, 8)), Number(digits.slice(2, 4)), Number(digits.slice(0, 2)));
  }
  return '';
}

export function maskEuropeanDate(value) {
  const digits = String(value ?? '').replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

export function todayIsoLocal() {
  const now = new Date();
  return toIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function formatAdminDateTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso ?? '');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} · ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function shiftIsoDate(iso, days) {
  const parsed = parseIsoDate(iso) ?? parseIsoDate(todayIsoLocal());
  const date = new Date(parsed.year, parsed.month - 1, parsed.day + days);
  return toIsoDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function monthGrid(year, month) {
  const first = new Date(year, month - 1, 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  const start = new Date(year, month - 1, 1 - mondayOffset);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    const inMonth = date.getMonth() === month - 1;
    return {
      iso: toIsoDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
      day: date.getDate(),
      inMonth,
    };
  });
}

export const WEEKDAY_LABELS = Object.freeze(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
export const MONTH_LABELS = Object.freeze([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);
