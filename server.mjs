import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handlePatchClient, handleListClients } from './server/admin-clients.js';
import { handlePutClientsDocuments } from './server/clients-documents.js';
import { adminApiKey, getPort, isProduction, loadEnvFile } from './server/env.js';
import {
  authorizeAdmin,
  clientIp,
  createIpRateLimiter,
  HttpError,
  requestPath,
  sendError,
  sendJson,
  sendNoContent,
} from './server/http.js';
import { handleCreateClient } from './server/clients.js';

loadEnvFile();

const publicPostLimit = createIpRateLimiter({ max: 20, windowMs: 60_000 });

const API_ALLOW = 'GET, POST, PATCH, PUT, OPTIONS';

export async function handleRequest(req, res) {
  const path = requestPath(req);
  const method = (req.method || 'GET').toUpperCase();

  try {
    if (path === '/health') {
      if (method === 'OPTIONS') {
        sendNoContent(res, { Allow: 'GET, OPTIONS' });
        return;
      }
      if (method !== 'GET') throw new HttpError(405, 'Method not allowed.');
      sendJson(res, 200, { ok: true });
      return;
    }

    if (!path.startsWith('/api/')) {
      throw new HttpError(404, 'Not found.');
    }

    if (method === 'OPTIONS') {
      sendNoContent(res, {
        Allow: API_ALLOW,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': API_ALLOW,
      });
      return;
    }

    if (path.startsWith('/api/admin/')) {
      const auth = authorizeAdmin(req);
      if (!auth.ok) {
        sendJson(res, auth.status, auth.body);
        return;
      }
    }

    if (path === '/api/clients') {
      if (method !== 'POST') throw new HttpError(405, 'Method not allowed.');
      const limited = publicPostLimit(clientIp(req));
      if (!limited.ok) {
        sendJson(res, 429, { error: 'Too many requests.' });
        return;
      }
      await handleCreateClient(req, res);
      return;
    }

    if (path === '/api/admin/clients') {
      if (method === 'GET') {
        await handleListClients(req, res);
        return;
      }
      if (method === 'PATCH') {
        await handlePatchClient(req, res);
        return;
      }
      throw new HttpError(405, 'Method not allowed.');
    }

    if (path === '/api/admin/clients-documents') {
      if (method !== 'PUT') throw new HttpError(405, 'Method not allowed.');
      await handlePutClientsDocuments(req, res);
      return;
    }

    throw new HttpError(404, 'Not found.');
  } catch (err) {
    sendError(res, err);
  }
}

export function startServer({ port = getPort(), host = '0.0.0.0' } = {}) {
  if (isProduction() && !adminApiKey()) {
    console.error('ADMIN_API_KEY is required in production.');
    process.exit(1);
  }

  const server = createServer(handleRequest);
  server.listen(port, host, () => {
    console.log(`Intake API listening on http://${host}:${port}`);
  });
  return server;
}

function isDirectRun() {
  if (!process.argv[1]) return false;
  const self = fileURLToPath(import.meta.url);
  const entry = resolve(process.argv[1]);
  return process.platform === 'win32'
    ? self.toLowerCase() === entry.toLowerCase()
    : self === entry;
}

if (isDirectRun()) {
  startServer();
}
