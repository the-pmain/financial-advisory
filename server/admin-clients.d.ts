import type { IncomingMessage, ServerResponse } from 'node:http';

export function loadClientsPage(searchParams: URLSearchParams): Promise<{
  items: unknown[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
}>;

export function parseAdminClientsQuery(url: URL): unknown;
export function handleListClients(req: IncomingMessage, res: ServerResponse): Promise<void>;
export function patchClientIsTest(body: unknown): Promise<{ item: unknown }>;
export function handlePatchClient(req: IncomingMessage, res: ServerResponse): Promise<void>;
