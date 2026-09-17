import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  europeanToIso,
  isoToEuropean,
  maskEuropeanDate,
  monthGrid,
} from '../src/js/admin-date.js';

describe('admin dates', () => {
  it('converts ISO to dd.mm.yyyy', () => {
    assert.equal(isoToEuropean('2026-09-11'), '11.09.2026');
    assert.equal(isoToEuropean('2026-03-01'), '01.03.2026');
  });

  it('parses European and compact input to ISO', () => {
    assert.equal(europeanToIso('11.09.2026'), '2026-09-11');
    assert.equal(europeanToIso('11.9.2026'), '2026-09-11');
    assert.equal(europeanToIso('11092026'), '2026-09-11');
    assert.equal(europeanToIso('2026-09-11'), '2026-09-11');
    assert.equal(europeanToIso('31.02.2026'), '');
  });

  it('masks digits as the user types', () => {
    assert.equal(maskEuropeanDate('11'), '11');
    assert.equal(maskEuropeanDate('1109'), '11.09');
    assert.equal(maskEuropeanDate('11092026'), '11.09.2026');
  });

  it('builds a Monday-first month grid', () => {
    const cells = monthGrid(2026, 9);
    assert.equal(cells.length, 42);
    assert.equal(cells[0].iso, '2026-08-31');
    assert.equal(cells[1].iso, '2026-09-01');
    assert.equal(cells[1].inMonth, true);
    assert.equal(cells[0].inMonth, false);
  });
});
