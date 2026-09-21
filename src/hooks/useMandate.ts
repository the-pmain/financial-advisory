import { useEffect, useState } from "react";
import { api } from "../api/client.ts";
import { useAuth } from "../auth/AuthContext.tsx";
import type { ClientApplication } from "@domain/onboarding/model.ts";
import type { EmployeeProfile } from "@domain/staff/model.ts";

export type MandatePayload = {
  application: ClientApplication | null;
  people: EmployeeProfile[];
};

export function useMandate() {
  const { user } = useAuth();
  const [people, setPeople] = useState<EmployeeProfile[]>([]);
  const [mandate, setMandate] = useState<ClientApplication | null>(null);
  const [mandateReady, setMandateReady] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setMandateReady(false);
    api<MandatePayload>("/api/documents/mandate")
      .then((payload) => {
        if (cancelled) return;
        setMandate(payload.application);
        setPeople(payload.people);
      })
      .catch(() => {
        if (cancelled) return;
        setMandate(null);
        setPeople([]);
      })
      .finally(() => {
        if (!cancelled) setMandateReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { user, mandate, people, mandateReady };
}
