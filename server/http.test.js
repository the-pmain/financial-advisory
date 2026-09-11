import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { after, before, describe, it } from 'node:test';
import { handleRequest } from '../server.mjs';
import { authorizeAdmin, createIpRateLimiter, requestPath, requestUrl } from './http.js';
import { mapPostgrestError } from './supabase.js';

function mockReq({ method = 'GET', url = '/', headers = {} } = {}) {
  return {
    method,
    url,
    headers,
    socket: { remoteAddress: '127.0.0.1' },
  };
}

describe('requestPath / requestUrl', () => {
  it('strips a trailing slash and query string', () => {
    const req = mockReq({ url: '/api/admin/clients/?page=1' });
    assert.equal(requestPath(req), '/api/admin/clients');
    assert.equal(requestUrl(req).searchParams.get('page'), '1');
  });
});

describe('authorizeAdmin', () => {
  const previous = process.env.ADMIN_API_KEY;

  it('rejects a missing or wrong bearer token', () => {
    process.env.ADMIN_API_KEY = 'secret-admin-key';
    assert.equal(authorizeAdmin(mockReq({ headers: {} })).status, 401);
    assert.deepEqual(authorizeAdmin(mockReq({ headers: { authorization: 'Bearer nope' } })).body, {
      error: 'Unauthorized.',
    });
    assert.equal(authorizeAdmin(mockReq({ headers: { authorization: 'Bearer secret-admin-key' } })).ok, true);
  });

  it('does not treat a missing key as an open admin surface', () => {
    delete process.env.ADMIN_API_KEY;
    const result = authorizeAdmin(mockReq({ headers: { authorization: 'Bearer anything' } }));
    assert.equal(result.status, 500);
    assert.equal(result.body.error, 'Missing ADMIN_API_KEY.');
    if (previous === undefined) delete process.env.ADMIN_API_KEY;
    else process.env.ADMIN_API_KEY = previous;
  });
});

describe('createIpRateLimiter', () => {
  it('allows up to the max then rejects', () => {
    const check = createIpRateLimiter({ max: 2, windowMs: 60_000 });
    assert.equal(check('1.1.1.1').ok, true);
    assert.equal(check('1.1.1.1').ok, true);
    assert.equal(check('1.1.1.1').ok, false);
    assert.equal(check('2.2.2.2').ok, true);
  });
});

describe('mapPostgrestError', () => {
  it('maps postgres and PostgREST codes', () => {
    assert.equal(mapPostgrestError(404, { code: '42P01', message: 'missing' }).body.error, 'Required table is missing.');
    assert.equal(mapPostgrestError(400, { code: '42703' }).body.error, 'Required column is missing.');
    assert.equal(mapPostgrestError(400, { code: 'PGRST204' }).body.error, 'Required column is missing.');
    assert.equal(mapPostgrestError(409, { code: '23503' }).body.error, 'That client record could not be found.');
    assert.equal(mapPostgrestError(400, { code: '23514' }).body.error, 'Documents failed a database check constraint.');
    const rls = mapPostgrestError(401, { code: '42501' });
    assert.match(rls.body.hint, /SUPABASE_SERVICE_ROLE_KEY/);
  });
});

describe('HTTP routes', () => {
  let server;
  let base;

  before(async () => {
    process.env.ADMIN_API_KEY = 'test-admin-key';
    server = createServer(handleRequest);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();
    base = `http://127.0.0.1:${port}`;
  });

  after(async () => {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('GET /health returns { ok: true }', async () => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.equal(res.headers.get('x-robots-tag'), 'noindex, nofollow');
    assert.deepEqual(await res.json(), { ok: true });
  });

  it('OPTIONS on API routes returns 204', async () => {
    const res = await fetch(`${base}/api/clients`, { method: 'OPTIONS' });
    assert.equal(res.status, 204);
  });

  it('wrong method returns 405', async () => {
    const res = await fetch(`${base}/api/clients`);
    assert.equal(res.status, 405);
    assert.deepEqual(await res.json(), { error: 'Method not allowed.' });
  });

  it('invalid JSON returns 400', async () => {
    const res = await fetch(`${base}/api/clients`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{',
    });
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), { error: 'Invalid JSON.' });
  });

  it('admin routes reject a missing bearer token', async () => {
    const res = await fetch(`${base}/api/admin/clients`);
    assert.equal(res.status, 401);
    assert.deepEqual(await res.json(), { error: 'Unauthorized.' });
  });

  it('admin routes reject a wrong bearer token', async () => {
    const res = await fetch(`${base}/api/admin/clients`, {
      headers: { authorization: 'Bearer wrong' },
    });
    assert.equal(res.status, 401);
    assert.deepEqual(await res.json(), { error: 'Unauthorized.' });
  });

  it('public POST validates fields before touching Supabase', async () => {
    const res = await fetch(`${base}/api/clients`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'not-an-email', phone: '1', consent: false }),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(typeof body.error, 'string');
  });
});
