import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"

const categories = [
  { id: 1, name: "Electronics", nameAr: "إلكترونيات", products: 145, icon: "📱", color: "#3b82f6" },
  { id: 2, name: "Fashion", nameAr: "أزياء", products: 234, icon: "👕", color: "#ec4899" },
  { id: 3, name: "Home & Garden", nameAr: "منزل وحديقة", products: 89, icon: "🏠", color: "#10b981" },
  { id: 4, name: "Sports", nameAr: "رياضة", products: 67, icon: "⚽", color: "#f59e0b" },
  { id: 5, name: "Books", nameAr: "كتب", products: 123, icon: "📚", color: "#8b5cf6" },
]

export function CategoryManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Categories</h2>
          <p className="text-sm text-muted-foreground">Manage product categories</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.nameAr}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="secondary">{category.products} products</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
