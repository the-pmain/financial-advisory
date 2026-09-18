# Agent prompt — recreate the Helfenstein look

Paste this entire file as the first message in a new project.

---

You are implementing the Helfenstein Asset Management visual system. Recreate this look exactly. Do not invent a “modern wealth” aesthetic.

This is a conservative Swiss private-client house style: navy ink, lockup gold, warm cream cards, hairline rules, tight Inter, almost no radius. Tokens were sampled from the wordmark (`#070E18`) and the gold H (`#937A43`). Keep the historical `vz-` token names.

## Stack

- Tailwind CSS v4 with `@theme` as the single token source. Import `brandbook/tokens.css` or copy it.
- Load Inter Variable via `@fontsource-variable/inter`.
- Never hardcode hex in components except true white on the page card, modal, and pills.
- Desktop-first breakpoints. Custom `max-*` variants collapse below 741 / 861 / 1025 / 1271 / 1281.
- No dark mode. Theme colour `#070E18`.
- Respect `prefers-reduced-motion`.
- Body letter-spacing uses the Inter width correction in the tokens.

## Must use

Copy every variable from `brandbook/tokens.css`. Then implement:

1. Base layer: body 16/1.4 tracking-vz-base on `#E8EBEF`; headings Inter 700 tracking-vz-head; links navy → gold; focus 2px `#15202C`.
2. Utilities: `vz-underline` and `vz-underline-hover` as `box-shadow: 0 2px 0 -1px #7d6634` (never border-bottom).
3. Grey canvas + white 1280 card (30px gutters, 70px bottom, `0 0 2px rgba(0,0,0,0.25)`). Footer on the grey, not in the card.
4. Mast 1220 / measure 802. Section titles 28/32 bold `#525252` over a `#666` hairline.
5. Pills: 21px radius, navy outline on white, or gold label on cream.
6. Forms: 3px radius, 46px controls, spinner on every in-flight action button.

## Type correction

Inter Variable is ~0.009em wider than the reference at regular and ~0.014em at bold. Use `--tracking-vz-*` so line breaks match. Do not apply those tokens to Georgia quotes.

Great Vibes is for PDF signatures only.

## Do not

Extra blues or teals. Large radii. Glassmorphism. Tailwind default breakpoints. A separate authenticated “app” chrome unless the product already has one.

If a choice is not specified, pick the quieter one. Read `brandbook/BRANDBOOK.md` before inventing a component.
