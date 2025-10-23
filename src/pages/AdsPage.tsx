"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { adService } from "@/services/adService"
import { productService } from "@/services/productService"
import type { Ad, Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Plus, Eye, MousePointer, Calendar, Trash2, Edit, Package } from "lucide-react"

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [formData, setFormData] = useState({
    product_id: "",
    title: "",
    title_ar: "",
    description: "",
    description_ar: "",
    image_url: "",
    start_date: "",
    end_date: "",
    position: "home_banner",
    priority: "1",
  })

  useEffect(() => {
    fetchAds()
    fetchProducts()
  }, [])

  const fetchAds = async () => {
    try {
      const data = await adService.getAllAds()
      console.log("[v0] Fetched ads:", data)
      setAds(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("[v0] Failed to fetch ads:", error)
      toast.error("Failed to load ads")
      setAds([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("[v0] Failed to fetch products:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const adData = {
        product_id: Number.parseInt(formData.product_id),
        title: formData.title,
        title_ar: formData.title_ar,
        description: formData.description,
        description_ar: formData.description_ar,
        image_url: formData.image_url,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        position: formData.position,
        priority: Number.parseInt(formData.priority),
      }

      if (editingAd) {
        await adService.updateAd(editingAd.id, adData)
        toast.success("Ad updated successfully")
      } else {
        await adService.createAd(adData)
        toast.success("Ad created successfully")
      }

      setIsDialogOpen(false)
      resetForm()
      fetchAds()
    } catch (error: any) {
      console.error("[v0] Failed to save ad:", error)
      toast.error(error.response?.data?.message || "Failed to save ad")
    }
  }

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad)
    setFormData({
      product_id: ad.product_id?.toString() || "",
      title: ad.title || "",
      title_ar: ad.title_ar || "",
      description: ad.description || "",
      description_ar: ad.description_ar || "",
      image_url: ad.image_url || "",
      start_date: ad.start_date ? new Date(ad.start_date).toISOString().split("T")[0] : "",
      end_date: ad.end_date ? new Date(ad.end_date).toISOString().split("T")[0] : "",
      position: ad.position || "home_banner",
      priority: ad.priority?.toString() || "1",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this ad?")) return

    try {
      await adService.deleteAd(id)
      toast.success("Ad deleted successfully")
      fetchAds()
    } catch (error) {
      console.error("[v0] Failed to delete ad:", error)
      toast.error("Failed to delete ad")
    }
  }

  const resetForm = () => {
    setEditingAd(null)
    setFormData({
      product_id: "",
      title: "",
      title_ar: "",
      description: "",
      description_ar: "",
      image_url: "",
      start_date: "",
      end_date: "",
      position: "home_banner",
      priority: "1",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Advertisements</h1>
            <p className="text-muted-foreground mt-1">Manage promotional banners and ads</p>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Ad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingAd ? "Edit Advertisement" : "Create New Advertisement"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="product_id">Product *</Label>
                    <Select
                      value={formData.product_id}
                      onValueChange={(value) => setFormData({ ...formData, product_id: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name} - {product.name_ar}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="title">Title (English)</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Summer Sale"
                    />
                  </div>

                  <div>
                    <Label htmlFor="title_ar">Title (Arabic) *</Label>
                    <Input
                      id="title_ar"
                      value={formData.title_ar}
                      onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                      placeholder="تخفيضات الصيف"
                      required
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description (English)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Great discounts on summer products"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description_ar">Description (Arabic) *</Label>
                    <Textarea
                      id="description_ar"
                      value={formData.description_ar}
                      onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                      placeholder="خصومات رائعة على منتجات الصيف"
                      required
                      dir="rtl"
                      rows={3}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="image_url">Image URL *</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/banner.jpg"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="start_date">Start Date *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="end_date">End Date *</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) => setFormData({ ...formData, position: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home_banner">Home Banner</SelectItem>
                        <SelectItem value="category_banner">Category Banner</SelectItem>
                        <SelectItem value="product_banner">Product Banner</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">{editingAd ? "Update Ad" : "Create Ad"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {ads.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No advertisements found</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Ad
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {ads.map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className="grid md:grid-cols-[300px_1fr] gap-6">
                  <div className="relative h-48 md:h-auto bg-muted">
                    <img
                      src={ad.image_url || "/placeholder.svg"}
                      alt={ad.title_ar}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2" variant={ad.is_active ? "default" : "secondary"}>
                      {ad.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{ad.title_ar}</h3>
                        {ad.title && <p className="text-sm text-muted-foreground">{ad.title}</p>}
                        <p className="text-sm text-muted-foreground mt-2" dir="rtl">
                          {ad.description_ar}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(ad)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(ad.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {ad.product_name && (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{ad.product_name_ar}</p>
                          <p className="text-xs text-muted-foreground">{ad.product_name}</p>
                        </div>
                        {ad.product_price && (
                          <Badge variant="secondary">{Number.parseFloat(ad.product_price).toLocaleString()} IQD</Badge>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Views</p>
                          <p className="text-sm font-semibold">{ad.view_count || 0}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MousePointer className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Clicks</p>
                          <p className="text-sm font-semibold">{ad.click_count || 0}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Start Date</p>
                          <p className="text-sm font-semibold">{formatDate(ad.start_date)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">End Date</p>
                          <p className="text-sm font-semibold">{formatDate(ad.end_date)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        Position: <span className="font-medium text-foreground">{ad.position}</span>
                      </span>
                      <span>
                        Priority: <span className="font-medium text-foreground">{ad.priority}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
