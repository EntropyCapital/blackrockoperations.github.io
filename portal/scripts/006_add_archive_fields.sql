-- Add archived field to clients table
ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;

-- Add archived field to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;

-- Create index for faster queries on archived clients
CREATE INDEX IF NOT EXISTS idx_clients_archived ON public.clients(archived);

-- Create index for faster queries on archived projects
CREATE INDEX IF NOT EXISTS idx_projects_archived ON public.projects(archived);
