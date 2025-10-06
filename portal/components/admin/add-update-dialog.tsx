"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface AddUpdateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  adminId: string
}

export function AddUpdateDialog({ open, onOpenChange, projectId, adminId }: AddUpdateDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    try {
      const { error: updateError } = await supabase.from("project_updates").insert({
        project_id: projectId,
        title,
        content,
        created_by: adminId,
      })

      if (updateError) throw updateError

      onOpenChange(false)
      router.refresh()
      // Reset form
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project Update</DialogTitle>
            <DialogDescription>Post an update that your client will see on their dashboard.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Update Title</Label>
              <Input id="title" name="title" placeholder="Milestone completed" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Update Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="We've completed the design phase and are moving into development..."
                rows={5}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
