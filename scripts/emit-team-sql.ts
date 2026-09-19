import { writeFileSync } from 'node:fs';
import { featuredMember, teamMembers } from '../src/data/team.ts';

function lit(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function arr(values?: string[]): string {
  if (!values?.length) return `'{}'`;
  return `ARRAY[${values.map(lit).join(', ')}]`;
}

const rows = teamMembers.map((member, index) => {
  const photoPath = member.photo ?? `/team/${member.slug}.png`;
  const storagePath = photoPath.replace(/^\/team\//, '');
  return `  (
    ${lit(member.slug)},
    ${lit(member.name)},
    ${lit(member.role)},
    ${lit(member.section)},
    ${lit(photoPath)},
    ${lit(storagePath)},
    ${lit(member.about)},
    ${arr(member.results)},
    ${arr(member.credentials)},
    ${arr(member.languages)},
    ${member.regulatoryNote ? lit(member.regulatoryNote) : 'null'},
    ${member.finmaAdviserNo ? lit(member.finmaAdviserNo) : 'null'},
    ${member.cfaRegistryNo ? lit(member.cfaRegistryNo) : 'null'},
    ${arr(member.expertise)},
    ${index},
    ${member.slug === featuredMember.slug}
  )`;
});

const sql = `-- Team roster from /about/team (src/data/team.ts).
-- Paste into the Supabase SQL editor and run.
-- Then upload public/team/*.png into Storage bucket "team" using the same filenames.

create extension if not exists pgcrypto;

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text not null,
  section text not null
    check (section in ('investment', 'business', 'investors')),
  photo_path text not null,
  photo_storage_path text not null,
  about text not null,
  results text[] not null default '{}',
  credentials text[] not null default '{}',
  languages text[] not null default '{}',
  regulatory_note text null,
  finma_adviser_no text null,
  cfa_registry_no text null,
  expertise text[] not null default '{}',
  sort_order integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_members_slug_len check (char_length(slug) between 2 and 80),
  constraint team_members_name_len check (char_length(trim(name)) >= 2),
  constraint team_members_photo_path check (photo_path like '/team/%.png'),
  constraint team_members_photo_storage check (photo_storage_path like '%.png')
);

create index if not exists team_members_section_sort_idx
  on public.team_members (section, sort_order, name);

create index if not exists team_members_featured_idx
  on public.team_members (featured)
  where featured;

create or replace function public.set_team_members_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists team_members_set_updated_at on public.team_members;
create trigger team_members_set_updated_at
before update on public.team_members
for each row execute procedure public.set_team_members_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'team',
  'team',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists team_portraits_public_read on storage.objects;
create policy team_portraits_public_read
on storage.objects
for select
to public
using (bucket_id = 'team');

alter table public.team_members enable row level security;

drop policy if exists team_members_public_read on public.team_members;
create policy team_members_public_read
on public.team_members
for select
to anon, authenticated
using (true);

revoke all on table public.team_members from anon, authenticated;
grant select on table public.team_members to anon, authenticated;
grant select, insert, update, delete on table public.team_members to service_role;

insert into public.team_members (
  slug,
  name,
  role,
  section,
  photo_path,
  photo_storage_path,
  about,
  results,
  credentials,
  languages,
  regulatory_note,
  finma_adviser_no,
  cfa_registry_no,
  expertise,
  sort_order,
  featured
)
values
${rows.join(',\n')}
on conflict (slug) do update set
  name = excluded.name,
  role = excluded.role,
  section = excluded.section,
  photo_path = excluded.photo_path,
  photo_storage_path = excluded.photo_storage_path,
  about = excluded.about,
  results = excluded.results,
  credentials = excluded.credentials,
  languages = excluded.languages,
  regulatory_note = excluded.regulatory_note,
  finma_adviser_no = excluded.finma_adviser_no,
  cfa_registry_no = excluded.cfa_registry_no,
  expertise = excluded.expertise,
  sort_order = excluded.sort_order,
  featured = excluded.featured;

-- Optional: tie intake clients to this roster once the table is seeded.
-- alter table public.clients
--   add constraint clients_instructed_person_fk
--   foreign key (instructed_person_slug)
--   references public.team_members (slug)
--   on update cascade
--   on delete set null;
`;

writeFileSync(new URL('../supabase/team.sql', import.meta.url), sql);
console.log(`Wrote ${teamMembers.length} team_members rows`);
