import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  employeeFromRow,
  employeePublicPhotoPath,
  employeeStorageKey,
} from './employees.js';

describe('employeeFromRow', () => {
  it('maps a Supabase employees row and exposes only an app photo path', () => {
    const previous = process.env.SUPABASE_URL;
    process.env.SUPABASE_URL = 'https://example.supabase.co';

    const member = employeeFromRow({
      slug: 'friedrich-hartmann',
      name: 'Friedrich Hartmann',
      role: 'Chairman and CIO',
      section: 'investment',
      photo_path: '/employees/friedrich-hartmann.png',
      photo_storage_path: 'friedrich-hartmann.png',
      about: 'Leads the investment team.',
      results: ['Built the flagship strategy.'],
      credentials: ['CFA Charterholder'],
      languages: ['German', 'English'],
      regulatory_note: 'Senior manager.',
      finma_adviser_no: 'CH-111.708.730/FH',
      cfa_registry_no: 'CFAFH01',
      expertise: ['investments'],
      featured: true,
    });

    assert.equal(member?.slug, 'friedrich-hartmann');
    assert.equal(member?.section, 'investment');
    assert.equal(member?.featured, true);
    assert.deepEqual(member?.languages, ['German', 'English']);
    assert.equal(member?.finmaAdviserNo, 'CH-111.708.730/FH');
    assert.equal(member?.photo, '/api/employees/friedrich-hartmann/photo');
    assert.equal(JSON.stringify(member).includes('supabase'), false);

    if (previous === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = previous;
  });

  it('rejects an unknown section', () => {
    assert.equal(
      employeeFromRow({
        slug: 'x',
        name: 'X',
        role: 'Adviser',
        section: 'other',
        about: 'n/a',
      }),
      null,
    );
  });
});

describe('employee photo paths', () => {
  it('keeps the public path on the app and the storage key off the client', () => {
    assert.equal(employeePublicPhotoPath('friedrich-hartmann'), '/api/employees/friedrich-hartmann/photo');
    assert.equal(employeeStorageKey('friedrich-hartmann.png', 'friedrich-hartmann'), 'friedrich-hartmann.png');
    assert.equal(employeeStorageKey('../secret.png', 'friedrich-hartmann'), 'friedrich-hartmann.png');
  });
});
