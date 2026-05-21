do $$
begin
  if not exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = 'events'
      and c.relrowsecurity = true
  ) then
    raise exception 'RLS is not enabled on public.events';
  end if;

  if not exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname = 'memory_submissions'
      and c.relrowsecurity = true
  ) then
    raise exception 'RLS is not enabled on public.memory_submissions';
  end if;

  if not exists (
    select 1
    from pg_proc
    where proname = 'submit_memory'
  ) then
    raise exception 'submit_memory RPC is missing';
  end if;

  if not exists (
    select 1
    from pg_proc
    where proname = 'generate_memory_missions'
  ) then
    raise exception 'generate_memory_missions RPC is missing';
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname like '%participant_id%mission_id%'
      and conrelid = 'public.memory_submissions'::regclass
  ) then
    raise exception 'memory_submissions must enforce one memory per mission per participant';
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'memory_reactions'
      and policyname = 'participants react to visible memories in their event'
  ) then
    raise exception 'Expected memory_reactions visibility policy is missing';
  end if;
end $$;

