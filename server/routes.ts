import { Router } from 'express';
import { allArticles } from '../src/data/content.ts';
import { caseStudies } from '../src/data/caseStudies.ts';
import { clientDocuments } from '../src/data/documents.ts';
import { legalPages } from '../src/data/legal.ts';
import { teamMembers } from '../src/data/team.ts';
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
import { rateLimitLogin } from './rateLimit.ts';

export function createApiRouter(): Router {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'helfenstein-api', time: new Date().toISOString() });
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

  router.get('/admin/overview', requireAdmin, (_req, res) => {
    const articles = allArticles.filter((a) => a.kind !== 'video');
    res.json({
      ok: true,
      overview: {
        articles: articles.length,
        topics: topics.length,
        teamMembers: teamMembers.length,
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

  router.get('/admin/team', requireAdmin, (_req, res) => {
    res.json({
      ok: true,
      team: teamMembers.map((member) => ({
        slug: member.slug,
        name: member.name,
        role: member.role,
        section: member.section,
        credentials: member.credentials ?? [],
        languages: member.languages ?? [],
        expertise: member.expertise ?? [],
      })),
    });
  });

  router.get('/admin/documents', requireAdmin, (_req, res) => {
    res.json({
      ok: true,
      documents: clientDocuments,
    });
  });

  return router;
}
