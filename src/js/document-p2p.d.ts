export function agreementNumberFromClient(clientId: string, iso?: string): string;
export function p2pPayment(principal: number, annualPct: number, months: number): number | null;
export function p2pSchedule(
  principal: number,
  annualPct: number,
  months: number,
  startIso: string,
): {
  payment: number;
  totalInterest: number;
  totalRepayment: number;
  rows: Array<Record<string, string>>;
};
export function resolveP2pContext(values?: unknown, register?: unknown): Record<string, unknown>;
export function buildP2p(values: unknown, register?: unknown): Array<Record<string, unknown>>;
