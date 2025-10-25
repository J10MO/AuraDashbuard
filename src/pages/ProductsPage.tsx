// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import { DashboardLayout } from "@/components/DashboardLayout"
// import { productService } from "@/services/productService"
// import { categoryService } from "@/services/categoryService"
// import type { Product, Category } from "@/types"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { toast } from "sonner"
// import { Pencil, Trash2, Plus, Search } from "lucide-react"

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
//   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [formData, setFormData] = useState({
//     name: "",
//     name_ar: "",
//     brand: "",
//     price: "",
//     original_price: "",
//     description: "",
//     description_ar: "",
//     category_id: "",
//     image_url: "",
//     emoji_icon: "🧴",
//     discount: "",
//     badge: "الأكثر مبيعاً",
//     stock_quantity: "",
//     in_stock: true,
//   })

//   useEffect(() => {
//     fetchProducts()
//     fetchCategories()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       console.log("[v0] Fetching products...")
//       const data = await productService.getProducts()
//       console.log("[v0] Products received:", data)
//       setProducts(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("[v0] Failed to fetch products:", error)
//       toast.error("Failed to load products")
//       setProducts([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const data = await categoryService.getCategories()
//       setCategories(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Failed to fetch categories:", error)
//       setCategories([])
//     }
//   }

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       fetchProducts()
//       return
//     }
//     try {
//       const data = await productService.searchProducts(searchQuery)
//       setProducts(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Failed to search products:", error)
//       toast.error("Failed to search products")
//       setProducts([])
//     }
//   }

//   const handleOpenDialog = (product?: Product) => {
//     if (product) {
//       setEditingProduct(product)
//       setFormData({
//         name: product.name,
//         name_ar: product.name_ar,
//         brand: product.brand,
//         price: product.price.toString(),
//         original_price: product.original_price.toString(),
//         description: product.description,
//         description_ar: product.description_ar,
//         category_id: product.category_id.toString(),
//         image_url: product.image_url,
//         emoji_icon: product.emoji_icon,
//         discount: product.discount.toString(),
//         badge: product.badge,
//         stock_quantity: product.stock_quantity.toString(),
//         in_stock: product.in_stock,
//       })
//     } else {
//       setEditingProduct(null)
//       setFormData({
//         name: "",
//         name_ar: "",
//         brand: "",
//         price: "",
//         original_price: "",
//         description: "",
//         description_ar: "",
//         category_id: "",
//         image_url: "",
//         emoji_icon: "🧴",
//         discount: "",
//         badge: "الأكثر مبيعاً",
//         stock_quantity: "",
//         in_stock: true,
//       })
//     }
//     setIsDialogOpen(true)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const productData = {
//         ...formData,
//         price: Number.parseFloat(formData.price),
//         original_price: Number.parseFloat(formData.original_price),
//         category_id: Number.parseInt(formData.category_id),
//         discount: Number.parseInt(formData.discount) || 0,
//         stock_quantity: Number.parseInt(formData.stock_quantity),
//       }

//       if (editingProduct) {
//         await productService.updateProduct(editingProduct.id, productData)
//         toast.success("Product updated successfully")
//       } else {
//         await productService.createProduct(productData)
//         toast.success("Product created successfully")
//       }

//       setIsDialogOpen(false)
//       fetchProducts()
//     } catch (error) {
//       console.error("Failed to save product:", error)
//       toast.error("Failed to save product")
//     }
//   }

//   const handleDelete = async () => {
//     if (!deletingProduct) return
//     try {
//       await productService.deleteProduct(deletingProduct.id)
//       toast.success("Product deleted successfully")
//       setIsDeleteDialogOpen(false)
//       setDeletingProduct(null)
//       fetchProducts()
//     } catch (error: any) {
//       console.error("Failed to delete product:", error)
//       const errorMessage =
//         error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

//       if (error.response?.status === 500) {
//         toast.error(`Server error: ${errorMessage}. The product may be referenced in orders.`)
//       } else if (error.response?.status === 403) {
//         toast.error("You don't have permission to delete this product")
//       } else if (error.response?.status === 404) {
//         toast.error("Product not found")
//       } else {
//         toast.error(errorMessage)
//       }
//     }
//   }

//   const filteredProducts = Array.isArray(products) ? products : []

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
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold">Products</h1>
//           <Button onClick={() => handleOpenDialog()}>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Product
//           </Button>
//         </div>

//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               className="pl-9"
//             />
//           </div>
//           <Button onClick={handleSearch}>Search</Button>
//           <Button variant="outline" onClick={fetchProducts}>
//             Clear
//           </Button>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {filteredProducts.map((product) => (
//             <Card key={product.id}>
//               {product.image_url && (
//                 <div className="aspect-square overflow-hidden rounded-t-lg">
//                   <img
//                     src={product.image_url || "/placeholder.svg"}
//                     alt={product.name}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               )}
//               <CardHeader>
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="flex-1">
//                     <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
//                     <p className="text-sm text-muted-foreground mt-1">{product.name_ar}</p>
//                   </div>
//                   <span className="text-2xl">{product.emoji_icon}</span>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <p className="text-xs text-muted-foreground">{product.brand}</p>

//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-bold">{product.price} IQD</span>
//                     {product.discount > 0 && (
//                       <>
//                         <span className="text-sm text-muted-foreground line-through">{product.original_price} IQD</span>
//                         <Badge variant="destructive" className="text-xs">
//                           -{product.discount}%
//                         </Badge>
//                       </>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 text-sm">
//                     <span className="text-yellow-500">★</span>
//                     <span>{product.rating}</span>
//                     <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
//                   </div>

//                   <div className="flex items-center justify-between gap-2">
//                     <Badge variant={product.in_stock ? "default" : "destructive"}>
//                       Stock: {product.stock_quantity}
//                     </Badge>
//                     {product.badge && <Badge className="bg-blue-500/10 text-blue-500">{product.badge}</Badge>}
//                   </div>

//                   {product.category_name_ar && (
//                     <p className="text-xs text-muted-foreground">Category: {product.category_name_ar}</p>
//                   )}

//                   <div className="flex gap-2 pt-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1 bg-transparent"
//                       onClick={() => handleOpenDialog(product)}
//                     >
//                       <Pencil className="mr-2 h-3 w-3" />
//                       Edit
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="flex-1"
//                       onClick={() => {
//                         setDeletingProduct(product)
//                         setIsDeleteDialogOpen(true)
//                       }}
//                     >
//                       <Trash2 className="mr-2 h-3 w-3" />
//                       Delete
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
//             <DialogDescription>
//               {editingProduct ? "Update the product details below." : "Fill in the product details below."}
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Name (English)</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="name_ar">Name (Arabic)</Label>
//                 <Input
//                   id="name_ar"
//                   value={formData.name_ar}
//                   onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="brand">Brand</Label>
//               <Input
//                 id="brand"
//                 value={formData.brand}
//                 onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="price">Price (IQD)</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="original_price">Original Price</Label>
//                 <Input
//                   id="original_price"
//                   type="number"
//                   value={formData.original_price}
//                   onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="discount">Discount (%)</Label>
//                 <Input
//                   id="discount"
//                   type="number"
//                   value={formData.discount}
//                   onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="category_id">Category</Label>
//                 <Select
//                   value={formData.category_id}
//                   onValueChange={(value) => setFormData({ ...formData, category_id: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category.id} value={category.id.toString()}>
//                         {category.name_ar} ({category.name})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="stock_quantity">Stock Quantity</Label>
//                 <Input
//                   id="stock_quantity"
//                   type="number"
//                   value={formData.stock_quantity}
//                   onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="emoji_icon">Emoji Icon</Label>
//                 <Input
//                   id="emoji_icon"
//                   value={formData.emoji_icon}
//                   onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="badge">Badge</Label>
//                 <Input
//                   id="badge"
//                   value={formData.badge}
//                   onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="image_url">Image URL</Label>
//               <Input
//                 id="image_url"
//                 value={formData.image_url}
//                 onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description (English)</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 rows={3}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description_ar">Description (Arabic)</Label>
//               <Textarea
//                 id="description_ar"
//                 value={formData.description_ar}
//                 onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
//                 rows={3}
//                 required
//               />
//             </div>

//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Product</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </DashboardLayout>
//   )
// }



"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { productService } from "@/services/productService"
import { categoryService } from "@/services/categoryService"
import type { Product, Category } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Pencil, Trash2, Plus, Search } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    brand: "",
    price: "",
    original_price: "",
    description: "",
    description_ar: "",
    category_id: "",
    image_url: "",
    emoji_icon: "🧴",
    discount: "",
    badge: "الأكثر مبيعاً",
    stock_quantity: "",
    in_stock: true,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      console.log("[v0] Fetching products...")
      const data = await productService.getProducts()
      console.log("[v0] Products received:", data)
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("[v0] Failed to fetch products:", error)
      toast.error("Failed to load products")
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      setCategories([])
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProducts()
      return
    }
    try {
      const data = await productService.searchProducts(searchQuery)
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to search products:", error)
      toast.error("Failed to search products")
      setProducts([])
    }
  }

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        name_ar: product.name_ar,
        brand: product.brand,
        price: product.price.toString(),
        original_price: product.original_price.toString(),
        description: product.description,
        description_ar: product.description_ar,
        category_id: product.category_id.toString(),
        image_url: product.image_url,
        emoji_icon: product.emoji_icon,
        discount: product.discount.toString(),
        badge: product.badge,
        stock_quantity: product.stock_quantity.toString(),
        in_stock: product.in_stock,
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: "",
        name_ar: "",
        brand: "",
        price: "",
        original_price: "",
        description: "",
        description_ar: "",
        category_id: "",
        image_url: "",
        emoji_icon: "🧴",
        discount: "",
        badge: "الأكثر مبيعاً",
        stock_quantity: "",
        in_stock: true,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        original_price: Number.parseFloat(formData.original_price),
        category_id: Number.parseInt(formData.category_id),
        discount: Number.parseInt(formData.discount) || 0,
        stock_quantity: Number.parseInt(formData.stock_quantity),
      }

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData)
        toast.success("Product updated successfully")
      } else {
        await productService.createProduct(productData)
        toast.success("Product created successfully")
      }

      setIsDialogOpen(false)
      fetchProducts()
    } catch (error) {
      console.error("Failed to save product:", error)
      toast.error("Failed to save product")
    }
  }

  const handleDelete = async () => {
    if (!deletingProduct) return
    try {
      console.log("[v0] Deleting product:", deletingProduct.id, deletingProduct.name)
      await productService.deleteProduct(deletingProduct.id)
      console.log("[v0] Product deleted successfully")
      toast.success("Product deleted successfully")
      setIsDeleteDialogOpen(false)
      setDeletingProduct(null)
      fetchProducts()
    } catch (error: any) {
      console.error("[v0] Failed to delete product:", error)
      console.error("[v0] Error response:", error.response)
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

      if (error.response?.status === 500) {
        toast.error(`Server error: ${errorMessage}. The product may be referenced in existing orders.`)
      } else if (error.response?.status === 400) {
        toast.error(`Cannot delete: ${errorMessage}`)
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this product")
      } else if (error.response?.status === 404) {
        toast.error("Product not found")
      } else {
        toast.error(errorMessage)
      }
    }
  }

  const filteredProducts = Array.isArray(products) ? products : []

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
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-9"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
          <Button variant="outline" onClick={fetchProducts}>
            Clear
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              {product.image_url && (
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{product.name_ar}</p>
                  </div>
                  <span className="text-2xl">{product.emoji_icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">{product.brand}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{product.price} IQD</span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-sm text-muted-foreground line-through">{product.original_price} IQD</span>
                        <Badge variant="destructive" className="text-xs">
                          -{product.discount}%
                        </Badge>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={product.in_stock ? "default" : "destructive"}>
                      Stock: {product.stock_quantity}
                    </Badge>
                    {product.badge && <Badge className="bg-blue-500/10 text-blue-500">{product.badge}</Badge>}
                  </div>

                  {product.category_name_ar && (
                    <p className="text-xs text-muted-foreground">Category: {product.category_name_ar}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setDeletingProduct(product)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the product details below." : "Fill in the product details below."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (English)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_ar">Name (Arabic)</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (IQD)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Original Price</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name_ar} ({category.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock_quantity">Stock Quantity</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emoji_icon">Emoji Icon</Label>
                <Input
                  id="emoji_icon"
                  value={formData.emoji_icon}
                  onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (English)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_ar">Description (Arabic)</Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                rows={3}
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
