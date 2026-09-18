export const VIZ_TONES = 4;

export const sampleAccount = {
  currency: "CHF",
  value: "1'240'500",
  valueNum: 1_240_500,
  ytd: "+1.4%",
  cash: "148'700",
  cashShare: 12,
  mandate: "Consolidated custody",
  sleeves: 4,
};

export const sampleNav = [
  { month: "Apr", value: 1_198_200 },
  { month: "May", value: 1_204_100 },
  { month: "Jun", value: 1_195_600 },
  { month: "Jul", value: 1_210_800 },
  { month: "Aug", value: 1_223_400 },
  { month: "Sep", value: 1_217_900 },
  { month: "Oct", value: 1_231_500 },
  { month: "Nov", value: 1_238_800 },
  { month: "Dec", value: 1_223_100 },
  { month: "Jan", value: 1_230_200 },
  { month: "Feb", value: 1_236_400 },
  { month: "Mar", value: 1_240_500 },
] as const;

export const sampleAllocations = [
  { name: "Swiss equities", share: 36, tone: 0 },
  { name: "CHF bonds", share: 28, tone: 1 },
  { name: "Global equities", share: 24, tone: 2 },
  { name: "Cash at bank", share: 12, tone: 3 },
] as const;

export const sampleHoldings = [
  { name: "Swiss Confederation 1.25% 2032", asset: "CHF bond", value: "186'000", weight: 15, tone: 1 },
  { name: "Pfandbriefbank 0.75% 2029", asset: "CHF bond", value: "161'400", weight: 13, tone: 1 },
  { name: "Nestlé", asset: "Swiss equity", value: "161'300", weight: 13, tone: 0 },
  { name: "Roche", asset: "Swiss equity", value: "136'500", weight: 11, tone: 0 },
  { name: "Novartis", asset: "Swiss equity", value: "148'900", weight: 12, tone: 0 },
  { name: "MSCI World UCITS", asset: "Global equity", value: "297'700", weight: 24, tone: 2 },
  { name: "Call account, ZKB", asset: "Cash", value: "148'700", weight: 12, tone: 3 },
] as const;

export const sampleDocuments = [
  { title: "Q2 custody statement", date: "15 July 2025", kind: "Statement" },
  { title: "Tax pack 2025", date: "28 February 2026", kind: "Tax" },
  { title: "Suitability note", date: "9 March 2026", kind: "Advice" },
  { title: "Fee schedule", date: "3 January 2026", kind: "Contract" },
  { title: "Q1 custody statement", date: "14 April 2025", kind: "Statement" },
  { title: "Investment proposal", date: "21 January 2026", kind: "Advice" },
] as const;

export const sampleMessages = [
  {
    from: "Anna Keller",
    date: "12 March 2026",
    subject: "Q2 review date",
    body: "Shall we keep Thursday 16 April at 10:00 in Zurich for the half-year review?",
    latest: true,
  },
  {
    from: "Anna Keller",
    date: "4 March 2026",
    subject: "Tax pack ready",
    body: "The 2025 tax pack is in Documents. Please confirm if your accountant needs a signed copy.",
    latest: false,
  },
  {
    from: "Portal",
    date: "20 February 2026",
    subject: "Corporate action",
    body: "Roche dividend will be booked to the call account on the pay date. No action needed.",
    latest: false,
  },
] as const;

export type DocKind = (typeof sampleDocuments)[number]["kind"];

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)}%`;
}

export function formatChf(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
