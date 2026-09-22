import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useI18n } from "../../i18n/context.tsx";
import { Icon } from "./icon.tsx";

/**
 * A password control with a show/hide eye. `secret` keeps the input as text
 * and masks with CSS, for screens that must not look like a password form.
 */
export function PasswordField({
  label,
  className = "",
  invalid = false,
  secret = false,
  disabled,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  invalid?: boolean;
  secret?: boolean;
}) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const masked = !visible;

  return (
    <label className={`appointment-form__field ${className}`}>
      <span className="appointment-form__label">{label}</span>
      <span className="appointment-form__secret">
        <input
          {...props}
          className={`appointment-form__control${masked && secret ? " is-secret" : ""}${invalid ? " is-invalid" : ""}`}
          type={secret || visible ? "text" : "password"}
          disabled={disabled}
        />
        <button
          type="button"
          className="appointment-form__reveal"
          aria-label={visible ? t.reveal.hide : t.reveal.show}
          aria-pressed={visible}
          disabled={disabled}
          onClick={() => setVisible((open) => !open)}
        >
          <Icon icon={visible ? EyeOff : Eye} size={16} />
        </button>
      </span>
    </label>
  );
}
