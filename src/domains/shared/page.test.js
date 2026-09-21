import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, paginate, parsePageQuery } from "./page.ts";

const rows = Array.from({ length: 7 }, (_, index) => index + 1);

describe("paging", () => {
  it("falls back to the first page when the query is missing or junk", () => {
    assert.deepEqual(parsePageQuery({}), { page: 1, pageSize: DEFAULT_PAGE_SIZE });
    assert.deepEqual(parsePageQuery({ page: "two", pageSize: "" }), {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    assert.deepEqual(parsePageQuery({ page: "0", pageSize: "-4" }), { page: 1, pageSize: 1 });
  });

  it("reads a query string and caps the page size", () => {
    assert.deepEqual(parsePageQuery({ page: "3", pageSize: "10" }), { page: 3, pageSize: 10 });
    assert.equal(parsePageQuery({ pageSize: "5000" }).pageSize, MAX_PAGE_SIZE);
  });

  it("cuts the window and counts the whole set", () => {
    const second = paginate(rows, { page: 2, pageSize: 3 });
    assert.deepEqual(second.items, [4, 5, 6]);
    assert.equal(second.total, 7);
    assert.equal(second.pageCount, 3);
  });

  it("clamps a page past the end back to the last one", () => {
    const beyond = paginate(rows, { page: 9, pageSize: 3 });
    assert.deepEqual(beyond.items, [7]);
    assert.equal(beyond.page, 3);
  });

  it("reports one empty page for an empty set", () => {
    const none = paginate([], { page: 1, pageSize: 25 });
    assert.deepEqual(none.items, []);
    assert.equal(none.total, 0);
    assert.equal(none.pageCount, 1);
  });
});
