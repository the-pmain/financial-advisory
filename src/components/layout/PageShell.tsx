import { useEffect, useState, type ReactNode } from "react";
import { DOCKED_QUERY } from "../../theme/breakpoints.ts";
import { Header } from "./Header.tsx";
import { Sidebar } from "./Sidebar.tsx";
import { SkipNav } from "./SkipNav.tsx";

const SIDEBAR_KEY = "portal.sidebar";

function readStoredOpen(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(SIDEBAR_KEY) !== "closed";
}

export function PageShell({ children }: { children: ReactNode }) {
  const [docked, setDocked] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(DOCKED_QUERY).matches,
  );
  const [open, setOpen] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia(DOCKED_QUERY).matches
        ? readStoredOpen()
        : false,
  );
  useEffect(() => {
    const media = window.matchMedia(DOCKED_QUERY);
    function apply() {
      setDocked(media.matches);
      setOpen(media.matches ? readStoredOpen() : false);
    }
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (docked || !open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [docked, open]);

  function setSidebar(next: boolean) {
    setOpen(next);
    if (window.matchMedia(DOCKED_QUERY).matches) {
      window.localStorage.setItem(SIDEBAR_KEY, next ? "open" : "closed");
    }
  }

  return (
    <div
      className={`app-frame${open ? " is-sidebar-open" : ""}${docked ? " is-docked" : ""}`}
    >
      <SkipNav />
      <Sidebar open={open} docked={docked} onClose={() => setSidebar(false)} />
      {!docked && open ? (
        <button
          type="button"
          className="app-scrim"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setSidebar(false)}
        />
      ) : null}
      <div className="app-stage">
        <Header sidebarOpen={open} onToggleSidebar={() => setSidebar(!open)} />
        <main id="main" className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
