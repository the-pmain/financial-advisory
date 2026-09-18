import { FormEvent, useState } from "react";
import { useAuth } from "../auth/AuthContext.tsx";
import { Logo } from "../components/ui/Logo.tsx";
import { ButtonNavy, FormField, UnderlineLink } from "../components/ui/primitives.tsx";
import { useI18n } from "../i18n/context.tsx";

export function LoginPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.login.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <main
      id="main"
      className="max-tab:bg-vz-page-mobile flex min-h-dvh items-center justify-center px-5 py-10 max-[480px]:px-4 max-[480px]:py-6"
    >
      <div className="w-full max-w-[400px] bg-white px-8 py-8 shadow-[0_0_2px_rgba(0,0,0,0.25)] max-[480px]:px-6 max-[480px]:py-7">
        <Logo />
        <h1 className="mt-7 mb-2 text-[22px] leading-[1.4]">{t.login.title}</h1>
        <p className="text-vz-gray mb-7 text-[15px] leading-[1.4]">{t.login.subtitle}</p>
        <form onSubmit={onSubmit} className="grid gap-5">
          <FormField
            label={t.login.email}
            type="email"
            value={email}
            required
            disabled={pending}
            autoComplete="email"
            className="!mb-0"
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormField
            label={t.login.password}
            type="password"
            value={password}
            required
            disabled={pending}
            autoComplete="current-password"
            invalid={Boolean(error)}
            className="!mb-0"
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? <p className="appointment-form__error !mt-0">{error}</p> : null}
          <ButtonNavy className="mt-1" loading={pending}>
            {t.login.submit}
          </ButtonNavy>
        </form>
        <p className="text-vz-gray mt-6 mb-0 text-[15px] leading-[21px]">
          {t.login.noAccount}{" "}
          <UnderlineLink to="/signup" bold>
            {t.login.signupLink}
          </UnderlineLink>
        </p>
      </div>
    </main>
  );
}
