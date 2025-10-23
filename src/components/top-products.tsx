import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
  { id: 1, name: "Wireless Headphones", sales: 1234, revenue: "$24,680", trend: "+12%" },
  { id: 2, name: "Smart Watch", sales: 987, revenue: "$19,740", trend: "+8%" },
  { id: 3, name: "Laptop Stand", sales: 856, revenue: "$17,120", trend: "+15%" },
  { id: 4, name: "USB-C Cable", sales: 743, revenue: "$7,430", trend: "+5%" },
  { id: 5, name: "Phone Case", sales: 621, revenue: "$6,210", trend: "+3%" },
]

export function TopProducts() {
  return (
    <Card className="border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Products</h3>
        <p className="text-sm text-muted-foreground">Best selling products this month</p>
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-medium text-foreground">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.sales} sales</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{product.revenue}</p>
              <Badge variant="secondary" className="mt-1 text-xs text-chart-1">
                {product.trend}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
