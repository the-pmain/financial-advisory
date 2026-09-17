import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext.tsx";
import { Mast, SectionTitle, Tagline } from "../components/ui/primitives.tsx";
import { useI18n } from "../i18n/context.tsx";

export function AppHomePage() {
  const { t } = useI18n();
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate("/", { replace: true });
  }, [ready, user, navigate]);

  if (!user) {
    return <div className="min-h-[240px]" />;
  }

  return (
    <Mast>
      <SectionTitle>{t.app.title}</SectionTitle>
      <Tagline>{t.appName}</Tagline>
      <h1 className="text-[42px] leading-[1.1875] max-mob:text-[30px]">
        {t.app.greeting.replace("{name}", user.name)}
      </h1>
      <p className="text-vz-gray max-w-measure text-[16px] leading-[1.4]">{t.app.body}</p>
    </Mast>
  );
}
