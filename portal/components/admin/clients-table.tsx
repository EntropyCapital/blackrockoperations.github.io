"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Archive, ArchiveRestore } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AddClientDialog } from "./add-client-dialog"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Client {
  id: string
  company_name: string | null
  contact_email: string | null
  contact_phone: string | null
  created_at: string
  archived: boolean
  user: {
    full_name: string
    email: string
  } | null
  projects: { count: number }[]
}

interface ClientsTableProps {
  activeClients: Client[]
  archivedClients: Client[]
}

export function ClientsTable({ activeClients, archivedClients }: ClientsTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [archivingId, setArchivingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleArchiveToggle = async (clientId: string, currentArchived: boolean) => {
    setArchivingId(clientId)
    const { error } = await supabase.from("clients").update({ archived: !currentArchived }).eq("id", clientId)

    if (error) {
      console.error("Error toggling archive:", error)
    } else {
      router.refresh()
    }
    setArchivingId(null)
  }

  const renderClientTable = (clients: Client[], showArchiveButton: boolean) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Projects</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.company_name || "N/A"}</TableCell>
            <TableCell>{client.user?.full_name || "N/A"}</TableCell>
            <TableCell>{client.contact_email || client.user?.email || "N/A"}</TableCell>
            <TableCell>
              <Badge variant="secondary">{client.projects?.[0]?.count || 0} projects</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/clients/${client.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleArchiveToggle(client.id, client.archived)}
                  disabled={archivingId === client.id}
                >
                  {showArchiveButton ? (
                    <>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </>
                  ) : (
                    <>
                      <ArchiveRestore className="mr-2 h-4 w-4" />
                      Restore
                    </>
                  )}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Clients</CardTitle>
            <CardDescription>Manage your client accounts and their projects</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">Active Clients ({activeClients.length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({archivedClients.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              {activeClients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No active clients yet. Add your first client to get started.
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Client
                  </Button>
                </div>
              ) : (
                renderClientTable(activeClients, true)
              )}
            </TabsContent>
            <TabsContent value="archived" className="mt-4">
              {archivedClients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No archived clients.</p>
                </div>
              ) : (
                renderClientTable(archivedClients, false)
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddClientDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </>
  )
}
