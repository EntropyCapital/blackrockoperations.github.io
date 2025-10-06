import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Edit } from "lucide-react"
import Link from "next/link"

interface ProjectDetailsCardProps {
  project: {
    id: string
    name: string
    description: string | null
    status: string
    start_date: string | null
    end_date: string | null
  }
  clientId: string
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

export function ProjectDetailsCard({ project, clientId }: ProjectDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Details</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/clients/${clientId}`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Status</p>
          <Badge className={statusColors[project.status as keyof typeof statusColors]}>
            {statusLabels[project.status as keyof typeof statusLabels]}
          </Badge>
        </div>

        {project.description && (
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
          </div>
        )}

        {(project.start_date || project.end_date) && (
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Timeline</p>
              {project.start_date && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Start:</span> {new Date(project.start_date).toLocaleDateString()}
                </div>
              )}
              {project.end_date && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">End:</span> {new Date(project.end_date).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
