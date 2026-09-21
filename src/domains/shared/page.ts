/**
 * Shared kernel: how every list endpoint asks for a page and answers with one.
 *
 * No context owns paging, so this module belongs to none of them. It may be
 * imported from anywhere in `src/domains`; it imports nothing back.
 */

export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

export type PageQuery = {
  page: number;
  pageSize: number;
};

export type Paged<T> = PageQuery & {
  items: T[];
  /** Rows matching the request, not rows on this page. */
  total: number;
  pageCount: number;
};

function counting(value: unknown, fallback: number, max: number): number {
  const given = typeof value === "string" ? value.trim() : value;
  // `?pageSize=` is an absent size, not a size of zero.
  if (given === "" || given === null || given === undefined) return fallback;
  const parsed = Number(given);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.trunc(parsed), 1), max);
}

/**
 * Query strings arrive as text and from anyone, so a bad page is the first
 * page rather than an error. Asking beyond the end returns no rows, which is
 * the honest answer to "what is on page nine".
 */
export function parsePageQuery(input: {
  page?: unknown;
  pageSize?: unknown;
}): PageQuery {
  return {
    page: counting(input.page, 1, Number.MAX_SAFE_INTEGER),
    pageSize: counting(input.pageSize, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE),
  };
}

/** Cuts the window out of rows already narrowed to what the caller asked for. */
export function paginate<T>(rows: readonly T[], query: PageQuery): Paged<T> {
  const pageCount = Math.max(Math.ceil(rows.length / query.pageSize), 1);
  const page = Math.min(query.page, pageCount);
  const start = (page - 1) * query.pageSize;

  return {
    items: rows.slice(start, start + query.pageSize),
    page,
    pageSize: query.pageSize,
    total: rows.length,
    pageCount,
  };
}
