export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

const DAY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Picks the singular or plural phrase and fills its {n} placeholder. */
export function plural(count: number, one: string, many: string): string {
  return (count === 1 ? one : many).replace("{n}", String(count));
}

export function formatDay(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return DAY.format(date);
}

export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)}%`;
}

export function formatChf(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
