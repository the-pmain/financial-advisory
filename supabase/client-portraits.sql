-- Superseded by supabase/clients.sql, which also renames public.users → public.clients
-- and adds photo_storage_path on the portal account. Re-run that file; these
-- statements stay here so an older checklist still works.

alter table public.clients_applicatitons
  add column if not exists photo_storage_path text;

comment on column public.clients_applicatitons.photo_storage_path is
  'Object name in the private storage bucket "clients". Null means no portrait; the console shows initials.';

insert into storage.buckets (id, name, public)
values ('clients', 'clients', false)
on conflict (id) do nothing;
