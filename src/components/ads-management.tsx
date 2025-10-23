import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, MousePointer } from "lucide-react"

const ads = [
  {
    id: 1,
    title: "Summer Sale",
    titleAr: "تخفيضات ;;;;;;",
    position: "home_banner",
    views: 12453,
    clicks: 892,
    isActive: true,
    startDate: "2025-01-01",
    endDate: "2025-02-28",
  },
  {
    id: 2,
    title: "New Arrivals",
    titleAr: "وصل حديثاً",
    position: "home_banner",
    views: 8234,
    clicks: 567,
    isActive: true,
    startDate: "2025-01-10",
    endDate: "2025-03-10",
  },
  {
    id: 3,
    title: "Flash Deal",
    titleAr: "عرض سريع",
    position: "sidebar",
    views: 5621,
    clicks: 423,
    isActive: false,
    startDate: "2024-12-15",
    endDate: "2025-01-15",
  },
]

export function AdsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Advertisements</h2>
          <p className="text-sm text-muted-foreground">Manage promotional ads and banners</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Ad
        </Button>
      </div>

      <div className="space-y-4">
        {ads.map((ad) => (
          <Card key={ad.id} className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{ad.title}</h3>
                  <Badge variant={ad.isActive ? "default" : "secondary"}>{ad.isActive ? "Active" : "Inactive"}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {ad.position.replace("_", " ")}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{ad.titleAr}</p>

                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{ad.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{ad.clicks.toLocaleString()} clicks</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {ad.startDate} → {ad.endDate}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
