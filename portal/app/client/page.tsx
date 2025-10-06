import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientHeader } from "@/components/client/client-header"
import { ProjectsGrid } from "@/components/client/projects-grid"
import { ClientInfoCard } from "@/components/client/client-info-card"
import { ChatWidget } from "@/components/chat-widget"

export default async function ClientDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()

  if (profile?.role === "admin") {
    redirect("/admin")
  }

  // Get client record
  const { data: client } = await supabase.from("clients").select("*").eq("user_id", user.id).single()

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ClientHeader userName={profile?.full_name || user.email || "Client"} />
        <main className="container mx-auto p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
            <p className="text-muted-foreground">
              Your account is being set up. Please contact your administrator for access.
            </p>
          </div>
        </main>
      </div>
    )
  }

  // Fetch client's projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", client.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <ClientHeader userName={profile?.full_name || user.email || "Client"} />
      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground">View your information and project updates</p>
        </div>

        <ClientInfoCard client={client} />

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">My Projects</h2>
          <ProjectsGrid projects={projects || []} />
        </div>
      </main>

      <ChatWidget clientId={client.id} currentUserId={user.id} isAdmin={false} />
    </div>
  )
}
