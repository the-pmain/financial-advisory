import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { RevealedSecret } from "@domain/identity/model.ts";
import { api } from "../../api/client.ts";
import { useI18n } from "../../i18n/context.tsx";
import { Icon } from "../ui/icon.tsx";

/**
 * A stored password for the console. Masked until a click, and the bytes only
 * leave the server on that click — list payloads never carry them.
 */
export function SecretField({ path }: { path: string | null }) {
  const { t } = useI18n();
  const copy = t.admin.secret;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function toggle() {
    if (!path) return;
    if (open) {
      setOpen(false);
      return;
    }
    if (loaded) {
      setOpen(true);
      return;
    }

    setPending(true);
    setError("");
    try {
      const secret = await api<RevealedSecret>(path);
      setValue(secret.password);
      setLoaded(true);
      setOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.error);
    } finally {
      setPending(false);
    }
  }

  if (!path) {
    return <span className="admin-secret is-empty">{copy.empty}</span>;
  }

  return (
    <span className="admin-secret__wrap">
      <button
        type="button"
        className={`admin-secret${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-label={open ? copy.hide : copy.show}
        disabled={pending}
        onClick={() => void toggle()}
      >
        <span className="admin-secret__value">
          {pending ? (
            <span className="vz-loader" aria-hidden="true" />
          ) : open ? (
            value || copy.empty
          ) : (
            copy.masked
          )}
        </span>
        <Icon icon={open ? EyeOff : Eye} size={15} />
      </button>
      {error ? <span className="appointment-form__error">{error}</span> : null}
    </span>
  );
}
