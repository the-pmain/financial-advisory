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
export const NAVY = rgb(11 / 255, 31 / 255, 51 / 255);
export const GOLD = rgb(147 / 255, 122 / 255, 67 / 255);
export const MUTED = rgb(0.42, 0.45, 0.5);
export const RULE = rgb(0.78, 0.8, 0.82);
export const WASH = rgb(0.94, 0.95, 0.96);
export const SLOT_WASH = rgb(0.96, 0.945, 0.9);
export const CREAM = rgb(0.86, 0.8, 0.66);

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
    pageIndex: 0,
    y: 0,
    footerReserve: runningFooter || profile === 'brochure' ? 52 : 48,
  };
  ctx.ensure = (needed) => ensure(ctx, needed);
  ctx.newPage = () => newPage(ctx);
  newPage(ctx);
  for (const block of blocks ?? []) {
    drawBlock(ctx, block);
  }
  if (runningFooter || profile === 'brochure') {
    const label =
      runningFooter && runningFooter !== true
        ? String(runningFooter)
        : profile === 'brochure'
          ? 'Confidential — for the named client only'
          : 'Confidential';
    stampRunningFooter(pdf, regular, label, { coverNavy: profile === 'brochure' });
  }
  return pdf.save({ useObjectStreams: false });
}

function stampRunningFooter(pdf, font, label, { coverNavy } = {}) {
  const pages = pdf.getPages();
  const total = pages.length;
  pages.forEach((page, index) => {
    const { width } = page.getSize();
    const navy = coverNavy && index === 0;
    const ink = navy ? CREAM : MUTED;
    const rule = navy ? GOLD : RULE;
    page.drawLine({
      start: { x: MARGIN, y: 38 },
      end: { x: width - MARGIN, y: 38 },
      thickness: navy ? 0.8 : 0.4,
      color: rule,
    });
    page.drawText(toWinAnsi(label), {
      x: MARGIN,
      y: 24,
      size: 8,
      font,
      color: ink,
    });
    const pageLabel = `${index + 1} / ${total}`;
    const pageWidth = font.widthOfTextAtSize(pageLabel, 8);
    page.drawText(pageLabel, {
      x: width - MARGIN - pageWidth,
      y: 24,
      size: 8,
      font,
      color: ink,
    });
  });
}

function newPage(ctx) {
  ctx.page = ctx.pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  ctx.pageIndex = (ctx.pageIndex || 0) + 1;
  ctx.y = PAGE_HEIGHT - MARGIN;
  if (ctx.profile === 'brochure' && ctx.pageIndex > 1) {
    drawBrochureHeader(ctx);
  }
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
  if (type === 'cover') {
    drawCover(ctx, block);
    return;
  }
  if (type === 'table') {
    drawTable(ctx, block);
    return;
  }
  if (type === 'facts') {
    drawFacts(ctx, block.items ?? []);
    return;
  }
  if (type === 'bullet') {
    return text(ctx, `•  ${block.text || ''}`, ctx.regular, 10, block.filled === false ? MUTED : INK, 8);
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
    return text(ctx, prefix + (block.text || ''), ctx.regular, 10, block.filled === false ? MUTED : INK, 10);
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
  const perRow = list.length <= 2 ? list.length : 2;

  for (let start = 0; start < list.length; start += perRow) {
    const row = list.slice(start, start + perRow);
    const colW = (CONTENT_WIDTH - gap * Math.max(0, row.length - 1)) / row.length;
    const inner = Math.max(48, colW - 20);
    const prepared = row.map((card) => {
      const name = displayName(card.name);
      const printed = displayName(card.printed || card.name);
      const title = displayName(card.title);
      const date = displayName(card.date);
      const roleLines = wrapLines(ctx.bold, card.role || '', 10, inner);
      const nameLines = wrapLines(ctx.regular, printed ? `Name  ${printed}` : 'Name', 9, inner);
      const extraTitle =
        title && title !== printed && title !== name ? wrapLines(ctx.regular, title, 8, inner) : [];
      const dateLines = wrapLines(ctx.regular, date ? `Date  ${date}` : 'Date', 9, inner);
      const textH = nameLines.length * 11 + extraTitle.length * 10 + dateLines.length * 11;
      return { card, name, roleLines, nameLines, extraTitle, dateLines, textH };
    });
    const textH = Math.max(...prepared.map((item) => item.textH), 22);
    const roleH = Math.max(...prepared.map((item) => item.roleLines.length * 12), 12);
    const h = 16 + roleH + 36 + textH;
    ensure(ctx, h + 12);
    const top = ctx.y;
    prepared.forEach((item, index) => {
      const x = MARGIN + index * (colW + gap);
      ctx.page.drawRectangle({
        x,
        y: top - h,
        width: colW,
        height: h,
        color: WASH,
      });
      item.roleLines.forEach((line, lineIndex) => {
        ctx.page.drawText(toWinAnsi(line), {
          x: x + 10,
          y: top - 14 - lineIndex * 12,
          size: 10,
          font: ctx.bold,
          color: INK,
        });
      });
      const ruleY = top - 16 - roleH - 22;
      if (item.name && ctx.script) {
        const fitted = fitScript(ctx.script, item.name, inner);
        if (fitted.text) {
          ctx.page.drawText(fitted.text, {
            x: x + 10,
            y: ruleY + 4,
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
      let y = ruleY - 14;
      item.nameLines.forEach((line) => {
        ctx.page.drawText(toWinAnsi(line), {
          x: x + 10,
          y,
          size: 9,
          font: ctx.regular,
          color: INK,
        });
        y -= 11;
      });
      item.extraTitle.forEach((line) => {
        ctx.page.drawText(toWinAnsi(line), {
          x: x + 10,
          y,
          size: 8,
          font: ctx.regular,
          color: MUTED,
        });
        y -= 10;
      });
      item.dateLines.forEach((line) => {
        ctx.page.drawText(toWinAnsi(line), {
          x: x + 10,
          y,
          size: 9,
          font: ctx.regular,
          color: INK,
        });
        y -= 11;
      });
    });
    ctx.y = top - h - 12;
  }
}

function drawBrochureHeader(ctx) {
  ctx.page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 46,
    width: PAGE_WIDTH,
    height: 46,
    color: NAVY,
  });
  ctx.page.drawRectangle({
    x: MARGIN,
    y: PAGE_HEIGHT - 36,
    width: 22,
    height: 22,
    borderColor: GOLD,
    borderWidth: 0.9,
  });
  ctx.page.drawText('HG', {
    x: MARGIN + 3.5,
    y: PAGE_HEIGHT - 30,
    size: 9,
    font: ctx.bold,
    color: CREAM,
  });
  ctx.page.drawText('Helfenstein Group', {
    x: MARGIN + 30,
    y: PAGE_HEIGHT - 22,
    size: 10,
    font: ctx.bold,
    color: rgb(1, 1, 1),
  });
  ctx.page.drawText('Private Client Brochure', {
    x: MARGIN + 30,
    y: PAGE_HEIGHT - 34,
    size: 8,
    font: ctx.regular,
    color: CREAM,
  });
  ctx.page.drawLine({
    start: { x: 0, y: PAGE_HEIGHT - 46 },
    end: { x: PAGE_WIDTH, y: PAGE_HEIGHT - 46 },
    thickness: 1.2,
    color: GOLD,
  });
  ctx.y = PAGE_HEIGHT - 64;
}

function drawCover(ctx, block) {
  const page = ctx.page;
  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: NAVY,
  });
  page.drawRectangle({
    x: MARGIN,
    y: PAGE_HEIGHT - 86,
    width: 36,
    height: 36,
    borderColor: GOLD,
    borderWidth: 1.1,
  });
  page.drawText('HG', {
    x: MARGIN + 6,
    y: PAGE_HEIGHT - 75,
    size: 14,
    font: ctx.bold,
    color: CREAM,
  });
  page.drawText(toWinAnsi(block.company || 'Helfenstein Group'), {
    x: MARGIN + 50,
    y: PAGE_HEIGHT - 64,
    size: 16,
    font: ctx.bold,
    color: rgb(1, 1, 1),
  });
  page.drawText(toWinAnsi(block.location || 'Lucerne, Switzerland'), {
    x: MARGIN + 50,
    y: PAGE_HEIGHT - 80,
    size: 10,
    font: ctx.regular,
    color: CREAM,
  });
  page.drawLine({
    start: { x: MARGIN, y: PAGE_HEIGHT - 118 },
    end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - 118 },
    thickness: 1.2,
    color: GOLD,
  });
  page.drawText(toWinAnsi(block.title || 'Private Client Brochure'), {
    x: MARGIN,
    y: PAGE_HEIGHT - 168,
    size: 28,
    font: ctx.bold,
    color: rgb(1, 1, 1),
  });
  const tagLines = wrapLines(ctx.regular, block.tagline || '', 11, CONTENT_WIDTH);
  tagLines.forEach((line, index) => {
    page.drawText(toWinAnsi(line), {
      x: MARGIN,
      y: PAGE_HEIGHT - 196 - index * 16,
      size: 11,
      font: ctx.regular,
      color: CREAM,
    });
  });

  let y = PAGE_HEIGHT - 280;
  for (const field of block.fields ?? []) {
    page.drawText(toWinAnsi(String(field.label || '').toUpperCase()), {
      x: MARGIN,
      y,
      size: 8,
      font: ctx.bold,
      color: GOLD,
    });
    const color = field.filled === false ? rgb(0.7, 0.66, 0.58) : rgb(1, 1, 1);
    const lines = wrapLines(ctx.regular, field.text || '', 13, CONTENT_WIDTH);
    lines.forEach((line, index) => {
      page.drawText(toWinAnsi(line), {
        x: MARGIN,
        y: y - 18 - index * 16,
        size: 13,
        font: ctx.regular,
        color,
      });
    });
    y -= 18 + lines.length * 16 + 18;
  }

  if (block.legalName) {
    page.drawText(toWinAnsi(block.legalName), {
      x: MARGIN,
      y: 56,
      size: 8,
      font: ctx.regular,
      color: CREAM,
    });
  }
  newPage(ctx);
}

function cellSlot(value) {
  if (value && typeof value === 'object' && 'text' in value) {
    return { text: String(value.text ?? ''), filled: value.filled !== false };
  }
  return { text: String(value ?? ''), filled: true };
}

function drawTable(ctx, block) {
  const columns = block.columns ?? [];
  if (!columns.length) return;
  const widths = columns.map((col) => CONTENT_WIDTH * (col.width || 1 / columns.length));

  const drawHeader = () => {
    const h = 22;
    ensure(ctx, h + 8);
    ctx.page.drawRectangle({
      x: MARGIN,
      y: ctx.y - h,
      width: CONTENT_WIDTH,
      height: h,
      color: NAVY,
    });
    let x = MARGIN + 6;
    columns.forEach((col, index) => {
      ctx.page.drawText(toWinAnsi(col.label || ''), {
        x,
        y: ctx.y - 15,
        size: 8,
        font: ctx.bold,
        color: rgb(1, 1, 1),
      });
      x += widths[index];
    });
    ctx.y -= h;
  };

  drawHeader();
  for (const row of block.rows ?? []) {
    const cells = columns.map((col, index) => {
      const slotValue = cellSlot(row[col.key]);
      return {
        ...slotValue,
        lines: wrapLines(ctx.regular, slotValue.text, 8, widths[index] - 12),
      };
    });
    const h = Math.max(20, ...cells.map((cell) => cell.lines.length * 11 + 10));
    if (ctx.y - h <= MARGIN + ctx.footerReserve) {
      newPage(ctx);
      drawHeader();
    }
    ctx.page.drawRectangle({
      x: MARGIN,
      y: ctx.y - h,
      width: CONTENT_WIDTH,
      height: h,
      borderColor: RULE,
      borderWidth: 0.4,
    });
    let x = MARGIN;
    cells.forEach((cell, index) => {
      const w = widths[index];
      if (cell.filled === false) {
        ctx.page.drawRectangle({
          x,
          y: ctx.y - h,
          width: w,
          height: h,
          color: SLOT_WASH,
        });
      }
      cell.lines.forEach((line, lineIndex) => {
        ctx.page.drawText(toWinAnsi(line), {
          x: x + 6,
          y: ctx.y - 13 - lineIndex * 11,
          size: 8,
          font: ctx.regular,
          color: cell.filled === false ? MUTED : INK,
        });
      });
      x += w;
    });
    ctx.y -= h;
  }
  ctx.y -= 10;
}

function drawFacts(ctx, items) {
  const labelW = 128;
  const valueW = CONTENT_WIDTH - labelW - 12;
  for (const item of items) {
    const lines = wrapLines(ctx.regular, item.text || '', 10, valueW);
    const h = Math.max(22, lines.length * 13 + 10);
    ensure(ctx, h + 4);
    if (item.filled === false) {
      ctx.page.drawRectangle({
        x: MARGIN,
        y: ctx.y - h,
        width: CONTENT_WIDTH,
        height: h,
        color: SLOT_WASH,
      });
    }
    ctx.page.drawText(toWinAnsi(item.label || ''), {
      x: MARGIN + 6,
      y: ctx.y - 14,
      size: 8,
      font: ctx.bold,
      color: NAVY,
    });
    lines.forEach((line, index) => {
      ctx.page.drawText(toWinAnsi(line), {
        x: MARGIN + labelW,
        y: ctx.y - 14 - index * 13,
        size: 10,
        font: ctx.regular,
        color: item.filled === false ? MUTED : INK,
      });
    });
    ctx.y -= h;
    ctx.page.drawLine({
      start: { x: MARGIN, y: ctx.y },
      end: { x: PAGE_WIDTH - MARGIN, y: ctx.y },
      thickness: 0.3,
      color: RULE,
    });
  }
  ctx.y -= 8;
}
