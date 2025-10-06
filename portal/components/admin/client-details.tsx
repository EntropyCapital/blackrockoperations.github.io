import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Building2, Calendar } from "lucide-react"
import { EditClientDialog } from "./edit-client-dialog"

interface ClientDetailsProps {
  client: {
    id: string
    company_name: string | null
    contact_email: string | null
    contact_phone: string | null
    created_at: string
    user: {
      full_name: string
      email: string
    } | null
  }
}

export function ClientDetails({ client }: ClientDetailsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Client Information</CardTitle>
        <EditClientDialog client={client} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Company</p>
            <p className="text-sm text-muted-foreground">{client.company_name || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{client.contact_email || client.user?.email || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="text-sm text-muted-foreground">{client.contact_phone || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Client Since</p>
            <p className="text-sm text-muted-foreground">{new Date(client.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
