Run the SQL in supabase/clients.sql. If you generate SQL instead, follow this exactly:

Rename public.users to public.clients. Keep every row. Do not drop the table.

Leave the password column named password. Do not add password_hash, encrypted_password, or any second password column. Do not add a raw-password workflow. Do not switch these rows to Supabase Auth.

Add photo_storage_path text on public.clients. That value is the object name in Storage, not a public URL. Null means no portrait. Add created_at timestamptz not null default now() if it is missing.

Keep public.clients_applicatitons (that spelling is live). Add photo_storage_path there too if it is missing. Do not rename that table.

Create a private Storage bucket named clients (public = false, 5mb, png/jpeg/webp) if it does not exist. The API reads it with the service role. Do not add anon or authenticated storage policies that open the bucket.

When an application row and a client account share the same email, copy photo_storage_path onto the account if the account has none.

Notify PostgREST to reload the schema when you are done.
