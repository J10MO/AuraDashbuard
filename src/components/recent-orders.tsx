import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, MoreHorizontal } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "Ahmed Ali",
    total: "$234.00",
    status: "delivered",
    date: "2025-01-15",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Sara Mohammed",
    total: "$156.00",
    status: "shipped",
    date: "2025-01-14",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Omar Hassan",
    total: "$89.00",
    status: "preparing",
    date: "2025-01-14",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Fatima Khalil",
    total: "$445.00",
    status: "confirmed",
    date: "2025-01-13",
    items: 5,
  },
  {
    id: "ORD-005",
    customer: "Youssef Ibrahim",
    total: "$123.00",
    status: "pending",
    date: "2025-01-13",
    items: 2,
  },
]

const statusColors = {
  delivered: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  shipped: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  preparing: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  confirmed: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  pending: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

export function RecentOrders({ showAll = false }: { showAll?: boolean }) {
  return (
    <Card className="border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{showAll ? "All Orders" : "Recent Orders"}</h3>
          <p className="text-sm text-muted-foreground">
            {showAll ? "Manage and track all orders" : "Latest customer orders"}
          </p>
        </div>
        {showAll && (
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Order ID</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Customer</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Date</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Items</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Total</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0">
                <td className="py-4 text-sm font-medium text-foreground">{order.id}</td>
                <td className="py-4 text-sm text-foreground">{order.customer}</td>
                <td className="py-4 text-sm text-muted-foreground">{order.date}</td>
                <td className="py-4 text-sm text-muted-foreground">{order.items}</td>
                <td className="py-4 text-sm font-medium text-foreground">{order.total}</td>
                <td className="py-4">
                  <Badge
                    variant="outline"
                    className={`capitalize ${statusColors[order.status as keyof typeof statusColors]}`}
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
