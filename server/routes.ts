import { Router, type Request, type Response } from 'express';
import { allArticles } from '../src/data/content.ts';
import { caseStudies } from '../src/data/caseStudies.ts';
import { clientDocuments } from '../src/data/documents.ts';
import { legalPages } from '../src/data/legal.ts';
import { employeeBySlug, listEmployees, sendEmployeePhoto } from './employees.js';
import { topics } from '../src/data/topics.ts';
import {
  clearSessionCookie,
  createSessionToken,
  getSessionFromRequest,
  pinsMatch,
  requireAdmin,
  setSessionCookie,
} from './auth.ts';
import { serverConfig } from './config.ts';
import { getPublicCompany } from './gleif.ts';
import { HttpError } from './http.js';
import { loadClientsPage, patchClientIsTest } from './admin-clients.js';
import { saveClientDocument } from './clients-documents.js';
import {
  createAdminDocumentPdf,
  parseAdminDocumentPdfQuery,
  sendGeneratedPdf,
} from './document-pdf.ts';
import { getMarketQuotes } from './markets.ts';
import { rateLimitClients, rateLimitLogin } from './rateLimit.ts';
import { parseClientInput } from '../src/js/clients-model.js';
import { asRows, requireInsertedRow, rest } from './supabase.js';
import { SERVER_VERSION } from '../src/version.ts';

export function createApiRouter(): Router {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'helfenstein-api',
      time: new Date().toISOString(),
      serverVersion: SERVER_VERSION,
    });
  });

  router.get('/markets', async (_req, res) => {
    try {
      const quotes = await getMarketQuotes();
      res.json({ ok: true, quotes });
    } catch {
      res.status(502).json({ ok: false, error: 'Market data is unavailable.' });
    }
  });

  router.get('/company', async (_req, res) => {
    try {
      const record = await getPublicCompany();
      res.json({ ok: true, company: record });
    } catch {
      res.status(502).json({ ok: false, error: 'Company register data is unavailable.' });
    }
  });

  router.get('/employees/:slug/photo', async (req, res) => {
    try {
      await sendEmployeePhoto(req, res);
    } catch (err) {
      sendRouteError(res, err);
    }
  });

  router.get('/employees', async (_req, res) => {
    try {
      const employees = await listEmployees();
      res.json({ ok: true, employees });
    } catch (err) {
      sendRouteError(res, err);
    }
  });

  router.get('/auth/session', (req, res) => {
    const session = getSessionFromRequest(req);
    if (!session) {
      res.status(401).json({ ok: false, authenticated: false });
      return;
    }
    res.json({
      ok: true,
      authenticated: true,
      expiresAt: new Date(session.exp).toISOString(),
    });
  });

  router.post('/auth/login', rateLimitLogin(), (req, res) => {
    const pin = typeof req.body?.pin === 'string' ? req.body.pin.trim() : '';
    if (!pin) {
      res.status(400).json({ ok: false, error: 'PIN is required.' });
      return;
    }
    if (!pinsMatch(pin, serverConfig.adminPin)) {
      res.status(401).json({ ok: false, error: 'Invalid PIN.' });
      return;
    }

    const { token, exp } = createSessionToken();
    setSessionCookie(res, token);
    res.json({
      ok: true,
      authenticated: true,
      expiresAt: new Date(exp).toISOString(),
    });
  });

  router.post('/auth/logout', (_req, res) => {
    clearSessionCookie(res);
    res.json({ ok: true, authenticated: false });
  });

  router.post('/clients', rateLimitClients(), async (req, res) => {
    try {
      const parsed = parseClientInput(req.body);
      if (!parsed.ok) {
        res.status(400).json({ error: parsed.error });
        return;
      }

      if (parsed.value.instructed_person_slug) {
        const adviser = await employeeBySlug(parsed.value.instructed_person_slug);
        if (!adviser) {
          res.status(400).json({ error: 'Please provide a valid adviser.' });
          return;
        }
      }

      const result = await rest('clients', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: parsed.value,
      });
      requireInsertedRow(asRows(result.payload));
      res.status(201).json({ ok: true });
    } catch (err) {
      sendRouteError(res, err);
    }
  });

  router.get('/admin/clients', requireAdmin, async (req, res) => {
    try {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(req.query)) {
        if (typeof value === 'string') params.set(key, value);
      }
      const payload = await loadClientsPage(params);
      res.json({ ok: true, ...payload });
    } catch (err) {
      sendRouteError(res, err);
    }
  });

  router.patch('/admin/clients', requireAdmin, async (req, res) => {
    try {
      const payload = await patchClientIsTest(req.body);
      res.json({ ok: true, ...payload });
    } catch (err) {
      sendRouteError(res, err);
    }
  });

  router.put('/admin/clients-documents', requireAdmin, async (req, res) => {
    try {
      const row = await saveClientDocument(req.body);
      res.json({ ok: true, ...row });
    } catch (err) {
      sendRouteError(res, err);
    }
  });

  router.get('/admin/clients-documents/preview', requireAdmin, async (req, res) => {
    await sendAdminDocumentPdf(req, res, 'inline');
  });

  router.get('/admin/clients-documents/download', requireAdmin, async (req, res) => {
    await sendAdminDocumentPdf(req, res, 'attachment');
  });

  router.get('/admin/overview', requireAdmin, async (_req, res) => {
    const articles = allArticles.filter((a) => a.kind !== 'video');
    let teamCount = 0;
    try {
      teamCount = (await listEmployees()).length;
    } catch {
      teamCount = 0;
    }
    res.json({
      ok: true,
      overview: {
        articles: articles.length,
        topics: topics.length,
        teamMembers: teamCount,
        legalPages: legalPages.length,
        caseStudies: caseStudies.length,
        documents: clientDocuments.length,
        videos: allArticles.filter((a) => a.kind === 'video').length,
      },
      generatedAt: new Date().toISOString(),
    });
  });

  router.get('/admin/articles', requireAdmin, (_req, res) => {
    res.json({
      ok: true,
      articles: allArticles.map((article) => ({
        slug: article.slug,
        title: article.title,
        tagline: article.tagline,
        publishedDate: article.publishedDate ?? null,
        author: article.author ?? null,
        kind: article.kind ?? 'article',
        readingTimeMinutes: article.readingTimeMinutes ?? null,
      })),
    });
  });

  router.get('/admin/topics', requireAdmin, (_req, res) => {
    res.json({
      ok: true,
      topics: topics.map((topic) => ({
        path: topic.path,
        title: topic.title,
        subtitle: topic.subtitle,
        highlightCount: topic.highlights.length,
        relatedCount: topic.relatedSlugs?.length ?? 0,
      })),
    });
  });

  router.get('/admin/team', requireAdmin, async (_req, res) => {
    try {
      const employees = await listEmployees();
      res.json({
        ok: true,
        team: employees.map((member) => ({
          slug: member.slug,
          name: member.name,
          role: member.role,
          section: member.section,
          credentials: member.credentials ?? [],
          languages: member.languages ?? [],
          expertise: member.expertise ?? [],
        })),
      });
    } catch (err) {
      sendRouteError(res, err);
    }
  });

  router.get('/admin/documents', requireAdmin, (_req, res) => {
    res.json({
      ok: true,
      documents: clientDocuments,
    });
  });

  return router;
}

async function sendAdminDocumentPdf(
  req: Request,
  res: Response,
  disposition: 'inline' | 'attachment',
) {
  try {
    const parsed = parseAdminDocumentPdfQuery(req.query);
    if (!parsed.ok) {
      res.status(400).json({ ok: false, error: parsed.error });
      return;
    }
    const file = await createAdminDocumentPdf(parsed.value);
    sendGeneratedPdf(res, file, disposition);
  } catch (err) {
    sendRouteError(res, err);
  }
}

function sendRouteError(res: Response, err: unknown) {
  if (err instanceof HttpError) {
    res.status(err.status).json(err.body);
    return;
  }
  console.error(err instanceof Error ? err.message : err);
  res.status(500).json({ error: 'Internal server error.' });
}
