// // // // // "use client"

// // // // // import type React from "react"

// // // // // import { useEffect, useState } from "react"
// // // // // import { DashboardLayout } from "@/components/DashboardLayout"
// // // // // import { productService } from "@/services/productService"
// // // // // import { categoryService } from "@/services/categoryService"
// // // // // import type { Product, Category } from "@/types"
// // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { Input } from "@/components/ui/input"
// // // // // import { Label } from "@/components/ui/label"
// // // // // import { Textarea } from "@/components/ui/textarea"
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // // import {
// // // // //   Dialog,
// // // // //   DialogContent,
// // // // //   DialogDescription,
// // // // //   DialogFooter,
// // // // //   DialogHeader,
// // // // //   DialogTitle,
// // // // // } from "@/components/ui/dialog"
// // // // // import { toast } from "sonner"
// // // // // import { Pencil, Trash2, Plus, Search } from "lucide-react"

// // // // // export default function ProductsPage() {
// // // // //   const [products, setProducts] = useState<Product[]>([])
// // // // //   const [categories, setCategories] = useState<Category[]>([])
// // // // //   const [isLoading, setIsLoading] = useState(true)
// // // // //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// // // // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // // // //   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
// // // // //   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
// // // // //   const [searchQuery, setSearchQuery] = useState("")
// // // // //   const [formData, setFormData] = useState({
// // // // //     name: "",
// // // // //     name_ar: "",
// // // // //     brand: "",
// // // // //     price: "",
// // // // //     original_price: "",
// // // // //     description: "",
// // // // //     description_ar: "",
// // // // //     category_id: "",
// // // // //     image_url: "",
// // // // //     emoji_icon: "🧴",
// // // // //     discount: "",
// // // // //     badge: "الأكثر مبيعاً",
// // // // //     stock_quantity: "",
// // // // //     in_stock: true,
// // // // //   })

// // // // //   useEffect(() => {
// // // // //     fetchProducts()
// // // // //     fetchCategories()
// // // // //   }, [])

// // // // //   const fetchProducts = async () => {
// // // // //     try {
// // // // //       console.log("[v0] Fetching products...")
// // // // //       const data = await productService.getProducts()
// // // // //       console.log("[v0] Products received:", data)
// // // // //       setProducts(Array.isArray(data) ? data : [])
// // // // //     } catch (error) {
// // // // //       console.error("[v0] Failed to fetch products:", error)
// // // // //       toast.error("Failed to load products")
// // // // //       setProducts([])
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const fetchCategories = async () => {
// // // // //     try {
// // // // //       const data = await categoryService.getCategories()
// // // // //       setCategories(Array.isArray(data) ? data : [])
// // // // //     } catch (error) {
// // // // //       console.error("Failed to fetch categories:", error)
// // // // //       setCategories([])
// // // // //     }
// // // // //   }

// // // // //   const handleSearch = async () => {
// // // // //     if (!searchQuery.trim()) {
// // // // //       fetchProducts()
// // // // //       return
// // // // //     }
// // // // //     try {
// // // // //       const data = await productService.searchProducts(searchQuery)
// // // // //       setProducts(Array.isArray(data) ? data : [])
// // // // //     } catch (error) {
// // // // //       console.error("Failed to search products:", error)
// // // // //       toast.error("Failed to search products")
// // // // //       setProducts([])
// // // // //     }
// // // // //   }

// // // // //   const handleOpenDialog = (product?: Product) => {
// // // // //     if (product) {
// // // // //       setEditingProduct(product)
// // // // //       setFormData({
// // // // //         name: product.name,
// // // // //         name_ar: product.name_ar,
// // // // //         brand: product.brand,
// // // // //         price: product.price.toString(),
// // // // //         original_price: product.original_price.toString(),
// // // // //         description: product.description,
// // // // //         description_ar: product.description_ar,
// // // // //         category_id: product.category_id.toString(),
// // // // //         image_url: product.image_url,
// // // // //         emoji_icon: product.emoji_icon,
// // // // //         discount: product.discount.toString(),
// // // // //         badge: product.badge,
// // // // //         stock_quantity: product.stock_quantity.toString(),
// // // // //         in_stock: product.in_stock,
// // // // //       })
// // // // //     } else {
// // // // //       setEditingProduct(null)
// // // // //       setFormData({
// // // // //         name: "",
// // // // //         name_ar: "",
// // // // //         brand: "",
// // // // //         price: "",
// // // // //         original_price: "",
// // // // //         description: "",
// // // // //         description_ar: "",
// // // // //         category_id: "",
// // // // //         image_url: "",
// // // // //         emoji_icon: "🧴",
// // // // //         discount: "",
// // // // //         badge: "الأكثر مبيعاً",
// // // // //         stock_quantity: "",
// // // // //         in_stock: true,
// // // // //       })
// // // // //     }
// // // // //     setIsDialogOpen(true)
// // // // //   }

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()
// // // // //     try {
// // // // //       const productData = {
// // // // //         ...formData,
// // // // //         price: Number.parseFloat(formData.price),
// // // // //         original_price: Number.parseFloat(formData.original_price),
// // // // //         category_id: Number.parseInt(formData.category_id),
// // // // //         discount: Number.parseInt(formData.discount) || 0,
// // // // //         stock_quantity: Number.parseInt(formData.stock_quantity),
// // // // //       }

// // // // //       if (editingProduct) {
// // // // //         await productService.updateProduct(editingProduct.id, productData)
// // // // //         toast.success("Product updated successfully")
// // // // //       } else {
// // // // //         await productService.createProduct(productData)
// // // // //         toast.success("Product created successfully")
// // // // //       }

// // // // //       setIsDialogOpen(false)
// // // // //       fetchProducts()
// // // // //     } catch (error) {
// // // // //       console.error("Failed to save product:", error)
// // // // //       toast.error("Failed to save product")
// // // // //     }
// // // // //   }

// // // // //   const handleDelete = async () => {
// // // // //     if (!deletingProduct) return
// // // // //     try {
// // // // //       await productService.deleteProduct(deletingProduct.id)
// // // // //       toast.success("Product deleted successfully")
// // // // //       setIsDeleteDialogOpen(false)
// // // // //       setDeletingProduct(null)
// // // // //       fetchProducts()
// // // // //     } catch (error: any) {
// // // // //       console.error("Failed to delete product:", error)
// // // // //       const errorMessage =
// // // // //         error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

// // // // //       if (error.response?.status === 500) {
// // // // //         toast.error(`Server error: ${errorMessage}. The product may be referenced in orders.`)
// // // // //       } else if (error.response?.status === 403) {
// // // // //         toast.error("You don't have permission to delete this product")
// // // // //       } else if (error.response?.status === 404) {
// // // // //         toast.error("Product not found")
// // // // //       } else {
// // // // //         toast.error(errorMessage)
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   const filteredProducts = Array.isArray(products) ? products : []

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <DashboardLayout>
// // // // //         <div className="flex h-full items-center justify-center">
// // // // //           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// // // // //         </div>
// // // // //       </DashboardLayout>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <DashboardLayout>
// // // // //       <div className="space-y-6">
// // // // //         <div className="flex items-center justify-between">
// // // // //           <h1 className="text-3xl font-bold">Products</h1>
// // // // //           <Button onClick={() => handleOpenDialog()}>
// // // // //             <Plus className="mr-2 h-4 w-4" />
// // // // //             Add Product
// // // // //           </Button>
// // // // //         </div>

// // // // //         <div className="flex gap-2">
// // // // //           <div className="relative flex-1">
// // // // //             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// // // // //             <Input
// // // // //               placeholder="Search products..."
// // // // //               value={searchQuery}
// // // // //               onChange={(e) => setSearchQuery(e.target.value)}
// // // // //               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// // // // //               className="pl-9"
// // // // //             />
// // // // //           </div>
// // // // //           <Button onClick={handleSearch}>Search</Button>
// // // // //           <Button variant="outline" onClick={fetchProducts}>
// // // // //             Clear
// // // // //           </Button>
// // // // //         </div>

// // // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // // // //           {filteredProducts.map((product) => (
// // // // //             <Card key={product.id}>
// // // // //               {product.image_url && (
// // // // //                 <div className="aspect-square overflow-hidden rounded-t-lg">
// // // // //                   <img
// // // // //                     src={product.image_url || "/placeholder.svg"}
// // // // //                     alt={product.name}
// // // // //                     className="h-full w-full object-cover"
// // // // //                   />
// // // // //                 </div>
// // // // //               )}
// // // // //               <CardHeader>
// // // // //                 <div className="flex items-start justify-between gap-2">
// // // // //                   <div className="flex-1">
// // // // //                     <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
// // // // //                     <p className="text-sm text-muted-foreground mt-1">{product.name_ar}</p>
// // // // //                   </div>
// // // // //                   <span className="text-2xl">{product.emoji_icon}</span>
// // // // //                 </div>
// // // // //               </CardHeader>
// // // // //               <CardContent>
// // // // //                 <div className="space-y-3">
// // // // //                   <p className="text-xs text-muted-foreground">{product.brand}</p>

// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <span className="text-lg font-bold">{product.price} IQD</span>
// // // // //                     {product.discount > 0 && (
// // // // //                       <>
// // // // //                         <span className="text-sm text-muted-foreground line-through">{product.original_price} IQD</span>
// // // // //                         <Badge variant="destructive" className="text-xs">
// // // // //                           -{product.discount}%
// // // // //                         </Badge>
// // // // //                       </>
// // // // //                     )}
// // // // //                   </div>

// // // // //                   <div className="flex items-center gap-2 text-sm">
// // // // //                     <span className="text-yellow-500">★</span>
// // // // //                     <span>{product.rating}</span>
// // // // //                     <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
// // // // //                   </div>

// // // // //                   <div className="flex items-center justify-between gap-2">
// // // // //                     <Badge variant={product.in_stock ? "default" : "destructive"}>
// // // // //                       Stock: {product.stock_quantity}
// // // // //                     </Badge>
// // // // //                     {product.badge && <Badge className="bg-blue-500/10 text-blue-500">{product.badge}</Badge>}
// // // // //                   </div>

// // // // //                   {product.category_name_ar && (
// // // // //                     <p className="text-xs text-muted-foreground">Category: {product.category_name_ar}</p>
// // // // //                   )}

// // // // //                   <div className="flex gap-2 pt-2">
// // // // //                     <Button
// // // // //                       variant="outline"
// // // // //                       size="sm"
// // // // //                       className="flex-1 bg-transparent"
// // // // //                       onClick={() => handleOpenDialog(product)}
// // // // //                     >
// // // // //                       <Pencil className="mr-2 h-3 w-3" />
// // // // //                       Edit
// // // // //                     </Button>
// // // // //                     <Button
// // // // //                       variant="destructive"
// // // // //                       size="sm"
// // // // //                       className="flex-1"
// // // // //                       onClick={() => {
// // // // //                         setDeletingProduct(product)
// // // // //                         setIsDeleteDialogOpen(true)
// // // // //                       }}
// // // // //                     >
// // // // //                       <Trash2 className="mr-2 h-3 w-3" />
// // // // //                       Delete
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>

// // // // //       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// // // // //         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
// // // // //           <DialogHeader>
// // // // //             <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
// // // // //             <DialogDescription>
// // // // //               {editingProduct ? "Update the product details below." : "Fill in the product details below."}
// // // // //             </DialogDescription>
// // // // //           </DialogHeader>
// // // // //           <form onSubmit={handleSubmit} className="space-y-4">
// // // // //             <div className="grid grid-cols-2 gap-4">
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="name">Name (English)</Label>
// // // // //                 <Input
// // // // //                   id="name"
// // // // //                   value={formData.name}
// // // // //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="name_ar">Name (Arabic)</Label>
// // // // //                 <Input
// // // // //                   id="name_ar"
// // // // //                   value={formData.name_ar}
// // // // //                   onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <Label htmlFor="brand">Brand</Label>
// // // // //               <Input
// // // // //                 id="brand"
// // // // //                 value={formData.brand}
// // // // //                 onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
// // // // //                 required
// // // // //               />
// // // // //             </div>

// // // // //             <div className="grid grid-cols-3 gap-4">
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="price">Price (IQD)</Label>
// // // // //                 <Input
// // // // //                   id="price"
// // // // //                   type="number"
// // // // //                   value={formData.price}
// // // // //                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="original_price">Original Price</Label>
// // // // //                 <Input
// // // // //                   id="original_price"
// // // // //                   type="number"
// // // // //                   value={formData.original_price}
// // // // //                   onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="discount">Discount (%)</Label>
// // // // //                 <Input
// // // // //                   id="discount"
// // // // //                   type="number"
// // // // //                   value={formData.discount}
// // // // //                   onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
// // // // //                 />
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="grid grid-cols-2 gap-4">
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="category_id">Category</Label>
// // // // //                 <Select
// // // // //                   value={formData.category_id}
// // // // //                   onValueChange={(value) => setFormData({ ...formData, category_id: value })}
// // // // //                 >
// // // // //                   <SelectTrigger>
// // // // //                     <SelectValue placeholder="Select category" />
// // // // //                   </SelectTrigger>
// // // // //                   <SelectContent>
// // // // //                     {categories.map((category) => (
// // // // //                       <SelectItem key={category.id} value={category.id.toString()}>
// // // // //                         {category.name_ar} ({category.name})
// // // // //                       </SelectItem>
// // // // //                     ))}
// // // // //                   </SelectContent>
// // // // //                 </Select>
// // // // //               </div>
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="stock_quantity">Stock Quantity</Label>
// // // // //                 <Input
// // // // //                   id="stock_quantity"
// // // // //                   type="number"
// // // // //                   value={formData.stock_quantity}
// // // // //                   onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
// // // // //                   required
// // // // //                 />
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="grid grid-cols-2 gap-4">
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="emoji_icon">Emoji Icon</Label>
// // // // //                 <Input
// // // // //                   id="emoji_icon"
// // // // //                   value={formData.emoji_icon}
// // // // //                   onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="badge">Badge</Label>
// // // // //                 <Input
// // // // //                   id="badge"
// // // // //                   value={formData.badge}
// // // // //                   onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
// // // // //                 />
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <Label htmlFor="image_url">Image URL</Label>
// // // // //               <Input
// // // // //                 id="image_url"
// // // // //                 value={formData.image_url}
// // // // //                 onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
// // // // //                 required
// // // // //               />
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <Label htmlFor="description">Description (English)</Label>
// // // // //               <Textarea
// // // // //                 id="description"
// // // // //                 value={formData.description}
// // // // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // // //                 rows={3}
// // // // //                 required
// // // // //               />
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <Label htmlFor="description_ar">Description (Arabic)</Label>
// // // // //               <Textarea
// // // // //                 id="description_ar"
// // // // //                 value={formData.description_ar}
// // // // //                 onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
// // // // //                 rows={3}
// // // // //                 required
// // // // //               />
// // // // //             </div>

// // // // //             <DialogFooter>
// // // // //               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// // // // //                 Cancel
// // // // //               </Button>
// // // // //               <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
// // // // //             </DialogFooter>
// // // // //           </form>
// // // // //         </DialogContent>
// // // // //       </Dialog>

// // // // //       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // // // //         <DialogContent>
// // // // //           <DialogHeader>
// // // // //             <DialogTitle>Delete Product</DialogTitle>
// // // // //             <DialogDescription>
// // // // //               Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
// // // // //             </DialogDescription>
// // // // //           </DialogHeader>
// // // // //           <DialogFooter>
// // // // //             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
// // // // //               Cancel
// // // // //             </Button>
// // // // //             <Button variant="destructive" onClick={handleDelete}>
// // // // //               Delete
// // // // //             </Button>
// // // // //           </DialogFooter>
// // // // //         </DialogContent>
// // // // //       </Dialog>
// // // // //     </DashboardLayout>
// // // // //   )
// // // // // }



// // // // "use client"

// // // // import type React from "react"

// // // // import { useEffect, useState } from "react"
// // // // import { DashboardLayout } from "@/components/DashboardLayout"
// // // // import { productService } from "@/services/productService"
// // // // import { categoryService } from "@/services/categoryService"
// // // // import type { Product, Category } from "@/types"
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Label } from "@/components/ui/label"
// // // // import { Textarea } from "@/components/ui/textarea"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogDescription,
// // // //   DialogFooter,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // // } from "@/components/ui/dialog"
// // // // import { toast } from "sonner"
// // // // import { Pencil, Trash2, Plus, Search } from "lucide-react"

// // // // export default function ProductsPage() {
// // // //   const [products, setProducts] = useState<Product[]>([])
// // // //   const [categories, setCategories] = useState<Category[]>([])
// // // //   const [isLoading, setIsLoading] = useState(true)
// // // //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// // // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // // //   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
// // // //   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
// // // //   const [searchQuery, setSearchQuery] = useState("")
// // // //   const [formData, setFormData] = useState({
// // // //     name: "",
// // // //     name_ar: "",
// // // //     brand: "",
// // // //     price: "",
// // // //     original_price: "",
// // // //     description: "",
// // // //     description_ar: "",
// // // //     category_id: "",
// // // //     image_url: "",
// // // //     emoji_icon: "🧴",
// // // //     discount: "",
// // // //     badge: "الأكثر مبيعاً",
// // // //     stock_quantity: "",
// // // //     in_stock: true,
// // // //   })

// // // //   useEffect(() => {
// // // //     fetchProducts()
// // // //     fetchCategories()
// // // //   }, [])

// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       console.log("[v0] Fetching products...")
// // // //       const data = await productService.getProducts()
// // // //       console.log("[v0] Products received:", data)
// // // //       setProducts(Array.isArray(data) ? data : [])
// // // //     } catch (error) {
// // // //       console.error("[v0] Failed to fetch products:", error)
// // // //       toast.error("Failed to load products")
// // // //       setProducts([])
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const fetchCategories = async () => {
// // // //     try {
// // // //       const data = await categoryService.getCategories()
// // // //       setCategories(Array.isArray(data) ? data : [])
// // // //     } catch (error) {
// // // //       console.error("Failed to fetch categories:", error)
// // // //       setCategories([])
// // // //     }
// // // //   }

// // // //   const handleSearch = async () => {
// // // //     if (!searchQuery.trim()) {
// // // //       fetchProducts()
// // // //       return
// // // //     }
// // // //     try {
// // // //       const data = await productService.searchProducts(searchQuery)
// // // //       setProducts(Array.isArray(data) ? data : [])
// // // //     } catch (error) {
// // // //       console.error("Failed to search products:", error)
// // // //       toast.error("Failed to search products")
// // // //       setProducts([])
// // // //     }
// // // //   }

// // // //   const handleOpenDialog = (product?: Product) => {
// // // //     if (product) {
// // // //       setEditingProduct(product)
// // // //       setFormData({
// // // //         name: product.name,
// // // //         name_ar: product.name_ar,
// // // //         brand: product.brand,
// // // //         price: product.price.toString(),
// // // //         original_price: product.original_price.toString(),
// // // //         description: product.description,
// // // //         description_ar: product.description_ar,
// // // //         category_id: product.category_id.toString(),
// // // //         image_url: product.image_url,
// // // //         emoji_icon: product.emoji_icon,
// // // //         discount: product.discount.toString(),
// // // //         badge: product.badge,
// // // //         stock_quantity: product.stock_quantity.toString(),
// // // //         in_stock: product.in_stock,
// // // //       })
// // // //     } else {
// // // //       setEditingProduct(null)
// // // //       setFormData({
// // // //         name: "",
// // // //         name_ar: "",
// // // //         brand: "",
// // // //         price: "",
// // // //         original_price: "",
// // // //         description: "",
// // // //         description_ar: "",
// // // //         category_id: "",
// // // //         image_url: "",
// // // //         emoji_icon: "🧴",
// // // //         discount: "",
// // // //         badge: "الأكثر مبيعاً",
// // // //         stock_quantity: "",
// // // //         in_stock: true,
// // // //       })
// // // //     }
// // // //     setIsDialogOpen(true)
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     try {
// // // //       const productData = {
// // // //         ...formData,
// // // //         price: Number.parseFloat(formData.price),
// // // //         original_price: Number.parseFloat(formData.original_price),
// // // //         category_id: Number.parseInt(formData.category_id),
// // // //         discount: Number.parseInt(formData.discount) || 0,
// // // //         stock_quantity: Number.parseInt(formData.stock_quantity),
// // // //       }

// // // //       if (editingProduct) {
// // // //         await productService.updateProduct(editingProduct.id, productData)
// // // //         toast.success("Product updated successfully")
// // // //       } else {
// // // //         await productService.createProduct(productData)
// // // //         toast.success("Product created successfully")
// // // //       }

// // // //       setIsDialogOpen(false)
// // // //       fetchProducts()
// // // //     } catch (error) {
// // // //       console.error("Failed to save product:", error)
// // // //       toast.error("Failed to save product")
// // // //     }
// // // //   }

// // // //   const handleDelete = async () => {
// // // //     if (!deletingProduct) return
// // // //     try {
// // // //       console.log("[v0] Deleting product:", deletingProduct.id, deletingProduct.name)
// // // //       await productService.deleteProduct(deletingProduct.id)
// // // //       console.log("[v0] Product deleted successfully")
// // // //       toast.success("Product deleted successfully")
// // // //       setIsDeleteDialogOpen(false)
// // // //       setDeletingProduct(null)
// // // //       fetchProducts()
// // // //     } catch (error: any) {
// // // //       console.error("[v0] Failed to delete product:", error)
// // // //       console.error("[v0] Error response:", error.response)
// // // //       const errorMessage =
// // // //         error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

// // // //       if (error.response?.status === 500) {
// // // //         toast.error(`Server error: ${errorMessage}. The product may be referenced in existing orders.`)
// // // //       } else if (error.response?.status === 400) {
// // // //         toast.error(`Cannot delete: ${errorMessage}`)
// // // //       } else if (error.response?.status === 403) {
// // // //         toast.error("You don't have permission to delete this product")
// // // //       } else if (error.response?.status === 404) {
// // // //         toast.error("Product not found")
// // // //       } else {
// // // //         toast.error(errorMessage)
// // // //       }
// // // //     }
// // // //   }

// // // //   const filteredProducts = Array.isArray(products) ? products : []

// // // //   if (isLoading) {
// // // //     return (
// // // //       <DashboardLayout>
// // // //         <div className="flex h-full items-center justify-center">
// // // //           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// // // //         </div>
// // // //       </DashboardLayout>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <DashboardLayout>
// // // //       <div className="space-y-6">
// // // //         <div className="flex items-center justify-between">
// // // //           <h1 className="text-3xl font-bold">Products</h1>
// // // //           <Button onClick={() => handleOpenDialog()}>
// // // //             <Plus className="mr-2 h-4 w-4" />
// // // //             Add Product
// // // //           </Button>
// // // //         </div>

// // // //         <div className="flex gap-2">
// // // //           <div className="relative flex-1">
// // // //             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// // // //             <Input
// // // //               placeholder="Search products..."
// // // //               value={searchQuery}
// // // //               onChange={(e) => setSearchQuery(e.target.value)}
// // // //               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// // // //               className="pl-9"
// // // //             />
// // // //           </div>
// // // //           <Button onClick={handleSearch}>Search</Button>
// // // //           <Button variant="outline" onClick={fetchProducts}>
// // // //             Clear
// // // //           </Button>
// // // //         </div>

// // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // // //           {filteredProducts.map((product) => (
// // // //             <Card key={product.id}>
// // // //               {product.image_url && (
// // // //                 <div className="aspect-square overflow-hidden rounded-t-lg">
// // // //                   <img
// // // //                     src={product.image_url || "/placeholder.svg"}
// // // //                     alt={product.name}
// // // //                     className="h-full w-full object-cover"
// // // //                   />
// // // //                 </div>
// // // //               )}
// // // //               <CardHeader>
// // // //                 <div className="flex items-start justify-between gap-2">
// // // //                   <div className="flex-1">
// // // //                     <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
// // // //                     <p className="text-sm text-muted-foreground mt-1">{product.name_ar}</p>
// // // //                   </div>
// // // //                   <span className="text-2xl">{product.emoji_icon}</span>
// // // //                 </div>
// // // //               </CardHeader>
// // // //               <CardContent>
// // // //                 <div className="space-y-3">
// // // //                   <p className="text-xs text-muted-foreground">{product.brand}</p>

// // // //                   <div className="flex items-center gap-2">
// // // //                     <span className="text-lg font-bold">{product.price} IQD</span>
// // // //                     {product.discount > 0 && (
// // // //                       <>
// // // //                         <span className="text-sm text-muted-foreground line-through">{product.original_price} IQD</span>
// // // //                         <Badge variant="destructive" className="text-xs">
// // // //                           -{product.discount}%
// // // //                         </Badge>
// // // //                       </>
// // // //                     )}
// // // //                   </div>

// // // //                   <div className="flex items-center gap-2 text-sm">
// // // //                     <span className="text-yellow-500">★</span>
// // // //                     <span>{product.rating}</span>
// // // //                     <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
// // // //                   </div>

// // // //                   <div className="flex items-center justify-between gap-2">
// // // //                     <Badge variant={product.in_stock ? "default" : "destructive"}>
// // // //                       Stock: {product.stock_quantity}
// // // //                     </Badge>
// // // //                     {product.badge && <Badge className="bg-blue-500/10 text-blue-500">{product.badge}</Badge>}
// // // //                   </div>

// // // //                   {product.category_name_ar && (
// // // //                     <p className="text-xs text-muted-foreground">Category: {product.category_name_ar}</p>
// // // //                   )}

// // // //                   <div className="flex gap-2 pt-2">
// // // //                     <Button
// // // //                       variant="outline"
// // // //                       size="sm"
// // // //                       className="flex-1 bg-transparent"
// // // //                       onClick={() => handleOpenDialog(product)}
// // // //                     >
// // // //                       <Pencil className="mr-2 h-3 w-3" />
// // // //                       Edit
// // // //                     </Button>
// // // //                     <Button
// // // //                       variant="destructive"
// // // //                       size="sm"
// // // //                       className="flex-1"
// // // //                       onClick={() => {
// // // //                         setDeletingProduct(product)
// // // //                         setIsDeleteDialogOpen(true)
// // // //                       }}
// // // //                     >
// // // //                       <Trash2 className="mr-2 h-3 w-3" />
// // // //                       Delete
// // // //                     </Button>
// // // //                   </div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// // // //         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
// // // //           <DialogHeader>
// // // //             <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
// // // //             <DialogDescription>
// // // //               {editingProduct ? "Update the product details below." : "Fill in the product details below."}
// // // //             </DialogDescription>
// // // //           </DialogHeader>
// // // //           <form onSubmit={handleSubmit} className="space-y-4">
// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="name">Name (English)</Label>
// // // //                 <Input
// // // //                   id="name"
// // // //                   value={formData.name}
// // // //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="name_ar">Name (Arabic)</Label>
// // // //                 <Input
// // // //                   id="name_ar"
// // // //                   value={formData.name_ar}
// // // //                   onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="space-y-2">
// // // //               <Label htmlFor="brand">Brand</Label>
// // // //               <Input
// // // //                 id="brand"
// // // //                 value={formData.brand}
// // // //                 onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div className="grid grid-cols-3 gap-4">
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="price">Price (IQD)</Label>
// // // //                 <Input
// // // //                   id="price"
// // // //                   type="number"
// // // //                   value={formData.price}
// // // //                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="original_price">Original Price</Label>
// // // //                 <Input
// // // //                   id="original_price"
// // // //                   type="number"
// // // //                   value={formData.original_price}
// // // //                   onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="discount">Discount (%)</Label>
// // // //                 <Input
// // // //                   id="discount"
// // // //                   type="number"
// // // //                   value={formData.discount}
// // // //                   onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="category_id">Category</Label>
// // // //                 <Select
// // // //                   value={formData.category_id}
// // // //                   onValueChange={(value) => setFormData({ ...formData, category_id: value })}
// // // //                 >
// // // //                   <SelectTrigger>
// // // //                     <SelectValue placeholder="Select category" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     {categories.map((category) => (
// // // //                       <SelectItem key={category.id} value={category.id.toString()}>
// // // //                         {category.name_ar} ({category.name})
// // // //                       </SelectItem>
// // // //                     ))}
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="stock_quantity">Stock Quantity</Label>
// // // //                 <Input
// // // //                   id="stock_quantity"
// // // //                   type="number"
// // // //                   value={formData.stock_quantity}
// // // //                   onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
// // // //                   required
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="emoji_icon">Emoji Icon</Label>
// // // //                 <Input
// // // //                   id="emoji_icon"
// // // //                   value={formData.emoji_icon}
// // // //                   onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
// // // //                 />
// // // //               </div>
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="badge">Badge</Label>
// // // //                 <Input
// // // //                   id="badge"
// // // //                   value={formData.badge}
// // // //                   onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="space-y-2">
// // // //               <Label htmlFor="image_url">Image URL</Label>
// // // //               <Input
// // // //                 id="image_url"
// // // //                 value={formData.image_url}
// // // //                 onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div className="space-y-2">
// // // //               <Label htmlFor="description">Description (English)</Label>
// // // //               <Textarea
// // // //                 id="description"
// // // //                 value={formData.description}
// // // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // //                 rows={3}
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div className="space-y-2">
// // // //               <Label htmlFor="description_ar">Description (Arabic)</Label>
// // // //               <Textarea
// // // //                 id="description_ar"
// // // //                 value={formData.description_ar}
// // // //                 onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
// // // //                 rows={3}
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <DialogFooter>
// // // //               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// // // //                 Cancel
// // // //               </Button>
// // // //               <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
// // // //             </DialogFooter>
// // // //           </form>
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // // //         <DialogContent>
// // // //           <DialogHeader>
// // // //             <DialogTitle>Delete Product</DialogTitle>
// // // //             <DialogDescription>
// // // //               Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
// // // //             </DialogDescription>
// // // //           </DialogHeader>
// // // //           <DialogFooter>
// // // //             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
// // // //               Cancel
// // // //             </Button>
// // // //             <Button variant="destructive" onClick={handleDelete}>
// // // //               Delete
// // // //             </Button>
// // // //           </DialogFooter>
// // // //         </DialogContent>
// // // //       </Dialog>
// // // //     </DashboardLayout>
// // // //   )
// // // // }




// // // "use client"

// // // import type React from "react"

// // // import { useEffect, useState } from "react"
// // // import { DashboardLayout } from "@/components/DashboardLayout"
// // // import { productService } from "@/services/productService"
// // // import { categoryService } from "@/services/categoryService"
// // // import type { Product, Category } from "@/types"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogDescription,
// // //   DialogFooter,
// // //   DialogHeader,
// // //   DialogTitle,
// // // } from "@/components/ui/dialog"
// // // import { toast } from "sonner"
// // // import { Pencil, Trash2, Plus, Search } from "lucide-react"

// // // export default function ProductsPage() {
// // //   const [products, setProducts] = useState<Product[]>([])
// // //   const [categories, setCategories] = useState<Category[]>([])
// // //   const [isLoading, setIsLoading] = useState(true)
// // //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // //   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
// // //   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
// // //   const [searchQuery, setSearchQuery] = useState("")
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     name_ar: "",
// // //     brand: "",
// // //     price: "",
// // //     original_price: "",
// // //     description: "",
// // //     description_ar: "",
// // //     category_id: "",
// // //     image_url: "",
// // //     emoji_icon: "🧴",
// // //     discount: "",
// // //     badge: "الأكثر مبيعاً",
// // //     stock_quantity: "",
// // //     in_stock: true,
// // //   })

// // //   useEffect(() => {
// // //     fetchProducts()
// // //     fetchCategories()
// // //   }, [])

// // //   const fetchProducts = async () => {
// // //     try {
// // //       console.log("[v0] Fetching products...")
// // //       const data = await productService.getProducts()
// // //       console.log("[v0] Products received:", data)
// // //       setProducts(Array.isArray(data) ? data : [])
// // //     } catch (error) {
// // //       console.error("[v0] Failed to fetch products:", error)
// // //       toast.error("Failed to load products")
// // //       setProducts([])
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const data = await categoryService.getCategories()
// // //       setCategories(Array.isArray(data) ? data : [])
// // //     } catch (error) {
// // //       console.error("Failed to fetch categories:", error)
// // //       setCategories([])
// // //     }
// // //   }

// // //   const handleSearch = async () => {
// // //     if (!searchQuery.trim()) {
// // //       fetchProducts()
// // //       return
// // //     }
// // //     try {
// // //       const data = await productService.searchProducts(searchQuery)
// // //       setProducts(Array.isArray(data) ? data : [])
// // //     } catch (error) {
// // //       console.error("Failed to search products:", error)
// // //       toast.error("Failed to search products")
// // //       setProducts([])
// // //     }
// // //   }

// // //   const handleOpenDialog = (product?: Product) => {
// // //     if (product) {
// // //       setEditingProduct(product)
// // //       setFormData({
// // //         name: product.name,
// // //         name_ar: product.name_ar,
// // //         brand: product.brand,
// // //         price: product.price.toString(),
// // //         original_price: product.original_price.toString(),
// // //         description: product.description,
// // //         description_ar: product.description_ar,
// // //         category_id: product.category_id.toString(),
// // //         image_url: product.image_url,
// // //         emoji_icon: product.emoji_icon,
// // //         discount: product.discount.toString(),
// // //         badge: product.badge,
// // //         stock_quantity: product.stock_quantity.toString(),
// // //         in_stock: product.in_stock,
// // //       })
// // //     } else {
// // //       setEditingProduct(null)
// // //       setFormData({
// // //         name: "",
// // //         name_ar: "",
// // //         brand: "",
// // //         price: "",
// // //         original_price: "",
// // //         description: "",
// // //         description_ar: "",
// // //         category_id: "",
// // //         image_url: "",
// // //         emoji_icon: "🧴",
// // //         discount: "",
// // //         badge: "الأكثر مبيعاً",
// // //         stock_quantity: "",
// // //         in_stock: true,
// // //       })
// // //     }
// // //     setIsDialogOpen(true)
// // //   }

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     try {
// // //       const stockQuantity = Number.parseInt(formData.stock_quantity)
// // //       const inStock = stockQuantity > 0

// // //       const productData = {
// // //         ...formData,
// // //         price: Number.parseFloat(formData.price),
// // //         original_price: Number.parseFloat(formData.original_price),
// // //         category_id: Number.parseInt(formData.category_id),
// // //         discount: Number.parseInt(formData.discount) || 0,
// // //         stock_quantity: stockQuantity,
// // //         in_stock: inStock, // Automatically set based on stock quantity
// // //       }

// // //       if (editingProduct) {
// // //         await productService.updateProduct(editingProduct.id, productData)
// // //         toast.success("Product updated successfully")
// // //       } else {
// // //         await productService.createProduct(productData)
// // //         toast.success("Product created successfully")
// // //       }

// // //       setIsDialogOpen(false)
// // //       fetchProducts()
// // //     } catch (error) {
// // //       console.error("Failed to save product:", error)
// // //       toast.error("Failed to save product")
// // //     }
// // //   }

// // //   const handleDelete = async () => {
// // //     if (!deletingProduct) return
// // //     try {
// // //       console.log("[v0] Deleting product:", deletingProduct.id, deletingProduct.name)
// // //       await productService.deleteProduct(deletingProduct.id)
// // //       console.log("[v0] Product deleted successfully")
// // //       toast.success("Product deleted successfully")
// // //       setIsDeleteDialogOpen(false)
// // //       setDeletingProduct(null)
// // //       fetchProducts()
// // //     } catch (error: any) {
// // //       console.error("[v0] Failed to delete product:", error)
// // //       console.error("[v0] Error response:", error.response)
// // //       const errorMessage =
// // //         error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

// // //       if (error.response?.status === 500) {
// // //         toast.error(`Server error: ${errorMessage}. The product may be referenced in existing orders.`)
// // //       } else if (error.response?.status === 400) {
// // //         toast.error(`Cannot delete: ${errorMessage}`)
// // //       } else if (error.response?.status === 403) {
// // //         toast.error("You don't have permission to delete this product")
// // //       } else if (error.response?.status === 404) {
// // //         toast.error("Product not found")
// // //       } else {
// // //         toast.error(errorMessage)
// // //       }
// // //     }
// // //   }

// // //   const filteredProducts = Array.isArray(products) ? products : []

// // //   if (isLoading) {
// // //     return (
// // //       <DashboardLayout>
// // //         <div className="flex h-full items-center justify-center">
// // //           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// // //         </div>
// // //       </DashboardLayout>
// // //     )
// // //   }

// // //   return (
// // //     <DashboardLayout>
// // //       <div className="space-y-6">
// // //         <div className="flex items-center justify-between">
// // //           <h1 className="text-3xl font-bold">Products</h1>
// // //           <Button onClick={() => handleOpenDialog()}>
// // //             <Plus className="mr-2 h-4 w-4" />
// // //             Add Product
// // //           </Button>
// // //         </div>

// // //         <div className="flex gap-2">
// // //           <div className="relative flex-1">
// // //             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// // //             <Input
// // //               placeholder="Search products..."
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// // //               className="pl-9"
// // //             />
// // //           </div>
// // //           <Button onClick={handleSearch}>Search</Button>
// // //           <Button variant="outline" onClick={fetchProducts}>
// // //             Clear
// // //           </Button>
// // //         </div>

// // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // //           {filteredProducts.map((product) => (
// // //             <Card key={product.id}>
// // //               {product.image_url && (
// // //                 <div className="aspect-square overflow-hidden rounded-t-lg">
// // //                   <img
// // //                     src={product.image_url || "/placeholder.svg"}
// // //                     alt={product.name}
// // //                     className="h-full w-full object-cover"
// // //                   />
// // //                 </div>
// // //               )}
// // //               <CardHeader>
// // //                 <div className="flex items-start justify-between gap-2">
// // //                   <div className="flex-1">
// // //                     <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
// // //                     <p className="text-sm text-muted-foreground mt-1">{product.name_ar}</p>
// // //                   </div>
// // //                   <span className="text-2xl">{product.emoji_icon}</span>
// // //                 </div>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 <div className="space-y-3">
// // //                   <p className="text-xs text-muted-foreground">{product.brand}</p>

// // //                   <div className="flex items-center gap-2">
// // //                     <span className="text-lg font-bold">{product.price} IQD</span>
// // //                     {product.discount > 0 && (
// // //                       <>
// // //                         <span className="text-sm text-muted-foreground line-through">{product.original_price} IQD</span>
// // //                         <Badge variant="destructive" className="text-xs">
// // //                           -{product.discount}%
// // //                         </Badge>
// // //                       </>
// // //                     )}
// // //                   </div>

// // //                   <div className="flex items-center gap-2 text-sm">
// // //                     <span className="text-yellow-500">★</span>
// // //                     <span>{product.rating}</span>
// // //                     <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
// // //                   </div>

// // //                   <div className="flex items-center justify-between gap-2">
// // //                     <Badge variant={product.in_stock ? "default" : "destructive"}>
// // //                       Stock: {product.stock_quantity}
// // //                     </Badge>
// // //                     {product.badge && <Badge className="bg-blue-500/10 text-blue-500">{product.badge}</Badge>}
// // //                   </div>

// // //                   {product.category_name_ar && (
// // //                     <p className="text-xs text-muted-foreground">Category: {product.category_name_ar}</p>
// // //                   )}

// // //                   <div className="flex gap-2 pt-2">
// // //                     <Button
// // //                       variant="outline"
// // //                       size="sm"
// // //                       className="flex-1 bg-transparent"
// // //                       onClick={() => handleOpenDialog(product)}
// // //                     >
// // //                       <Pencil className="mr-2 h-3 w-3" />
// // //                       Edit
// // //                     </Button>
// // //                     <Button
// // //                       variant="destructive"
// // //                       size="sm"
// // //                       className="flex-1"
// // //                       onClick={() => {
// // //                         setDeletingProduct(product)
// // //                         setIsDeleteDialogOpen(true)
// // //                       }}
// // //                     >
// // //                       <Trash2 className="mr-2 h-3 w-3" />
// // //                       Delete
// // //                     </Button>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// // //         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
// // //           <DialogHeader>
// // //             <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
// // //             <DialogDescription>
// // //               {editingProduct ? "Update the product details below." : "Fill in the product details below."}
// // //             </DialogDescription>
// // //           </DialogHeader>
// // //           <form onSubmit={handleSubmit} className="space-y-4">
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="name">Name (English)</Label>
// // //                 <Input
// // //                   id="name"
// // //                   value={formData.name}
// // //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="name_ar">Name (Arabic)</Label>
// // //                 <Input
// // //                   id="name_ar"
// // //                   value={formData.name_ar}
// // //                   onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="brand">Brand</Label>
// // //               <Input
// // //                 id="brand"
// // //                 value={formData.brand}
// // //                 onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-3 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="price">Price (IQD)</Label>
// // //                 <Input
// // //                   id="price"
// // //                   type="number"
// // //                   value={formData.price}
// // //                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="original_price">Original Price</Label>
// // //                 <Input
// // //                   id="original_price"
// // //                   type="number"
// // //                   value={formData.original_price}
// // //                   onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="discount">Discount (%)</Label>
// // //                 <Input
// // //                   id="discount"
// // //                   type="number"
// // //                   value={formData.discount}
// // //                   onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="category_id">Category</Label>
// // //                 <Select
// // //                   value={formData.category_id}
// // //                   onValueChange={(value) => setFormData({ ...formData, category_id: value })}
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select category" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     {categories.map((category) => (
// // //                       <SelectItem key={category.id} value={category.id.toString()}>
// // //                         {category.name_ar} ({category.name})
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="stock_quantity">Stock Quantity</Label>
// // //                 <Input
// // //                   id="stock_quantity"
// // //                   type="number"
// // //                   value={formData.stock_quantity}
// // //                   onChange={(e) => {
// // //                     const quantity = Number.parseInt(e.target.value) || 0
// // //                     setFormData({
// // //                       ...formData,
// // //                       stock_quantity: e.target.value,
// // //                       in_stock: quantity > 0,
// // //                     })
// // //                   }}
// // //                   required
// // //                 />
// // //                 <p className="text-xs text-muted-foreground">
// // //                   Status:{" "}
// // //                   {(Number.parseInt(formData.stock_quantity) || 0) > 0 ? (
// // //                     <span className="text-green-500">In Stock</span>
// // //                   ) : (
// // //                     <span className="text-red-500">Out of Stock</span>
// // //                   )}
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="emoji_icon">Emoji Icon</Label>
// // //                 <Input
// // //                   id="emoji_icon"
// // //                   value={formData.emoji_icon}
// // //                   onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="badge">Badge</Label>
// // //                 <Input
// // //                   id="badge"
// // //                   value={formData.badge}
// // //                   onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="image_url">Image URL</Label>
// // //               <Input
// // //                 id="image_url"
// // //                 value={formData.image_url}
// // //                 onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="description">Description (English)</Label>
// // //               <Textarea
// // //                 id="description"
// // //                 value={formData.description}
// // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // //                 rows={3}
// // //                 required
// // //               />
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="description_ar">Description (Arabic)</Label>
// // //               <Textarea
// // //                 id="description_ar"
// // //                 value={formData.description_ar}
// // //                 onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
// // //                 rows={3}
// // //                 required
// // //               />
// // //             </div>

// // //             <DialogFooter>
// // //               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// // //                 Cancel
// // //               </Button>
// // //               <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
// // //             </DialogFooter>
// // //           </form>
// // //         </DialogContent>
// // //       </Dialog>

// // //       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // //         <DialogContent>
// // //           <DialogHeader>
// // //             <DialogTitle>Delete Product</DialogTitle>
// // //             <DialogDescription>
// // //               Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
// // //             </DialogDescription>
// // //           </DialogHeader>
// // //           <DialogFooter>
// // //             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
// // //               Cancel
// // //             </Button>
// // //             <Button variant="destructive" onClick={handleDelete}>
// // //               Delete
// // //             </Button>
// // //           </DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>
// // //     </DashboardLayout>
// // //   )
// // // }



// // "use client"

// // import type React from "react"

// // import { useEffect, useState } from "react"
// // import { DashboardLayout } from "@/components/DashboardLayout"
// // import { productService } from "@/services/productService"
// // import { categoryService } from "@/services/categoryService"
// // import type { Product, Category } from "@/types"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog"
// // import { toast } from "sonner"
// // import { Pencil, Trash2, Plus, Search } from "lucide-react"
// // import { ImageUpload } from "@/components/ImageUpload"

// // export default function ProductsPage() {
// //   const [products, setProducts] = useState<Product[]>([])
// //   const [categories, setCategories] = useState<Category[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// //   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
// //   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     name_ar: "",
// //     brand: "",
// //     price: "",
// //     original_price: "",
// //     description: "",
// //     description_ar: "",
// //     category_id: "",
// //     image_url: "" as string | File, // Allow both string and File type
// //     emoji_icon: "🧴",
// //     discount: "",
// //     badge: "الأكثر مبيعاً",
// //     stock_quantity: "",
// //     in_stock: true,
// //   })

// //   useEffect(() => {
// //     fetchProducts()
// //     fetchCategories()
// //   }, [])

// //   const fetchProducts = async () => {
// //     try {
// //       console.log("[v0] Fetching products...")
// //       const data = await productService.getProducts()
// //       console.log("[v0] Products received:", data)
// //       setProducts(Array.isArray(data) ? data : [])
// //     } catch (error) {
// //       console.error("[v0] Failed to fetch products:", error)
// //       toast.error("Failed to load products")
// //       setProducts([])
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const fetchCategories = async () => {
// //     try {
// //       const data = await categoryService.getCategories()
// //       setCategories(Array.isArray(data) ? data : [])
// //     } catch (error) {
// //       console.error("Failed to fetch categories:", error)
// //       setCategories([])
// //     }
// //   }

// //   const handleSearch = async () => {
// //     if (!searchQuery.trim()) {
// //       fetchProducts()
// //       return
// //     }
// //     try {
// //       const data = await productService.searchProducts(searchQuery)
// //       setProducts(Array.isArray(data) ? data : [])
// //     } catch (error) {
// //       console.error("Failed to search products:", error)
// //       toast.error("Failed to search products")
// //       setProducts([])
// //     }
// //   }

// //   const handleOpenDialog = (product?: Product) => {
// //     if (product) {
// //       setEditingProduct(product)
// //       setFormData({
// //         name: product.name,
// //         name_ar: product.name_ar,
// //         brand: product.brand,
// //         price: product.price.toString(),
// //         original_price: product.original_price.toString(),
// //         description: product.description,
// //         description_ar: product.description_ar,
// //         category_id: product.category_id.toString(),
// //         image_url: product.image_url,
// //         emoji_icon: product.emoji_icon,
// //         discount: product.discount.toString(),
// //         badge: product.badge,
// //         stock_quantity: product.stock_quantity.toString(),
// //         in_stock: product.in_stock,
// //       })
// //     } else {
// //       setEditingProduct(null)
// //       setFormData({
// //         name: "",
// //         name_ar: "",
// //         brand: "",
// //         price: "",
// //         original_price: "",
// //         description: "",
// //         description_ar: "",
// //         category_id: "",
// //         image_url: "",
// //         emoji_icon: "🧴",
// //         discount: "",
// //         badge: "الأكثر مبيعاً",
// //         stock_quantity: "",
// //         in_stock: true,
// //       })
// //     }
// //     setIsDialogOpen(true)
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     try {
// //       const stockQuantity = Number.parseInt(formData.stock_quantity)
// //       const inStock = stockQuantity > 0

// //       const { image_url, ...restFormData } = formData

// //       const productData = {
// //         ...restFormData,
// //         price: Number.parseFloat(formData.price),
// //         original_price: Number.parseFloat(formData.original_price),
// //         category_id: Number.parseInt(formData.category_id),
// //         discount: Number.parseInt(formData.discount) || 0,
// //         stock_quantity: stockQuantity,
// //         in_stock: inStock,
// //         image: image_url, // Pass as 'image' to match service expectation
// //       }

// //       if (editingProduct) {
// //         await productService.updateProduct(editingProduct.id, productData)
// //         toast.success("Product updated successfully")
// //       } else {
// //         await productService.createProduct(productData)
// //         toast.success("Product created successfully")
// //       }

// //       setIsDialogOpen(false)
// //       fetchProducts()
// //     } catch (error) {
// //       console.error("Failed to save product:", error)
// //       toast.error("Failed to save product")
// //     }
// //   }

// //   const handleDelete = async () => {
// //     if (!deletingProduct) return
// //     try {
// //       console.log("[v0] Deleting product:", deletingProduct.id, deletingProduct.name)
// //       await productService.deleteProduct(deletingProduct.id)
// //       console.log("[v0] Product deleted successfully")
// //       toast.success("Product deleted successfully")
// //       setIsDeleteDialogOpen(false)
// //       setDeletingProduct(null)
// //       fetchProducts()
// //     } catch (error: any) {
// //       console.error("[v0] Failed to delete product:", error)
// //       console.error("[v0] Error response:", error.response)
// //       const errorMessage =
// //         error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

// //       if (error.response?.status === 500) {
// //         toast.error(`Server error: ${errorMessage}. The product may be referenced in existing orders.`)
// //       } else if (error.response?.status === 400) {
// //         toast.error(`Cannot delete: ${errorMessage}`)
// //       } else if (error.response?.status === 403) {
// //         toast.error("You don't have permission to delete this product")
// //       } else if (error.response?.status === 404) {
// //         toast.error("Product not found")
// //       } else {
// //         toast.error(errorMessage)
// //       }
// //     }
// //   }

// //   const filteredProducts = Array.isArray(products) ? products : []

// //   if (isLoading) {
// //     return (
// //       <DashboardLayout>
// //         <div className="flex h-full items-center justify-center">
// //           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// //         </div>
// //       </DashboardLayout>
// //     )
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div className="space-y-6">
// //         <div className="flex items-center justify-between">
// //           <h1 className="text-3xl font-bold">Products</h1>
// //           <Button onClick={() => handleOpenDialog()}>
// //             <Plus className="mr-2 h-4 w-4" />
// //             Add Product
// //           </Button>
// //         </div>

// //         <div className="flex gap-2">
// //           <div className="relative flex-1">
// //             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// //             <Input
// //               placeholder="Search products..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// //               className="pl-9"
// //             />
// //           </div>
// //           <Button onClick={handleSearch}>Search</Button>
// //           <Button variant="outline" onClick={fetchProducts}>
// //             Clear
// //           </Button>
// //         </div>

// //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //           {filteredProducts.map((product) => (
// //             <Card key={product.id}>
// //               {product.image_url && (
// //                 <div className="aspect-square overflow-hidden rounded-t-lg">
// //                   <img
// //                     src={product.image_url || "/placeholder.svg"}
// //                     alt={product.name}
// //                     className="h-full w-full object-cover"
// //                   />
// //                 </div>
// //               )}
// //               <CardHeader>
// //                 <div className="flex items-start justify-between gap-2">
// //                   <div className="flex-1">
// //                     <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
// //                     <p className="text-sm text-muted-foreground mt-1">{product.name_ar}</p>
// //                   </div>
// //                   <span className="text-2xl">{product.emoji_icon}</span>
// //                 </div>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-3">
// //                   <p className="text-xs text-muted-foreground">{product.brand}</p>

// //                   <div className="flex items-center gap-2">
// //                     <span className="text-lg font-bold">{product.price} IQD</span>
// //                     {product.discount > 0 && (
// //                       <>
// //                         <span className="text-sm text-muted-foreground line-through">{product.original_price} IQD</span>
// //                         <Badge variant="destructive" className="text-xs">
// //                           -{product.discount}%
// //                         </Badge>
// //                       </>
// //                     )}
// //                   </div>

// //                   <div className="flex items-center gap-2 text-sm">
// //                     <span className="text-yellow-500">★</span>
// //                     <span>{product.rating}</span>
// //                     <span className="text-muted-foreground">({product.reviews_count} reviews)</span>
// //                   </div>

// //                   <div className="flex items-center justify-between gap-2">
// //                     <Badge variant={product.in_stock ? "default" : "destructive"}>
// //                       Stock: {product.stock_quantity}
// //                     </Badge>
// //                     {product.badge && <Badge className="bg-blue-500/10 text-blue-500">{product.badge}</Badge>}
// //                   </div>

// //                   {product.category_name_ar && (
// //                     <p className="text-xs text-muted-foreground">Category: {product.category_name_ar}</p>
// //                   )}

// //                   <div className="flex gap-2 pt-2">
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       className="flex-1 bg-transparent"
// //                       onClick={() => handleOpenDialog(product)}
// //                     >
// //                       <Pencil className="mr-2 h-3 w-3" />
// //                       Edit
// //                     </Button>
// //                     <Button
// //                       variant="destructive"
// //                       size="sm"
// //                       className="flex-1"
// //                       onClick={() => {
// //                         setDeletingProduct(product)
// //                         setIsDeleteDialogOpen(true)
// //                       }}
// //                     >
// //                       <Trash2 className="mr-2 h-3 w-3" />
// //                       Delete
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>

// //       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
// //           <DialogHeader>
// //             <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
// //             <DialogDescription>
// //               {editingProduct ? "Update the product details below." : "Fill in the product details below."}
// //             </DialogDescription>
// //           </DialogHeader>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="name">Name (English)</Label>
// //                 <Input
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="name_ar">Name (Arabic)</Label>
// //                 <Input
// //                   id="name_ar"
// //                   value={formData.name_ar}
// //                   onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="brand">Brand</Label>
// //               <Input
// //                 id="brand"
// //                 value={formData.brand}
// //                 onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
// //                 required
// //               />
// //             </div>

// //             <div className="grid grid-cols-3 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="price">Price (IQD)</Label>
// //                 <Input
// //                   id="price"
// //                   type="number"
// //                   value={formData.price}
// //                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="original_price">Original Price</Label>
// //                 <Input
// //                   id="original_price"
// //                   type="number"
// //                   value={formData.original_price}
// //                   onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="discount">Discount (%)</Label>
// //                 <Input
// //                   id="discount"
// //                   type="number"
// //                   value={formData.discount}
// //                   onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="category_id">Category</Label>
// //                 <Select
// //                   value={formData.category_id}
// //                   onValueChange={(value) => setFormData({ ...formData, category_id: value })}
// //                 >
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select category" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {categories.map((category) => (
// //                       <SelectItem key={category.id} value={category.id.toString()}>
// //                         {category.name_ar} ({category.name})
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="stock_quantity">Stock Quantity</Label>
// //                 <Input
// //                   id="stock_quantity"
// //                   type="number"
// //                   value={formData.stock_quantity}
// //                   onChange={(e) => {
// //                     const quantity = Number.parseInt(e.target.value) || 0
// //                     setFormData({
// //                       ...formData,
// //                       stock_quantity: e.target.value,
// //                       in_stock: quantity > 0,
// //                     })
// //                   }}
// //                   required
// //                 />
// //                 <p className="text-xs text-muted-foreground">
// //                   Status:{" "}
// //                   {(Number.parseInt(formData.stock_quantity) || 0) > 0 ? (
// //                     <span className="text-green-500">In Stock</span>
// //                   ) : (
// //                     <span className="text-red-500">Out of Stock</span>
// //                   )}
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="emoji_icon">Emoji Icon</Label>
// //                 <Input
// //                   id="emoji_icon"
// //                   value={formData.emoji_icon}
// //                   onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="badge">Badge</Label>
// //                 <Input
// //                   id="badge"
// //                   value={formData.badge}
// //                   onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
// //                 />
// //               </div>
// //             </div>

// //             <ImageUpload
// //               label="Product Image"
// //               value={formData.image_url}
// //               onChange={(value) => setFormData({ ...formData, image_url: value })}
// //               required
// //               aspectRatio="square"
// //             />

// //             <div className="space-y-2">
// //               <Label htmlFor="description">Description (English)</Label>
// //               <Textarea
// //                 id="description"
// //                 value={formData.description}
// //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                 rows={3}
// //                 required
// //               />
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="description_ar">Description (Arabic)</Label>
// //               <Textarea
// //                 id="description_ar"
// //                 value={formData.description_ar}
// //                 onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
// //                 rows={3}
// //                 required
// //               />
// //             </div>

// //             <DialogFooter>
// //               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// //                 Cancel
// //               </Button>
// //               <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
// //             </DialogFooter>
// //           </form>
// //         </DialogContent>
// //       </Dialog>

// //       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Delete Product</DialogTitle>
// //             <DialogDescription>
// //               Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button variant="destructive" onClick={handleDelete}>
// //               Delete
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </DashboardLayout>
// //   )
// // }







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
// import { ImageUpload } from "@/components/ImageUpload"

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
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
//     image_url: "" as string | File, // Allow both string and File type
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
//     setIsSubmitting(true)
//     try {
//       const stockQuantity = Number.parseInt(formData.stock_quantity)
//       const inStock = stockQuantity > 0

//       const { image_url, ...restFormData } = formData

//       const productData = {
//         ...restFormData,
//         price: Number.parseFloat(formData.price),
//         original_price: Number.parseFloat(formData.original_price),
//         category_id: Number.parseInt(formData.category_id),
//         discount: Number.parseInt(formData.discount) || 0,
//         stock_quantity: stockQuantity,
//         in_stock: inStock,
//         image: image_url, // Pass as 'image' to match service expectation
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
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleDelete = async () => {
//     if (!deletingProduct) return
//     try {
//       console.log("[v0] Deleting product:", deletingProduct.id, deletingProduct.name)
//       await productService.deleteProduct(deletingProduct.id)
//       console.log("[v0] Product deleted successfully")
//       toast.success("Product deleted successfully")
//       setIsDeleteDialogOpen(false)
//       setDeletingProduct(null)
//       fetchProducts()
//     } catch (error: any) {
//       console.error("[v0] Failed to delete product:", error)
//       console.error("[v0] Error response:", error.response)
//       const errorMessage =
//         error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

//       if (error.response?.status === 500) {
//         toast.error(`Server error: ${errorMessage}. The product may be referenced in existing orders.`)
//       } else if (error.response?.status === 400) {
//         toast.error(`Cannot delete: ${errorMessage}`)
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
//                   onChange={(e) => {
//                     const quantity = Number.parseInt(e.target.value) || 0
//                     setFormData({
//                       ...formData,
//                       stock_quantity: e.target.value,
//                       in_stock: quantity > 0,
//                     })
//                   }}
//                   required
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Status:{" "}
//                   {(Number.parseInt(formData.stock_quantity) || 0) > 0 ? (
//                     <span className="text-green-500">In Stock</span>
//                   ) : (
//                     <span className="text-red-500">Out of Stock</span>
//                   )}
//                 </p>
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

//             <ImageUpload
//               label="Product Image"
//               value={formData.image_url}
//               onChange={(value) => setFormData({ ...formData, image_url: value })}
//               required
//               aspectRatio="square"
//             />

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
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <>
//                     <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
//                     Uploading...
//                   </>
//                 ) : (
//                   <>{editingProduct ? "Update" : "Create"} Product</>
//                 )}
//               </Button>
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





// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { DashboardLayout } from "@/components/DashboardLayout"
// import { productService } from "@/services/productService"
// import { categoryService } from "@/services/categoryService"
// import type { Product, Category, ProductsResponse } from "@/types"
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
// import { Pencil, Trash2, Plus, Search, ChevronLeft, ChevronRight, Package } from "lucide-react"
// import { ImageUpload } from "@/components/ImageUpload"

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
//   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [totalProducts, setTotalProducts] = useState(0)

//   const [formData, setFormData] = useState({
//     name: "",
//     name_ar: "",
//     brand: "",
//     price: "",
//     original_price: "",
//     description: "",
//     description_ar: "",
//     category_id: "",
//     image_url: "" as string | File,
//     emoji_icon: "🧴",
//     discount: "",
//     badge: "الأكثر مبيعاً",
//     stock_quantity: "",
//     in_stock: true,
//   })

//   useEffect(() => {
//     fetchProducts()
//     fetchCategories()
//   }, [currentPage])

//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true)
//       console.log("[v0] Fetching products...", { page: currentPage })
//       const data = await productService.getProducts(currentPage)
//       console.log("[v0] Products response:", data)
      
//       setProducts(Array.isArray(data.products) ? data.products : [])
      
//       // Set pagination info from API response
//       if (data.pagination) {
//         setTotalPages(data.pagination.totalPages)
//         setTotalProducts(data.pagination.total)
//       } else {
//         // Fallback if pagination data is not available
//         setTotalPages(1)
//         setTotalProducts(data.products?.length || 0)
//       }
//     } catch (error) {
//       console.error("[v0] Failed to fetch products:", error)
//       toast.error("Failed to load products")
//       setProducts([])
//       setTotalPages(1)
//       setTotalProducts(0)
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
//       toast.error("Failed to load categories")
//       setCategories([])
//     }
//   }

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       setCurrentPage(1)
//       fetchProducts()
//       return
//     }
//     try {
//       setIsLoading(true)
//       const data = await productService.searchProducts(searchQuery, currentPage)
//       setProducts(Array.isArray(data.products) ? data.products : [])
      
//       if (data.pagination) {
//         setTotalPages(data.pagination.totalPages)
//         setTotalProducts(data.pagination.total)
//       } else {
//         setTotalPages(1)
//         setTotalProducts(data.products?.length || 0)
//       }
//     } catch (error) {
//       console.error("Failed to search products:", error)
//       toast.error("Failed to search products")
//       setProducts([])
//       setTotalPages(1)
//       setTotalProducts(0)
//     } finally {
//       setIsLoading(false)
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
//     setIsSubmitting(true)
//     try {
//       const stockQuantity = Number.parseInt(formData.stock_quantity) || 0
//       const inStock = stockQuantity > 0

//       const { image_url, ...restFormData } = formData

//       const productData = {
//         ...restFormData,
//         price: Number.parseFloat(formData.price) || 0,
//         original_price: Number.parseFloat(formData.original_price) || 0,
//         category_id: Number.parseInt(formData.category_id) || 1,
//         discount: Number.parseInt(formData.discount) || 0,
//         stock_quantity: stockQuantity,
//         in_stock: inStock,
//         image: image_url,
//       }

//       if (editingProduct) {
//         await productService.updateProduct(editingProduct.id, productData)
//         toast.success("Product updated successfully")
//       } else {
//         await productService.createProduct(productData)
//         toast.success("Product created successfully")
//       }

//       setIsDialogOpen(false)
//       setCurrentPage(1) // Reset to first page to see the new/updated product
//       fetchProducts()
//     } catch (error) {
//       console.error("Failed to save product:", error)
//       toast.error("Failed to save product")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleDelete = async () => {
//     if (!deletingProduct) return
//     try {
//       console.log("[v0] Deleting product:", deletingProduct.id, deletingProduct.name)
//       await productService.deleteProduct(deletingProduct.id)
//       console.log("[v0] Product deleted successfully")
//       toast.success("Product deleted successfully")
//       setIsDeleteDialogOpen(false)
//       setDeletingProduct(null)
      
//       // If we're on the last page and it's now empty, go to previous page
//       if (products.length === 1 && currentPage > 1) {
//         setCurrentPage(currentPage - 1)
//       } else {
//         fetchProducts()
//       }
//     } catch (error: any) {
//       console.error("[v0] Failed to delete product:", error)
//       console.error("[v0] Error response:", error.response)
//       const errorMessage =
//         error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

//       if (error.response?.status === 500) {
//         toast.error(`Server error: ${errorMessage}. The product may be referenced in existing orders.`)
//       } else if (error.response?.status === 400) {
//         toast.error(`Cannot delete: ${errorMessage}`)
//       } else if (error.response?.status === 403) {
//         toast.error("You don't have permission to delete this product")
//       } else if (error.response?.status === 404) {
//         toast.error("Product not found")
//       } else {
//         toast.error(errorMessage)
//       }
//     }
//   }

//   // Pagination handlers
//   const goToPage = (page: number) => {
//     setCurrentPage(page)
//   }

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const goToPrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   // Generate page numbers for pagination (max 5 pages visible)
//   const generatePageNumbers = () => {
//     const pages = []
//     const maxVisiblePages = 5
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total pages is less than max visible
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i)
//       }
//     } else {
//       // Show pages around current page
//       let startPage = Math.max(1, currentPage - 2)
//       let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      
//       // Adjust start page if we're near the end
//       if (endPage - startPage + 1 < maxVisiblePages) {
//         startPage = Math.max(1, endPage - maxVisiblePages + 1)
//       }
      
//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i)
//       }
//     }
    
//     return pages
//   }

//   const filteredProducts = Array.isArray(products) ? products : []

//   if (isLoading && products.length === 0) {
//     return (
//       <DashboardLayout>
//         <div className="flex h-full items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading products...</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold">Products Management</h1>
//             <p className="text-sm text-muted-foreground mt-1">
//               Showing {filteredProducts.length} of {totalProducts} products (Page {currentPage} of {totalPages})
//             </p>
//           </div>
//           <Button onClick={() => handleOpenDialog()} className="sm:w-auto w-full">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Product
//           </Button>
//         </div>

//         {/* Search Bar */}
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   placeholder="Search products by name, brand, or description..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                   className="pl-9"
//                 />
//               </div>
//               <div className="flex gap-2">
//                 <Button onClick={handleSearch} className="flex-1 sm:flex-none">
//                   <Search className="mr-2 h-4 w-4" />
//                   Search
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   onClick={() => {
//                     setSearchQuery("")
//                     setCurrentPage(1)
//                     fetchProducts()
//                   }}
//                   className="flex-1 sm:flex-none"
//                 >
//                   Clear
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Products Grid */}
//         {filteredProducts.length === 0 && !isLoading ? (
//           <Card>
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <div className="text-center">
//                 <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
//                   <Package className="h-24 w-24" />
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2">No products found</h3>
//                 <p className="text-muted-foreground mb-4">
//                   {searchQuery 
//                     ? "No products match your search criteria. Try different keywords." 
//                     : "Get started by adding your first product."
//                   }
//                 </p>
//                 {!searchQuery && (
//                   <Button onClick={() => handleOpenDialog()}>
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Your First Product
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           <>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {filteredProducts.map((product) => (
//                 <Card key={product.id} className="overflow-hidden">
//                   {product.image_url && (
//                     <div className="aspect-square overflow-hidden">
//                       <img
//                         src={product.image_url || "/placeholder.svg"}
//                         alt={product.name}
//                         className="h-full w-full object-cover transition-transform hover:scale-105"
//                       />
//                     </div>
//                   )}
//                   <CardHeader className="pb-3">
//                     <div className="flex items-start justify-between gap-2">
//                       <div className="flex-1 min-w-0">
//                         <CardTitle className="text-lg line-clamp-2 break-words">{product.name}</CardTitle>
//                         <p className="text-sm text-muted-foreground mt-1 line-clamp-2 break-words">{product.name_ar}</p>
//                       </div>
//                       <span className="text-2xl flex-shrink-0">{product.emoji_icon}</span>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pt-0">
//                     <div className="space-y-3">
//                       <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>

//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className="text-lg font-bold text-primary">{product.price} IQD</span>
//                         {product.discount > 0 && (
//                           <>
//                             <span className="text-sm text-muted-foreground line-through">{product.original_price} IQD</span>
//                             <Badge variant="destructive" className="text-xs">
//                               -{product.discount}%
//                             </Badge>
//                           </>
//                         )}
//                       </div>

//                       <div className="flex items-center gap-2 text-sm">
//                         <span className="text-yellow-500">★</span>
//                         <span>{product.rating || 0}</span>
//                         <span className="text-muted-foreground">({product.reviews_count || 0} reviews)</span>
//                       </div>

//                       <div className="flex items-center justify-between gap-2 flex-wrap">
//                         <Badge variant={product.in_stock ? "default" : "destructive"} className="whitespace-nowrap">
//                           {product.in_stock ? `In Stock: ${product.stock_quantity}` : 'Out of Stock'}
//                         </Badge>
//                         {product.badge && (
//                           <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 text-xs">
//                             {product.badge}
//                           </Badge>
//                         )}
//                       </div>

//                       {product.category_name_ar && (
//                         <p className="text-xs text-muted-foreground">
//                           Category: {product.category_name_ar}
//                         </p>
//                       )}

//                       <div className="flex gap-2 pt-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="flex-1"
//                           onClick={() => handleOpenDialog(product)}
//                         >
//                           <Pencil className="mr-2 h-3 w-3" />
//                           Edit
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           className="flex-1"
//                           onClick={() => {
//                             setDeletingProduct(product)
//                             setIsDeleteDialogOpen(true)
//                           }}
//                         >
//                           <Trash2 className="mr-2 h-3 w-3" />
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <Card>
//                 <CardContent className="pt-6">
//                   <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                     <div className="text-sm text-muted-foreground">
//                       Page {currentPage} of {totalPages} • {totalProducts} total products
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={goToPrevPage}
//                         disabled={currentPage === 1}
//                         className="flex items-center gap-1"
//                       >
//                         <ChevronLeft className="h-4 w-4" />
//                         Previous
//                       </Button>
                      
//                       {/* Page numbers */}
//                       <div className="flex gap-1">
//                         {generatePageNumbers().map((pageNum) => (
//                           <Button
//                             key={pageNum}
//                             variant={currentPage === pageNum ? "default" : "outline"}
//                             size="sm"
//                             onClick={() => goToPage(pageNum)}
//                             className="w-8 h-8 p-0 min-w-8"
//                           >
//                             {pageNum}
//                           </Button>
//                         ))}
//                       </div>

//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={goToNextPage}
//                         disabled={currentPage === totalPages}
//                         className="flex items-center gap-1"
//                       >
//                         Next
//                         <ChevronRight className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </>
//         )}
//       </div>

//       {/* Add/Edit Product Dialog - Keep your existing dialog code */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
//             <DialogDescription>
//               {editingProduct ? "Update the product details below." : "Fill in the product details below."}
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Your existing form fields */}
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

//             {/* Rest of your form fields... */}

//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <>
//                     <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
//                     {editingProduct ? "Updating..." : "Creating..."}
//                   </>
//                 ) : (
//                   <>{editingProduct ? "Update" : "Create"} Product</>
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog - Keep your existing dialog code */}
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
import type { Product, Category, ProductsResponse } from "@/types"
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
import { Pencil, Trash2, Plus, Search, ChevronLeft, ChevronRight, Package, Loader2 } from "lucide-react"
import { ImageUpload } from "@/components/ImageUpload"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [isFetching, setIsFetching] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    brand: "",
    price: "",
    original_price: "",
    description: "",
    description_ar: "",
    category_id: "",
    image_url: "" as string | File,
    emoji_icon: "🧴",
    discount: "0",
    badge: "الأكثر مبيعاً",
    stock_quantity: "0",
    in_stock: true,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [currentPage])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      console.log("[Products] Fetching products...", { page: currentPage })
      const data = await productService.getProducts(currentPage)
      console.log("[Products] Products response:", data)
      
      setProducts(Array.isArray(data.products) ? data.products : [])
      
      // Set pagination info from API response
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages)
        setTotalProducts(data.pagination.total)
      } else {
        // Fallback if pagination data is not available
        setTotalPages(1)
        setTotalProducts(data.products?.length || 0)
      }
    } catch (error) {
      console.error("[Products] Failed to fetch products:", error)
      toast.error("Failed to load products")
      setProducts([])
      setTotalPages(1)
      setTotalProducts(0)
    } finally {
      setIsLoading(false)
      setIsFetching(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      toast.error("Failed to load categories")
      setCategories([])
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setCurrentPage(1)
      fetchProducts()
      return
    }
    try {
      setIsFetching(true)
      const data = await productService.searchProducts(searchQuery, currentPage)
      setProducts(Array.isArray(data.products) ? data.products : [])
      
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages)
        setTotalProducts(data.pagination.total)
      } else {
        setTotalPages(1)
        setTotalProducts(data.products?.length || 0)
      }
    } catch (error) {
      console.error("Failed to search products:", error)
      toast.error("Failed to search products")
      setProducts([])
      setTotalPages(1)
      setTotalProducts(0)
    } finally {
      setIsFetching(false)
    }
  }

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name || "",
        name_ar: product.name_ar || "",
        brand: product.brand || "",
        price: product.price?.toString() || "",
        original_price: product.original_price?.toString() || "",
        description: product.description || "",
        description_ar: product.description_ar || "",
        category_id: product.category_id?.toString() || "",
        image_url: product.image_url || "",
        emoji_icon: product.emoji_icon || "🧴",
        discount: product.discount?.toString() || "0",
        badge: product.badge || "الأكثر مبيعاً",
        stock_quantity: product.stock_quantity?.toString() || "0",
        in_stock: product.in_stock || true,
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
        discount: "0",
        badge: "الأكثر مبيعاً",
        stock_quantity: "0",
        in_stock: true,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const stockQuantity = Number.parseInt(formData.stock_quantity) || 0
      const inStock = stockQuantity > 0

      const { image_url, ...restFormData } = formData

      const productData = {
        ...restFormData,
        price: Number.parseFloat(formData.price) || 0,
        original_price: Number.parseFloat(formData.original_price) || 0,
        category_id: Number.parseInt(formData.category_id) || 1,
        discount: Number.parseInt(formData.discount) || 0,
        stock_quantity: stockQuantity,
        in_stock: inStock,
        image: image_url,
      }

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData)
        toast.success("Product updated successfully")
      } else {
        await productService.createProduct(productData)
        toast.success("Product created successfully")
      }

      setIsDialogOpen(false)
      setCurrentPage(1) // Reset to first page to see the new/updated product
      fetchProducts()
    } catch (error: any) {
      console.error("Failed to save product:", error)
      const errorMessage = error.response?.data?.message || error.message || "Failed to save product"
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingProduct) return
    try {
      console.log("[Products] Deleting product:", deletingProduct.id, deletingProduct.name)
      await productService.deleteProduct(deletingProduct.id)
      console.log("[Products] Product deleted successfully")
      toast.success("Product deleted successfully")
      setIsDeleteDialogOpen(false)
      setDeletingProduct(null)
      
      // If we're on the last page and it's now empty, go to previous page
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      } else {
        fetchProducts()
      }
    } catch (error: any) {
      console.error("[Products] Failed to delete product:", error)
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to delete product"

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

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Generate page numbers for pagination (max 5 pages visible)
  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, currentPage - 2)
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      
      // Adjust start page if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  const filteredProducts = Array.isArray(products) ? products : []

  if (isLoading && products.length === 0) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Products Management</h1>
              <Skeleton className="h-5 w-48 mt-1" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Products Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filteredProducts.length} of {totalProducts} products (Page {currentPage} of {totalPages})
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="sm:w-auto w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products by name, brand, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSearch} 
                  className="flex-1 sm:flex-none"
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Search
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("")
                    setCurrentPage(1)
                    fetchProducts()
                  }}
                  className="flex-1 sm:flex-none"
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length === 0 && !isLoading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
                  <Package className="h-24 w-24" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? "No products match your search criteria. Try different keywords." 
                    : "Get started by adding your first product."
                  }
                </p>
                {!searchQuery && (
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Product
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {product.image_url && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg line-clamp-2 break-words">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 break-words">{product.name_ar}</p>
                      </div>
                      <span className="text-2xl flex-shrink-0">{product.emoji_icon}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-primary">
                          {Number(product.price).toLocaleString()} IQD
                        </span>
                        {product.discount > 0 && (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              {Number(product.original_price).toLocaleString()} IQD
                            </span>
                            <Badge variant="destructive" className="text-xs">
                              -{product.discount}%
                            </Badge>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span>{Number(product.rating) || 0}</span>
                        <span className="text-muted-foreground">({product.reviews_count || 0} reviews)</span>
                      </div>

                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <Badge variant={product.in_stock ? "default" : "destructive"} className="whitespace-nowrap">
                          {product.in_stock ? `In Stock: ${product.stock_quantity}` : 'Out of Stock'}
                        </Badge>
                        {product.badge && (
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 text-xs">
                            {product.badge}
                          </Badge>
                        )}
                      </div>

                      {product.category_name_ar && (
                        <p className="text-xs text-muted-foreground">
                          Category: {product.category_name_ar}
                        </p>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages} • {totalProducts} total products
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      
                      {/* Page numbers */}
                      <div className="flex gap-1">
                        {generatePageNumbers().map((pageNum) => (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(pageNum)}
                            className="w-8 h-8 p-0 min-w-8"
                          >
                            {pageNum}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the product details below." : "Fill in the product details below."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (English) *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter product name in English"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_ar">Name (Arabic) *</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  required
                  placeholder="أدخل اسم المنتج بالعربية"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
                placeholder="Enter brand name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (IQD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Original Price (IQD) *</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  required
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Category *</Label>
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
                <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={(e) => {
                    const quantity = Number.parseInt(e.target.value) || 0
                    setFormData({
                      ...formData,
                      stock_quantity: e.target.value,
                      in_stock: quantity > 0,
                    })
                  }}
                  required
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Status:{" "}
                  {(Number.parseInt(formData.stock_quantity) || 0) > 0 ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emoji_icon">Emoji Icon</Label>
                <Input
                  id="emoji_icon"
                  value={formData.emoji_icon}
                  onChange={(e) => setFormData({ ...formData, emoji_icon: e.target.value })}
                  placeholder="🧴"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="الأكثر مبيعاً"
                />
              </div>
            </div>

            <ImageUpload
              label="Product Image *"
              value={formData.image_url}
              onChange={(value) => setFormData({ ...formData, image_url: value })}
              required
              aspectRatio="square"
            />

            <div className="space-y-2">
              <Label htmlFor="description">Description (English) *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
                placeholder="Enter product description in English"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_ar">Description (Arabic) *</Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                rows={3}
                required
                placeholder="أدخل وصف المنتج بالعربية"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editingProduct ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{editingProduct ? "Update" : "Create"} Product</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "<strong>{deletingProduct?.name}</strong>"? 
              This action cannot be undone and will permanently remove the product from your store.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}