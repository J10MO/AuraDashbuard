import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-chart-1",
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+180",
    trend: "up",
    icon: ShoppingCart,
    color: "text-chart-2",
  },
  {
    title: "Customers",
    value: "1,234",
    change: "+19%",
    trend: "up",
    icon: Users,
    color: "text-chart-3",
  },
  {
    title: "Products",
    value: "573",
    change: "+12",
    trend: "up",
    icon: Package,
    color: "text-chart-4",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.trend === "up"

        return (
          <Card key={stat.title} className="border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-chart-1" : "text-destructive"}`}
              >
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{stat.value}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
