-- Create client_notes table
CREATE TABLE IF NOT EXISTS public.client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_notes ENABLE ROW LEVEL SECURITY;

-- Policies for client_notes
-- Clients can view their own notes
CREATE POLICY "Clients can view own notes"
  ON public.client_notes
  FOR SELECT
  USING (client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  ));

-- Clients can insert their own notes
CREATE POLICY "Clients can insert own notes"
  ON public.client_notes
  FOR INSERT
  WITH CHECK (client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  ));

-- Clients can update their own notes
CREATE POLICY "Clients can update own notes"
  ON public.client_notes
  FOR UPDATE
  USING (client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  ));

-- Clients can delete their own notes
CREATE POLICY "Clients can delete own notes"
  ON public.client_notes
  FOR DELETE
  USING (client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  ));

-- Admins can view all notes
CREATE POLICY "Admins can view all notes"
  ON public.client_notes
  FOR SELECT
  USING (is_admin());

-- Create index for faster queries
CREATE INDEX idx_client_notes_project_id ON public.client_notes(project_id);
CREATE INDEX idx_client_notes_client_id ON public.client_notes(client_id);

-- Verify table creation
SELECT 'client_notes table created successfully' AS status;
