import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Building2, Calendar } from "lucide-react"

interface ClientInfoCardProps {
  client: {
    company_name: string | null
    contact_email: string | null
    contact_phone: string | null
    created_at: string
  }
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Information</CardTitle>
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
            <p className="text-sm text-muted-foreground">{client.contact_email || "N/A"}</p>
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
