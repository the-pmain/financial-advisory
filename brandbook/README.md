# Helfenstein brandbook

This branch is the **stylization snapshot** of the live site. Checkout or pull it whenever you need the current brand system for another project.

```bash
git fetch origin brandbook
git checkout brandbook
```

Or copy files from this folder without switching:

```bash
git checkout origin/brandbook -- brandbook
```

| File | Use |
|------|-----|
| `BRANDBOOK.md` | Full visual identity, type, layout, components, voice |
| `tokens.css` | Drop-in CSS variables (Tailwind v4 `@theme` or plain `:root`) |
| `tokens.json` | Same tokens as data |
| `AGENT-PROMPT.md` | Paste into a new-project chat to recreate the look |

Canonical live source (do not drift from these when refreshing this branch):

- `src/index.css` — tokens, base type, utilities
- `src/components/ui/primitives.tsx` — buttons, links, section titles
- `src/components/ui/Logo.tsx` — lockup and mark
- `@fontsource-variable/inter` + `public/fonts/GreatVibes-Regular.ttf`

To refresh this branch after the site styles change: merge or rebase `main`, recopy tokens from `src/index.css`, and amend the tables in `BRANDBOOK.md`.
