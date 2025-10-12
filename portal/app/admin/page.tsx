import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/admin-header";
import { ClientsTable } from "@/components/admin/clients-table";
import { StatsCards } from "@/components/admin/stats-cards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Profile = {
  role: string | null;
  full_name: string | null;
  email: string | null;
};

export default async function AdminDashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch the fields we actually use and type them
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  // Gate admin access
  if (profile?.role !== "admin") {
    redirect("/client");
  }

  const { data: activeClients } = await supabase
    .from("clients")
    .select(
      `
      *,
      user:profiles(full_name, email),
      projects:projects(count)
    `
    )
    .eq("archived", false);

  const { data: archivedClients } = await supabase
    .from("clients")
    .select(
      `
      *,
      user:profiles(full_name, email),
      projects:projects(count)
    `
    )
    .eq("archived", true);

  // Stats
  const { count: totalClients } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("archived", false);

  const { count: totalProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("archived", false);

  const { count: activeProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress")
    .eq("archived", false);

  const userName = profile?.full_name || user.email || "Admin";

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
  );
}
