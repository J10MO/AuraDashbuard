// // "use client"

// // import type React from "react"

// // import { useEffect, useState } from "react"
// // import { DashboardLayout } from "@/components/DashboardLayout"
// // import { categoryService } from "@/services/categoryService"
// // import type { Category } from "@/types"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { toast } from "sonner"
// // import { Plus, Pencil, Trash2 } from "lucide-react"

// // export default function CategoriesPage() {
// //   const [categories, setCategories] = useState<Category[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [editingCategory, setEditingCategory] = useState<Category | null>(null)
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     name_ar: "",
// //     icon: "",
// //     color: "#f7e1d7",
// //     image_url: "",
// //   })

// //   useEffect(() => {
// //     fetchCategories()
// //   }, [])

// //   const fetchCategories = async () => {
// //     try {
// //       const data = await categoryService.getCategories()
// //       console.log("[v0] Categories fetched:", data)
// //       setCategories(Array.isArray(data) ? data : [])
// //     } catch (error) {
// //       console.error("Failed to fetch categories:", error)
// //       toast.error("Failed to load categories")
// //       setCategories([])
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const handleAddNew = () => {
// //     setEditingCategory(null)
// //     setFormData({
// //       name: "",
// //       name_ar: "",
// //       icon: "",
// //       color: "#f7e1d7",
// //       image_url: "",
// //     })
// //     setIsDialogOpen(true)
// //   }

// //   const handleEdit = (category: Category) => {
// //     setEditingCategory(category)
// //     setFormData({
// //       name: category.name,
// //       name_ar: category.name_ar || "",
// //       icon: category.icon || "",
// //       color: category.color || "#f7e1d7",
// //       image_url: category.image_url || "",
// //     })
// //     setIsDialogOpen(true)
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     try {
// //       if (editingCategory) {
// //         await categoryService.updateCategory(editingCategory.id, formData)
// //         toast.success("Category updated successfully")
// //       } else {
// //         await categoryService.createCategory(formData)
// //         toast.success("Category created successfully")
// //       }

// //       setIsDialogOpen(false)
// //       fetchCategories()
// //     } catch (error) {
// //       console.error("Failed to save category:", error)
// //       toast.error("Failed to save category")
// //     }
// //   }

// //   const handleDelete = async (id: number) => {
// //     if (!confirm("Are you sure you want to delete this category?")) return

// //     try {
// //       await categoryService.deleteCategory(id)
// //       toast.success("Category deleted successfully")
// //       fetchCategories()
// //     } catch (error) {
// //       console.error("Failed to delete category:", error)
// //       toast.error("Failed to delete category")
// //     }
// //   }

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
// //           <h1 className="text-3xl font-bold">Categories</h1>
// //           <Button onClick={handleAddNew}>
// //             <Plus className="mr-2 h-4 w-4" />
// //             Add Category
// //           </Button>
// //         </div>

// //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //           {categories.map((category) => (
// //             <Card key={category.id} className="overflow-hidden">
// //               {category.image_url && (
// //                 <div className="relative aspect-video overflow-hidden">
// //                   <img
// //                     src={category.image_url || "/placeholder.svg"}
// //                     alt={category.name}
// //                     className="h-full w-full object-cover"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
// //                 </div>
// //               )}
// //               <CardHeader>
// //                 <div className="flex items-center justify-between gap-2">
// //                   <div className="flex-1">
// //                     <CardTitle className="text-lg">{category.name}</CardTitle>
// //                     <p className="text-sm text-muted-foreground mt-1">{category.name_ar}</p>
// //                   </div>
// //                   <span className="text-3xl">{category.icon}</span>
// //                 </div>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-3">
// //                   <div className="flex items-center justify-between">
// //                     <span className="text-sm text-muted-foreground">Products</span>
// //                     <Badge variant="secondary">{category.product_count}</Badge>
// //                   </div>

// //                   <div className="flex items-center gap-2">
// //                     <span className="text-sm text-muted-foreground">Color</span>
// //                     <div
// //                       className="h-6 w-6 rounded-full border-2 border-border"
// //                       style={{ backgroundColor: category.color }}
// //                     />
// //                     <span className="text-xs text-muted-foreground">{category.color}</span>
// //                   </div>

// //                   <p className="text-xs text-muted-foreground">
// //                     Created: {new Date(category.created_at).toLocaleDateString()}
// //                   </p>

// //                   <div className="flex gap-2 pt-2">
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       className="flex-1 bg-transparent"
// //                       onClick={() => handleEdit(category)}
// //                     >
// //                       <Pencil className="mr-2 h-3 w-3" />
// //                       Edit
// //                     </Button>
// //                     <Button
// //                       variant="destructive"
// //                       size="sm"
// //                       className="flex-1"
// //                       onClick={() => handleDelete(category.id)}
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

// //         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //           <DialogContent className="max-w-md">
// //             <DialogHeader>
// //               <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
// //             </DialogHeader>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="name">Name (English)</Label>
// //                 <Input
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                   placeholder="e.g., Skincare"
// //                   required
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="name_ar">Name (Arabic)</Label>
// //                 <Input
// //                   id="name_ar"
// //                   value={formData.name_ar}
// //                   onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
// //                   placeholder="e.g., العناية بالبشرة"
// //                   required
// //                   dir="rtl"
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="icon">Icon (Emoji)</Label>
// //                 <Input
// //                   id="icon"
// //                   value={formData.icon}
// //                   onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
// //                   placeholder="e.g., 🧴"
// //                   required
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="color">Color (Hex)</Label>
// //                 <div className="flex gap-2">
// //                   <Input
// //                     id="color"
// //                     type="color"
// //                     value={formData.color}
// //                     onChange={(e) => setFormData({ ...formData, color: e.target.value })}
// //                     className="w-20 h-10"
// //                   />
// //                   <Input
// //                     value={formData.color}
// //                     onChange={(e) => setFormData({ ...formData, color: e.target.value })}
// //                     placeholder="#f7e1d7"
// //                     className="flex-1"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="image_url">Image URL</Label>
// //                 <Input
// //                   id="image_url"
// //                   value={formData.image_url}
// //                   onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
// //                   placeholder="https://example.com/image.jpg"
// //                   type="url"
// //                 />
// //               </div>

// //               <div className="flex gap-2 pt-4">
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   className="flex-1 bg-transparent"
// //                   onClick={() => setIsDialogOpen(false)}
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button type="submit" className="flex-1">
// //                   {editingCategory ? "Update" : "Create"}
// //                 </Button>
// //               </div>
// //             </form>
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </DashboardLayout>
// //   )
// // }




// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import { DashboardLayout } from "@/components/DashboardLayout"
// import { categoryService } from "@/services/categoryService"
// import type { Category } from "@/types"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { toast } from "sonner"
// import { Plus, Pencil, Trash2 } from "lucide-react"
// import { ImageUpload } from "@/components/ImageUpload"

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null)
//   const [formData, setFormData] = useState<{
//     name: string
//     name_ar: string
//     icon: string
//     color: string
//     image: string | File
//   }>({
//     name: "",
//     name_ar: "",
//     icon: "",
//     color: "#f7e1d7",
//     image: "",
//   })

//   useEffect(() => {
//     fetchCategories()
//   }, [])

//   const fetchCategories = async () => {
//     try {
//       const data = await categoryService.getCategories()
//       console.log("[v0] Categories fetched:", data)
//       setCategories(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Failed to fetch categories:", error)
//       toast.error("Failed to load categories")
//       setCategories([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleAddNew = () => {
//     setEditingCategory(null)
//     setFormData({
//       name: "",
//       name_ar: "",
//       icon: "",
//       color: "#f7e1d7",
//       image: "",
//     })
//     setIsDialogOpen(true)
//   }

//   const handleEdit = (category: Category) => {
//     setEditingCategory(category)
//     setFormData({
//       name: category.name,
//       name_ar: category.name_ar || "",
//       icon: category.icon || "",
//       color: category.color || "#f7e1d7",
//       image: category.image_url || "",
//     })
//     setIsDialogOpen(true)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       const { image, ...restData } = formData
//       const categoryData = {
//         ...restData,
//         image: image,
//       }

//       if (editingCategory) {
//         await categoryService.updateCategory(editingCategory.id, categoryData)
//         toast.success("Category updated successfully")
//       } else {
//         await categoryService.createCategory(categoryData)
//         toast.success("Category created successfully")
//       }

//       setIsDialogOpen(false)
//       fetchCategories()
//     } catch (error) {
//       console.error("Failed to save category:", error)
//       toast.error("Failed to save category")
//     }
//   }

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this category?")) return

//     try {
//       await categoryService.deleteCategory(id)
//       toast.success("Category deleted successfully")
//       fetchCategories()
//     } catch (error) {
//       console.error("Failed to delete category:", error)
//       toast.error("Failed to delete category")
//     }
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
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold">Categories</h1>
//           <Button onClick={handleAddNew}>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Category
//           </Button>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((category) => (
//             <Card key={category.id} className="overflow-hidden">
//               {category.image_url && (
//                 <div className="relative aspect-video overflow-hidden">
//                   <img
//                     src={category.image_url || "/placeholder.svg"}
//                     alt={category.name}
//                     className="h-full w-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 </div>
//               )}
//               <CardHeader>
//                 <div className="flex items-center justify-between gap-2">
//                   <div className="flex-1">
//                     <CardTitle className="text-lg">{category.name}</CardTitle>
//                     <p className="text-sm text-muted-foreground mt-1">{category.name_ar}</p>
//                   </div>
//                   <span className="text-3xl">{category.icon}</span>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-muted-foreground">Products</span>
//                     <Badge variant="secondary">{category.product_count}</Badge>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-muted-foreground">Color</span>
//                     <div
//                       className="h-6 w-6 rounded-full border-2 border-border"
//                       style={{ backgroundColor: category.color }}
//                     />
//                     <span className="text-xs text-muted-foreground">{category.color}</span>
//                   </div>

//                   <p className="text-xs text-muted-foreground">
//                     Created: {new Date(category.created_at).toLocaleDateString()}
//                   </p>

//                   <div className="flex gap-2 pt-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1 bg-transparent"
//                       onClick={() => handleEdit(category)}
//                     >
//                       <Pencil className="mr-2 h-3 w-3" />
//                       Edit
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="flex-1"
//                       onClick={() => handleDelete(category.id)}
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

//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-md">
//             <DialogHeader>
//               <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Name (English)</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="e.g., Skincare"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="name_ar">Name (Arabic)</Label>
//                 <Input
//                   id="name_ar"
//                   value={formData.name_ar}
//                   onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
//                   placeholder="e.g., العناية بالبشرة"
//                   required
//                   dir="rtl"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="icon">Icon (Emoji)</Label>
//                 <Input
//                   id="icon"
//                   value={formData.icon}
//                   onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
//                   placeholder="e.g., 🧴"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="color">Color (Hex)</Label>
//                 <div className="flex gap-2">
//                   <Input
//                     id="color"
//                     type="color"
//                     value={formData.color}
//                     onChange={(e) => setFormData({ ...formData, color: e.target.value })}
//                     className="w-20 h-10"
//                   />
//                   <Input
//                     value={formData.color}
//                     onChange={(e) => setFormData({ ...formData, color: e.target.value })}
//                     placeholder="#f7e1d7"
//                     className="flex-1"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <ImageUpload
//                   label="Category Image"
//                   value={formData.image}
//                   onChange={(value) => setFormData({ ...formData, image: value })}
//                   aspectRatio="video"
//                 />
//               </div>

//               <div className="flex gap-2 pt-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="flex-1 bg-transparent"
//                   onClick={() => setIsDialogOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" className="flex-1">
//                   {editingCategory ? "Update" : "Create"}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </DashboardLayout>
//   )
// }












"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { categoryService } from "@/services/categoryService"
import type { Category } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { ImageUpload } from "@/components/ImageUpload"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    name_ar: string
    icon: string
    color: string
    image_url: string | File
  }>({
    name: "",
    name_ar: "",
    icon: "",
    color: "#f7e1d7",
    image_url: "",
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories()
      console.log("[v0] Categories fetched:", data)
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      toast.error("Failed to load categories")
      setCategories([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingCategory(null)
    setFormData({
      name: "",
      name_ar: "",
      icon: "",
      color: "#f7e1d7",
      image_url: "",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      name_ar: category.name_ar || "",
      icon: category.icon || "",
      color: category.color || "#f7e1d7",
      image_url: category.image_url || "",
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { image_url, ...restData } = formData
      const categoryData = {
        ...restData,
        image: image_url,
      }

      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, categoryData)
        toast.success("Category updated successfully")
      } else {
        await categoryService.createCategory(categoryData)
        toast.success("Category created successfully")
      }

      setIsDialogOpen(false)
      fetchCategories()
    } catch (error) {
      console.error("Failed to save category:", error)
      toast.error("Failed to save category")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      await categoryService.deleteCategory(id)
      toast.success("Category deleted successfully")
      fetchCategories()
    } catch (error) {
      console.error("Failed to delete category:", error)
      toast.error("Failed to delete category")
    }
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
          <h1 className="text-3xl font-bold">Categories</h1>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              {category.image_url && (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={category.image_url || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{category.name_ar}</p>
                  </div>
                  <span className="text-3xl">{category.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Products</span>
                    <Badge variant="secondary">{category.product_count}</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Color</span>
                    <div
                      className="h-6 w-6 rounded-full border-2 border-border"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-xs text-muted-foreground">{category.color}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(category.created_at).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(category.id)}
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (English)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Skincare"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name_ar">Name (Arabic)</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  placeholder="e.g., العناية بالبشرة"
                  required
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Emoji)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., 🧴"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color (Hex)</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#f7e1d7"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <ImageUpload
                  label="Category Image"
                  value={formData.image_url}
                  onChange={(value) => setFormData({ ...formData, image_url: value })}
                  aspectRatio="video"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                      Uploading...
                    </>
                  ) : (
                    <>{editingCategory ? "Update" : "Create"}</>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
