import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useAuth } from "../../auth/AuthContext.tsx";
import { isEmployee } from "../../auth/role.ts";
import { useI18n } from "../../i18n/context.tsx";
import { StaffAvatar } from "../employees/StaffAvatar.tsx";
import { Icon } from "../ui/icon.tsx";

export function UserMenu() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const staff = isEmployee(user);
  const photoUrl = staff
    ? user.photoUrl || (user.slug ? `/api/staff/photos/${encodeURIComponent(user.slug)}.png` : "")
    : "";

  async function onLogout() {
    setPending(true);
    try {
      await logout();
    } finally {
      setPending(false);
      setOpen(false);
    }
  }

  return (
    <div className="app-header__meta" ref={rootRef}>
      <button
        type="button"
        className="app-header__account"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${user.name}, ${t.app.accountMenu}`}
        onClick={() => setOpen((next) => !next)}
      >
        <StaffAvatar name={user.name} photoUrl={photoUrl} size="header" placeholder={!staff} />
        <span className="app-header__user">{user.name}</span>
        <Icon icon={ChevronDown} className={`app-header__chevron${open ? " is-open" : ""}`} />
      </button>
      {open ? (
        <div className="app-header__menu" role="menu" id={menuId}>
          <button
            type="button"
            role="menuitem"
            className="app-header__menu-item"
            disabled={pending}
            aria-busy={pending}
            onClick={() => void onLogout()}
          >
            {pending ? <span className="vz-loader" aria-hidden="true" /> : <Icon icon={LogOut} />}
            {t.app.logout}
          </button>
        </div>
      ) : null}
    </div>
  );
}
