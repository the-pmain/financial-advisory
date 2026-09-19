import { useEffect, useState } from "react";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function StaffAvatar({
  name,
  photoUrl,
  size,
}: {
  name: string;
  photoUrl?: string;
  size: "sm" | "md" | "header";
}) {
  const [failed, setFailed] = useState(false);
  const src = photoUrl?.trim() ?? "";
  const showPhoto = Boolean(src) && !failed;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <span className={`staff-avatar staff-avatar--${size}`} aria-hidden="true">
      {showPhoto ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="staff-avatar__initials">{initials(name)}</span>
      )}
    </span>
  );
}
