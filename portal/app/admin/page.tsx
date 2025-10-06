import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ClientsTable } from "@/components/admin/clients-table"
import { StatsCards } from "@/components/admin/stats-cards"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/client")
  }

  const { data: activeClients } = await supabase
    .from("clients")
    .select(`
      *,
      user:profiles(full_name, email),
      projects:projects(count)
    `)
    .eq("archived", false)

  const { data: archivedClients } = await supabase
    .from("clients")
    .select(`
      *,
      user:profiles(full_name, email),
      projects:projects(count)
    `)
    .eq("archived", true)

  // Fetch stats
  const { count: totalClients } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("archived", false)

  const { count: totalProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("archived", false)

  const { count: activeProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress")
    .eq("archived", false)

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader userName={profile?.full_name || user.email || "Admin"} />
      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your clients and their projects</p>
        </div>

        <StatsCards
          totalClients={totalClients || 0}
          totalProjects={totalProjects || 0}
          activeProjects={activeProjects || 0}
        />

        <ClientsTable activeClients={activeClients || []} archivedClients={archivedClients || []} />
      </main>
    </div>
  )
}
