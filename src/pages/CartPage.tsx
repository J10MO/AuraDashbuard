// // "use client"

// // import { useState, useEffect } from "react"
// // import { DashboardLayout } from "@/components/DashboardLayout"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { useToast } from "@/hooks/use-toast"
// // import { useAuth } from "@/contexts/AuthContext"
// // import cartService, { type CartItem } from "@/services/cartService"
// // import {
// //   ShoppingCart,
// //   Package,
// //   DollarSign,
// //   Search,
// //   Trash2,
// //   Plus,
// //   Minus,
// //   ShoppingBag,
// //   Users,
// //   Edit,
// //   ChevronDown,
// //   ChevronUp,
// // } from "lucide-react"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog"
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// // interface GroupedUserCart {
// //   user_id: number
// //   customer_name: string
// //   customer_email: string
// //   items: CartItem[]
// //   total_items: number
// //   total_value: number
// // }

// // export default function CartPage() {
// //   const { isAdmin } = useAuth()
// //   const [carts, setCarts] = useState<CartItem[]>([])
// //   const [allCarts, setAllCarts] = useState<CartItem[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [clearDialogOpen, setClearDialogOpen] = useState(false)
// //   const [removingItemId, setRemovingItemId] = useState<number | null>(null)
// //   const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
// //   const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set())
// //   const [editQuantityDialog, setEditQuantityDialog] = useState<{
// //     open: boolean
// //     userId: number
// //     productId: number
// //     currentQuantity: number
// //     productName: string
// //   } | null>(null)
// //   const [newQuantity, setNewQuantity] = useState(1)
// //   const { toast } = useToast()

// //   useEffect(() => {
// //     fetchCarts()
// //   }, [isAdmin])

// //   const fetchCarts = async () => {
// //     try {
// //       setLoading(true)
// //       if (isAdmin) {
// //         const data = await cartService.getAllCarts()
// //         setAllCarts(data.carts || [])
// //       } else {
// //         const data = await cartService.getCart()
// //         setCarts(data.cart || data.carts || [])
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch cart:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to load cart data",
// //         variant: "destructive",
// //       })
// //       if (isAdmin) {
// //         setAllCarts([])
// //       } else {
// //         setCarts([])
// //       }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const groupedUserCarts: GroupedUserCart[] = allCarts.reduce((acc, item) => {
// //     const existingUser = acc.find((u) => u.user_id === item.user_id)
// //     if (existingUser) {
// //       existingUser.items.push(item)
// //       existingUser.total_items += item.quantity
// //       existingUser.total_value += Number.parseFloat(item.price) * item.quantity
// //     } else {
// //       acc.push({
// //         user_id: item.user_id,
// //         customer_name: item.customer_name,
// //         customer_email: item.customer_email,
// //         items: [item],
// //         total_items: item.quantity,
// //         total_value: Number.parseFloat(item.price) * item.quantity,
// //       })
// //     }
// //     return acc
// //   }, [] as GroupedUserCart[])

// //   const toggleUserExpansion = (userId: number) => {
// //     setExpandedUsers((prev) => {
// //       const newSet = new Set(prev)
// //       if (newSet.has(userId)) {
// //         newSet.delete(userId)
// //       } else {
// //         newSet.add(userId)
// //       }
// //       return newSet
// //     })
// //   }

// //   const handleUpdateQuantity = async (productId: number, currentQuantity: number, change: number) => {
// //     const newQuantity = currentQuantity + change
// //     if (newQuantity < 1) return

// //     try {
// //       await cartService.updateCartItem(productId, newQuantity)
// //       toast({
// //         title: "Success",
// //         description: "Cart updated successfully",
// //       })
// //       fetchCarts()
// //     } catch (error) {
// //       console.error("Failed to update cart:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to update cart",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const handleRemoveItem = async (productId: number) => {
// //     try {
// //       setRemovingItemId(productId)
// //       await cartService.removeFromCart(productId)
// //       toast({
// //         title: "Success",
// //         description: "Item removed from cart",
// //       })
// //       fetchCarts()
// //     } catch (error) {
// //       console.error("Failed to remove item:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to remove item",
// //         variant: "destructive",
// //       })
// //     } finally {
// //       setRemovingItemId(null)
// //     }
// //   }

// //   const handleClearCart = async () => {
// //     try {
// //       await cartService.clearCart()
// //       toast({
// //         title: "Success",
// //         description: "Cart cleared successfully",
// //       })
// //       setClearDialogOpen(false)
// //       fetchCarts()
// //     } catch (error) {
// //       console.error("Failed to clear cart:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to clear cart",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const handleAdminRemoveItem = async (userId: number, productId: number) => {
// //     try {
// //       await cartService.deleteCustomerCartItem(userId, productId)
// //       toast({
// //         title: "Success",
// //         description: "Item removed from user's cart",
// //       })
// //       fetchCarts()
// //     } catch (error) {
// //       console.error("Failed to remove item:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to remove item",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const handleAdminClearCart = async (userId: number) => {
// //     try {
// //       await cartService.clearCustomerCart(userId)
// //       toast({
// //         title: "Success",
// //         description: "User's cart cleared successfully",
// //       })
// //       setSelectedUserId(null)
// //       fetchCarts()
// //     } catch (error) {
// //       console.error("Failed to clear cart:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to clear cart",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const handleEditQuantity = (userId: number, productId: number, currentQuantity: number, productName: string) => {
// //     setEditQuantityDialog({
// //       open: true,
// //       userId,
// //       productId,
// //       currentQuantity,
// //       productName,
// //     })
// //     setNewQuantity(currentQuantity)
// //   }

// //   const saveEditedQuantity = async () => {
// //     if (!editQuantityDialog) return

// //     try {
// //       await cartService.updateCartItem(editQuantityDialog.productId, newQuantity)
// //       toast({
// //         title: "Success",
// //         description: "Quantity updated successfully",
// //       })
// //       setEditQuantityDialog(null)
// //       fetchCarts()
// //     } catch (error) {
// //       console.error("Failed to update quantity:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to update quantity",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const filteredCarts = carts.filter((cart) => {
// //     const search = searchTerm.toLowerCase()
// //     return cart.name?.toLowerCase().includes(search) || cart.name_ar?.includes(search)
// //   })

// //   const filteredUserCarts = groupedUserCarts.filter((userCart) => {
// //     const search = searchTerm.toLowerCase()
// //     return (
// //       userCart.customer_name?.toLowerCase().includes(search) || userCart.customer_email?.toLowerCase().includes(search)
// //     )
// //   })

// //   // Calculate statistics
// //   const stats = isAdmin
// //     ? {
// //         totalUsers: groupedUserCarts.length,
// //         totalItems: groupedUserCarts.reduce((sum, uc) => sum + uc.total_items, 0),
// //         totalValue: groupedUserCarts.reduce((sum, uc) => sum + uc.total_value, 0),
// //       }
// //     : {
// //         totalItems: carts.reduce((sum, cart) => sum + cart.quantity, 0),
// //         totalValue: carts.reduce((sum, cart) => sum + Number.parseFloat(cart.price) * cart.quantity, 0),
// //         uniqueProducts: new Set(carts.map((cart) => cart.product_id)).size,
// //       }

// //   if (isAdmin) {
// //     return (
// //       <DashboardLayout>
// //         <div className="space-y-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-3xl font-bold text-foreground">Cart Management (Admin)</h1>
// //               <p className="text-muted-foreground">Manage all users' shopping carts</p>
// //             </div>
// //           </div>

// //           {/* Admin Statistics Cards */}
// //           <div className="grid gap-4 md:grid-cols-3">
// //             <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Total Users with Carts</CardTitle>
// //                 <Users className="h-4 w-4 text-blue-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">{stats.totalUsers}</div>
// //                 <p className="text-xs text-muted-foreground">Active carts</p>
// //               </CardContent>
// //             </Card>

// //             <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Total Items</CardTitle>
// //                 <Package className="h-4 w-4 text-green-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">{stats.totalItems}</div>
// //                 <p className="text-xs text-muted-foreground">Across all carts</p>
// //               </CardContent>
// //             </Card>

// //             <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Total Value</CardTitle>
// //                 <DollarSign className="h-4 w-4 text-purple-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
// //                 <p className="text-xs text-muted-foreground">Combined cart value</p>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Search */}
// //           <div className="relative">
// //             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// //             <Input
// //               placeholder="Search by user name or email..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10"
// //             />
// //           </div>

// //           {loading ? (
// //             <div className="flex items-center justify-center py-12">
// //               <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// //             </div>
// //           ) : filteredUserCarts.length === 0 ? (
// //             <Card>
// //               <CardContent className="flex flex-col items-center justify-center py-12">
// //                 <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
// //                 <p className="text-lg font-medium text-muted-foreground">No user carts found</p>
// //               </CardContent>
// //             </Card>
// //           ) : (
// //             <div className="space-y-4">
// //               {filteredUserCarts.map((userCart) => (
// //                 <Card key={userCart.user_id} className="overflow-hidden transition-shadow hover:shadow-lg">
// //                   <CardHeader
// //                     className="cursor-pointer hover:bg-muted/50 transition-colors"
// //                     onClick={() => toggleUserExpansion(userCart.user_id)}
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-4">
// //                         <Avatar className="h-12 w-12">
// //                           <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
// //                             {userCart.customer_name?.charAt(0).toUpperCase() || "U"}
// //                           </AvatarFallback>
// //                         </Avatar>
// //                         <div>
// //                           <CardTitle className="text-lg">{userCart.customer_name}</CardTitle>
// //                           <p className="text-sm text-muted-foreground">{userCart.customer_email}</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-6">
// //                         <div className="text-right">
// //                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                             <Package className="h-4 w-4 text-blue-500" />
// //                             <span className="font-medium">{userCart.total_items} items</span>
// //                           </div>
// //                           <p className="text-lg font-bold text-primary mt-1">
// //                             {userCart.total_value.toLocaleString()} IQD
// //                           </p>
// //                         </div>
// //                         {expandedUsers.has(userCart.user_id) ? (
// //                           <ChevronUp className="h-5 w-5 text-muted-foreground" />
// //                         ) : (
// //                           <ChevronDown className="h-5 w-5 text-muted-foreground" />
// //                         )}
// //                       </div>
// //                     </div>
// //                   </CardHeader>

// //                   {expandedUsers.has(userCart.user_id) && (
// //                     <CardContent className="border-t bg-muted/20 space-y-3 pt-4">
// //                       <div className="space-y-3">
// //                         {userCart.items.map((item) => (
// //                           <div key={item.id} className="flex items-center gap-4 p-3 bg-background rounded-lg border">
// //                             <img
// //                               src={item.image_url || "/placeholder.svg"}
// //                               alt={item.name}
// //                               className="h-16 w-16 rounded object-cover"
// //                             />
// //                             <div className="flex-1 min-w-0">
// //                               <p className="font-medium truncate">{item.name}</p>
// //                               <p className="text-sm text-muted-foreground truncate">{item.name_ar}</p>
// //                               <p className="text-sm font-medium text-primary mt-1">
// //                                 {Number.parseFloat(item.price).toLocaleString()} IQD × {item.quantity}
// //                               </p>
// //                             </div>
// //                             <div className="flex items-center gap-2">
// //                               <div className="text-right min-w-[100px]">
// //                                 <p className="text-lg font-bold">
// //                                   {(Number.parseFloat(item.price) * item.quantity).toLocaleString()} IQD
// //                                 </p>
// //                               </div>
// //                               <Button
// //                                 size="sm"
// //                                 variant="ghost"
// //                                 className="h-9 w-9 p-0"
// //                                 onClick={() =>
// //                                   handleEditQuantity(userCart.user_id, item.product_id, item.quantity, item.name)
// //                                 }
// //                               >
// //                                 <Edit className="h-4 w-4" />
// //                               </Button>
// //                               <Button
// //                                 size="sm"
// //                                 variant="ghost"
// //                                 className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10"
// //                                 onClick={() => handleAdminRemoveItem(userCart.user_id, item.product_id)}
// //                               >
// //                                 <Trash2 className="h-4 w-4" />
// //                               </Button>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>

// //                       <Button
// //                         variant="destructive"
// //                         size="sm"
// //                         className="w-full mt-4"
// //                         onClick={() => setSelectedUserId(userCart.user_id)}
// //                       >
// //                         <Trash2 className="h-4 w-4 mr-2" />
// //                         Clear User's Cart
// //                       </Button>
// //                     </CardContent>
// //                   )}
// //                 </Card>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Clear User Cart Dialog */}
// //         <Dialog open={selectedUserId !== null} onOpenChange={() => setSelectedUserId(null)}>
// //           <DialogContent>
// //             <DialogHeader>
// //               <DialogTitle>Clear User's Cart</DialogTitle>
// //               <DialogDescription>
// //                 Are you sure you want to clear this user's cart? This action cannot be undone.
// //               </DialogDescription>
// //             </DialogHeader>
// //             <DialogFooter>
// //               <Button variant="outline" onClick={() => setSelectedUserId(null)}>
// //                 Cancel
// //               </Button>
// //               <Button variant="destructive" onClick={() => selectedUserId && handleAdminClearCart(selectedUserId)}>
// //                 Clear Cart
// //               </Button>
// //             </DialogFooter>
// //           </DialogContent>
// //         </Dialog>

// //         {/* Edit Quantity Dialog */}
// //         <Dialog open={editQuantityDialog?.open || false} onOpenChange={() => setEditQuantityDialog(null)}>
// //           <DialogContent>
// //             <DialogHeader>
// //               <DialogTitle>Edit Quantity</DialogTitle>
// //               <DialogDescription>Update the quantity for {editQuantityDialog?.productName}</DialogDescription>
// //             </DialogHeader>
// //             <div className="py-4">
// //               <div className="flex items-center justify-center gap-4">
// //                 <Button
// //                   size="sm"
// //                   variant="outline"
// //                   onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
// //                   disabled={newQuantity <= 1}
// //                 >
// //                   <Minus className="h-4 w-4" />
// //                 </Button>
// //                 <Input
// //                   type="number"
// //                   value={newQuantity}
// //                   onChange={(e) => setNewQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
// //                   className="w-20 text-center"
// //                   min="1"
// //                 />
// //                 <Button size="sm" variant="outline" onClick={() => setNewQuantity(newQuantity + 1)}>
// //                   <Plus className="h-4 w-4" />
// //                 </Button>
// //               </div>
// //             </div>
// //             <DialogFooter>
// //               <Button variant="outline" onClick={() => setEditQuantityDialog(null)}>
// //                 Cancel
// //               </Button>
// //               <Button onClick={saveEditedQuantity}>Save Changes</Button>
// //             </DialogFooter>
// //           </DialogContent>
// //         </Dialog>
// //       </DashboardLayout>
// //     )
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div className="space-y-6">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
// //             <p className="text-muted-foreground">Manage your cart items</p>
// //           </div>
// //           {carts.length > 0 && (
// //             <Button variant="destructive" onClick={() => setClearDialogOpen(true)}>
// //               <Trash2 className="mr-2 h-4 w-4" />
// //               Clear Cart
// //             </Button>
// //           )}
// //         </div>

// //         {/* Statistics Cards */}
// //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Total Items</CardTitle>
// //               <Package className="h-4 w-4 text-muted-foreground" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{stats.totalItems}</div>
// //               <p className="text-xs text-muted-foreground">In your cart</p>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Total Value</CardTitle>
// //               <DollarSign className="h-4 w-4 text-muted-foreground" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
// //               <p className="text-xs text-muted-foreground">Cart total</p>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Unique Products</CardTitle>
// //               <ShoppingCart className="h-4 w-4 text-muted-foreground" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{stats.uniqueProducts}</div>
// //               <p className="text-xs text-muted-foreground">Different items</p>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Search */}
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// //           <Input
// //             placeholder="Search products in cart..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="pl-10"
// //           />
// //         </div>

// //         <Card>
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <ShoppingBag className="h-5 w-5" />
// //               Cart Items
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             {loading ? (
// //               <div className="flex items-center justify-center py-12">
// //                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// //               </div>
// //             ) : filteredCarts.length === 0 ? (
// //               <div className="flex flex-col items-center justify-center py-12">
// //                 <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
// //                 <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
// //                 <p className="text-sm text-muted-foreground">Add some products to get started</p>
// //               </div>
// //             ) : (
// //               <div className="space-y-4">
// //                 {filteredCarts.map((item) => (
// //                   <div
// //                     key={item.id}
// //                     className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:shadow-md"
// //                   >
// //                     <img
// //                       src={item.image_url || "/placeholder.svg"}
// //                       alt={item.name}
// //                       className="h-20 w-20 rounded-md object-cover"
// //                     />
// //                     <div className="flex-1">
// //                       <h4 className="font-semibold text-foreground">{item.name}</h4>
// //                       <p className="text-sm text-muted-foreground">{item.name_ar}</p>
// //                       <p className="mt-1 text-sm font-medium text-foreground">
// //                         {Number.parseFloat(item.price).toLocaleString()} IQD each
// //                       </p>
// //                     </div>
// //                     <div className="flex items-center gap-3">
// //                       <div className="flex items-center gap-2 rounded-lg border border-border p-1">
// //                         <Button
// //                           size="sm"
// //                           variant="ghost"
// //                           className="h-7 w-7 p-0"
// //                           onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
// //                           disabled={item.quantity <= 1}
// //                         >
// //                           <Minus className="h-3 w-3" />
// //                         </Button>
// //                         <span className="w-8 text-center font-medium">{item.quantity}</span>
// //                         <Button
// //                           size="sm"
// //                           variant="ghost"
// //                           className="h-7 w-7 p-0"
// //                           onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
// //                         >
// //                           <Plus className="h-3 w-3" />
// //                         </Button>
// //                       </div>
// //                       <div className="text-right min-w-[100px]">
// //                         <p className="text-lg font-bold text-foreground">
// //                           {(Number.parseFloat(item.price) * item.quantity).toLocaleString()} IQD
// //                         </p>
// //                       </div>
// //                       <Button
// //                         size="sm"
// //                         variant="ghost"
// //                         className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
// //                         onClick={() => handleRemoveItem(item.product_id)}
// //                         disabled={removingItemId === item.product_id}
// //                       >
// //                         <Trash2 className="h-4 w-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ))}

// //                 {/* Cart Summary */}
// //                 <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
// //                   <div className="flex items-center justify-between text-lg font-semibold">
// //                     <span>Total:</span>
// //                     <span className="text-2xl text-primary">{stats.totalValue.toLocaleString()} IQD</span>
// //                   </div>
// //                   <p className="mt-1 text-sm text-muted-foreground">
// //                     {stats.totalItems} items ({stats.uniqueProducts} unique products)
// //                   </p>
// //                   <Button className="mt-4 w-full" size="lg">
// //                     <ShoppingBag className="mr-2 h-5 w-5" />
// //                     Proceed to Checkout
// //                   </Button>
// //                 </div>
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Clear Cart Dialog */}
// //       <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Clear Cart</DialogTitle>
// //             <DialogDescription>
// //               Are you sure you want to remove all items from your cart? This action cannot be undone.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setClearDialogOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button variant="destructive" onClick={handleClearCart}>
// //               Clear Cart
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </DashboardLayout>
// //   )
// // }






// "use client"

// import { useState, useEffect } from "react"
// import { DashboardLayout } from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useToast } from "@/hooks/use-toast"
// import { useAuth } from "@/contexts/AuthContext"
// import cartService, { type CartItem } from "@/services/cartService"
// import {
//   ShoppingCart,
//   Package,
//   DollarSign,
//   Search,
//   Trash2,
//   Plus,
//   Minus,
//   ShoppingBag,
//   Users,
//   Edit,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// interface GroupedUserCart {
//   user_id: number
//   customer_name: string
//   customer_email: string
//   items: CartItem[]
//   total_items: number
//   total_value: number
// }

// export default function CartPage() {
//   const { isAdmin } = useAuth()
//   const [carts, setCarts] = useState<CartItem[]>([])
//   const [allCarts, setAllCarts] = useState<CartItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [clearDialogOpen, setClearDialogOpen] = useState(false)
//   const [removingItemId, setRemovingItemId] = useState<number | null>(null)
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
//   const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set())
//   const [editQuantityDialog, setEditQuantityDialog] = useState<{
//     open: boolean
//     userId: number
//     productId: number
//     currentQuantity: number
//     productName: string
//   } | null>(null)
//   const [newQuantity, setNewQuantity] = useState(1)
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchCarts()
//   }, [isAdmin])

//   const fetchCarts = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       if (isAdmin) {
//         const data = await cartService.getAllCarts()
//         const cartsData = data?.carts || data?.cart || []
//         setAllCarts(Array.isArray(cartsData) ? cartsData : [])
//       } else {
//         const data = await cartService.getCart()
//         const cartsData = data?.cart || data?.carts || []
//         setCarts(Array.isArray(cartsData) ? cartsData : [])
//       }
//     } catch (error: any) {
//       console.error("Failed to fetch cart:", error)
//       setError(error?.response?.data?.message || "Failed to load cart data")
//       if (isAdmin) {
//         setAllCarts([])
//       } else {
//         setCarts([])
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const groupedUserCarts: GroupedUserCart[] = allCarts.reduce((acc, item) => {
//     const existingUser = acc.find((u) => u.user_id === item.user_id)
//     if (existingUser) {
//       existingUser.items.push(item)
//       existingUser.total_items += item.quantity
//       existingUser.total_value += Number.parseFloat(item.price) * item.quantity
//     } else {
//       acc.push({
//         user_id: item.user_id,
//         customer_name: item.customer_name,
//         customer_email: item.customer_email,
//         items: [item],
//         total_items: item.quantity,
//         total_value: Number.parseFloat(item.price) * item.quantity,
//       })
//     }
//     return acc
//   }, [] as GroupedUserCart[])

//   const toggleUserExpansion = (userId: number) => {
//     setExpandedUsers((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(userId)) {
//         newSet.delete(userId)
//       } else {
//         newSet.add(userId)
//       }
//       return newSet
//     })
//   }

//   const handleUpdateQuantity = async (productId: number, currentQuantity: number, change: number) => {
//     const newQuantity = currentQuantity + change
//     if (newQuantity < 1) return

//     try {
//       await cartService.updateCartItem(productId, newQuantity)
//       toast({
//         title: "Success",
//         description: "Cart updated successfully",
//       })
//       fetchCarts()
//     } catch (error) {
//       console.error("Failed to update cart:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update cart",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleRemoveItem = async (productId: number) => {
//     try {
//       setRemovingItemId(productId)
//       await cartService.removeFromCart(productId)
//       toast({
//         title: "Success",
//         description: "Item removed from cart",
//       })
//       fetchCarts()
//     } catch (error) {
//       console.error("Failed to remove item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to remove item",
//         variant: "destructive",
//       })
//     } finally {
//       setRemovingItemId(null)
//     }
//   }

//   const handleClearCart = async () => {
//     try {
//       await cartService.clearCart()
//       toast({
//         title: "Success",
//         description: "Cart cleared successfully",
//       })
//       setClearDialogOpen(false)
//       fetchCarts()
//     } catch (error) {
//       console.error("Failed to clear cart:", error)
//       toast({
//         title: "Error",
//         description: "Failed to clear cart",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleAdminRemoveItem = async (userId: number, productId: number) => {
//     try {
//       await cartService.deleteCustomerCartItem(userId, productId)
//       toast({
//         title: "Success",
//         description: "Item removed from user's cart",
//       })
//       fetchCarts()
//     } catch (error) {
//       console.error("Failed to remove item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to remove item",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleAdminClearCart = async (userId: number) => {
//     try {
//       await cartService.clearCustomerCart(userId)
//       toast({
//         title: "Success",
//         description: "User's cart cleared successfully",
//       })
//       setSelectedUserId(null)
//       fetchCarts()
//     } catch (error) {
//       console.error("Failed to clear cart:", error)
//       toast({
//         title: "Error",
//         description: "Failed to clear cart",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditQuantity = (userId: number, productId: number, currentQuantity: number, productName: string) => {
//     setEditQuantityDialog({
//       open: true,
//       userId,
//       productId,
//       currentQuantity,
//       productName,
//     })
//     setNewQuantity(currentQuantity)
//   }

//   const saveEditedQuantity = async () => {
//     if (!editQuantityDialog) return

//     try {
//       await cartService.updateCartItem(editQuantityDialog.productId, newQuantity)
//       toast({
//         title: "Success",
//         description: "Quantity updated successfully",
//       })
//       setEditQuantityDialog(null)
//       fetchCarts()
//     } catch (error) {
//       console.error("Failed to update quantity:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update quantity",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredCarts = carts.filter((cart) => {
//     const search = searchTerm.toLowerCase()
//     return cart.name?.toLowerCase().includes(search) || cart.name_ar?.includes(search)
//   })

//   const filteredUserCarts = groupedUserCarts.filter((userCart) => {
//     const search = searchTerm.toLowerCase()
//     return (
//       userCart.customer_name?.toLowerCase().includes(search) || userCart.customer_email?.toLowerCase().includes(search)
//     )
//   })

//   // Calculate statistics
//   const stats = isAdmin
//     ? {
//         totalUsers: groupedUserCarts.length,
//         totalItems: groupedUserCarts.reduce((sum, uc) => sum + uc.total_items, 0),
//         totalValue: groupedUserCarts.reduce((sum, uc) => sum + uc.total_value, 0),
//       }
//     : {
//         totalItems: carts.reduce((sum, cart) => sum + cart.quantity, 0),
//         totalValue: carts.reduce((sum, cart) => sum + Number.parseFloat(cart.price) * cart.quantity, 0),
//         uniqueProducts: new Set(carts.map((cart) => cart.product_id)).size,
//       }

//   if (isAdmin) {
//     return (
//       <DashboardLayout>
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Cart Management (Admin)</h1>
//               <p className="text-muted-foreground">Manage all users' shopping carts</p>
//             </div>
//           </div>

//           {/* Admin Statistics Cards */}
//           <div className="grid gap-4 md:grid-cols-3">
//             <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Users with Carts</CardTitle>
//                 <Users className="h-4 w-4 text-blue-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalUsers}</div>
//                 <p className="text-xs text-muted-foreground">Active carts</p>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Items</CardTitle>
//                 <Package className="h-4 w-4 text-green-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalItems}</div>
//                 <p className="text-xs text-muted-foreground">Across all carts</p>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Value</CardTitle>
//                 <DollarSign className="h-4 w-4 text-purple-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
//                 <p className="text-xs text-muted-foreground">Combined cart value</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               placeholder="Search by user name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//             </div>
//           ) : error ? (
//             <Card>
//               <CardContent className="flex flex-col items-center justify-center py-12">
//                 <ShoppingCart className="h-16 w-16 text-destructive/50 mb-4" />
//                 <p className="text-lg font-medium text-destructive">Error loading carts</p>
//                 <p className="text-sm text-muted-foreground mb-4">{error}</p>
//                 <Button onClick={fetchCarts} variant="outline">
//                   Try Again
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : filteredUserCarts.length === 0 ? (
//             <Card>
//               <CardContent className="flex flex-col items-center justify-center py-12">
//                 <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
//                 <p className="text-lg font-medium text-muted-foreground">
//                   {searchTerm ? "No matching carts found" : "No user carts found"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {searchTerm ? "Try a different search term" : "Users haven't added items to their carts yet"}
//                 </p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="space-y-4">
//               {filteredUserCarts.map((userCart) => (
//                 <Card key={userCart.user_id} className="overflow-hidden transition-shadow hover:shadow-lg">
//                   <CardHeader
//                     className="cursor-pointer hover:bg-muted/50 transition-colors"
//                     onClick={() => toggleUserExpansion(userCart.user_id)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <Avatar className="h-12 w-12">
//                           <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
//                             {userCart.customer_name?.charAt(0).toUpperCase() || "U"}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <CardTitle className="text-lg">{userCart.customer_name}</CardTitle>
//                           <p className="text-sm text-muted-foreground">{userCart.customer_email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-6">
//                         <div className="text-right">
//                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                             <Package className="h-4 w-4 text-blue-500" />
//                             <span className="font-medium">{userCart.total_items} items</span>
//                           </div>
//                           <p className="text-lg font-bold text-primary mt-1">
//                             {userCart.total_value.toLocaleString()} IQD
//                           </p>
//                         </div>
//                         {expandedUsers.has(userCart.user_id) ? (
//                           <ChevronUp className="h-5 w-5 text-muted-foreground" />
//                         ) : (
//                           <ChevronDown className="h-5 w-5 text-muted-foreground" />
//                         )}
//                       </div>
//                     </div>
//                   </CardHeader>

//                   {expandedUsers.has(userCart.user_id) && (
//                     <CardContent className="border-t bg-muted/20 space-y-3 pt-4">
//                       <div className="space-y-3">
//                         {userCart.items.map((item) => (
//                           <div key={item.id} className="flex items-center gap-4 p-3 bg-background rounded-lg border">
//                             <img
//                               src={item.image_url || "/placeholder.svg"}
//                               alt={item.name}
//                               className="h-16 w-16 rounded object-cover"
//                             />
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium truncate">{item.name}</p>
//                               <p className="text-sm text-muted-foreground truncate">{item.name_ar}</p>
//                               <p className="text-sm font-medium text-primary mt-1">
//                                 {Number.parseFloat(item.price).toLocaleString()} IQD × {item.quantity}
//                               </p>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <div className="text-right min-w-[100px]">
//                                 <p className="text-lg font-bold">
//                                   {(Number.parseFloat(item.price) * item.quantity).toLocaleString()} IQD
//                                 </p>
//                               </div>
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className="h-9 w-9 p-0"
//                                 onClick={() =>
//                                   handleEditQuantity(userCart.user_id, item.product_id, item.quantity, item.name)
//                                 }
//                               >
//                                 <Edit className="h-4 w-4" />
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10"
//                                 onClick={() => handleAdminRemoveItem(userCart.user_id, item.product_id)}
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         className="w-full mt-4"
//                         onClick={() => setSelectedUserId(userCart.user_id)}
//                       >
//                         <Trash2 className="h-4 w-4 mr-2" />
//                         Clear User's Cart
//                       </Button>
//                     </CardContent>
//                   )}
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Clear User Cart Dialog */}
//         <Dialog open={selectedUserId !== null} onOpenChange={() => setSelectedUserId(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Clear User's Cart</DialogTitle>
//               <DialogDescription>
//                 Are you sure you want to clear this user's cart? This action cannot be undone.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setSelectedUserId(null)}>
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={() => selectedUserId && handleAdminClearCart(selectedUserId)}>
//                 Clear Cart
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Edit Quantity Dialog */}
//         <Dialog open={editQuantityDialog?.open || false} onOpenChange={() => setEditQuantityDialog(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Edit Quantity</DialogTitle>
//               <DialogDescription>Update the quantity for {editQuantityDialog?.productName}</DialogDescription>
//             </DialogHeader>
//             <div className="py-4">
//               <div className="flex items-center justify-center gap-4">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
//                   disabled={newQuantity <= 1}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <Input
//                   type="number"
//                   value={newQuantity}
//                   onChange={(e) => setNewQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
//                   className="w-20 text-center"
//                   min="1"
//                 />
//                 <Button size="sm" variant="outline" onClick={() => setNewQuantity(newQuantity + 1)}>
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setEditQuantityDialog(null)}>
//                 Cancel
//               </Button>
//               <Button onClick={saveEditedQuantity}>Save Changes</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
//             <p className="text-muted-foreground">Manage your cart items</p>
//           </div>
//           {carts.length > 0 && (
//             <Button variant="destructive" onClick={() => setClearDialogOpen(true)}>
//               <Trash2 className="mr-2 h-4 w-4" />
//               Clear Cart
//             </Button>
//           )}
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Items</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalItems}</div>
//               <p className="text-xs text-muted-foreground">In your cart</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Value</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
//               <p className="text-xs text-muted-foreground">Cart total</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Unique Products</CardTitle>
//               <ShoppingCart className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.uniqueProducts}</div>
//               <p className="text-xs text-muted-foreground">Different items</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search products in cart..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <ShoppingBag className="h-5 w-5" />
//               Cart Items
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//               </div>
//             ) : error ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <ShoppingCart className="h-16 w-16 text-destructive/50 mb-4" />
//                 <p className="text-lg font-medium text-destructive">Error loading cart</p>
//                 <p className="text-sm text-muted-foreground mb-4">{error}</p>
//                 <Button onClick={fetchCarts} variant="outline">
//                   Try Again
//                 </Button>
//               </div>
//             ) : filteredCarts.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
//                 <p className="text-lg font-medium text-muted-foreground">
//                   {searchTerm ? "No matching products" : "Your cart is empty"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {searchTerm ? "Try a different search term" : "Add some products to get started"}
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredCarts.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:shadow-md"
//                   >
//                     <img
//                       src={item.image_url || "/placeholder.svg"}
//                       alt={item.name}
//                       className="h-20 w-20 rounded-md object-cover"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-foreground">{item.name}</h4>
//                       <p className="text-sm text-muted-foreground">{item.name_ar}</p>
//                       <p className="mt-1 text-sm font-medium text-foreground">
//                         {Number.parseFloat(item.price).toLocaleString()} IQD each
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center gap-2 rounded-lg border border-border p-1">
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           className="h-7 w-7 p-0"
//                           onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </Button>
//                         <span className="w-8 text-center font-medium">{item.quantity}</span>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           className="h-7 w-7 p-0"
//                           onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </Button>
//                       </div>
//                       <div className="text-right min-w-[100px]">
//                         <p className="text-lg font-bold text-foreground">
//                           {(Number.parseFloat(item.price) * item.quantity).toLocaleString()} IQD
//                         </p>
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
//                         onClick={() => handleRemoveItem(item.product_id)}
//                         disabled={removingItemId === item.product_id}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Cart Summary */}
//                 <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
//                   <div className="flex items-center justify-between text-lg font-semibold">
//                     <span>Total:</span>
//                     <span className="text-2xl text-primary">{stats.totalValue.toLocaleString()} IQD</span>
//                   </div>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {stats.totalItems} items ({stats.uniqueProducts} unique products)
//                   </p>
//                   <Button className="mt-4 w-full" size="lg">
//                     <ShoppingBag className="mr-2 h-5 w-5" />
//                     Proceed to Checkout
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Clear Cart Dialog */}
//       <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Clear Cart</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to remove all items from your cart? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setClearDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleClearCart}>
//               Clear Cart
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </DashboardLayout>
//   )
// }





"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import cartService, { type CartItem } from "@/services/cartService"
import {
  ShoppingCart,
  Package,
  DollarSign,
  Search,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Users,
  Edit,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface GroupedUserCart {
  user_id: number
  customer_name: string
  customer_email: string
  items: CartItem[]
  total_items: number
  total_value: number
}

export default function CartPage() {
  const { isAdmin, isLoading: authLoading } = useAuth()
  const [carts, setCarts] = useState<CartItem[]>([])
  const [allCarts, setAllCarts] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [removingItemId, setRemovingItemId] = useState<number | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set())
  const [editQuantityDialog, setEditQuantityDialog] = useState<{
    open: boolean
    userId: number
    productId: number
    currentQuantity: number
    productName: string
  } | null>(null)
  const [newQuantity, setNewQuantity] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading) {
      fetchCarts()
    }
  }, [isAdmin, authLoading])

  const fetchCarts = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Fetching carts, isAdmin:", isAdmin)

      const token = localStorage.getItem("token")
      if (!token) {
        console.log("[v0] No token found, cannot fetch carts")
        setError("Please log in to view your cart")
        setLoading(false)
        return
      }

      if (isAdmin) {
        const data = await cartService.getAllCarts()
        console.log("[v0] Admin carts data:", data)
        const cartsData = data?.carts || data?.cart || []
        setAllCarts(Array.isArray(cartsData) ? cartsData : [])
      } else {
        const data = await cartService.getCart()
        console.log("[v0] User cart data:", data)
        const cartsData = data?.cart || data?.carts || []
        setCarts(Array.isArray(cartsData) ? cartsData : [])
      }
    } catch (error: any) {
      console.error("[v0] Failed to fetch cart:", error)
      setError(error?.response?.data?.message || "Failed to load cart data")
      if (isAdmin) {
        setAllCarts([])
      } else {
        setCarts([])
      }
    } finally {
      setLoading(false)
    }
  }

  const groupedUserCarts: GroupedUserCart[] = allCarts.reduce((acc, item) => {
    const existingUser = acc.find((u) => u.user_id === item.user_id)
    if (existingUser) {
      existingUser.items.push(item)
      existingUser.total_items += item.quantity
      existingUser.total_value += Number.parseFloat(item.price) * item.quantity
    } else {
      acc.push({
        user_id: item.user_id,
        customer_name: item.customer_name,
        customer_email: item.customer_email,
        items: [item],
        total_items: item.quantity,
        total_value: Number.parseFloat(item.price) * item.quantity,
      })
    }
    return acc
  }, [] as GroupedUserCart[])

  const toggleUserExpansion = (userId: number) => {
    setExpandedUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const handleUpdateQuantity = async (productId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity < 1) return

    try {
      await cartService.updateCartItem(productId, newQuantity)
      toast({
        title: "Success",
        description: "Cart updated successfully",
      })
      fetchCarts()
    } catch (error) {
      console.error("Failed to update cart:", error)
      toast({
        title: "Error",
        description: "Failed to update cart",
        variant: "destructive",
      })
    }
  }

  const handleRemoveItem = async (productId: number) => {
    try {
      setRemovingItemId(productId)
      await cartService.removeFromCart(productId)
      toast({
        title: "Success",
        description: "Item removed from cart",
      })
      fetchCarts()
    } catch (error) {
      console.error("Failed to remove item:", error)
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      })
    } finally {
      setRemovingItemId(null)
    }
  }

  const handleClearCart = async () => {
    try {
      await cartService.clearCart()
      toast({
        title: "Success",
        description: "Cart cleared successfully",
      })
      setClearDialogOpen(false)
      fetchCarts()
    } catch (error) {
      console.error("Failed to clear cart:", error)
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      })
    }
  }

  const handleAdminRemoveItem = async (userId: number, productId: number) => {
    try {
      await cartService.deleteCustomerCartItem(userId, productId)
      toast({
        title: "Success",
        description: "Item removed from user's cart",
      })
      fetchCarts()
    } catch (error) {
      console.error("Failed to remove item:", error)
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      })
    }
  }

  const handleAdminClearCart = async (userId: number) => {
    try {
      await cartService.clearCustomerCart(userId)
      toast({
        title: "Success",
        description: "User's cart cleared successfully",
      })
      setSelectedUserId(null)
      fetchCarts()
    } catch (error) {
      console.error("Failed to clear cart:", error)
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      })
    }
  }

  const handleEditQuantity = (userId: number, productId: number, currentQuantity: number, productName: string) => {
    setEditQuantityDialog({
      open: true,
      userId,
      productId,
      currentQuantity,
      productName,
    })
    setNewQuantity(currentQuantity)
  }

  const saveEditedQuantity = async () => {
    if (!editQuantityDialog) return

    try {
      await cartService.updateCartItem(editQuantityDialog.productId, newQuantity)
      toast({
        title: "Success",
        description: "Quantity updated successfully",
      })
      setEditQuantityDialog(null)
      fetchCarts()
    } catch (error) {
      console.error("Failed to update quantity:", error)
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      })
    }
  }

  const filteredCarts = carts.filter((cart) => {
    const search = searchTerm.toLowerCase()
    return cart.name?.toLowerCase().includes(search) || cart.name_ar?.includes(search)
  })

  const filteredUserCarts = groupedUserCarts.filter((userCart) => {
    const search = searchTerm.toLowerCase()
    return (
      userCart.customer_name?.toLowerCase().includes(search) || userCart.customer_email?.toLowerCase().includes(search)
    )
  })

  // Calculate statistics
  const stats = isAdmin
    ? {
        totalUsers: groupedUserCarts.length,
        totalItems: groupedUserCarts.reduce((sum, uc) => sum + uc.total_items, 0),
        totalValue: groupedUserCarts.reduce((sum, uc) => sum + uc.total_value, 0),
      }
    : {
        totalItems: carts.reduce((sum, cart) => sum + cart.quantity, 0),
        totalValue: carts.reduce((sum, cart) => sum + Number.parseFloat(cart.price) * cart.quantity, 0),
        uniqueProducts: new Set(carts.map((cart) => cart.product_id)).size,
      }

  if (isAdmin) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cart Management (Admin)</h1>
              <p className="text-muted-foreground">Manage all users' shopping carts</p>
            </div>
          </div>

          {/* Admin Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users with Carts</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Active carts</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalItems}</div>
                <p className="text-xs text-muted-foreground">Across all carts</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
                <p className="text-xs text-muted-foreground">Combined cart value</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : error ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-destructive/50 mb-4" />
                <p className="text-lg font-medium text-destructive">Error loading carts</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchCarts} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : filteredUserCarts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  {searchTerm ? "No matching carts found" : "No user carts found"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Users haven't added items to their carts yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredUserCarts.map((userCart) => (
                <Card key={userCart.user_id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleUserExpansion(userCart.user_id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                            {userCart.customer_name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{userCart.customer_name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{userCart.customer_email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Package className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{userCart.total_items} items</span>
                          </div>
                          <p className="text-lg font-bold text-primary mt-1">
                            {userCart.total_value.toLocaleString()} IQD
                          </p>
                        </div>
                        {expandedUsers.has(userCart.user_id) ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedUsers.has(userCart.user_id) && (
                    <CardContent className="border-t bg-muted/20 space-y-3 pt-4">
                      <div className="space-y-3">
                        {userCart.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-background rounded-lg border">
                            <img
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.name}
                              className="h-16 w-16 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-sm text-muted-foreground truncate">{item.name_ar}</p>
                              <p className="text-sm font-medium text-primary mt-1">
                                {Number.parseFloat(item.price).toLocaleString()} IQD × {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right min-w-[100px]">
                                <p className="text-lg font-bold">
                                  {(Number.parseFloat(item.price) * item.quantity).toLocaleString()} IQD
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-9 w-9 p-0"
                                onClick={() =>
                                  handleEditQuantity(userCart.user_id, item.product_id, item.quantity, item.name)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10"
                                onClick={() => handleAdminRemoveItem(userCart.user_id, item.product_id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => setSelectedUserId(userCart.user_id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear User's Cart
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Clear User Cart Dialog */}
        <Dialog open={selectedUserId !== null} onOpenChange={() => setSelectedUserId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear User's Cart</DialogTitle>
              <DialogDescription>
                Are you sure you want to clear this user's cart? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUserId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => selectedUserId && handleAdminClearCart(selectedUserId)}>
                Clear Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Quantity Dialog */}
        <Dialog open={editQuantityDialog?.open || false} onOpenChange={() => setEditQuantityDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Quantity</DialogTitle>
              <DialogDescription>Update the quantity for {editQuantityDialog?.productName}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
                  disabled={newQuantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                />
                <Button size="sm" variant="outline" onClick={() => setNewQuantity(newQuantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditQuantityDialog(null)}>
                Cancel
              </Button>
              <Button onClick={saveEditedQuantity}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">Manage your cart items</p>
          </div>
          {carts.length > 0 && (
            <Button variant="destructive" onClick={() => setClearDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground">In your cart</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
              <p className="text-xs text-muted-foreground">Cart total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Products</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueProducts}</div>
              <p className="text-xs text-muted-foreground">Different items</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products in cart..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Cart Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-destructive/50 mb-4" />
                <p className="text-lg font-medium text-destructive">Error loading cart</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchCarts} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : filteredCarts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  {searchTerm ? "No matching products" : "Your cart is empty"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Add some products to get started"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCarts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:shadow-md"
                  >
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.name_ar}</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {Number.parseFloat(item.price).toLocaleString()} IQD each
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-border p-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <p className="text-lg font-bold text-foreground">
                          {(Number.parseFloat(item.price) * item.quantity).toLocaleString()} IQD
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleRemoveItem(item.product_id)}
                        disabled={removingItemId === item.product_id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Cart Summary */}
                <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-2xl text-primary">{stats.totalValue.toLocaleString()} IQD</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stats.totalItems} items ({stats.uniqueProducts} unique products)
                  </p>
                  <Button className="mt-4 w-full" size="lg">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Clear Cart Dialog */}
      <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Cart</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove all items from your cart? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
