import { useEffect } from "react";
import { useNavigate } from "react-router";

/** Press A, D, M to reach the super admin gate. Ctrl or Cmd may be held; a focused field wins. */
const SEQUENCE = ["a", "d", "m"] as const;
const STEP_MS = 1500;

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || typeof el.tagName !== "string") return false;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.isContentEditable
  );
}

export function useAdminShortcut(path = "/admin") {
  const navigate = useNavigate();

  useEffect(() => {
    let step = 0;
    let lastAt = 0;

    function onKeyDown(event: KeyboardEvent) {
      const held = event.ctrlKey || event.metaKey;
      if (event.altKey || (!held && isTyping(event.target))) {
        step = 0;
        return;
      }

      const now = Date.now();
      if (step > 0 && now - lastAt > STEP_MS) step = 0;

      const key = event.key.toLowerCase();
      if (key !== SEQUENCE[step]) {
        step = key === SEQUENCE[0] ? 1 : 0;
        lastAt = now;
        // Ctrl+A would select the form behind the sequence.
        if (step === 1 && held) event.preventDefault();
        return;
      }

      // Ctrl+D is the browser bookmark shortcut; the sequence owns it here.
      if (held) event.preventDefault();
      step += 1;
      lastAt = now;
      if (step < SEQUENCE.length) return;

      step = 0;
      navigate(path);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, path]);
}
