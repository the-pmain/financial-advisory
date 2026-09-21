import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/client.ts";
import { homePathForRole } from "../app/nav.ts";
import { useAuth } from "../auth/AuthContext.tsx";
import { StaffPicker } from "../components/employees/StaffPicker.tsx";
import { Logo } from "../components/ui/Logo.tsx";
import { ButtonNavy, UnderlineButton } from "../components/ui/primitives.tsx";
import type { EmployeeProfile } from "@domain/staff/model.ts";
import { useI18n } from "../i18n/context.tsx";

export function EmployeeLoginPage({ onClientPortal }: { onClientPortal?: () => void }) {
  const { t } = useI18n();
  const { user, employeeLogin } = useAuth();
  const navigate = useNavigate();
  const [staff, setStaff] = useState<EmployeeProfile[] | null>(null);
  const [slug, setSlug] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) navigate(homePathForRole(user.role), { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    let cancelled = false;
    api<EmployeeProfile[]>("/api/auth/employee/directory")
      .then((rows) => {
        if (!cancelled) setStaff(rows);
      })
      .catch((err) => {
        if (cancelled) return;
        setStaff([]);
        setError(err instanceof Error ? err.message : t.employee.login.loadError);
      });
    return () => {
      cancelled = true;
    };
  }, [t.employee.login.loadError]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!slug) {
      setError(t.employee.login.choose);
      return;
    }
    setPending(true);
    try {
      await employeeLogin(slug, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.employee.login.error);
    } finally {
      setPending(false);
    }
  }

  const loadingStaff = staff === null;
  const noStaff = staff !== null && staff.length === 0 && !error;

  return (
    <main
      id="main"
      className="max-tab:bg-vz-page-mobile flex min-h-dvh items-center justify-center px-5 py-10 max-[480px]:px-4 max-[480px]:py-6"
    >
      <div className="w-full max-w-[420px] bg-white px-8 py-8 shadow-[0_0_2px_rgba(0,0,0,0.25)] max-[480px]:px-6 max-[480px]:py-7">
        <Logo />
        <h1 className="mt-7 mb-2 text-[22px] leading-[1.4]">{t.employee.login.title}</h1>
        <p className="text-vz-gray mb-7 text-[15px] leading-[1.4]">{t.employee.login.subtitle}</p>
        <div className="grid gap-5">
          <StaffPicker
            label={t.employee.login.staff}
            people={staff ?? []}
            value={slug}
            onChange={setSlug}
            disabled={pending || loadingStaff || !staff?.length}
            loading={loadingStaff}
            invalid={Boolean(error) && !slug}
            placeholder={t.employee.login.choose}
            searchPlaceholder={t.employee.login.search}
            emptyLabel={t.employee.login.noMatch}
            loadingLabel={t.employee.login.loading}
          />
          <form
            onSubmit={onSubmit}
            className="grid gap-5"
            autoComplete="off"
            data-form-type="other"
          >
            <label className="appointment-form__field !mb-0">
              <span className="appointment-form__label">{t.employee.login.password}</span>
              <input
                className={`appointment-form__control is-secret${error ? " is-invalid" : ""}`}
                type="text"
                name="staff-pin"
                value={password}
                required
                disabled={pending || loadingStaff || !staff?.length}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                inputMode="text"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                data-form-type="other"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error ? <p className="appointment-form__error !mt-0">{error}</p> : null}
            {noStaff ? <p className="appointment-form__error !mt-0">{t.employee.login.empty}</p> : null}
            <ButtonNavy className="mt-1" loading={pending} disabled={loadingStaff || !staff?.length}>
              {t.employee.login.submit}
            </ButtonNavy>
          </form>
        </div>
        <p className="text-vz-gray mt-6 mb-0 text-[15px] leading-[21px]">
          {t.employee.login.clientPrompt}{" "}
          {onClientPortal ? (
            <UnderlineButton bold onClick={onClientPortal}>
              {t.employee.login.clientLink}
            </UnderlineButton>
          ) : (
            <UnderlineButton bold onClick={() => navigate("/", { replace: true })}>
              {t.employee.login.clientLink}
            </UnderlineButton>
          )}
        </p>
      </div>
    </main>
  );
}
