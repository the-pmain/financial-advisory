export function toWinAnsi(value: unknown): string;
export function slot(value: unknown, label: string): string;
export function wrapLines(font: unknown, text: unknown, size: number, maxWidth: number): string[];
export function writePdf(
  blocks: unknown[],
  options?: { profile?: string; watermark?: string; runningFooter?: string | boolean },
): Promise<Uint8Array>;
