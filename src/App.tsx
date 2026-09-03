import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
import { PageShell } from './components/layout/PageShell';
import { DocumentMeta } from './components/seo/DocumentMeta';
import { LEGACY_REDIRECTS, ROUTES, ROUTE_PATTERNS } from './constants/routes';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { TopicPage } from './pages/TopicPage';
import { ArticlePage } from './pages/ArticlePage';
import { ExpertisePage } from './pages/ExpertisePage';
import { InsightsPage } from './pages/InsightsPage';
import { LegalPage } from './pages/LegalPage';
import { TeamPage } from './pages/TeamPage';
import { TeamMemberPage } from './pages/TeamMemberPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** Restores the scroll position on navigation, as a multi-page site would. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function MarketingLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}

export function App() {
  return (
    <>
      <DocumentMeta />
      <ScrollToTop />
      <Routes>
        <Route path={ROUTE_PATTERNS.admin} element={<AdminPage />} />
        <Route element={<MarketingLayout />}>
          <Route path={ROUTE_PATTERNS.home} element={<HomePage />} />
          <Route path={ROUTE_PATTERNS.expertise} element={<ExpertisePage />} />
          <Route path={ROUTE_PATTERNS.insights} element={<InsightsPage />} />
          <Route path={ROUTE_PATTERNS.knowledgeHubArticle} element={<ArticlePage />} />
          <Route path={ROUTE_PATTERNS.legalPage} element={<LegalPage />} />
          <Route path={ROUTE_PATTERNS.teamMember} element={<TeamMemberPage />} />
          <Route path={ROUTE_PATTERNS.team} element={<TeamPage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path={ROUTE_PATTERNS.aboutSub} element={<TopicPage />} />
          <Route path={ROUTE_PATTERNS.topic} element={<TopicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
