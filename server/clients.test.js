import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  parseIsTestPatch,
  parseListQuery,
  parseClientInput,
  shapeClient,
} from '../src/js/clients-model.js';

function params(query) {
  return new URLSearchParams(query);
}

describe('parseClientInput', () => {
  const valid = {
    name: '  Anna Keller  ',
    email: 'Anna.Keller@Example.com',
    phone: ' +41 41 211 29 29 ',
    consent: true,
    instructed_person_slug: 'anja-hoffmann',
  };

  it('accepts employee-page consultation fields and stores email lowercase', () => {
    const parsed = parseClientInput(valid);
    assert.equal(parsed.ok, true);
    assert.deepEqual(parsed.value, {
      name: 'Anna Keller',
      email: 'anna.keller@example.com',
      phone: '+41 41 211 29 29',
      consent: true,
      instructed_person_slug: 'anja-hoffmann',
      is_test: false,
    });
  });

  it('reads adviser.slug from the team-member form payload', () => {
    const parsed = parseClientInput({
      name: 'Anna Keller',
      email: 'anna@example.com',
      phone: '+41412112929',
      consent: true,
      adviser: { slug: 'friedrich-hartmann', name: 'Friedrich Hartmann' },
    });
    assert.equal(parsed.ok, true);
    assert.equal(parsed.value.instructed_person_slug, 'friedrich-hartmann');
  });

  it('always inserts is_test false even if the client sends true', () => {
    const parsed = parseClientInput({ ...valid, is_test: true });
    assert.equal(parsed.ok, true);
    assert.equal(parsed.value.is_test, false);
  });

  it('ignores occupation and date_of_birth from the generic intake prompt', () => {
    const parsed = parseClientInput({
      ...valid,
      occupation: 'Analyst',
      date_of_birth: '1990-01-01',
      full_name: 'Should Be Ignored',
    });
    assert.equal(parsed.ok, true);
    assert.equal(parsed.value.name, 'Anna Keller');
    assert.equal('occupation' in parsed.value, false);
    assert.equal('date_of_birth' in parsed.value, false);
    assert.equal('full_name' in parsed.value, false);
  });

  it('rejects a missing name', () => {
    const parsed = parseClientInput({ ...valid, name: '   ' });
    assert.equal(parsed.ok, false);
    assert.equal(parsed.error, 'Please enter your name.');
  });

  it('rejects a one-character name', () => {
    const parsed = parseClientInput({ ...valid, name: 'A' });
    assert.equal(parsed.ok, false);
    assert.equal(parsed.error, 'Please enter at least two characters.');
  });

  it('rejects an invalid email', () => {
    const parsed = parseClientInput({ ...valid, email: 'not-an-email' });
    assert.equal(parsed.ok, false);
    assert.equal(parsed.error, 'Please enter a valid email address.');
  });

  it('rejects a phone with too few digits', () => {
    const parsed = parseClientInput({ ...valid, phone: '123 45' });
    assert.equal(parsed.ok, false);
    assert.equal(parsed.error, 'Please enter a valid phone number.');
  });

  it('rejects consent that is not true', () => {
    const parsed = parseClientInput({ ...valid, consent: false });
    assert.equal(parsed.ok, false);
    assert.match(parsed.error, /confirm/i);
  });

  it('rejects an invalid adviser slug', () => {
    const parsed = parseClientInput({
      ...valid,
      instructed_person_slug: 'Not A Slug',
    });
    assert.equal(parsed.ok, false);
    assert.equal(parsed.error, 'Please provide a valid adviser.');
  });
});

describe('parseListQuery', () => {
  it('defaults page 1 and per_page 20', () => {
    const parsed = parseListQuery(params(''));
    assert.deepEqual(parsed, { ok: true, value: { page: 1, per_page: 20, is_test: undefined } });
  });

  it('reads limit as per_page and clamps to 100', () => {
    const parsed = parseListQuery(params('page=2&limit=500'));
    assert.equal(parsed.ok, true);
    assert.equal(parsed.value.page, 2);
    assert.equal(parsed.value.per_page, 100);
  });

  it('clamps per_page 0 up to 1', () => {
    const parsed = parseListQuery(params('per_page=0'));
    assert.equal(parsed.ok, true);
    assert.equal(parsed.value.per_page, 1);
  });

  it('parses is_test true and false', () => {
    assert.equal(parseListQuery(params('is_test=true')).value.is_test, true);
    assert.equal(parseListQuery(params('is_test=false')).value.is_test, false);
  });

  it('rejects a non-boolean is_test', () => {
    const parsed = parseListQuery(params('is_test=yes'));
    assert.equal(parsed.ok, false);
  });

  it('rejects a non-integer page', () => {
    const parsed = parseListQuery(params('page=abc'));
    assert.equal(parsed.ok, false);
  });
});

describe('parseIsTestPatch', () => {
  it('accepts a uuid and boolean', () => {
    const parsed = parseIsTestPatch({
      id: '11111111-1111-4111-8111-111111111111',
      is_test: true,
    });
    assert.equal(parsed.ok, true);
  });

  it('rejects an invalid uuid', () => {
    const parsed = parseIsTestPatch({ id: 'nope', is_test: true });
    assert.equal(parsed.ok, false);
  });

  it('rejects a non-boolean is_test', () => {
    const parsed = parseIsTestPatch({
      id: '11111111-1111-4111-8111-111111111111',
      is_test: 'true',
    });
    assert.equal(parsed.ok, false);
  });
});

describe('shapeClient', () => {
  it('treats is_test as true only when the value is strictly true', () => {
    assert.equal(shapeClient({ id: '1', is_test: true }).is_test, true);
    assert.equal(shapeClient({ id: '1', is_test: 'true' }).is_test, false);
    assert.equal(shapeClient({ id: '1', is_test: 1 }).is_test, false);
  });
});
