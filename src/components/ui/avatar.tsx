import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { initials } from "../../lib/format.ts";
import { Icon } from "./icon.tsx";

const ICON_FOR_SIZE = { header: 16, sm: 18, md: 20, lg: 30, xl: 42 } as const;

/** A portrait for anyone the firm holds a name for: staff or client. */
export function Avatar({
  name,
  photoUrl,
  size,
  placeholder = false,
}: {
  name: string;
  photoUrl?: string;
  size: "sm" | "md" | "lg" | "xl" | "header";
  placeholder?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = photoUrl?.trim() ?? "";
  const showPhoto = Boolean(src) && !failed;
  const iconSize = ICON_FOR_SIZE[size];

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <span className={`avatar avatar--${size}`} aria-hidden="true">
      {showPhoto ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : placeholder ? (
        <Icon icon={User} size={iconSize} className="avatar__placeholder" />
      ) : (
        <span className="avatar__initials">{initials(name)}</span>
      )}
    </span>
  );
}
