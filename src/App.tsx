import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router';
import { PageShell } from './components/layout/PageShell';
import { DocumentMeta } from './components/seo/DocumentMeta';
import { StickyCta } from './components/widgets/StickyCta';
import { ROUTE_PATTERNS } from './constants/routes';
import { AdminPage } from './pages/AdminPage';
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
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function MarketingLayout() {
  return (
    <>
      <PageShell>
        <Outlet />
      </PageShell>
      <StickyCta />
    </>
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
          <Route path={ROUTE_PATTERNS.companiesSub} element={<TopicPage />} />
          <Route path={ROUTE_PATTERNS.aboutSub} element={<TopicPage />} />
          <Route path={ROUTE_PATTERNS.topic} element={<TopicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
