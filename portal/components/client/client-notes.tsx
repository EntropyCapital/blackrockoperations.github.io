"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StickyNote, Trash2 } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ClientNote {
  id: string
  content: string
  created_at: string
}

interface ClientNotesProps {
  notes: ClientNote[]
  projectId: string
  clientId: string
}

export function ClientNotes({ notes, projectId, clientId }: ClientNotesProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from("client_notes").insert({
        project_id: projectId,
        client_id: clientId,
        content: newNote.trim(),
      })

      if (insertError) throw insertError

      setNewNote("")
      setIsAdding(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add note")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase.from("client_notes").delete().eq("id", noteId)

      if (deleteError) throw deleteError

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete note")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Notes</CardTitle>
            <CardDescription>Add personal notes about this project</CardDescription>
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm">
              Add Note
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-4 space-y-2">
            <Textarea
              placeholder="Write your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddNote} disabled={isLoading || !newNote.trim()} size="sm">
                {isLoading ? "Saving..." : "Save Note"}
              </Button>
              <Button
                onClick={() => {
                  setIsAdding(false)
                  setNewNote("")
                  setError(null)
                }}
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        {notes.length === 0 && !isAdding ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <StickyNote className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No notes yet. Add notes to keep track of your thoughts and questions.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-amber-50 border border-amber-200 rounded-lg p-4 relative group">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs text-amber-700 font-medium">
                    {new Date(note.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteNote(note.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
                <p className="text-sm text-amber-900 whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
