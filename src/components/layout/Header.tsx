import { LogOut } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { navKeyFromPath } from "../../app/nav.ts";
import { useAuth } from "../../auth/AuthContext.tsx";
import { isEmployee } from "../../auth/role.ts";
import { isDocSlug } from "../../documents/catalog.ts";
import { useI18n } from "../../i18n/context.tsx";
import { Icon } from "../ui/icon.tsx";
import { MenuIcon } from "../ui/Icons.tsx";
import { StaffAvatar } from "../employees/StaffAvatar.tsx";

export function Header({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [pending, setPending] = useState(false);
  const slug = pathname.startsWith("/documents/") ? pathname.slice("/documents/".length) : "";
  const title = isDocSlug(slug) ? t.docs.kinds[slug].title : t.app.nav[navKeyFromPath(pathname, user?.role)];

  async function onLogout() {
    setPending(true);
    try {
      await logout();
    } finally {
      setPending(false);
    }
  }

  return (
    <header id="header" className="app-header">
      <div className="app-header__bar">
        <button
          type="button"
          className="app-icon-btn"
          onClick={onToggleSidebar}
          aria-controls="app-sidebar"
          aria-expanded={sidebarOpen}
        >
          <MenuIcon className="h-4 w-4" />
          <span className="visually-hidden">
            {sidebarOpen ? t.app.sidebar.close : t.app.sidebar.open}
          </span>
        </button>
        <p className="app-header__title">{title}</p>
        {user ? (
          <div className="app-header__meta">
            <span className="app-header__identity">
              {isEmployee(user) ? (
                <StaffAvatar
                  name={user.name}
                  photoUrl={user.photoUrl || (user.slug ? `/api/staff/photos/${encodeURIComponent(user.slug)}.png` : "")}
                  size="header"
                />
              ) : null}
              <span className="app-header__user">{user.name}</span>
            </span>
            <button
              type="button"
              disabled={pending}
              aria-busy={pending}
              onClick={() => void onLogout()}
              className="app-header__logout"
            >
              {pending ? <span className="vz-loader" aria-hidden="true" /> : <Icon icon={LogOut} />}
              <span className="app-header__logout-label">{t.app.logout}</span>
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
