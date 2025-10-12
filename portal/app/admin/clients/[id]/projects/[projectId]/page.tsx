import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProjectDetailsCard } from "@/components/admin/project-details-card"
import { ProjectUpdatesManager } from "@/components/admin/project-updates-manager"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>
}) {
  const { id, projectId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/client")
  }

  // Fetch project details
  const { data: project } = await supabase
    .from("projects")
    .select(
      `
      *,
      client:clients(company_name, user:profiles(full_name))
    `,
    )
    .eq("id", projectId)
    .eq("client_id", id)
    .single()

  if (!project) {
    redirect(`/admin/clients/${id}`)
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
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader userName={profile?.full_name || user.email || "Admin"} />
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/clients/${id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground">
              {project.client?.company_name || project.client?.user?.full_name || "Client Project"}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ProjectDetailsCard project={project} clientId={id} />
          <div className="lg:col-span-2">
            <ProjectUpdatesManager projectId={projectId} updates={updates || []} adminId={user.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
