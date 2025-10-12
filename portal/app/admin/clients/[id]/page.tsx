import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ClientDetails } from "@/components/admin/client-details"
import { ProjectsList } from "@/components/admin/projects-list"
import { ChatWidget } from "@/components/chat-widget"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  // Fetch client details
  const { data: client } = await supabase
    .from("clients")
    .select(
      `
      *,
      user:profiles(full_name, email)
    `,
    )
    .eq("id", id)
    .single()

  if (!client) {
    redirect("/admin")
  }

  const { data: activeProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", id)
    .eq("archived", false)
    .order("created_at", { ascending: false })

  const { data: archivedProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", id)
    .eq("archived", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader userName={profile?.full_name || user.email || "Admin"} />
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{client.company_name || "Client Details"}</h1>
            <p className="text-muted-foreground">Manage client information and projects</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ClientDetails client={client} />
          <div className="md:col-span-2">
            <ProjectsList
              clientId={id}
              activeProjects={activeProjects || []}
              archivedProjects={archivedProjects || []}
            />
          </div>
        </div>
      </main>

      <ChatWidget clientId={id} currentUserId={user.id} isAdmin={true} />
    </div>
  )
}
