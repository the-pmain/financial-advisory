import { useEffect, useState } from "react";
import { CLIENT_VERSION } from "../../version.ts";

export function VersionStamp({ className = "" }: { className?: string }) {
  const [serverVersion, setServerVersion] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: { serverVersion?: unknown }) => {
        if (!cancelled && typeof data.serverVersion === "string") {
          setServerVersion(data.serverVersion);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <p className={className}>
      Client {CLIENT_VERSION}
      {serverVersion ? ` · Server ${serverVersion}` : ""}
    </p>
  );
}
