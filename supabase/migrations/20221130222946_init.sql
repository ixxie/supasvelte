
create table if not exists
  member (
    member_id uuid not null primary key references auth.users(id)
    ,first_name text
    ,last_name text
  );
alter table member enable row level security;

create type space_type as enum ('public', 'private');

create table if not exists
  space (
    space_id varchar(16) not null primary key
    ,space_type space_type not null default 'private'
    ,owner_id uuid not null references auth.users(id)
    ,icon varchar(256)
    ,name varchar(256)
  );
alter table space enable row level security;

create type role_type as enum ('owner', 'admin', 'member');

create table if not exists
  role (
    role_id varchar(16) not null primary key
    ,role_type role_type not null
    ,member_id uuid not null references auth.users(id)
    ,space_id varchar(16) not null references space(space_id)
  );
alter table role enable row level security;

create table if not exists post (
  post_id varchar(16) primary key
  ,space_id varchar(16) references space(space_id)
  ,member_id uuid not null references auth.users(id)
  ,body text
);
alter table post enable row level security;

-- SECURITY POLICIES

-- Mote:
--   USING is for checking existing data
--   WITH CHECK is for validating new data
-- for more infor, see:
--   https://www.postgresql.org/docs/current/sql-createpolicy.html
--   https://www.postgresql.org/message-id/CAEZATCVRvku%2B_3Dv9H%2BO3Ur7QgMguXS80Ya%2BwAVPi1Dnb_8oCg%40mail.gmail.com

-- general member policies

create policy "members control their own personal data"
  on member for all
  using (
    member_id = auth.uid() -- user can manage own data
  );

create policy "member profiles are visible to other members in the space"
  on member for select
  using (
    member_id in ( -- members of...
      select member_id
      from role
      where space_id in ( -- all spaces...
        select space_id
        from role
        where member_id = auth.uid()
      )
    )
  );

-- SPACES

-- TODO space visibility based of space_type

-- owners

create policy "anybody can create spaces but they must become it's owner"
  on space for insert
  with check (
    owner_id = auth.uid()
  );

create policy "owners can do anything with a space"
  on space for all
  using (
    owner_id = auth.uid()
  );

create policy "owners can assign any role to their space"
  on role for insert
  with check (
    space_id in (
      select space_id
      from space
      where owner_id = auth.uid()
    )
  );

create policy "owners can manage any role in their space"
  on role for all 
  using (
    space_id in (
      select space_id
      from space
      where owner_id = auth.uid()
    )
  );

-- admins

create policy "admins can manage lower roles and promote to admin"
  on role for all
  using (
    space_id in ( -- active user is admin of the space
      select space_id
      from role
      where member_id = auth.uid()
      and role_type = 'admin'
    ) -- and the managed role is member
    and role_type = 'member'
  )
  with check (
    space_id in ( -- active user is admin of the space
      select space_id
      from role
      where member_id = auth.uid()
      and role_type = 'admin'
    ) -- note there is no restriction on the new role
    -- meaning admins can promote others to admin
  );



-- RPC

create or replace function echo(
  phrase text,
  delay integer = 3
) returns text as $$

  select (result.phrase) from (
    select pg_sleep(delay) as delay, phrase as phrase
  ) as result;

$$ language sql;
