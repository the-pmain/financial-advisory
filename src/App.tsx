import { Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { PageShell } from "./components/layout/PageShell.tsx";
import { I18nProvider } from "./i18n/context.tsx";
import { AppHomePage } from "./pages/AppHome.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { SignupPage } from "./pages/Signup.tsx";

export function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/app"
            element={
              <PageShell>
                <AppHomePage />
              </PageShell>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </I18nProvider>
  );
}
