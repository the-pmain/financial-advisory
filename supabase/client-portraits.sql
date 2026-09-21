-- Client portraits, the mirror of what `employees.photo_storage_path` does for staff.
--
-- Until this runs the console still lists clients and falls back to initials:
-- the applications adapter selects `*`, so a missing column reads as no picture.
-- Saving a portrait needs the column, and needs the bucket below to exist.

alter table public.clients_applicatitons
  add column if not exists photo_storage_path text;

comment on column public.clients_applicatitons.photo_storage_path is
  'Object name in the private storage bucket "clients". Null means no portrait; the console shows initials.';

-- Private bucket: a client portrait is not public the way a staff portrait is.
-- The server reads it with the service role key and serves it behind /api/admin.
insert into storage.buckets (id, name, public)
values ('clients', 'clients', false)
on conflict (id) do nothing;
