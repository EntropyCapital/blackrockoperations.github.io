"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { AddUpdateDialog } from "./add-update-dialog"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ProjectUpdate {
  id: string
  title: string
  content: string
  created_at: string
  created_by_profile: {
    full_name: string
  } | null
}

interface ProjectUpdatesManagerProps {
  projectId: string
  updates: ProjectUpdate[]
  adminId: string
}

export function ProjectUpdatesManager({ projectId, updates, adminId }: ProjectUpdatesManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (updateId: string) => {
    if (!confirm("Are you sure you want to delete this update?")) {
      return
    }

    setDeletingId(updateId)
    try {
      const { error } = await supabase.from("project_updates").delete().eq("id", updateId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting update:", error)
      alert("Failed to delete update")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Project Updates</CardTitle>
            <CardDescription>Post updates that clients can see</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Update
          </Button>
        </CardHeader>
        <CardContent>
          {updates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">No updates yet. Post the first update for this project.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Update
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{update.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(update.id)}
                          disabled={deletingId === update.id}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{update.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(update.created_at).toLocaleDateString()}</span>
                        {update.created_by_profile && <span>By {update.created_by_profile.full_name}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddUpdateDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        projectId={projectId}
        adminId={adminId}
      />
    </>
  )
}
