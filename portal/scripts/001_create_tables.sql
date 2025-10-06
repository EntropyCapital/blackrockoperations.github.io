-- Create profiles table for user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null check (role in ('admin', 'client')),
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- Admin can view all profiles
create policy "admins_view_all_profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Users can view their own profile
create policy "users_view_own_profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "users_update_own_profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create clients table
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  company_name text,
  contact_email text,
  contact_phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.clients enable row level security;

-- Admin can view all clients
create policy "admins_view_all_clients"
  on public.clients for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can insert clients
create policy "admins_insert_clients"
  on public.clients for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can update clients
create policy "admins_update_clients"
  on public.clients for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can delete clients
create policy "admins_delete_clients"
  on public.clients for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Clients can view their own client record
create policy "clients_view_own"
  on public.clients for select
  using (user_id = auth.uid());

-- Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  name text not null,
  description text,
  status text not null check (status in ('planning', 'in_progress', 'review', 'completed', 'on_hold')),
  start_date date,
  end_date date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.projects enable row level security;

-- Admin can view all projects
create policy "admins_view_all_projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can insert projects
create policy "admins_insert_projects"
  on public.projects for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can update projects
create policy "admins_update_projects"
  on public.projects for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can delete projects
create policy "admins_delete_projects"
  on public.projects for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Clients can view their own projects
create policy "clients_view_own_projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.clients
      where id = projects.client_id and user_id = auth.uid()
    )
  );

-- Create project updates table
create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  content text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);

alter table public.project_updates enable row level security;

-- Admin can view all updates
create policy "admins_view_all_updates"
  on public.project_updates for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can insert updates
create policy "admins_insert_updates"
  on public.project_updates for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can update updates
create policy "admins_update_updates"
  on public.project_updates for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can delete updates
create policy "admins_delete_updates"
  on public.project_updates for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Clients can view updates for their projects
create policy "clients_view_own_project_updates"
  on public.project_updates for select
  using (
    exists (
      select 1 from public.projects p
      join public.clients c on c.id = p.client_id
      where p.id = project_updates.project_id and c.user_id = auth.uid()
    )
  );
