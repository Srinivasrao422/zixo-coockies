
-- Lock down trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- handle_new_user is a trigger; revoke direct EXECUTE
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- has_role: only allow signed-in users to evaluate (used in RLS policies)
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
