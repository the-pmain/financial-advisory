import { Delete, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext.tsx";
import { Icon } from "../components/ui/icon.tsx";
import { Logo } from "../components/ui/Logo.tsx";
import { UnderlineButton } from "../components/ui/primitives.tsx";
import { useI18n } from "../i18n/context.tsx";

const PIN_LENGTH = 4;
const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function AdminGatePage() {
  const { t } = useI18n();
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const busy = useRef(false);

  async function submit(value: string) {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    try {
      await adminLogin(value);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.admin.gate.error);
      setPin("");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  function press(digit: string) {
    if (busy.current || pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setError("");
    setPin(next);
    if (next.length === PIN_LENGTH) void submit(next);
  }

  function erase() {
    if (busy.current) return;
    setError("");
    setPin((current) => current.slice(0, -1));
  }

  function clear() {
    if (busy.current) return;
    setError("");
    setPin("");
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        press(event.key);
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        erase();
        return;
      }
      if (event.key === "Escape") clear();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <main id="main" className="admin-gate">
      <section className="admin-gate__card" aria-labelledby="admin-gate-title">
        <Logo />
        <h1 id="admin-gate-title" className="admin-gate__title">
          <span className="admin-gate__shield" aria-hidden="true">
            <Icon icon={ShieldCheck} size={17} strokeWidth={2} />
          </span>
          {t.admin.gate.title}
        </h1>
        <p className="admin-gate__lead">{t.admin.gate.lead}</p>

        <p className="admin-gate__label">{t.admin.gate.pin}</p>
        <div
          className="admin-gate__dots"
          role="status"
          aria-live="polite"
          aria-label={t.admin.gate.entered
            .replace("{n}", String(pin.length))
            .replace("{total}", String(PIN_LENGTH))}
        >
          {Array.from({ length: PIN_LENGTH }, (_, index) => (
            <span
              key={index}
              className={`admin-gate__dot${index < pin.length ? " is-filled" : ""}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <p className={`admin-gate__note${error ? " is-error" : ""}`} role={error ? "alert" : undefined}>
          {pending ? t.admin.gate.checking : error}
        </p>

        <div className="admin-gate__pad">
          {DIGITS.map((digit) => (
            <button
              key={digit}
              type="button"
              className="admin-gate__key"
              disabled={pending}
              aria-label={t.admin.gate.digit.replace("{n}", digit)}
              onClick={() => press(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            className="admin-gate__key admin-gate__key--word"
            disabled={pending}
            onClick={clear}
          >
            {t.admin.gate.clear}
          </button>
          <button
            type="button"
            className="admin-gate__key"
            disabled={pending}
            aria-label={t.admin.gate.digit.replace("{n}", "0")}
            onClick={() => press("0")}
          >
            0
          </button>
          <button
            type="button"
            className="admin-gate__key"
            disabled={pending}
            aria-label={t.admin.gate.erase}
            onClick={erase}
          >
            <Icon icon={Delete} size={18} />
          </button>
        </div>

        <p className="admin-gate__foot">
          <UnderlineButton bold onClick={() => navigate("/", { replace: true })}>
            {t.admin.gate.back}
          </UnderlineButton>
        </p>
      </section>
    </main>
  );
}
