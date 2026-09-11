import type { IncomingMessage, ServerResponse } from 'node:http';

export function saveClientDocument(body: unknown): Promise<Record<string, unknown>>;
export function handlePutClientsDocuments(req: IncomingMessage, res: ServerResponse): Promise<void>;
