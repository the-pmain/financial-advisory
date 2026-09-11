import { API } from '../constants/api';

export type SubmitClientResult = { ok: true } | { ok: false; error: string };

export type SubmitClientPayload = {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
  instructed_person_slug: string;
};

export async function submitClient(payload: SubmitClientPayload): Promise<SubmitClientResult> {
  try {
    const res = await fetch(API.clients, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok) {
      return { ok: false, error: data.error || 'Could not send your details. Please try again.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not reach the server. Please try again.' };
  }
}
