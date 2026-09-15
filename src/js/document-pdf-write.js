import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';

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

export async function writePdf(blocks, { profile = 'letterhead', watermark } = {}) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ctx = {
    pdf,
    regular,
    bold,
    profile,
    watermark: watermark || (profile === 'court-draft' ? 'DRAFT' : ''),
    page: null,
    y: 0,
    footerReserve: 48,
  };
  newPage(ctx);
  for (const block of blocks ?? []) {
    drawBlock(ctx, block);
  }
  return pdf.save({ useObjectStreams: false });
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
  if (type === 'kicker') return text(ctx, block.text, ctx.regular, 9, MUTED, 8);
  if (type === 'title') return text(ctx, block.text, ctx.bold, 16, INK, 10);
  if (type === 'subject') return text(ctx, block.text, ctx.bold, 12, INK, 10);
  if (type === 'h') return text(ctx, block.text, ctx.bold, 11, INK, 8);
  if (type === 'p') {
    const prefix = block.n != null ? `${block.n}. ` : '';
    return text(ctx, prefix + (block.text || ''), ctx.regular, 10, INK, 8);
  }
  if (type === 'footnote') return text(ctx, block.text, ctx.regular, 8, MUTED, 6);
  if (type === 'notice' || type === 'callout') {
    const lines = wrapLines(ctx.regular, block.text, 10, CONTENT_WIDTH - 16);
    const h = lines.length * 13 + 16;
    ensure(ctx, h);
    ctx.page.drawRectangle({
      x: MARGIN,
      y: ctx.y - h,
      width: CONTENT_WIDTH,
      height: h,
      color: WASH,
    });
    lines.forEach((line, index) => {
      ctx.page.drawText(toWinAnsi(line), {
        x: MARGIN + 8,
        y: ctx.y - 14 - index * 13,
        size: 10,
        font: type === 'notice' ? ctx.bold : ctx.regular,
        color: INK,
      });
    });
    ctx.y -= h + 8;
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
  const lines = wrapLines(font, value, size, CONTENT_WIDTH);
  const h = lines.length * (size + 3) + gap;
  ensure(ctx, h);
  lines.forEach((line, index) => {
    ctx.page.drawText(toWinAnsi(line), {
      x: MARGIN,
      y: ctx.y - size - index * (size + 3),
      size,
      font,
      color,
    });
  });
  ctx.y -= h;
}
