The portal accounts table is public.clients (renamed from public.users). Do not recreate public.users.

The portal stores the secret in the existing password column. Leave the column named password. Do not add a raw-password workflow.

Portraits: photo_storage_path on public.clients and on public.clients_applicatitons, objects in the private Storage bucket clients. Run supabase/clients.sql.
