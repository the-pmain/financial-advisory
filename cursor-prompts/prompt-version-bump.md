# Implement prompt-version-bump

Paste this entire prompt into Cursor chat in the **new** project. Do not implement it in this repo — that already has the rule.

---

Implement a **prompt version bump** system in this project, matching the Helfenstein financial-advisor pattern.

## Goal

After **every** user prompt, once that prompt’s work is done, the agent must increment the patch on both `CLIENT_VERSION` and `SERVER_VERSION`, even if no product code changed, mention the new versions in the reply, and **never** bump `package.json` for these prompt bumps.

## 1. Create the always-on Cursor rule

Create `.cursor/rules/prompt-version-bump.mdc` exactly as follows (YAML frontmatter + body). `alwaysApply: true` is required so it runs on every chat turn.

```mdc
---
description: After every user prompt, increment client and server versions
alwaysApply: true
---

# Prompt version bump

After every user prompt, once that prompt's work is done:

1. Increment the patch on `CLIENT_VERSION` and `SERVER_VERSION` in `src/version.ts` (e.g. 1.0.1 → 1.0.2).
2. Bump both values, even if the prompt did not change product code.
3. Mention the new versions in the reply.

Do not change `package.json` for these prompt bumps.
```

If this project does not use `src/version.ts`, still create that file (step 2) and keep the rule pointing at it. Do not invent a second version source.

## 2. Create the version module

Create `src/version.ts` if it does not exist:

```ts
/** Bump both patch numbers after every user prompt. */
export const CLIENT_VERSION = '1.0.0';
export const SERVER_VERSION = '1.0.0';
```

Rules:

- Semver strings, patch-only for prompt bumps (`1.0.0` → `1.0.1`).
- Keep both constants in **one** file. Do not split client vs server version files.
- Do not read versions from `package.json`.
- If a version file already exists, reuse it and add whichever constant is missing. Do not reset versions backward.

## 3. Expose server version on health (if a server exists)

If the project has an HTTP server / API:

- Import `SERVER_VERSION` from `src/version.ts` (or the equivalent import path).
- Include `serverVersion: SERVER_VERSION` on the health (or equivalent) JSON response.
- Prefer an existing `/health` or `/api/health` route. Do not add a second health endpoint.
- If the server logs a listen/startup line, include `SERVER_VERSION` there.

Example shape:

```ts
res.json({
  ok: true,
  time: new Date().toISOString(),
  serverVersion: SERVER_VERSION,
});
```

If there is no server, skip this step. Still keep `SERVER_VERSION` in `src/version.ts` and still bump both constants.

## 4. Show versions in the UI (if a web client exists)

If the project has a React (or similar) UI:

- Add a small `VersionStamp` component that renders `Client {CLIENT_VERSION}` and, when a health fetch succeeds, ` · Server {serverVersion}`.
- Fetch the existing health URL; do not invent a new API path.
- Fail silently if health is down (client version still shows).
- Mount it once in the footer (or the most persistent chrome). Do not add it to every page unless a footer does not exist.
- Match existing typography and spacing. Do not introduce a new design system.

If there is no UI, skip this step.

## 5. Do not do these things

- Do not change `package.json` `version` for prompt bumps.
- Do not add npm/git hooks, CI jobs, or changelog entries for this.
- Do not bump major/minor unless the user explicitly asks.
- Do not write a second cursor rule that duplicates this.
- Do not commit unless the user asks.

## 6. Finish this first prompt

After the files above exist:

1. Increment both patches once for **this** implementing prompt (`1.0.0` → `1.0.1`, or +1 on whatever is already there).
2. In the reply, list the files you created or edited.
3. Mention the new `CLIENT_VERSION` and `SERVER_VERSION`.
4. If the UI or health route changed, say where the stamp and `serverVersion` field live.

## Acceptance

- `.cursor/rules/prompt-version-bump.mdc` exists with `alwaysApply: true`.
- `src/version.ts` exports `CLIENT_VERSION` and `SERVER_VERSION`.
- Future agent turns bump both patches and mention them, without touching `package.json`.
- Server health (if any) returns `serverVersion`.
- Persistent UI chrome (if any) shows the client version and the server version when health is reachable.
