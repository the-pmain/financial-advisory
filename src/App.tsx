import { Navigate, Outlet, Route, Routes } from "react-router";
import { AuthProvider, useAuth } from "./auth/AuthContext.tsx";
import { PageShell } from "./components/layout/PageShell.tsx";
import { AuthSplash } from "./components/ui/AppLoader.tsx";
import { I18nProvider } from "./i18n/context.tsx";
import { DocumentFormPage } from "./pages/DocumentForm.tsx";
import { DocumentsPage } from "./pages/Documents.tsx";
import { HoldingsPage } from "./pages/Holdings.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { MessagesPage } from "./pages/Messages.tsx";
import { OverviewPage } from "./pages/Overview.tsx";
import { SignupPage } from "./pages/Signup.tsx";

function IndexPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/overview" replace />;
  return <LoginPage />;
}

function AuthedLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}

function AppRoutes() {
  const { entering } = useAuth();

  return (
    <>
      <div inert={entering}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<AuthedLayout />}>
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/holdings" element={<HoldingsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/documents/:slug" element={<DocumentFormPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <AuthSplash active={entering} />
    </>
  );
}

export function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </I18nProvider>
  );
}
