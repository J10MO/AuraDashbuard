"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { deliveryService } from "@/services/deliveryService"
import type { Delivery } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
  Truck,
  Search,
  User,
  MapPin,
  Phone,
  Calendar,
  Package,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deliveryToDelete, setDeliveryToDelete] = useState<number | null>(null)
  const [deliveryToEdit, setDeliveryToEdit] = useState<Delivery | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDeliveries, setTotalDeliveries] = useState(0)
  const deliveriesPerPage = 10

  const [editForm, setEditForm] = useState({
    delivery_status: "",
    driver_name: "",
    driver_phone: "",
    delivery_notes: "",
    estimated_delivery_date: "",
  })

  useEffect(() => {
    fetchDeliveries()
  }, [currentPage, statusFilter])

  const fetchDeliveries = async () => {
    try {
      setIsLoading(true)
      const data = await deliveryService.getDeliveries(
        currentPage,
        deliveriesPerPage,
        statusFilter !== "all" ? statusFilter : "",
      )
      setDeliveries(data.deliveries)
      setTotalDeliveries(data.total)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Failed to fetch deliveries:", error)
      toast.error("Failed to load deliveries")
      setDeliveries([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (deliveryId: number) => {
    setDeliveryToDelete(deliveryId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deliveryToDelete) return

    setIsDeleting(true)
    try {
      await deliveryService.deleteDelivery(deliveryToDelete)
      setDeliveries(deliveries.filter((delivery) => delivery.id !== deliveryToDelete))
      toast.success("Delivery deleted successfully")
      setDeleteDialogOpen(false)
      setDeliveryToDelete(null)
    } catch (error) {
      console.error("Failed to delete delivery:", error)
      toast.error("Failed to delete delivery")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditClick = (delivery: Delivery) => {
    setDeliveryToEdit(delivery)
    setEditForm({
      delivery_status: delivery.delivery_status,
      driver_name: delivery.driver_name || "",
      driver_phone: delivery.driver_phone || "",
      delivery_notes: delivery.delivery_notes || "",
      estimated_delivery_date: delivery.estimated_delivery_date || "",
    })
    setEditDialogOpen(true)
  }

  const handleUpdateDelivery = async () => {
    if (!deliveryToEdit) return

    setIsUpdating(true)
    try {
      await deliveryService.updateDelivery(deliveryToEdit.id, editForm)
      await fetchDeliveries()
      toast.success("Delivery updated successfully")
      setEditDialogOpen(false)
      setDeliveryToEdit(null)
    } catch (error) {
      console.error("Failed to update delivery:", error)
      toast.error("Failed to update delivery")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      picked_up: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
      in_transit: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      out_for_delivery: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      delivered: "bg-green-500/10 text-green-600 border-green-500/20",
      failed: "bg-red-500/10 text-red-600 border-red-500/20",
      cancelled: "bg-gray-500/10 text-gray-600 border-gray-500/20",
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      searchQuery === "" ||
      delivery.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.delivery_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.delivery_phone.includes(searchQuery) ||
      (delivery.order_number && delivery.order_number.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const stats = {
    total: totalDeliveries,
    pending: deliveries.filter((d) => d.delivery_status === "pending").length,
    in_transit: deliveries.filter((d) => d.delivery_status === "in_transit").length,
    delivered: deliveries.filter((d) => d.delivery_status === "delivered").length,
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
          <h1 className="text-3xl font-bold mb-2">Deliveries Management</h1>
          <p className="text-muted-foreground">Track and manage all delivery shipments</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Deliveries</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Truck className="h-8 w-8 text-muted-foreground" />
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
                  <p className="text-sm text-muted-foreground">In Transit</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.in_transit}</p>
                </div>
                <Truck className="h-8 w-8 text-purple-600" />
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
              placeholder="Search by tracking number, order number, or customer..."
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
              <SelectItem value="all">All Deliveries</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="picked_up">Picked Up</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredDeliveries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Truck className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No deliveries found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery || statusFilter !== "all" ? "Try adjusting your filters" : "Deliveries will appear here"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4">
              {filteredDeliveries.map((delivery) => (
                <Card key={delivery.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{delivery.tracking_number}</CardTitle>
                          {delivery.order_number && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Package className="h-3 w-3" />
                              Order: {delivery.order_number}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(delivery.delivery_status)} variant="outline">
                          {delivery.delivery_status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(delivery)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(delivery.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                          Delivery Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">{delivery.delivery_name}</p>
                              {delivery.user_name && (
                                <p className="text-xs text-muted-foreground">{delivery.user_name}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">{delivery.delivery_phone}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-sm" dir="rtl">
                              {delivery.delivery_address}
                              {delivery.delivery_city && `, ${delivery.delivery_city}`}
                              {delivery.delivery_district && `, ${delivery.delivery_district}`}
                            </p>
                          </div>
                          {delivery.delivery_fee && (
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">
                                Delivery Fee: {Number(delivery.delivery_fee).toLocaleString()} IQD
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                          Tracking Details
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Created</p>
                              <p className="text-sm">{format(new Date(delivery.created_at), "MMM dd, yyyy HH:mm")}</p>
                            </div>
                          </div>
                          {delivery.estimated_delivery_date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                                <p className="text-sm">
                                  {format(new Date(delivery.estimated_delivery_date), "MMM dd, yyyy")}
                                </p>
                              </div>
                            </div>
                          )}
                          {delivery.driver_name && (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Driver</p>
                                <p className="text-sm">{delivery.driver_name}</p>
                                {delivery.driver_phone && <p className="text-xs">{delivery.driver_phone}</p>}
                              </div>
                            </div>
                          )}
                          {delivery.delivery_notes && (
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                              <p className="text-sm">{delivery.delivery_notes}</p>
                            </div>
                          )}
                        </div>
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
                    Page {currentPage} of {totalPages} ({totalDeliveries} total)
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Delivery</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Delivery Status</Label>
              <Select
                value={editForm.delivery_status}
                onValueChange={(value) => setEditForm({ ...editForm, delivery_status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="picked_up">Picked Up</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Driver Name</Label>
              <Input
                value={editForm.driver_name}
                onChange={(e) => setEditForm({ ...editForm, driver_name: e.target.value })}
                placeholder="Enter driver name"
              />
            </div>
            <div className="space-y-2">
              <Label>Driver Phone</Label>
              <Input
                value={editForm.driver_phone}
                onChange={(e) => setEditForm({ ...editForm, driver_phone: e.target.value })}
                placeholder="Enter driver phone"
              />
            </div>
            <div className="space-y-2">
              <Label>Estimated Delivery Date</Label>
              <Input
                type="date"
                value={editForm.estimated_delivery_date}
                onChange={(e) => setEditForm({ ...editForm, estimated_delivery_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Delivery Notes</Label>
              <Input
                value={editForm.delivery_notes}
                onChange={(e) => setEditForm({ ...editForm, delivery_notes: e.target.value })}
                placeholder="Enter delivery notes"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDelivery} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Delivery"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Delivery</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this delivery? This action cannot be undone.
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
