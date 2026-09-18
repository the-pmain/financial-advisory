import { useEffect, useState } from "react";
import { useI18n } from "../../i18n/context.tsx";

export function AppLoader({ leaving = false }: { leaving?: boolean }) {
  const { t } = useI18n();

  return (
    <div
      className={`app-loader${leaving ? " app-loader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!leaving}
    >
      <div className="app-loader__logo">
        <img
          src="/images/helfenstein-logo.png"
          alt=""
          width={1710}
          height={311}
          decoding="sync"
          fetchPriority="high"
        />
        <span className="app-loader__sheen" aria-hidden="true" />
      </div>
      <span className="visually-hidden">{t.app.loading}</span>
    </div>
  );
}

export function AuthSplash({ active }: { active: boolean }) {
  const [present, setPresent] = useState(active);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (active) {
      setPresent(true);
      setLeaving(false);
      return;
    }
    if (!present) return;
    setLeaving(true);
    const fade = window.setTimeout(() => {
      setPresent(false);
      setLeaving(false);
    }, 320);
    return () => window.clearTimeout(fade);
  }, [active, present]);

  if (!present) return null;
  return <AppLoader leaving={leaving} />;
}
