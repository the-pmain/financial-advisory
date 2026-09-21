import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  countClientFilters,
  matchesClientFilter,
  parseClientFilter,
} from "./model.ts";

function client(over) {
  return {
    id: "1",
    createdAt: "",
    name: "A",
    email: "a@example.com",
    phone: "",
    instructedPersonSlug: null,
    registered: false,
    portalAccount: null,
    photoUrl: "",
    documents: {},
    adviser: null,
    ...over,
  };
}

describe("client list filters", () => {
  it("treats an unknown status as the whole book", () => {
    assert.equal(parseClientFilter("pending"), "pending");
    assert.equal(parseClientFilter("nope"), "all");
    assert.equal(parseClientFilter(undefined), "all");
  });

  it("counts every group from the joined book, not the page", () => {
    const rows = [
      client({ id: "1", registered: true, adviser: { slug: "staff", name: "Staff", role: "", photoUrl: "" } }),
      client({ id: "2", registered: false, adviser: { slug: "staff", name: "Staff", role: "", photoUrl: "" } }),
      client({ id: "3", registered: false, adviser: null }),
    ];

    assert.equal(matchesClientFilter("unassigned", rows[2]), true);
    assert.deepEqual(countClientFilters(rows), {
      all: 3,
      registered: 1,
      pending: 2,
      unassigned: 1,
    });
  });
});
