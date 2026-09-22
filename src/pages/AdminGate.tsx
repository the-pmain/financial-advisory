import { SUPER_ADMIN_ID } from "@domain/identity/model.ts";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { KeyRound } from "lucide-react";
import { useAuth } from "../auth/AuthContext.tsx";
import { Icon } from "../components/ui/icon.tsx";
import { Logo } from "../components/ui/Logo.tsx";
import { PasswordField } from "../components/ui/PasswordField.tsx";
import { ButtonNavy, UnderlineButton } from "../components/ui/primitives.tsx";
import { useI18n } from "../i18n/context.tsx";

export function AdminGatePage() {
  const { t } = useI18n();
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await adminLogin(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.admin.gate.error);
      setPassword("");
    } finally {
      setPending(false);
    }
  }

  return (
    <main id="main" className="admin-gate">
      <section className="admin-gate__card" aria-labelledby="admin-gate-title">
        <Logo />
        <h1 id="admin-gate-title" className="admin-gate__title">
          <span className="admin-gate__mark" aria-hidden="true">
            <Icon icon={KeyRound} size={16} strokeWidth={2} />
          </span>
          {t.admin.gate.title}
        </h1>
        <p className="admin-gate__lead">{t.admin.gate.lead}</p>
        <form
          id="admin-sign-in"
          name="admin-sign-in"
          className="admin-gate__form"
          method="post"
          action="/admin"
          autoComplete="on"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="username"
            value={SUPER_ADMIN_ID}
            readOnly
            tabIndex={-1}
            spellCheck={false}
            autoComplete="section-admin username"
            aria-hidden="true"
            className="visually-hidden"
          />
          <PasswordField
            label={t.admin.gate.password}
            name="password"
            value={password}
            required
            disabled={pending}
            autoComplete="section-admin current-password"
            invalid={Boolean(error)}
            className="!mb-0"
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? <p className="appointment-form__error !mt-0">{error}</p> : null}
          <ButtonNavy className="mt-1" loading={pending}>
            {pending ? t.admin.gate.checking : t.admin.gate.submit}
          </ButtonNavy>
        </form>
        <p className="admin-gate__foot">
          <UnderlineButton bold onClick={() => navigate("/", { replace: true })}>
            {t.admin.gate.back}
          </UnderlineButton>
        </p>
      </section>
    </main>
  );
}
