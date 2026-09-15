import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  attachDocumentsToClients,
  composeKindsSaved,
  emptyDocuments,
  fieldsForKind,
  isDocumentKind,
  isUuid,
  kindSaved,
  mergeKind,
  normalizeDocuments,
  persistDocuments,
  sanitizeFields,
} from '../src/js/clients-documents-model.js';

describe('isUuid / isDocumentKind', () => {
  it('accepts a uuid and known kinds', () => {
    assert.equal(isUuid('11111111-1111-4111-8111-111111111111'), true);
    assert.equal(isUuid('not-a-uuid'), false);
    assert.equal(isDocumentKind('p2p'), true);
    assert.equal(isDocumentKind('fee-schedule'), false);
  });
});

describe('sanitizeFields', () => {
  it('trims values and ignores saved_at and fields keys', () => {
    const result = sanitizeFields({
      clientName: '  Anna  ',
      saved_at: 'ignore-me',
      fields: 'ignore-me-too',
    });
    assert.equal(result.ok, true);
    assert.deepEqual(result.value, { clientName: 'Anna' });
  });

  it('rejects invalid keys', () => {
    const result = sanitizeFields({ '1bad': 'x' });
    assert.equal(result.ok, false);
  });

  it('rejects non-string values', () => {
    const result = sanitizeFields({ age: 12 });
    assert.equal(result.ok, false);
  });

  it('rejects more than 80 keys', () => {
    const fields = {};
    for (let i = 0; i < 81; i += 1) fields[`k${i}`] = 'v';
    const result = sanitizeFields(fields);
    assert.equal(result.ok, false);
  });
});

describe('normalizeDocuments / persistDocuments', () => {
  it('always returns the six-kind flattened view', () => {
    const view = normalizeDocuments(null);
    assert.deepEqual(view, emptyDocuments());
  });

  it('flattens nested claim kinds and persists the 3-key shape', () => {
    const saved = '2026-09-11T12:00:00.000Z';
    const stored = {
      agreement: { fields: { title: 'A' }, saved_at: saved },
      claim: {
        fields: { ref: 'C1' },
        saved_at: saved,
        p2p: { fields: { note: 'P' }, saved_at: saved },
        tracing: { fields: { bank: 'UBS' }, saved_at: saved },
      },
      release: null,
      extra: 'ignored',
    };

    const flat = normalizeDocuments(stored);
    assert.equal(flat.agreement.fields.title, 'A');
    assert.equal(flat.claim.fields.ref, 'C1');
    assert.equal(flat.p2p.fields.note, 'P');
    assert.equal(flat.matter, null);
    assert.equal(flat.tracing.fields.bank, 'UBS');
    assert.equal(flat.release, null);
    assert.equal(kindSaved(flat, 'claim'), true);
    assert.equal(kindSaved(flat, 'p2p'), true);
    assert.equal(kindSaved(flat, 'release'), false);

    const persisted = persistDocuments(flat);
    assert.deepEqual(Object.keys(persisted).sort(), ['agreement', 'claim', 'release']);
    assert.equal(persisted.claim.p2p.fields.note, 'P');
    assert.equal(persisted.claim.tracing.fields.bank, 'UBS');
    assert.equal('matter' in persisted.claim, false);
    assert.equal(persisted.release, null);
  });

  it('nests p2p under claim even when claim itself is empty', () => {
    const saved = '2026-09-11T12:00:00.000Z';
    const persisted = persistDocuments({
      ...emptyDocuments(),
      p2p: { fields: { note: 'nested' }, saved_at: saved },
    });
    assert.equal(persisted.agreement, null);
    assert.equal(persisted.claim.p2p.fields.note, 'nested');
    assert.equal('fields' in persisted.claim, false);
    const flat = normalizeDocuments(persisted);
    assert.equal(kindSaved(flat, 'claim'), false);
    assert.equal(kindSaved(flat, 'p2p'), true);
  });

  it('reads nested kinds stored at the top level', () => {
    const saved = '2026-09-11T12:00:00.000Z';
    const flat = normalizeDocuments({
      agreement: null,
      claim: null,
      release: null,
      tracing: { fields: { hops: '4' }, saved_at: saved },
    });
    assert.equal(flat.tracing.fields.hops, '4');
    assert.equal(kindSaved(flat, 'tracing'), true);
  });
});

describe('mergeKind', () => {
  it('writes saved_at and replaces one kind', () => {
    const merged = mergeKind(emptyDocuments(), 'agreement', { hello: ' world ' }, '2026-01-01T00:00:00.000Z');
    assert.equal(merged.ok, true);
    assert.deepEqual(merged.value.agreement, {
      fields: { hello: 'world' },
      saved_at: '2026-01-01T00:00:00.000Z',
    });
    assert.equal(merged.value.claim, null);
  });

  it('rejects an unknown kind', () => {
    const merged = mergeKind(emptyDocuments(), 'gtc', { a: 'b' });
    assert.equal(merged.ok, false);
  });

  it('saving p2p does not wipe claim fields', () => {
    const start = mergeKind(emptyDocuments(), 'claim', { clientName: 'Anna', crimeRef: 'AF-1' });
    const next = mergeKind(start.value, 'p2p', { sellerName: 'Sam' });
    assert.equal(next.ok, true);
    assert.equal(next.value.claim.fields.clientName, 'Anna');
    assert.equal(next.value.claim.fields.crimeRef, 'AF-1');
    assert.equal(next.value.p2p.fields.sellerName, 'Sam');
    const persisted = persistDocuments(next.value);
    const flat = normalizeDocuments(persisted);
    assert.equal(fieldsForKind(flat, 'claim').clientName, 'Anna');
    assert.equal(kindSaved(flat, 'p2p'), true);
    assert.deepEqual(composeKindsSaved(flat), ['claim', 'p2p']);
  });
});

describe('attachDocumentsToClients', () => {
  it('attaches document_id and flattened documents, defaulting to nulls', () => {
    const clients = [
      { id: '11111111-1111-4111-8111-111111111111', name: 'A', is_test: 'yes' },
      { id: '22222222-2222-4111-8111-222222222222', name: 'B', is_test: true },
    ];
    const rows = [
      {
        id: 'doc-1',
        client_id: '11111111-1111-4111-8111-111111111111',
        documents: {
          agreement: { fields: { x: '1' }, saved_at: '2026-01-01T00:00:00.000Z' },
          claim: null,
          release: null,
        },
      },
    ];
    const attached = attachDocumentsToClients(clients, rows);
    assert.equal(attached[0].document_id, 'doc-1');
    assert.equal(attached[0].documents.agreement.fields.x, '1');
    assert.equal(attached[0].documents.p2p, null);
    assert.equal(attached[0].is_test, false);
    assert.equal(attached[1].document_id, null);
    assert.deepEqual(attached[1].documents, emptyDocuments());
    assert.equal(attached[1].is_test, true);
  });
});
