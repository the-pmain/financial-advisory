import type { Request, Response } from 'express';
import { company } from '../src/data/company.ts';
import { listEmployees } from './employees.js';
import { loadClientDocumentPdf } from './clients-document-pdf.js';
import { parseDocumentPdfQuery } from '../src/js/document-pdf.js';
import { buildDocumentRegister } from '../src/js/document-register.js';

export function parseAdminDocumentPdfQuery(query: Request['query']) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string') params.set(key, value);
  }
  return parseDocumentPdfQuery(params);
}

export async function createAdminDocumentPdf(input: { client_id: string; kind: string }) {
  const teamMembers = await listEmployees();
  return loadClientDocumentPdf({
    client_id: input.client_id,
    kind: input.kind,
    register: buildDocumentRegister({ company, teamMembers }),
  });
}

export function sendGeneratedPdf(
  res: Response,
  file: {
    bytes: Uint8Array;
    filename: string;
  },
  disposition: 'inline' | 'attachment',
) {
  const filename = file.filename.replace(/["\r\n]/g, '');
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `${disposition}; filename="${filename}"`,
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  });
  res.send(Buffer.from(file.bytes));
}
