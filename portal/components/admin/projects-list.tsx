"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, MessageSquare, Archive, ArchiveRestore } from "lucide-react"
import { useState } from "react"
import { AddProjectDialog } from "./add-project-dialog"
import { EditProjectDialog } from "./edit-project-dialog"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string
  name: string
  description: string | null
  status: string
  start_date: string | null
  end_date: string | null
  created_at: string
  archived: boolean
}

interface ProjectsListProps {
  clientId: string
  activeProjects: Project[]
  archivedProjects: Project[]
}

const statusColors = {
  planning: "bg-blue-100 text-blue-800",
  in_progress: "bg-green-100 text-green-800",
  review: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  on_hold: "bg-red-100 text-red-800",
}

const statusLabels = {
  planning: "Planning",
  in_progress: "In Progress",
  review: "Review",
  completed: "Completed",
  on_hold: "On Hold",
}

export function ProjectsList({ clientId, activeProjects, archivedProjects }: ProjectsListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [archivingId, setArchivingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleArchiveToggle = async (projectId: string, currentArchived: boolean) => {
    setArchivingId(projectId)
    const { error } = await supabase.from("projects").update({ archived: !currentArchived }).eq("id", projectId)

    if (error) {
      console.error("Error toggling archive:", error)
    } else {
      router.refresh()
    }
    setArchivingId(null)
  }

  const renderProjectsList = (projects: Project[], showArchiveButton: boolean) => (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{project.name}</h3>
                <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                  {statusLabels[project.status as keyof typeof statusLabels]}
                </Badge>
              </div>
              {project.description && <p className="text-sm text-muted-foreground">{project.description}</p>}
              <div className="flex gap-4 text-xs text-muted-foreground">
                {project.start_date && <span>Start: {new Date(project.start_date).toLocaleDateString()}</span>}
                {project.end_date && <span>End: {new Date(project.end_date).toLocaleDateString()}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/clients/${clientId}/projects/${project.id}`}>
                  <MessageSquare className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setEditingProject(project)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleArchiveToggle(project.id, project.archived)}
                disabled={archivingId === project.id}
              >
                {showArchiveButton ? <Archive className="h-4 w-4" /> : <ArchiveRestore className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage projects for this client</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">Active Projects ({activeProjects.length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({archivedProjects.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              {activeProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No active projects yet. Add the first project to get started.
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </div>
              ) : (
                renderProjectsList(activeProjects, true)
              )}
            </TabsContent>
            <TabsContent value="archived" className="mt-4">
              {archivedProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No archived projects.</p>
                </div>
              ) : (
                renderProjectsList(archivedProjects, false)
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddProjectDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} clientId={clientId} />
      {editingProject && (
        <EditProjectDialog
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
          project={editingProject}
        />
      )}
    </>
  )
}
