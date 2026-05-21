create extension if not exists pgcrypto;

create type public.event_status as enum ('draft', 'published', 'closed', 'archived');
create type public.participant_role as enum ('host', 'participant', 'cohost');
create type public.memory_submission_status as enum ('pending', 'approved', 'hidden', 'deleted');
create type public.ai_generation_status as enum ('succeeded', 'failed', 'fallback');
create type public.ai_suggestion_decision as enum ('accepted', 'edited', 'rejected');
create type public.reaction_kind as enum ('love');

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  host_user_id uuid not null,
  title text not null check (char_length(title) between 1 and 120),
  host_description text,
  status public.event_status not null default 'draft',
  qr_slug text not null unique,
  event_start_at timestamptz,
  event_end_at timestamptz,
  missions_locked_at timestamptz,
  first_memory_submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_missions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  mission_order integer not null check (mission_order >= 0),
  prompt text not null check (char_length(prompt) between 1 and 280),
  capture_hint text,
  category text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_id, mission_order)
);

create table if not exists public.event_participants (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null,
  role public.participant_role not null default 'participant',
  display_name text,
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_id, user_id)
);

create table if not exists public.guest_mission_progress (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  participant_id uuid not null references public.event_participants(id) on delete cascade,
  mission_id uuid not null references public.event_missions(id) on delete cascade,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (participant_id, mission_id)
);

create table if not exists public.memory_submissions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  participant_id uuid not null references public.event_participants(id) on delete cascade,
  mission_id uuid not null references public.event_missions(id) on delete cascade,
  thumbnail_url text not null,
  mainsize_url text not null,
  mime_type text,
  file_size_bytes bigint,
  width integer,
  height integer,
  status public.memory_submission_status not null default 'pending',
  moderation_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (participant_id, mission_id)
);

create table if not exists public.memory_reactions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  submission_id uuid not null references public.memory_submissions(id) on delete cascade,
  participant_id uuid not null references public.event_participants(id) on delete cascade,
  reaction_kind public.reaction_kind not null default 'love',
  created_at timestamptz not null default now(),
  unique (submission_id, participant_id, reaction_kind)
);

create table if not exists public.ai_generation_runs (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  host_user_id uuid not null,
  provider text not null,
  model text not null,
  prompt_version text not null,
  status public.ai_generation_status not null,
  raw_input jsonb not null default '{}'::jsonb,
  raw_output jsonb not null default '{}'::jsonb,
  used_fallback boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_mission_suggestions (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.ai_generation_runs(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  prompt text not null,
  capture_hint text,
  category text,
  decision public.ai_suggestion_decision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_interactions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  mission_id uuid not null references public.event_missions(id) on delete cascade,
  participant_id uuid not null references public.event_participants(id) on delete cascade,
  interaction_type text not null,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.event_missions enable row level security;
alter table public.event_participants enable row level security;
alter table public.guest_mission_progress enable row level security;
alter table public.memory_submissions enable row level security;
alter table public.memory_reactions enable row level security;
alter table public.ai_generation_runs enable row level security;
alter table public.ai_mission_suggestions enable row level security;
alter table public.mission_interactions enable row level security;

create policy "hosts manage their own events"
on public.events
for all
using (auth.uid() = host_user_id)
with check (auth.uid() = host_user_id);

create policy "participants can read published events they joined"
on public.events
for select
using (
  status = 'published'
  and exists (
    select 1
    from public.event_participants ep
    where ep.event_id = events.id
      and ep.user_id = auth.uid()
  )
);

create policy "hosts manage event missions"
on public.event_missions
for all
using (
  exists (
    select 1
    from public.events e
    where e.id = event_missions.event_id
      and e.host_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.events e
    where e.id = event_missions.event_id
      and e.host_user_id = auth.uid()
  )
);

create policy "participants read active missions for joined events"
on public.event_missions
for select
using (
  is_active
  and exists (
    select 1
    from public.event_participants ep
    join public.events e on e.id = ep.event_id
    where ep.event_id = event_missions.event_id
      and ep.user_id = auth.uid()
      and e.status = 'published'
  )
);

create policy "users join published events only"
on public.event_participants
for insert
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.events e
    where e.id = event_participants.event_id
      and e.status = 'published'
  )
);

create policy "users read only their event membership"
on public.event_participants
for select
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.events e
    where e.id = event_participants.event_id
      and e.host_user_id = auth.uid()
  )
);

create policy "participants and hosts manage mission progress in event scope"
on public.guest_mission_progress
for all
using (
  exists (
    select 1
    from public.event_participants ep
    where ep.id = guest_mission_progress.participant_id
      and (
        ep.user_id = auth.uid()
        or exists (
          select 1
          from public.events e
          where e.id = guest_mission_progress.event_id
            and e.host_user_id = auth.uid()
        )
      )
  )
)
with check (
  exists (
    select 1
    from public.event_participants ep
    where ep.id = guest_mission_progress.participant_id
      and ep.user_id = auth.uid()
      and ep.event_id = guest_mission_progress.event_id
  )
);

create policy "participants submit within their own event"
on public.memory_submissions
for insert
with check (
  exists (
    select 1
    from public.event_participants ep
    join public.event_missions em on em.id = memory_submissions.mission_id
    join public.events e on e.id = ep.event_id
    where ep.id = memory_submissions.participant_id
      and ep.user_id = auth.uid()
      and ep.event_id = memory_submissions.event_id
      and em.event_id = memory_submissions.event_id
      and e.status = 'published'
  )
);

create policy "hosts and approved participants read event memories"
on public.memory_submissions
for select
using (
  exists (
    select 1
    from public.events e
    where e.id = memory_submissions.event_id
      and e.host_user_id = auth.uid()
  )
  or (
    status = 'approved'
    and exists (
      select 1
      from public.event_participants ep
      where ep.event_id = memory_submissions.event_id
        and ep.user_id = auth.uid()
    )
  )
);

create policy "hosts moderate event memories"
on public.memory_submissions
for update
using (
  exists (
    select 1
    from public.events e
    where e.id = memory_submissions.event_id
      and e.host_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.events e
    where e.id = memory_submissions.event_id
      and e.host_user_id = auth.uid()
  )
);

create policy "participants react to visible memories in their event"
on public.memory_reactions
for insert
with check (
  exists (
    select 1
    from public.memory_submissions ms
    join public.event_participants ep on ep.id = memory_reactions.participant_id
    where ms.id = memory_reactions.submission_id
      and ms.event_id = memory_reactions.event_id
      and ms.status = 'approved'
      and ep.user_id = auth.uid()
      and ep.event_id = memory_reactions.event_id
  )
);

create policy "participants read reactions in their joined event"
on public.memory_reactions
for select
using (
  exists (
    select 1
    from public.event_participants ep
    where ep.event_id = memory_reactions.event_id
      and ep.user_id = auth.uid()
  )
);

create policy "hosts read AI runs for their own events"
on public.ai_generation_runs
for select
using (
  auth.uid() = host_user_id
);

create policy "service role manages AI runs"
on public.ai_generation_runs
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "hosts read AI suggestions for their own events"
on public.ai_mission_suggestions
for select
using (
  exists (
    select 1
    from public.ai_generation_runs runs
    where runs.id = ai_mission_suggestions.run_id
      and runs.host_user_id = auth.uid()
  )
);

create policy "service role manages AI suggestions"
on public.ai_mission_suggestions
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "participants create mission interactions in-scope"
on public.mission_interactions
for insert
with check (
  exists (
    select 1
    from public.event_participants ep
    where ep.id = mission_interactions.participant_id
      and ep.user_id = auth.uid()
      and ep.event_id = mission_interactions.event_id
  )
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger touch_events_updated_at
before update on public.events
for each row execute function public.touch_updated_at();

create trigger touch_event_missions_updated_at
before update on public.event_missions
for each row execute function public.touch_updated_at();

create trigger touch_event_participants_updated_at
before update on public.event_participants
for each row execute function public.touch_updated_at();

create trigger touch_memory_submissions_updated_at
before update on public.memory_submissions
for each row execute function public.touch_updated_at();

create trigger touch_ai_mission_suggestions_updated_at
before update on public.ai_mission_suggestions
for each row execute function public.touch_updated_at();

create or replace function public.create_event_draft(title text, host_description text default null, event_start_at timestamptz default null, event_end_at timestamptz default null)
returns jsonb
language plpgsql
security definer
as $$
declare
  created_event public.events;
begin
  insert into public.events (host_user_id, title, host_description, event_start_at, event_end_at, qr_slug)
  values (auth.uid(), title, host_description, event_start_at, event_end_at, encode(gen_random_bytes(6), 'hex'))
  returning * into created_event;

  return to_jsonb(created_event);
end;
$$;

create or replace function public.generate_memory_missions(event_id uuid)
returns jsonb
language sql
security definer
as $$
  select jsonb_build_object(
    'eventId', event_id,
    'status', 'queued',
    'message', 'Edge Function should generate and persist guided missions.'
  );
$$;

create or replace function public.update_event_mission(event_id uuid, mission_id uuid, prompt text default null, capture_hint text default null, category text default null, is_active boolean default null)
returns jsonb
language plpgsql
security definer
as $$
declare
  updated_mission public.event_missions;
begin
  update public.event_missions
  set
    prompt = coalesce(update_event_mission.prompt, event_missions.prompt),
    capture_hint = coalesce(update_event_mission.capture_hint, event_missions.capture_hint),
    category = coalesce(update_event_mission.category, event_missions.category),
    is_active = coalesce(update_event_mission.is_active, event_missions.is_active)
  where id = mission_id
    and event_missions.event_id = update_event_mission.event_id
  returning * into updated_mission;

  return to_jsonb(updated_mission);
end;
$$;

create or replace function public.delete_event_mission(event_id uuid, mission_id uuid)
returns jsonb
language plpgsql
security definer
as $$
begin
  delete from public.event_missions
  where id = mission_id and event_missions.event_id = delete_event_mission.event_id;

  return jsonb_build_object('success', true);
end;
$$;

create or replace function public.reorder_event_missions(event_id uuid, mission_ids_in_order uuid[])
returns jsonb
language plpgsql
security definer
as $$
declare
  idx integer := 0;
  mission_uuid uuid;
begin
  foreach mission_uuid in array mission_ids_in_order
  loop
    update public.event_missions
    set mission_order = idx
    where id = mission_uuid and event_missions.event_id = reorder_event_missions.event_id;

    idx := idx + 1;
  end loop;

  return (
    select jsonb_agg(to_jsonb(em) order by em.mission_order)
    from public.event_missions em
    where em.event_id = reorder_event_missions.event_id
  );
end;
$$;

create or replace function public.publish_event(event_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
  published_event public.events;
begin
  update public.events
  set status = 'published'
  where id = event_id
  returning * into published_event;

  return to_jsonb(published_event);
end;
$$;

create or replace function public.get_host_event(event_id uuid)
returns jsonb
language sql
security definer
as $$
  select jsonb_build_object(
    'event', (select to_jsonb(e) from public.events e where e.id = get_host_event.event_id),
    'missions', coalesce((select jsonb_agg(to_jsonb(m) order by m.mission_order) from public.event_missions m where m.event_id = get_host_event.event_id), '[]'::jsonb),
    'participants', coalesce((select jsonb_agg(to_jsonb(p)) from public.event_participants p where p.event_id = get_host_event.event_id), '[]'::jsonb)
  );
$$;

create or replace function public.get_host_submissions(event_id uuid, submission_status public.memory_submission_status default null)
returns jsonb
language sql
security definer
as $$
  select coalesce(
    (
      select jsonb_agg(to_jsonb(ms) order by ms.created_at desc)
      from public.memory_submissions ms
      where ms.event_id = get_host_submissions.event_id
        and (submission_status is null or ms.status = submission_status)
    ),
    '[]'::jsonb
  );
$$;

create or replace function public.moderate_submission(event_id uuid, submission_id uuid, action text, reason text default null)
returns jsonb
language plpgsql
security definer
as $$
declare
  next_status public.memory_submission_status;
  moderated_submission public.memory_submissions;
begin
  next_status := case action
    when 'approve' then 'approved'
    when 'hide' then 'hidden'
    when 'delete' then 'deleted'
    else null
  end;

  if next_status is null then
    raise exception 'Unsupported moderation action: %', action;
  end if;

  update public.memory_submissions
  set status = next_status, moderation_reason = reason
  where id = submission_id and memory_submissions.event_id = moderate_submission.event_id
  returning * into moderated_submission;

  return to_jsonb(moderated_submission);
end;
$$;

create or replace function public.join_event_as_participant(qr_slug text, display_name text default null)
returns jsonb
language plpgsql
security definer
as $$
declare
  target_event public.events;
  joined_participant public.event_participants;
begin
  select *
  into target_event
  from public.events
  where events.qr_slug = join_event_as_participant.qr_slug
    and events.status = 'published';

  if target_event.id is null then
    raise exception 'Event is not available for joining.';
  end if;

  insert into public.event_participants (event_id, user_id, display_name)
  values (target_event.id, auth.uid(), display_name)
  on conflict (event_id, user_id) do update
  set display_name = excluded.display_name
  returning * into joined_participant;

  return to_jsonb(joined_participant);
end;
$$;

create or replace function public.get_participant_event_state(event_id uuid)
returns jsonb
language sql
security definer
as $$
  select jsonb_build_object(
    'event', (select to_jsonb(e) from public.events e where e.id = get_participant_event_state.event_id),
    'participant', (
      select to_jsonb(ep)
      from public.event_participants ep
      where ep.event_id = get_participant_event_state.event_id
        and ep.user_id = auth.uid()
    ),
    'progressCount', (
      select count(*)
      from public.guest_mission_progress gmp
      join public.event_participants ep on ep.id = gmp.participant_id
      where gmp.event_id = get_participant_event_state.event_id
        and ep.user_id = auth.uid()
        and gmp.completed_at is not null
    )
  );
$$;

create or replace function public.get_participant_active_missions(event_id uuid)
returns jsonb
language sql
security definer
as $$
  select jsonb_build_object(
    'participant', (
      select to_jsonb(ep)
      from public.event_participants ep
      where ep.event_id = get_participant_active_missions.event_id
        and ep.user_id = auth.uid()
    ),
    'missions', coalesce(
      (
        select jsonb_agg(to_jsonb(em) order by em.mission_order)
        from public.event_missions em
        where em.event_id = get_participant_active_missions.event_id
          and em.is_active = true
      ),
      '[]'::jsonb
    )
  );
$$;

create or replace function public.submit_memory(
  event_id uuid,
  participant_id uuid,
  mission_id uuid,
  mainsize_url text,
  thumbnail_url text,
  mime_type text default null,
  file_size_bytes bigint default null,
  width integer default null,
  height integer default null
)
returns jsonb
language plpgsql
security definer
as $$
declare
  created_submission public.memory_submissions;
  next_mission_id uuid;
begin
  insert into public.memory_submissions (
    event_id,
    participant_id,
    mission_id,
    mainsize_url,
    thumbnail_url,
    mime_type,
    file_size_bytes,
    width,
    height
  )
  values (
    event_id,
    participant_id,
    mission_id,
    mainsize_url,
    thumbnail_url,
    mime_type,
    file_size_bytes,
    width,
    height
  )
  returning * into created_submission;

  insert into public.guest_mission_progress (event_id, participant_id, mission_id, completed_at)
  values (event_id, participant_id, mission_id, now())
  on conflict (participant_id, mission_id) do update set completed_at = excluded.completed_at;

  update public.events
  set first_memory_submitted_at = coalesce(first_memory_submitted_at, now())
  where id = event_id;

  select em.id
  into next_mission_id
  from public.event_missions em
  where em.event_id = submit_memory.event_id
    and em.mission_order > (
      select mission_order from public.event_missions where id = submit_memory.mission_id
    )
  order by em.mission_order asc
  limit 1;

  return jsonb_build_object(
    'submissionId', created_submission.id,
    'completedMissionId', mission_id,
    'nextMissionId', next_mission_id
  );
end;
$$;

create or replace function public.get_approved_memories(event_id uuid)
returns jsonb
language sql
security definer
as $$
  select coalesce(
    (
      select jsonb_agg(to_jsonb(ms) order by ms.created_at desc)
      from public.memory_submissions ms
      where ms.event_id = get_approved_memories.event_id
        and ms.status = 'approved'
    ),
    '[]'::jsonb
  );
$$;

create or replace function public.react_to_memory(event_id uuid, submission_id uuid, reaction_kind public.reaction_kind default 'love')
returns jsonb
language plpgsql
security definer
as $$
declare
  participant_row public.event_participants;
  created_reaction public.memory_reactions;
begin
  select *
  into participant_row
  from public.event_participants
  where event_participants.event_id = react_to_memory.event_id
    and event_participants.user_id = auth.uid();

  delete from public.memory_reactions
  where memory_reactions.event_id = react_to_memory.event_id
    and memory_reactions.submission_id = react_to_memory.submission_id
    and memory_reactions.participant_id = participant_row.id
    and memory_reactions.reaction_kind = react_to_memory.reaction_kind
  returning * into created_reaction;

  if created_reaction.id is not null then
    return jsonb_build_object('active', false, 'reaction', null);
  end if;

  insert into public.memory_reactions (event_id, submission_id, participant_id, reaction_kind)
  values (event_id, submission_id, participant_row.id, reaction_kind)
  returning * into created_reaction;

  return jsonb_build_object('active', true, 'reaction', to_jsonb(created_reaction));
end;
$$;

create or replace function public.get_moments_people_loved(event_id uuid, result_limit integer default 24)
returns jsonb
language sql
security definer
as $$
  select coalesce(
    (
      select jsonb_agg(item order by (item->>'loveCount')::integer desc, item->>'createdAt' desc)
      from (
        select jsonb_build_object(
          'submissionId', ms.id,
          'eventId', ms.event_id,
          'missionId', ms.mission_id,
          'participantId', ms.participant_id,
          'thumbnailUrl', ms.thumbnail_url,
          'mainsizeUrl', ms.mainsize_url,
          'loveCount', count(mr.id),
          'createdAt', ms.created_at
        ) as item
        from public.memory_submissions ms
        left join public.memory_reactions mr on mr.submission_id = ms.id
        where ms.event_id = get_moments_people_loved.event_id
          and ms.status = 'approved'
        group by ms.id
        order by count(mr.id) desc, ms.created_at desc
        limit result_limit
      ) ranked
    ),
    '[]'::jsonb
  );
$$;

create or replace function public.record_ai_suggestion_decision(suggestion_id uuid, event_id uuid, decision public.ai_suggestion_decision, edited_prompt text default null)
returns jsonb
language plpgsql
security definer
as $$
begin
  update public.ai_mission_suggestions
  set
    decision = record_ai_suggestion_decision.decision,
    prompt = coalesce(edited_prompt, ai_mission_suggestions.prompt)
  where id = suggestion_id
    and ai_mission_suggestions.event_id = record_ai_suggestion_decision.event_id;

  return jsonb_build_object('success', true);
end;
$$;

revoke all on function public.create_event_draft(text, text, timestamptz, timestamptz) from public;
revoke all on function public.generate_memory_missions(uuid) from public;
revoke all on function public.update_event_mission(uuid, uuid, text, text, text, boolean) from public;
revoke all on function public.delete_event_mission(uuid, uuid) from public;
revoke all on function public.reorder_event_missions(uuid, uuid[]) from public;
revoke all on function public.publish_event(uuid) from public;
revoke all on function public.get_host_event(uuid) from public;
revoke all on function public.get_host_submissions(uuid, public.memory_submission_status) from public;
revoke all on function public.moderate_submission(uuid, uuid, text, text) from public;
revoke all on function public.join_event_as_participant(text, text) from public;
revoke all on function public.get_participant_event_state(uuid) from public;
revoke all on function public.get_participant_active_missions(uuid) from public;
revoke all on function public.submit_memory(uuid, uuid, uuid, text, text, text, bigint, integer, integer) from public;
revoke all on function public.get_approved_memories(uuid) from public;
revoke all on function public.react_to_memory(uuid, uuid, public.reaction_kind) from public;
revoke all on function public.get_moments_people_loved(uuid, integer) from public;
revoke all on function public.record_ai_suggestion_decision(uuid, uuid, public.ai_suggestion_decision, text) from public;

grant execute on function public.create_event_draft(text, text, timestamptz, timestamptz) to authenticated;
grant execute on function public.generate_memory_missions(uuid) to authenticated;
grant execute on function public.update_event_mission(uuid, uuid, text, text, text, boolean) to authenticated;
grant execute on function public.delete_event_mission(uuid, uuid) to authenticated;
grant execute on function public.reorder_event_missions(uuid, uuid[]) to authenticated;
grant execute on function public.publish_event(uuid) to authenticated;
grant execute on function public.get_host_event(uuid) to authenticated;
grant execute on function public.get_host_submissions(uuid, public.memory_submission_status) to authenticated;
grant execute on function public.moderate_submission(uuid, uuid, text, text) to authenticated;
grant execute on function public.join_event_as_participant(text, text) to authenticated;
grant execute on function public.get_participant_event_state(uuid) to authenticated;
grant execute on function public.get_participant_active_missions(uuid) to authenticated;
grant execute on function public.submit_memory(uuid, uuid, uuid, text, text, text, bigint, integer, integer) to authenticated;
grant execute on function public.get_approved_memories(uuid) to authenticated;
grant execute on function public.react_to_memory(uuid, uuid, public.reaction_kind) to authenticated;
grant execute on function public.get_moments_people_loved(uuid, integer) to authenticated;
grant execute on function public.record_ai_suggestion_decision(uuid, uuid, public.ai_suggestion_decision, text) to authenticated;
