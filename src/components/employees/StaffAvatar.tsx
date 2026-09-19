import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { initials } from "../../lib/format.ts";
import { Icon } from "../ui/icon.tsx";

export function StaffAvatar({
  name,
  photoUrl,
  size,
  placeholder = false,
}: {
  name: string;
  photoUrl?: string;
  size: "sm" | "md" | "header";
  placeholder?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = photoUrl?.trim() ?? "";
  const showPhoto = Boolean(src) && !failed;
  const iconSize = size === "header" ? 16 : size === "sm" ? 18 : 20;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <span className={`staff-avatar staff-avatar--${size}`} aria-hidden="true">
      {showPhoto ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : placeholder ? (
        <Icon icon={User} size={iconSize} className="staff-avatar__placeholder" />
      ) : (
        <span className="staff-avatar__initials">{initials(name)}</span>
      )}
    </span>
  );
}
