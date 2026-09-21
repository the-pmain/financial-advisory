import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { homePathForRole } from "./app/nav.ts";
import { AuthProvider, useAuth } from "./auth/AuthContext.tsx";
import { isAdmin, isEmployee } from "@domain/identity/model.ts";
import { PageShell } from "./components/layout/PageShell.tsx";
import { AuthSplash } from "./components/ui/AppLoader.tsx";
import { useAdminShortcut } from "./hooks/useAdminShortcut.ts";
import { I18nProvider } from "./i18n/context.tsx";
import { AdminClientPage } from "./pages/AdminClient.tsx";
import { AdminClientsPage } from "./pages/AdminClients.tsx";
import { AdminEmployeePage } from "./pages/AdminEmployee.tsx";
import { AdminEmployeesPage } from "./pages/AdminEmployees.tsx";
import { AdminGatePage } from "./pages/AdminGate.tsx";
import { ApplicationsPage } from "./pages/Applications.tsx";
import { ClientsPage } from "./pages/Clients.tsx";
import { DocumentFormPage } from "./pages/DocumentForm.tsx";
import { DocumentsPage } from "./pages/Documents.tsx";
import { EmployeeLoginPage } from "./pages/EmployeeLogin.tsx";
import { HoldingsPage } from "./pages/Holdings.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { MessagesPage } from "./pages/Messages.tsx";
import { OverviewPage } from "./pages/Overview.tsx";
import { SignupPage } from "./pages/Signup.tsx";

const STAFF_GATE = "portal.staff-gate";

function readStaffGate(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(STAFF_GATE) === "1";
}

function GuestAuth() {
  const [staff, setStaff] = useState(readStaffGate);
  useAdminShortcut();

  function showStaff() {
    window.sessionStorage.setItem(STAFF_GATE, "1");
    setStaff(true);
  }

  function showClient() {
    window.sessionStorage.removeItem(STAFF_GATE);
    setStaff(false);
  }

  return staff ? (
    <EmployeeLoginPage onClientPortal={showClient} />
  ) : (
    <LoginPage onStaffPortal={showStaff} />
  );
}

function EmployeeOrGuestLayout() {
  const { user } = useAuth();
  if (isEmployee(user)) {
    return (
      <PageShell>
        <Outlet />
      </PageShell>
    );
  }
  return <Outlet />;
}

function IndexPage() {
  const { user } = useAuth();
  if (isEmployee(user)) return <ApplicationsPage />;
  if (user) return <Navigate to={homePathForRole(user.role)} replace />;
  return <GuestAuth />;
}

function EmployeeClientsPage() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (!isEmployee(user)) return <Navigate to={homePathForRole(user.role)} replace />;
  return <ClientsPage />;
}

function ClientLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (isEmployee(user) || isAdmin(user)) return <Navigate to={homePathForRole(user.role)} replace />;
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}

function AdminIndex() {
  const { user, ready } = useAuth();
  if (!ready) return null;
  if (isAdmin(user)) return <Navigate to={homePathForRole(user.role)} replace />;
  return <AdminGatePage />;
}

function AdminLayout() {
  const { user, ready } = useAuth();
  if (!ready) return null;
  if (!isAdmin(user)) return <Navigate to="/admin" replace />;
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}

function LegacyEmployeePath() {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(STAFF_GATE, "1");
  }
  return <Navigate to="/" replace />;
}

function AppRoutes() {
  const { entering } = useAuth();

  return (
    <>
      <div inert={entering}>
        <Routes>
          <Route element={<EmployeeOrGuestLayout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/clients" element={<EmployeeClientsPage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminIndex />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/employees" element={<AdminEmployeesPage />} />
            <Route path="/admin/employees/:slug" element={<AdminEmployeePage />} />
            <Route path="/admin/clients" element={<AdminClientsPage />} />
            <Route path="/admin/clients/:id" element={<AdminClientPage />} />
          </Route>
          <Route path="/employees/*" element={<LegacyEmployeePath />} />
          <Route path="/employees" element={<LegacyEmployeePath />} />
          <Route element={<ClientLayout />}>
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
