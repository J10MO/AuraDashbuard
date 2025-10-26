// "use client"

// import { useEffect, useState } from "react"
// import { DashboardLayout } from "@/components/DashboardLayout"
// import { orderService } from "@/services/orderService"
// import type { Order } from "@/types"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../components/ui/alert-dialog"
// import { toast } from "sonner"
// import { format } from "date-fns"
// import { Package, Search, User, MapPin, Phone, Calendar, DollarSign, Trash2 } from "lucide-react"

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [statusFilter, setStatusFilter] = useState<string>("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [orderToDelete, setOrderToDelete] = useState<number | null>(null)
//   const [isDeleting, setIsDeleting] = useState(false)

//   useEffect(() => {
//     fetchOrders()
//   }, [])

//   const fetchOrders = async () => {
//     try {
//       console.log("[v0] Fetching orders...")
//       const data = await orderService.getOrders()
//       console.log("[v0] Orders received:", data)
//       setOrders(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("[v0] Failed to fetch orders:", error)
//       toast.error("Failed to load orders")
//       setOrders([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleStatusChange = async (orderId: number, newStatus: string) => {
//     try {
//       await orderService.updateOrderStatus(orderId, newStatus)
//       setOrders(
//         orders.map((order) => (order.id === orderId ? { ...order, status: newStatus as Order["status"] } : order)),
//       )
//       toast.success("Order status updated successfully")
//     } catch (error) {
//       console.error("[v0] Failed to update order status:", error)
//       toast.error("Failed to update order status")
//     }
//   }

//   const handleDeleteClick = (orderId: number) => {
//     setOrderToDelete(orderId)
//     setDeleteDialogOpen(true)
//   }

//   const handleDeleteConfirm = async () => {
//     if (!orderToDelete) return

//     setIsDeleting(true)
//     try {
//       await orderService.deleteOrder(orderToDelete)
//       setOrders(orders.filter((order) => order.id !== orderToDelete))
//       toast.success("Order deleted successfully")
//       setDeleteDialogOpen(false)
//       setOrderToDelete(null)
//     } catch (error) {
//       console.error("[v0] Failed to delete order:", error)
//       toast.error("Failed to delete order")
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   const getStatusColor = (status: string) => {
//     const colors = {
//       pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
//       processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
//       shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
//       delivered: "bg-green-500/10 text-green-600 border-green-500/20",
//       cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
//     }
//     return colors[status as keyof typeof colors] || colors.pending
//   }

//   const filteredOrders = orders.filter((order) => {
//     const matchesStatus = statusFilter === "all" || order.status === statusFilter
//     const matchesSearch =
//       searchQuery === "" ||
//       order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.delivery_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.delivery_phone.includes(searchQuery)
//     return matchesStatus && matchesSearch
//   })

//   const stats = {
//     total: orders.length,
//     pending: orders.filter((o) => o.status === "pending").length,
//     shipped: orders.filter((o) => o.status === "shipped").length,
//     delivered: orders.filter((o) => o.status === "delivered").length,
//   }

//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         <div className="flex h-full items-center justify-center">
//           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
//           <p className="text-muted-foreground">Manage and track all customer orders</p>
//         </div>

//         <div className="grid gap-4 md:grid-cols-4">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Orders</p>
//                   <p className="text-2xl font-bold">{stats.total}</p>
//                 </div>
//                 <Package className="h-8 w-8 text-muted-foreground" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Pending</p>
//                   <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
//                 </div>
//                 <Package className="h-8 w-8 text-yellow-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Shipped</p>
//                   <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
//                 </div>
//                 <Package className="h-8 w-8 text-purple-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Delivered</p>
//                   <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
//                 </div>
//                 <Package className="h-8 w-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               placeholder="Search by order number, customer name, or phone..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full sm:w-48">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Orders</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="processing">Processing</SelectItem>
//               <SelectItem value="shipped">Shipped</SelectItem>
//               <SelectItem value="delivered">Delivered</SelectItem>
//               <SelectItem value="cancelled">Cancelled</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {filteredOrders.length === 0 ? (
//           <Card>
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <Package className="h-12 w-12 text-muted-foreground mb-4" />
//               <p className="text-lg font-medium">No orders found</p>
//               <p className="text-sm text-muted-foreground">
//                 {searchQuery || statusFilter !== "all" ? "Try adjusting your filters" : "Orders will appear here"}
//               </p>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="grid gap-4">
//             {filteredOrders.map((order) => (
//               <Card key={order.id} className="overflow-hidden">
//                 <CardHeader className="bg-muted/50">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//                     <div className="flex items-center gap-3">
//                       <Package className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <CardTitle className="text-lg">{order.order_number}</CardTitle>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
//                           <Calendar className="h-3 w-3" />
//                           {format(new Date(order.created_at), "MMM dd, yyyy HH:mm")}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge className={getStatusColor(order.status)} variant="outline">
//                         {order.status.toUpperCase()}
//                       </Badge>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleDeleteClick(order.id)}
//                         className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="space-y-6">
//                     <div className="grid gap-4 md:grid-cols-2">
//                       <div className="space-y-3">
//                         <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
//                           Customer Details
//                         </h4>
//                         <div className="space-y-2">
//                           <div className="flex items-start gap-2">
//                             <User className="h-4 w-4 text-muted-foreground mt-0.5" />
//                             <div>
//                               <p className="text-sm font-medium">{order.delivery_name}</p>
//                               <p className="text-xs text-muted-foreground">{order.user_email}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Phone className="h-4 w-4 text-muted-foreground" />
//                             <p className="text-sm">{order.delivery_phone}</p>
//                           </div>
//                           <div className="flex items-start gap-2">
//                             <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
//                             <p className="text-sm" dir="rtl">
//                               {order.delivery_address}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="space-y-3">
//                         <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
//                           Order Summary
//                         </h4>
//                         <div className="space-y-2">
//                           <div className="flex justify-between text-sm">
//                             <span className="text-muted-foreground">Subtotal:</span>
//                             <span className="font-medium">
//                               {(
//                                 Number(order.total_amount) -
//                                 Number(order.shipping_cost) +
//                                 Number(order.discount_amount)
//                               ).toLocaleString()}{" "}
//                               IQD
//                             </span>
//                           </div>
//                           <div className="flex justify-between text-sm">
//                             <span className="text-muted-foreground">Shipping:</span>
//                             <span className="font-medium">{Number(order.shipping_cost).toLocaleString()} IQD</span>
//                           </div>
//                           {Number(order.discount_amount) > 0 && (
//                             <div className="flex justify-between text-sm">
//                               <span className="text-muted-foreground">Discount:</span>
//                               <span className="font-medium text-green-600">
//                                 -{Number(order.discount_amount).toLocaleString()} IQD
//                               </span>
//                             </div>
//                           )}
//                           <div className="flex justify-between text-base font-bold border-t pt-2">
//                             <span>Total:</span>
//                             <span className="text-primary">{Number(order.total_amount).toLocaleString()} IQD</span>
//                           </div>
//                         </div>
//                         {order.notes && (
//                           <div className="mt-3 p-3 bg-muted/50 rounded-lg">
//                             <p className="text-xs text-muted-foreground mb-1">Notes:</p>
//                             <p className="text-sm">{order.notes}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {order.items && order.items.length > 0 && (
//                       <div className="border-t pt-4">
//                         <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
//                           Order Items ({order.items.length})
//                         </h4>
//                         <div className="space-y-2">
//                           {order.items.map((item) => (
//                             <div
//                               key={item.id}
//                               className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
//                             >
//                               <div className="relative">
//                                 <img
//                                   src={item.image_url || "/placeholder.svg"}
//                                   alt={item.name}
//                                   className="w-16 h-16 object-cover rounded-lg border"
//                                 />
//                                 <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
//                                   {item.quantity}
//                                 </span>
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium line-clamp-2" dir="rtl">
//                                   {item.name}
//                                 </p>
//                                 <p className="text-xs text-muted-foreground mt-1">
//                                   {Number(item.price).toLocaleString()} IQD × {item.quantity}
//                                 </p>
//                               </div>
//                               <div className="text-right">
//                                 <p className="text-sm font-bold">
//                                   {(Number(item.quantity) * Number(item.price)).toLocaleString()} IQD
//                                 </p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between gap-4 border-t pt-4">
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <DollarSign className="h-4 w-4" />
//                         <span>Update Order Status:</span>
//                       </div>
//                       <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
//                         <SelectTrigger className="w-48">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="pending">Pending</SelectItem>
//                           <SelectItem value="processing">Processing</SelectItem>
//                           <SelectItem value="shipped">Shipped</SelectItem>
//                           <SelectItem value="delivered">Delivered</SelectItem>
//                           <SelectItem value="cancelled">Cancelled</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>

//       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Order</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this order? This action cannot be undone and will permanently remove the
//               order and all its items from the database.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteConfirm}
//               disabled={isDeleting}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               {isDeleting ? "Deleting..." : "Delete"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </DashboardLayout>
//   )
// }




"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { orderService } from "@/services/orderService"
import type { Order } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { format } from "date-fns"
import {
  Package,
  Search,
  User,
  MapPin,
  Phone,
  Calendar,
  DollarSign,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalOrders, setTotalOrders] = useState(0)
  const ordersPerPage = 10

  useEffect(() => {
    fetchOrders()
  }, [currentPage])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const data = await orderService.getOrders(currentPage, ordersPerPage)
      setOrders(Array.isArray(data.orders) ? data.orders : [])
      setTotalOrders(data.total || 0)
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      toast.error("Failed to load orders")
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus)
      setOrders(
        orders.map((order) => (order.id === orderId ? { ...order, status: newStatus as Order["status"] } : order)),
      )
      toast.success("Order status updated successfully")
    } catch (error) {
      console.error("[v0] Failed to update order status:", error)
      toast.error("Failed to update order status")
    }
  }

  const handleDeleteClick = (orderId: number) => {
    setOrderToDelete(orderId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!orderToDelete) return

    setIsDeleting(true)
    try {
      await orderService.deleteOrder(orderToDelete)
      setOrders(orders.filter((order) => order.id !== orderToDelete))
      toast.success("Order deleted successfully")
      setDeleteDialogOpen(false)
      setOrderToDelete(null)
    } catch (error) {
      console.error("[v0] Failed to delete order:", error)
      toast.error("Failed to delete order")
    } finally {
      setIsDeleting(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      processing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      shipped: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      delivered: "bg-green-500/10 text-green-600 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesSearch =
      searchQuery === "" ||
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.delivery_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.delivery_phone.includes(searchQuery)
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: totalOrders,
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Package className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Shipped</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by order number, customer name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No orders found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery || statusFilter !== "all" ? "Try adjusting your filters" : "Orders will appear here"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{order.order_number}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(order.created_at), "MMM dd, yyyy HH:mm")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(order.status)} variant="outline">
                          {order.status.toUpperCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(order.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                            Customer Details
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">{order.delivery_name}</p>
                                <p className="text-xs text-muted-foreground">{order.user_email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{order.delivery_phone}</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <p className="text-sm" dir="rtl">
                                {order.delivery_address}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                            Order Summary
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Subtotal:</span>
                              <span className="font-medium">
                                {(
                                  Number(order.total_amount) -
                                  Number(order.shipping_cost) +
                                  Number(order.discount_amount)
                                ).toLocaleString()}{" "}
                                IQD
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Shipping:</span>
                              <span className="font-medium">{Number(order.shipping_cost).toLocaleString()} IQD</span>
                            </div>
                            {Number(order.discount_amount) > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Discount:</span>
                                <span className="font-medium text-green-600">
                                  -{Number(order.discount_amount).toLocaleString()} IQD
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between text-base font-bold border-t pt-2">
                              <span>Total:</span>
                              <span className="text-primary">{Number(order.total_amount).toLocaleString()} IQD</span>
                            </div>
                          </div>
                          {order.notes && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                              <p className="text-sm">{order.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {order.items && order.items.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                            Order Items ({order.items.length})
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                              >
                                <div className="relative">
                                  <img
                                    src={item.image_url || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg border"
                                  />
                                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {item.quantity}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium line-clamp-2" dir="rtl">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {Number(item.price).toLocaleString()} IQD × {item.quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold">
                                    {(Number(item.quantity) * Number(item.price)).toLocaleString()} IQD
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-4 border-t pt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>Update Order Status:</span>
                        </div>
                        <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="text-sm text-muted-foreground">
                    Showing page {currentPage} of {totalPages} ({totalOrders} total orders)
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-9"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order? This action cannot be undone and will permanently remove the
              order and all its items from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
