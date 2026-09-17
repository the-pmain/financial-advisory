import { useAuth } from "../../auth/AuthContext.tsx";
import { useI18n } from "../../i18n/context.tsx";
import { Logo } from "../ui/Logo.tsx";

export function Header() {
  const { user, logout } = useAuth();
  const { t } = useI18n();

  return (
    <header
      id="header"
      className="sticky top-0 z-[110] bg-white shadow-[0_0.5px_0_#999999] max-lap:-mx-[25px] max-lap:px-[25px] max-mob:-mx-[12.5px] max-mob:px-[12.5px]"
    >
      <div className="flex min-h-[71px] items-center gap-6 max-desk:min-h-[60px]">
        <Logo to={user ? "/app" : "/"} />
        {user ? (
          <button
            type="button"
            onClick={() => void logout()}
            className="vz-underline-hover text-vz-blue hover:text-vz-orange cursor-pointer border-0 bg-transparent text-[15px] leading-[17px] tracking-vz-02"
          >
            {t.app.logout}
          </button>
        ) : null}
      </div>
    </header>
  );
}
