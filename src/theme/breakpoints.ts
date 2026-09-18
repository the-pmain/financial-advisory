/** Matches `--breakpoint-*` in `src/theme/tokens.css`. */
export const BREAKPOINT = {
  mob: 741,
  tab: 861,
  lap: 1025,
  mast: 1271,
  desk: 1281,
} as const;

export const DOCKED_QUERY = `(min-width: ${BREAKPOINT.lap}px)`;
