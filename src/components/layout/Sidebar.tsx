import { Link, NavLink } from "react-router";
import { APP_NAV } from "../../app/nav.ts";
import { useI18n } from "../../i18n/context.tsx";
import { Icon } from "../ui/icon.tsx";
import { Logo, LogoMark } from "../ui/Logo.tsx";

export function Sidebar({
  open,
  docked,
  onClose,
}: {
  open: boolean;
  docked: boolean;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const collapsed = docked && !open;
  const available = open || docked;

  return (
    <aside
      id="app-sidebar"
      className="app-sidebar"
      aria-label={t.app.nav.label}
      aria-hidden={!available}
      inert={!available}
    >
      <div className="app-sidebar__head">
        <Link
          to="/"
          rel="home"
          className="app-sidebar__mark"
          title="Helfenstein Asset Management"
          aria-label="Helfenstein Asset Management — home"
        >
          <LogoMark className="app-sidebar__mark-img" />
        </Link>
        <Logo
          className="app-sidebar__logo mr-0"
          imgClassName="block h-9 w-auto max-w-full object-contain object-left"
        />
      </div>
      <nav id="app-nav" className="app-sidebar__nav" aria-label={t.app.nav.label}>
        {APP_NAV.map((item) => {
          const label = t.app.nav[item.key];
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={collapsed ? label : undefined}
              className={({ isActive }) => `app-nav-link${isActive ? " is-active" : ""}`}
              onClick={() => {
                if (!docked) onClose();
              }}
            >
              <Icon icon={item.icon} />
              <span className="app-nav-link__label">{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
