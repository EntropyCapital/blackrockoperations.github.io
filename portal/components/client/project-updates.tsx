import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

interface ProjectUpdate {
  id: string
  title: string
  content: string
  created_at: string
  created_by_profile: {
    full_name: string
  } | null
}

interface ProjectUpdatesProps {
  updates: ProjectUpdate[]
}

export function ProjectUpdates({ updates }: ProjectUpdatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Updates</CardTitle>
        <CardDescription>Latest updates from your project team</CardDescription>
      </CardHeader>
      <CardContent>
        {updates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No updates yet. Your team will post updates here as work progresses.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{update.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {new Date(update.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{update.content}</p>
                {update.created_by_profile && (
                  <p className="text-xs text-muted-foreground">By {update.created_by_profile.full_name}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
