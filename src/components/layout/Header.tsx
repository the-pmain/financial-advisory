import { useLocation } from "react-router";
import { navKeyFromPath } from "../../app/nav.ts";
import { useAuth } from "../../auth/AuthContext.tsx";
import { isDocSlug } from "../../documents/catalog.ts";
import { useI18n } from "../../i18n/context.tsx";
import { MenuIcon } from "../ui/Icons.tsx";
import { UserMenu } from "./UserMenu.tsx";

export function Header({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const { user } = useAuth();
  const { t } = useI18n();
  const { pathname } = useLocation();
  const slug = pathname.startsWith("/documents/") ? pathname.slice("/documents/".length) : "";
  const title = isDocSlug(slug) ? t.docs.kinds[slug].title : t.app.nav[navKeyFromPath(pathname, user?.role)];

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
        {user ? <UserMenu /> : null}
      </div>
    </header>
  );
}
