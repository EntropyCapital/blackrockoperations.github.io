-- Drop all existing policies to start fresh
drop policy if exists "admins_view_all_profiles" on public.profiles;
drop policy if exists "users_view_own_profile" on public.profiles;
drop policy if exists "users_update_own_profile" on public.profiles;
drop policy if exists "admins_view_all_clients" on public.clients;
drop policy if exists "admins_insert_clients" on public.clients;
drop policy if exists "admins_update_clients" on public.clients;
drop policy if exists "admins_delete_clients" on public.clients;
drop policy if exists "clients_view_own" on public.clients;
drop policy if exists "admins_view_all_projects" on public.projects;
drop policy if exists "admins_insert_projects" on public.projects;
drop policy if exists "admins_update_projects" on public.projects;
drop policy if exists "admins_delete_projects" on public.projects;
drop policy if exists "clients_view_own_projects" on public.projects;
drop policy if exists "admins_view_all_updates" on public.project_updates;
drop policy if exists "admins_insert_updates" on public.project_updates;
drop policy if exists "admins_update_updates" on public.project_updates;
drop policy if exists "admins_delete_updates" on public.project_updates;
drop policy if exists "clients_view_own_project_updates" on public.project_updates;

-- Create a security definer function to check if user is admin
-- This bypasses RLS to prevent infinite recursion
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- PROFILES TABLE POLICIES
-- Users can always view their own profile (no recursion here)
create policy "users_view_own_profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Admins can view all profiles using the security definer function
create policy "admins_view_all_profiles"
  on public.profiles for select
  using (public.is_admin());

-- Users can update their own profile
create policy "users_update_own_profile"
  on public.profiles for update
  using (auth.uid() = id);

-- CLIENTS TABLE POLICIES
create policy "admins_view_all_clients"
  on public.clients for select
  using (public.is_admin());

create policy "admins_insert_clients"
  on public.clients for insert
  with check (public.is_admin());

create policy "admins_update_clients"
  on public.clients for update
  using (public.is_admin());

create policy "admins_delete_clients"
  on public.clients for delete
  using (public.is_admin());

create policy "clients_view_own"
  on public.clients for select
  using (user_id = auth.uid());

-- PROJECTS TABLE POLICIES
create policy "admins_view_all_projects"
  on public.projects for select
  using (public.is_admin());

create policy "admins_insert_projects"
  on public.projects for insert
  with check (public.is_admin());

create policy "admins_update_projects"
  on public.projects for update
  using (public.is_admin());

create policy "admins_delete_projects"
  on public.projects for delete
  using (public.is_admin());

create policy "clients_view_own_projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.clients
      where id = projects.client_id and user_id = auth.uid()
    )
  );

-- PROJECT UPDATES TABLE POLICIES
create policy "admins_view_all_updates"
  on public.project_updates for select
  using (public.is_admin());

create policy "admins_insert_updates"
  on public.project_updates for insert
  with check (public.is_admin());

create policy "admins_update_updates"
  on public.project_updates for update
  using (public.is_admin());

create policy "admins_delete_updates"
  on public.project_updates for delete
  using (public.is_admin());

create policy "clients_view_own_project_updates"
  on public.project_updates for select
  using (
    exists (
      select 1 from public.projects p
      join public.clients c on c.id = p.client_id
      where p.id = project_updates.project_id and c.user_id = auth.uid()
    )
  );
