import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { homePathForRole } from "../app/nav.ts";
import { useAuth } from "../auth/AuthContext.tsx";
import { Logo } from "../components/ui/Logo.tsx";
import { ButtonNavy, FormField, UnderlineLink } from "../components/ui/primitives.tsx";
import { useI18n } from "../i18n/context.tsx";

export function SignupPage() {
  const { t } = useI18n();
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user) navigate(homePathForRole(user.role), { replace: true });
  }, [user, navigate]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await signup(name, email, password);
      navigate(homePathForRole("advisor"), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : t.signup.error);
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
        <h1 className="mt-7 mb-2 text-[22px] leading-[1.4]">{t.signup.title}</h1>
        <p className="text-vz-gray mb-7 text-[15px] leading-[1.4]">{t.signup.subtitle}</p>
        <form onSubmit={onSubmit} className="grid gap-5">
          <FormField
            label={t.signup.name}
            type="text"
            value={name}
            required
            disabled={pending}
            autoComplete="name"
            className="!mb-0"
            onChange={(event) => setName(event.target.value)}
          />
          <FormField
            label={t.signup.email}
            type="email"
            value={email}
            required
            disabled={pending}
            autoComplete="email"
            className="!mb-0"
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormField
            label={t.signup.password}
            type="password"
            value={password}
            required
            disabled={pending}
            minLength={8}
            autoComplete="new-password"
            invalid={Boolean(error)}
            className="!mb-0"
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? <p className="appointment-form__error !mt-0">{error}</p> : null}
          <ButtonNavy className="mt-1" loading={pending}>
            {t.signup.submit}
          </ButtonNavy>
        </form>
        <p className="text-vz-gray mt-6 mb-0 text-[15px] leading-[21px]">
          {t.signup.hasAccount}{" "}
          <UnderlineLink to="/" bold>
            {t.signup.loginLink}
          </UnderlineLink>
        </p>
      </div>
    </main>
  );
}
