-- Matches the live public.clients scheme: portal accounts, photo_storage_path,
-- and a private Storage bucket named clients. Safe to re-run.

do $$
begin
  if to_regclass('public.users') is not null and to_regclass('public.clients') is null then
    alter table public.users rename to clients;
  elsif to_regclass('public.users') is not null and to_regclass('public.clients') is not null then
    raise exception
      'Both public.users and public.clients exist. Move the rows, then drop public.users.';
  elsif to_regclass('public.clients') is null then
    create table public.clients (
      id uuid primary key default gen_random_uuid(),
      email text not null,
      name text,
      password text not null,
      photo_storage_path text,
      created_at timestamptz not null default now(),
      constraint clients_email_key unique (email)
    );
  end if;
end $$;

alter table public.clients
  add column if not exists photo_storage_path text;

alter table public.clients
  add column if not exists created_at timestamptz not null default now();

comment on table public.clients is
  'Portal login accounts. The password column stays named password.';

comment on column public.clients.password is
  'Stored portal secret. Do not add a second password column.';

comment on column public.clients.photo_storage_path is
  'Object name in the private storage bucket "clients". Null means no portrait.';

alter table public.clients_applicatitons
  add column if not exists photo_storage_path text;

comment on column public.clients_applicatitons.photo_storage_path is
  'Object name in the private storage bucket "clients". Null means no portrait; the console shows initials.';

insert into storage.buckets (id, name, public)
values ('clients', 'clients', false)
on conflict (id) do update set public = excluded.public;

update public.clients as account
set photo_storage_path = application.photo_storage_path
from public.clients_applicatitons as application
where account.photo_storage_path is null
  and application.photo_storage_path is not null
  and nullif(btrim(application.photo_storage_path), '') is not null
  and lower(account.email) = lower(application.email);

notify pgrst, 'reload schema';
