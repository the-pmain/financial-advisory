# Supabase prompt: team table + portraits

Paste this into Cursor or follow it in the Supabase dashboard. Source of truth is `/about/team` (`src/data/team.ts`). There are **20 people**. Every one has a PNG in `public/team/{slug}.png`.

## What to run

1. Open **Supabase → SQL Editor**.
2. Paste and run the whole file `supabase/team.sql`.
3. That creates `public.team_members`, seeds all 20 rows (including `photo_path` and `photo_storage_path`), creates public Storage bucket `team`, and allows public read of portraits.

## Register the profile pictures

SQL cannot upload binary files. After the SQL succeeds:

1. Open **Supabase → Storage → team**.
2. Upload every file from `public/team/` **without renaming**:

| File | Person |
| --- | --- |
| `friedrich-hartmann.png` | Friedrich Hartmann (featured, Chairman and CIO) |
| `karin-vogel.png` | Karin Vogel |
| `lukas-steiner.png` | Lukas Steiner |
| `maximilian-berger.png` | Maximilian Berger |
| `julian-vogt.png` | Julian Vogt |
| `ken-wagner.png` | Ken Wagner |
| `stefan-richter.png` | Stefan Richter |
| `greta-keller.png` | Greta Keller |
| `tobias-brandt.png` | Tobias Brandt |
| `markus-engel.png` | Markus Engel |
| `marc-weber.png` | Marc Weber |
| `andrew-ramsden.png` | Andrew Ramsden |
| `andrew-savage.png` | Andrew Savage |
| `anja-hoffmann.png` | Anja Hoffmann |
| `florian-bauer.png` | Florian Bauer |
| `erik-schneider.png` | Erik Schneider |
| `birgit-schulz.png` | Birgit Schulz |
| `alexander-koch.png` | Alexander Koch |
| `leon-roth.png` | Leon Roth |
| `henrik-meier.png` | Henrik Meier |

3. Public URL for each row:

```
{SUPABASE_URL}/storage/v1/object/public/team/{photo_storage_path}
```

Example: `https://YOUR-PROJECT.supabase.co/storage/v1/object/public/team/friedrich-hartmann.png`

Site path (already on the row): `/team/friedrich-hartmann.png`

## Table

`public.team_members`

| Column | Meaning |
| --- | --- |
| `slug` | URL / `instructed_person_slug` key |
| `name`, `role`, `section` | `investment` \| `business` \| `investors` |
| `photo_path` | Site path `/team/{slug}.png` |
| `photo_storage_path` | Object key in bucket `team` |
| `about`, `results[]` | Profile copy |
| `credentials[]`, `languages[]`, `expertise[]` | Optional lists |
| `finma_adviser_no`, `cfa_registry_no`, `regulatory_note` | Optional |
| `sort_order` | Page order (0 = featured) |
| `featured` | Friedrich Hartmann |

RLS: public **select**. Writes: `service_role` only.

## Check

```sql
select slug, name, role, section, photo_path, photo_storage_path, featured
from public.team_members
order by sort_order;
-- expect 20 rows, 20 distinct photo_storage_path values
```

Regenerate the SQL after roster edits:

```bash
npx tsx scripts/emit-team-sql.ts
```
