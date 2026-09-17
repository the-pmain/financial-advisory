import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';

const SCRIPT_HREF = '/fonts/GreatVibes-Regular.ttf';
const SCRIPT_PATH = 'public/fonts/GreatVibes-Regular.ttf';
const SCRIPT_INK = rgb(18 / 255, 24 / 255, 48 / 255);

const WIN_ANSI_SWAP = Object.freeze({
  '\u2013': '-',
  '\u2014': '-',
  '\u2018': "'",
  '\u2019': "'",
  '\u201C': '"',
  '\u201D': '"',
  '\u2026': '...',
  '\u00A0': ' ',
});

export function toWinAnsi(value) {
  const raw = String(value ?? '');
  let out = '';
  for (const char of raw) {
    if (Object.hasOwn(WIN_ANSI_SWAP, char)) {
      out += WIN_ANSI_SWAP[char];
      continue;
    }
    const code = char.codePointAt(0) ?? 0;
    if (code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126) || (code >= 160 && code <= 255)) {
      out += char;
      continue;
    }
    out += '?';
  }
  return out;
}

export const PAGE_WIDTH = 595.28;
export const PAGE_HEIGHT = 841.89;
export const MARGIN = 54;
export const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
export const INK = rgb(0.043, 0.122, 0.2);
export const MUTED = rgb(0.42, 0.45, 0.5);
export const RULE = rgb(0.78, 0.8, 0.82);
export const WASH = rgb(0.94, 0.95, 0.96);

export function slot(value, label) {
  const raw = value == null ? '' : String(value).trim();
  return raw || `[${label}]`;
}

export function wrapLines(font, text, size, maxWidth) {
  const paragraphs = String(text ?? '').split(/\r?\n/);
  const lines = [];
  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push('');
      continue;
    }
    let current = '';
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(toWinAnsi(next), size) <= maxWidth) {
        current = next;
        continue;
      }
      if (current) lines.push(current);
      if (font.widthOfTextAtSize(toWinAnsi(word), size) <= maxWidth) {
        current = word;
        continue;
      }
      let rest = word;
      while (rest) {
        let take = rest.length;
        while (take > 1 && font.widthOfTextAtSize(toWinAnsi(rest.slice(0, take)), size) > maxWidth) {
          take -= 1;
        }
        lines.push(rest.slice(0, take));
        rest = rest.slice(take);
      }
      current = '';
    }
    if (current) lines.push(current);
  }
  return lines.length ? lines : [''];
}

async function loadScriptBytes() {
  if (typeof window === 'undefined') {
    try {
      const { readFileSync } = await import('node:fs');
      const { resolve } = await import('node:path');
      return new Uint8Array(readFileSync(resolve(process.cwd(), SCRIPT_PATH)));
    } catch {
      /* try fetch below */
    }
  }
  if (typeof fetch === 'function') {
    try {
      const res = await fetch(SCRIPT_HREF);
      if (res.ok) return new Uint8Array(await res.arrayBuffer());
    } catch {
      /* optional face */
    }
  }
  return null;
}

async function embedScriptFont(pdf) {
  try {
    const bytes = await loadScriptBytes();
    if (!bytes?.byteLength) return null;
    pdf.registerFontkit(fontkit);
    return await pdf.embedFont(bytes, { subset: true });
  } catch {
    return null;
  }
}

function fitScript(font, text, maxWidth) {
  let size = 19;
  const min = 11;
  while (size > min && font.widthOfTextAtSize(text, size) > maxWidth) {
    size -= 0.25;
  }
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return { text, size };
  let clipped = text;
  while (clipped.length > 1 && font.widthOfTextAtSize(`${clipped}...`, size) > maxWidth) {
    clipped = clipped.slice(0, -1);
  }
  return { text: clipped ? `${clipped}...` : '', size };
}

export async function writePdf(blocks, { profile = 'letterhead', watermark, runningFooter } = {}) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const needsScript = (blocks ?? []).some((block) => block?.type === 'signatures');
  const script = needsScript ? await embedScriptFont(pdf) : null;
  const ctx = {
    pdf,
    regular,
    bold,
    script,
    profile,
    watermark: watermark || (profile === 'court-draft' ? 'DRAFT' : ''),
    page: null,
    y: 0,
    footerReserve: runningFooter ? 52 : 48,
  };
  ctx.ensure = (needed) => ensure(ctx, needed);
  ctx.newPage = () => newPage(ctx);
  newPage(ctx);
  for (const block of blocks ?? []) {
    drawBlock(ctx, block);
  }
  if (runningFooter) {
    stampRunningFooter(pdf, regular, runningFooter === true ? 'Confidential' : String(runningFooter));
  }
  return pdf.save({ useObjectStreams: false });
}

function stampRunningFooter(pdf, font, label) {
  const pages = pdf.getPages();
  const total = pages.length;
  pages.forEach((page, index) => {
    const { width } = page.getSize();
    page.drawLine({
      start: { x: MARGIN, y: 38 },
      end: { x: width - MARGIN, y: 38 },
      thickness: 0.4,
      color: RULE,
    });
    page.drawText(toWinAnsi(label), {
      x: MARGIN,
      y: 24,
      size: 8,
      font,
      color: MUTED,
    });
    const pageLabel = `${index + 1} / ${total}`;
    const pageWidth = font.widthOfTextAtSize(pageLabel, 8);
    page.drawText(pageLabel, {
      x: width - MARGIN - pageWidth,
      y: 24,
      size: 8,
      font,
      color: MUTED,
    });
  });
}

function newPage(ctx) {
  ctx.page = ctx.pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  ctx.y = PAGE_HEIGHT - MARGIN;
  if (ctx.watermark) {
    ctx.page.drawText(toWinAnsi(ctx.watermark), {
      x: 180,
      y: 400,
      size: 64,
      font: ctx.bold,
      color: rgb(0.9, 0.9, 0.91),
      rotate: degrees(32),
    });
  }
}

function ensure(ctx, needed) {
  if (ctx.y - needed > MARGIN + ctx.footerReserve) return;
  newPage(ctx);
}

function drawBlock(ctx, block) {
  if (!block || typeof block !== 'object') return;
  const type = block.type;
  if (type === 'space') {
    ctx.y -= block.h ?? 10;
    return;
  }
  if (type === 'break') {
    newPage(ctx);
    return;
  }
  if (type === 'rule') {
    ensure(ctx, 16);
    ctx.y -= 6;
    ctx.page.drawLine({
      start: { x: MARGIN, y: ctx.y },
      end: { x: PAGE_WIDTH - MARGIN, y: ctx.y },
      thickness: 0.6,
      color: RULE,
    });
    ctx.y -= 10;
    return;
  }
  if (type === 'kicker') return text(ctx, block.text, ctx.regular, 9, MUTED, 10);
  if (type === 'title') return text(ctx, block.text, ctx.bold, 16, INK, 8);
  if (type === 'subject') {
    ctx.y -= 6;
    return text(ctx, block.text, ctx.bold, 13, INK, 14);
  }
  if (type === 'h') {
    ctx.y -= 10;
    return text(ctx, block.text, ctx.bold, 11, INK, 10);
  }
  if (type === 'p') {
    const prefix = block.n != null ? `${block.n}. ` : '';
    return text(ctx, prefix + (block.text || ''), ctx.regular, 10, INK, 10);
  }
  if (type === 'footnote') return text(ctx, block.text, ctx.regular, 8, MUTED, 6);
  if (type === 'parties') {
    drawParties(ctx, block);
    return;
  }
  if (type === 'signatures') {
    drawSignatures(ctx, block.cards);
    return;
  }
  if (type === 'notice' || type === 'callout') {
    const lines = wrapLines(ctx.regular, block.text, 10, CONTENT_WIDTH - 24);
    const h = lines.length * 14 + 24;
    ensure(ctx, h + 12);
    ctx.y -= 4;
    ctx.page.drawRectangle({
      x: MARGIN,
      y: ctx.y - h,
      width: CONTENT_WIDTH,
      height: h,
      color: WASH,
    });
    lines.forEach((line, index) => {
      ctx.page.drawText(toWinAnsi(line), {
        x: MARGIN + 12,
        y: ctx.y - 18 - index * 14,
        size: 10,
        font: ctx.regular,
        color: INK,
      });
    });
    ctx.y -= h + 16;
    return;
  }
  if (type === 'split') {
    const left = wrapLines(ctx.regular, block.left || '', 9, CONTENT_WIDTH / 2 - 8);
    const right = wrapLines(ctx.regular, block.right || '', 9, CONTENT_WIDTH / 2 - 8);
    const rows = Math.max(left.length, right.length);
    const h = rows * 12 + 4;
    ensure(ctx, h);
    for (let i = 0; i < rows; i += 1) {
      if (left[i]) {
        ctx.page.drawText(toWinAnsi(left[i]), {
          x: MARGIN,
          y: ctx.y - 10 - i * 12,
          size: 9,
          font: ctx.regular,
          color: INK,
        });
      }
      if (right[i]) {
        ctx.page.drawText(toWinAnsi(right[i]), {
          x: MARGIN + CONTENT_WIDTH / 2,
          y: ctx.y - 10 - i * 12,
          size: 9,
          font: ctx.regular,
          color: INK,
        });
      }
    }
    ctx.y -= h;
    return;
  }
  if (type === 'exhibit') {
    return text(ctx, `${block.mark || '1'}.  ${block.text || ''}`, ctx.regular, 10, INK, 6);
  }
  if (type === 'qr') {
    ensure(ctx, 36);
    ctx.page.drawRectangle({
      x: MARGIN,
      y: ctx.y - 28,
      width: 28,
      height: 28,
      borderColor: INK,
      borderWidth: 0.8,
    });
    text(ctx, `Explorer: ${block.url || ''}`, ctx.regular, 8, MUTED, 8);
    return;
  }
}

function text(ctx, value, font, size, color, gap) {
  const lead = size + 4;
  const lines = wrapLines(font, value, size, CONTENT_WIDTH);
  const h = lines.length * lead + gap;
  ensure(ctx, h);
  lines.forEach((line, index) => {
    ctx.page.drawText(toWinAnsi(line), {
      x: MARGIN,
      y: ctx.y - size - index * lead,
      size,
      font,
      color,
    });
  });
  ctx.y -= h;
}

function drawParties(ctx, block) {
  const left = block.left ?? {};
  const right = block.right ?? {};
  const gap = 12;
  const colW = (CONTENT_WIDTH - gap) / 2;
  const leftLines = wrapParty(ctx, left, colW);
  const rightLines = wrapParty(ctx, right, colW);
  const rows = Math.max(leftLines.length, rightLines.length);
  const h = 48 + rows * 12 + 10;
  ensure(ctx, h + 8);
  drawPartyColumn(ctx, left, leftLines, MARGIN, colW, h);
  drawPartyColumn(ctx, right, rightLines, MARGIN + colW + gap, colW, h);
  ctx.y -= h;
}

function wrapParty(ctx, party, colW) {
  const lines = [];
  for (const item of party.lines ?? []) {
    lines.push(...wrapLines(ctx.regular, item, 9, colW - 16));
  }
  return lines;
}

function drawPartyColumn(ctx, party, lines, x, colW, h) {
  const top = ctx.y;
  ctx.page.drawRectangle({
    x,
    y: top - h,
    width: colW,
    height: h,
    color: WASH,
  });
  ctx.page.drawText(toWinAnsi(party.role || ''), {
    x: x + 8,
    y: top - 14,
    size: 9,
    font: ctx.bold,
    color: INK,
  });
  if (party.name) {
    ctx.page.drawText(toWinAnsi(party.name), {
      x: x + 8,
      y: top - 28,
      size: 10,
      font: ctx.bold,
      color: INK,
    });
  }
  lines.forEach((line, index) => {
    ctx.page.drawText(toWinAnsi(line), {
      x: x + 8,
      y: top - 44 - index * 12,
      size: 9,
      font: ctx.regular,
      color: INK,
    });
  });
}

function displayName(value) {
  const raw = String(value ?? '').trim();
  if (!raw || /^\[[^\]]+\]$/.test(raw)) return '';
  return toWinAnsi(raw);
}

function drawSignatures(ctx, cards) {
  const list = (cards ?? []).filter((card) => card && card.role);
  if (!list.length) return;
  const gap = 12;
  const count = list.length;
  const colW = (CONTENT_WIDTH - gap * Math.max(0, count - 1)) / count;
  const h = 98;
  ensure(ctx, h + 8);
  const top = ctx.y;
  list.forEach((card, index) => {
    const x = MARGIN + index * (colW + gap);
    ctx.page.drawRectangle({
      x,
      y: top - h,
      width: colW,
      height: h,
      color: WASH,
    });
    ctx.page.drawText(toWinAnsi(card.role || ''), {
      x: x + 10,
      y: top - 16,
      size: 11,
      font: ctx.bold,
      color: INK,
    });
    const ruleY = top - 46;
    const mark = displayName(card.printed || card.name);
    if (mark && ctx.script) {
      const fitted = fitScript(ctx.script, mark, colW - 24);
      if (fitted.text) {
        ctx.page.drawText(fitted.text, {
          x: x + 10,
          y: ruleY + 3,
          size: fitted.size,
          font: ctx.script,
          color: SCRIPT_INK,
        });
      }
    }
    ctx.page.drawLine({
      start: { x: x + 10, y: ruleY },
      end: { x: x + colW - 10, y: ruleY },
      thickness: 0.6,
      color: RULE,
    });
    const printed = displayName(card.printed || card.name);
    const date = displayName(card.date);
    ctx.page.drawText(toWinAnsi(`Name  ${printed}`), {
      x: x + 10,
      y: top - 68,
      size: 10,
      font: ctx.regular,
      color: INK,
    });
    ctx.page.drawText(toWinAnsi(`Date  ${date}`), {
      x: x + 10,
      y: top - 84,
      size: 10,
      font: ctx.regular,
      color: INK,
    });
  });
  ctx.y = top - h - 10;
}
