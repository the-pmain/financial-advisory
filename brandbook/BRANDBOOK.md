# Helfenstein brand book

**Firm:** Helfenstein Asset Management AG (Helfenstein Group)  
**Place:** Pilatusstrasse 23, 6003 Luzern, Switzerland  
**Tagline:** Independent, fee-only advice and portfolio management for private clients  
**Snapshot of:** live site tokens in `src/index.css`  
**Look:** conservative Swiss private-client house style. Navy ink, lockup gold, warm cream cards, hairline rules, tight Inter, almost no radius. Not generic fintech teal. No dark mode.

Token names keep the historical `vz-` prefix. Keep them.

---

## Quick reference

| Role | Value |
|------|--------|
| Ink / wordmark / theme | `#070E18` |
| Logo gold / pill CTA | `#937A43` |
| Link hover / underline | `#7D6634` |
| Gold on photography | `#B49A5C` |
| Page canvas | `#E8EBEF` (phone `#DDE1E6`) |
| Page card | `#FFFFFF` |
| Cream cards | `#F4EFE3` / hover `#FAF7F0` |
| Hairline | `#CFD2D6` |
| UI font | Inter Variable 400 / 700 |
| Quote font | Georgia |
| Signature (PDF only) | Great Vibes Regular |
| Motion | 250ms, `--ease-vz` |
| Page width | 1280px card, 1220px mast, 802px measure |

Voice: calm, specific, Swiss. Candid client education. No hype, no emoji, no attack copy.

---

## 1. Marks and chrome

### Lockup

- Horizontal wordmark: `/images/helfenstein-logo.png`, native 1710×311.
- Header height: 48px, then 40px &lt; 1281, 36px &lt; 1025, 32px &lt; 741. `object-contain`, left aligned. Hover opacity 0.8.
- Square H: `/images/helfenstein-mark.png` on light, `helfenstein-mark-light.png` on dark. Footer mark 55×55.

Do not redraw the H as a geometric letter. Use the official assets.

### Browser

- Theme / tile / manifest: `#070E18`
- Safari pinned-tab: `#937A43`
- Favicon: gold H on navy.

---

## 2. Colour

| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `--color-vz-blue` / `--color-vz-ink` | `#070E18` | 7, 14, 24 | Text, links, theme, solid buttons |
| `--color-vz-blue-mid` | `#15202C` | 21, 32, 44 | Taglines, focus ring |
| `--color-vz-blue-link` | `#0C1520` | 12, 21, 32 | Darker link ink |
| `--color-vz-blue-soft` | `#6D7682` | 109, 118, 130 | Muted UI, input hover border |
| `--color-vz-blue-tint` | `#E4E6E9` | 228, 230, 233 | Active keypad / avatar wash |
| `--color-vz-blue-panel` | `#ECEEF0` | 236, 238, 240 | Markets panel, admin wash |
| `--color-vz-blue-panel-alt` | `#E6E8EB` | 230, 232, 235 | Alternate panel |
| `--color-vz-blue-panel-faint` | `#F3F4F5` | 243, 244, 245 | Inset pickers |
| `--color-vz-orange` | `#7D6634` | 125, 102, 52 | Hover, underline, icon accent |
| `--color-vz-orange-btn` | `#937A43` | 147, 122, 67 | Logo gold, offer pills, checkbox accent |
| `--color-vz-orange-light` | `#B49A5C` | 180, 154, 92 | Gold on dark photography |
| `--color-vz-gray` | `#3F3F3F` | 63, 63, 63 | Secondary body |
| `--color-vz-gray-mid` | `#525252` | 82, 82, 82 | Section titles |
| `--color-vz-gray-light` | `#666666` | 102, 102, 102 | Section-title border, header hairline |
| `--color-vz-rule` | `#CFD2D6` | 207, 210, 214 | Hairlines, input borders |
| `--color-vz-rule-soft` | `#D8DBE0` | 216, 219, 224 | Softer rules |
| `--color-vz-page` | `#E8EBEF` | 232, 235, 239 | Desktop canvas |
| `--color-vz-page-mobile` | `#DDE1E6` | 221, 225, 230 | Phone canvas |
| `--color-vz-surface` | `#E8EBEF` | 232, 235, 239 | Two-column gutter |
| `--color-vz-slate` | `#1A222C` | 26, 34, 44 | Footer links |
| `--color-vz-cream` | `#F4EFE3` | 244, 239, 227 | Offer cards |
| `--color-vz-cream-light` | `#FAF7F0` | 250, 247, 240 | Card hover, modal header, consent |
| `--color-vz-down` | `#D90000` | 217, 0, 0 | Market down |
| `--color-vz-up` | `#4E924A` | 78, 146, 74 | Market up |
| `--color-vz-cart` | `#FFF48E` | 255, 244, 142 | Highlight wash |
| `--color-vz-shadow` | `#8A9099` | 138, 144, 153 | Shadow tint name |

Hardcode `#fff` only on the page card, header sheets, and white pills.

Hero photograph: brightness 0.45, contrast 1.08, saturate 0.92, plus left-to-right black gradient 45% → 20% → 0. Trust bar: navy at 95%.

Modal backdrop: `rgb(11 31 51 / 0.5)`.  
Focus: `2px solid #15202C`, offset 2px.  
Form invalid: `#B42318` + 12% ring.  
Do not add extra blues, teals, or saturated oranges.

---

## 3. Typography

### Families

| Face | Package / file | Where |
|------|----------------|--------|
| Inter Variable | `@fontsource-variable/inter` | UI, body, headings (400 / 700) |
| Georgia | system | Pull quotes, newsletter CTA |
| Great Vibes Regular | `public/fonts/GreatVibes-Regular.ttf` | PDF signatures only |
| Helvetica / Helvetica Bold | pdf-lib standard | PDF body |

Never use Great Vibes in the web UI. Never apply the Inter tracking correction to Georgia.

### Inter width correction

Stock Inter Variable runs ~2% wide vs the reference subset. Use these tracking tokens or line breaks shift and every section height breaks.

| Token | Value | Use |
|-------|-------|-----|
| `--tracking-vz-tight` | `-0.019em` | Inter stand-in for a −0.01em quote |
| `--tracking-vz-base` | `-0.009em` | Body / regular |
| `--tracking-vz-01` | `0.001em` | Declared 0.01em (taglines) |
| `--tracking-vz-02` | `0.011em` | Declared 0.02em (nav / underlines) |
| `--tracking-vz-head` | `-0.014em` | Bold headings |

Georgia quotes use `tracking-normal` or `-0.01em` verbatim.

### Body

- Desktop: 16px / 1.4 / 400 / `tracking-vz-base`
- Phone (&lt; 741): 18px
- Antialiased

### Headings (Inter 700, `tracking-vz-head`)

| El | Desktop | Phone | Margin |
|----|---------|-------|--------|
| h1 | 42 / 1.1875 | 30 | mb 12 |
| h2 | 26 / 1.231 | 20 | mb 14 |
| h3 | 22 / 1.4 | 20 | mb 10 |
| h4 | 20 / 1.5 | 18 | mb 0 |
| h5 | 18 / 1.444 | 15 | mb 8 |
| h6 | 16 / 1.3125 | 15 | mb 6 |

Default heading mb 10. Paragraphs mb 20 / phone 26.

### Recurring type

| Use | Spec |
|-----|------|
| Section title | 28/32 bold `#525252`, pb 7, border-b `#666`, gap 30 (phone 22/25.3 gap 27; columns 24/28) |
| Tagline | 15/17.3 `tracking-vz-01` `#15202C` |
| Underline link | 15/21 `tracking-vz-02` ink, pb 2, optional bold |
| Nav | 15/17 `tracking-vz-02` |
| Quick links | 19/22 `tracking-vz-01` |
| Footer group | 20/24 regular `#525252` |
| Footer link | 16/19 `#1A222C` |
| Legal | 14/17 (phone 12/15) |
| Blockquote | Georgia 32 / 1.3889 −0.01em (phone 23) |
| Testimonial | Georgia 32/45 −0.01em (phone 21/27.3) |
| Newsletter | Georgia italic 19/27, 802px measure |
| Hero eyebrow | 12 bold uppercase tracking 0.18em white/80 |
| Hero h1 | 48/1.08 bold −0.02em (lap 36, phone 28) |
| Hero lede | 18/1.5 white/90 (phone 16) |

Numbers: `tabular-nums`. Swiss grouping with ASCII apostrophe (`1'234.56`). Change: `+1.23 %`.

---

## 4. Layout

Desktop-first. Collapse **below** the token (max-mob = width &lt; 741, and so on).

| Token | Min-width | Collapse below |
|-------|-----------|----------------|
| `--breakpoint-mob` | 741px | 741 |
| `--breakpoint-tab` | 861px | 861 |
| `--breakpoint-lap` | 1025px | 1025 |
| `--breakpoint-mast` | 1271px | 1271 |
| `--breakpoint-desk` | 1281px | 1281 |

Do not use Tailwind’s default breakpoint scale.

### Page

- Grey canvas, `overflow-x: hidden`.
- White card: max 1280, 30px sides (25 below 1271), 70px bottom (50 lap, 40 phone).
- Card shadow: `0 0 2px rgba(0,0,0,0.25)`.
- 25px canvas padding above 1281; 0 below.
- Main starts 22px under the header (phone 18).
- Footer shares the 1280 measure and sits **on the grey**, not in the card.

`.mast`: max 1220, centered; below 1271 fluid with 25px side margins.  
Reading measure: 802px.  
Section rhythm: `mt-12` (48), `max-lap:mt-10` (40).

### Two columns

Equal halves. Gutter = 34px padding + 2px `--color-vz-surface` on each inner edge. Shared heading stacks at 741; per-column titles stack at 861.

### Offer cards

Cream, 5px radius, 14px pad, `shadow-vz-card`. Hover: cream-light + `1px 1px 6px rgba(0,0,0,0.14)`. Small cards: 72px centred icon.

### Header / footer

- Sticky header, hairline `0 0.5px 0 #999999`.
- Top row min-height 71 (desk 60). Search 44×44.
- Hamburger below 1025. Quick-links row 54 (desk 48).
- z-index: chrome 110, sheets 90, appointment 300, cookie 200, skip 1000.
- Footer: 836/257 grid, 91px left inset for the mark. Accordions below 861.

---

## 5. Radius, shadow, motion

### Radius

| px | Use |
|----|-----|
| 3 | Inputs, dense buttons, badges |
| 4 | Desktop modal |
| 5 | Offer cards |
| 6 | Hero photograph |
| 21 / full | Pill CTAs |
| 12 12 0 0 | Phone bottom sheet |
| full | Avatars |

### Shadows

- Card: `1px 1px 3px rgb(11 31 51 / 0.18)`
- Solid button: `1px 1px 2px rgb(11 31 51 / 0.35)`
- Header: `0 0.5px 0 #666666` or `#999999`
- Cookie / skip: `0 0 20px rgb(0 0 0 / 0.25)`
- Modal: `0 18px 48px rgb(11 31 51 / 0.28)`

### Motion

Default 250ms `--ease-vz` (`cubic-bezier(0.25, 0.1, 0.25, 1)`).  
Modal: 380ms `cubic-bezier(0.16, 1, 0.3, 1)`, start `translateY(16px) scale(0.985) blur(5px)`.  
Respect `prefers-reduced-motion`.

---

## 6. Components

### Outline pill (appointments / primary)

White, 21px radius, navy border, 14/16 bold navy, px-4 py-3. Hover: gold border, cream fill, navy text.

On photography: same pill, uppercase 13px tracking 0.08em, px-6 py-3.5.

### Offer pill

White on cream, 13/16 bold `#937A43`, px 14 py 7. Hover: gold fill, white text.

### Solid navy

h-10/h-11, 3px radius, `#070E18`, white bold 14–15. Hover `#15202C`.

### Ghost

`border-vz-rule`, white, navy text, hover `blue-panel`.

### Brand underline

Box-shadow, never `border-bottom` (must not change layout height):

```css
box-shadow: 0 2px 0 -1px #7d6634;
```

### Forms

- Label: 13/1.3 bold ink, mb 6
- Control: min-height 46, 11×12 pad, 1px rule, 3px radius, 16/1.4
- Hover border `blue-soft`; focus navy + `0 0 0 3px rgb(11 31 51 / 0.12)`
- Consent: cream-light wash, `accent-color: #937A43`
- Action buttons show a stroke spinner while in flight

### Icons

Stroke only, `currentColor`, square caps, 1.3–1.6. No filled rounded icon sets. Service icons 48 navy; hero trust 20 gold-light.

### Hairlines

1px `--color-vz-rule`. Prefer a 1px pseudo so the row height does not grow.

---

## 7. Print / PDF

- A4 595.28 × 841.89 pt, 54 pt margins
- Ink `rgb(0.043, 0.122, 0.2)` · Navy `rgb(11, 31, 51)` · Gold `rgb(147, 122, 67)`
- Body Helvetica. Signature: Great Vibes ~19 pt

---

## 8. Do not

- Inter without the tracking correction
- Inter tracking on Georgia
- Great Vibes on the website
- Large radii, glass, heavy shadows, extra gradients
- A second primary colour
- Tailwind default breakpoints or default shadows
- Footer inside the white page card
- Orange underline via `border-bottom`

If a choice is not specified, pick the quieter one.
