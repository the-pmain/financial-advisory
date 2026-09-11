-- Clients intake + 1:1 document bags.
-- Columns match the employee profile consultation form:
--   name, email, phone, consent, instructed_person_slug (adviser slug)
-- plus is_test for staff. Do not add occupation or date_of_birth.

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  consent boolean not null default false,
  instructed_person_slug text null,
  is_test boolean not null default false,
  constraint clients_name_len check (char_length(trim(name)) >= 2),
  constraint clients_email_lower check (email = lower(email)),
  constraint clients_email_len check (char_length(email) <= 254),
  constraint clients_phone_len check (char_length(phone) <= 80),
  constraint clients_slug_len check (
    instructed_person_slug is null
    or char_length(instructed_person_slug) <= 80
  )
);

create index if not exists clients_created_at_id_idx
  on public.clients (created_at desc, id desc);

create index if not exists clients_is_test_idx
  on public.clients (is_test);

create table if not exists public.clients_documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique
    references public.clients (id) on delete cascade,
  documents jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint clients_documents_shape_check check (
    jsonb_typeof(documents) = 'object'
    and documents ? 'agreement'
    and documents ? 'claim'
    and documents ? 'release'
  )
);

create or replace function public.set_clients_documents_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists clients_documents_set_updated_at on public.clients_documents;
create trigger clients_documents_set_updated_at
before update on public.clients_documents
for each row execute procedure public.set_clients_documents_updated_at();

alter table public.clients enable row level security;
alter table public.clients_documents enable row level security;

revoke all on table public.clients from anon, authenticated;
revoke all on table public.clients_documents from anon, authenticated;

grant select, insert, update, delete on table public.clients to service_role;
grant select, insert, update, delete on table public.clients_documents to service_role;
