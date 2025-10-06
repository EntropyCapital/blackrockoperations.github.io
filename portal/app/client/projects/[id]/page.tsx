import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientHeader } from "@/components/client/client-header"
import { ProjectHeader } from "@/components/client/project-header"
import { ProjectUpdates } from "@/components/client/project-updates"
import { ClientNotes } from "@/components/client/client-notes"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()

  // Get client record
  const { data: client } = await supabase.from("clients").select("id").eq("user_id", user.id).single()

  if (!client) {
    redirect("/client")
  }

  // Fetch project details (with RLS ensuring they can only see their own)
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).eq("client_id", client.id).single()

  if (!project) {
    redirect("/client")
  }

  // Fetch project updates
  const { data: updates } = await supabase
    .from("project_updates")
    .select(
      `
      *,
      created_by_profile:profiles!project_updates_created_by_fkey(full_name)
    `,
    )
    .eq("project_id", id)
    .order("created_at", { ascending: false })

  const { data: notes } = await supabase
    .from("client_notes")
    .select("*")
    .eq("project_id", id)
    .eq("client_id", client.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <ClientHeader userName={profile?.full_name || user.email || "Client"} />
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/client">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground">Project details and updates</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ProjectHeader project={project} />
          <div className="lg:col-span-2 space-y-6">
            <ProjectUpdates updates={updates || []} />
            <ClientNotes notes={notes || []} projectId={id} clientId={client.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
