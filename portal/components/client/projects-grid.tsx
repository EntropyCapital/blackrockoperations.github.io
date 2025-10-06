"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string | null
  status: string
  start_date: string | null
  end_date: string | null
  created_at: string
}

interface ProjectsGridProps {
  projects: Project[]
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

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No projects yet. Your administrator will add projects for you.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                {statusLabels[project.status as keyof typeof statusLabels]}
              </Badge>
            </div>
            {project.description && <CardDescription className="line-clamp-2">{project.description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(project.start_date || project.end_date) && (
                <div className="text-sm text-muted-foreground space-y-1">
                  {project.start_date && (
                    <div className="flex justify-between">
                      <span>Start:</span>
                      <span className="font-medium">{new Date(project.start_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.end_date && (
                    <div className="flex justify-between">
                      <span>End:</span>
                      <span className="font-medium">{new Date(project.end_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              )}
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/client/projects/${project.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
