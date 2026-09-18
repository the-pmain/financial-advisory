export const sampleAccount = {
  currency: "CHF",
  value: "1'240'500",
  ytd: "+1.4%",
  mandate: "Consolidated custody",
};

export const sampleAllocations = [
  { name: "CHF bonds", share: 28 },
  { name: "Swiss equities", share: 36 },
  { name: "Global equities", share: 24 },
  { name: "Cash at bank", share: 12 },
] as const;

export const sampleHoldings = [
  { name: "Swiss Confederation 1.25% 2032", asset: "CHF bond", value: "186'000", weight: "15.0%" },
  { name: "Pfandbriefbank 0.75% 2029", asset: "CHF bond", value: "161'400", weight: "13.0%" },
  { name: "Nestlé", asset: "Swiss equity", value: "161'300", weight: "13.0%" },
  { name: "Roche", asset: "Swiss equity", value: "136'500", weight: "11.0%" },
  { name: "Novartis", asset: "Swiss equity", value: "148'900", weight: "12.0%" },
  { name: "MSCI World UCITS", asset: "Global equity", value: "297'700", weight: "24.0%" },
  { name: "Call account, ZKB", asset: "Cash", value: "148'700", weight: "12.0%" },
] as const;

export const sampleDocuments = [
  { title: "Q2 custody statement", date: "15 July 2025", kind: "Statement" },
  { title: "Tax pack 2025", date: "28 February 2026", kind: "Tax" },
  { title: "Suitability note", date: "9 March 2026", kind: "Advice" },
  { title: "Fee schedule", date: "3 January 2026", kind: "Contract" },
] as const;

export const sampleMessages = [
  {
    from: "Anna Keller",
    date: "12 March 2026",
    subject: "Q2 review date",
    body: "Shall we keep Thursday 16 April at 10:00 in Zurich for the half-year review?",
  },
  {
    from: "Anna Keller",
    date: "4 March 2026",
    subject: "Tax pack ready",
    body: "The 2025 tax pack is in Documents. Please confirm if your accountant needs a signed copy.",
  },
  {
    from: "Portal",
    date: "20 February 2026",
    subject: "Corporate action",
    body: "Roche dividend will be booked to the call account on the pay date. No action needed.",
  },
] as const;
