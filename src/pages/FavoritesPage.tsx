// // "use client"

// // import { useState, useEffect } from "react"
// // import { DashboardLayout } from "@/components/DashboardLayout"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { useToast } from "@/hooks/use-toast"
// // import { useAuth } from "@/contexts/AuthContext"
// // import favoritesService, { type FavoriteItem } from "@/services/favoritesService"
// // import cartService from "@/services/cartService"
// // import { Heart, Package, Search, ShoppingCart, Trash2, Users, DollarSign, ChevronDown, ChevronUp } from "lucide-react"
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog"

// // interface GroupedUserFavorites {
// //   user_id: number
// //   customer_name: string
// //   customer_email: string
// //   favorites: FavoriteItem[]
// //   total_favorites: number
// //   total_value: number
// // }

// // export default function FavoritesPage() {
// //   const { isAdmin } = useAuth()
// //   const [favorites, setFavorites] = useState<FavoriteItem[]>([])
// //   const [allFavorites, setAllFavorites] = useState<FavoriteItem[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [removingItemId, setRemovingItemId] = useState<number | null>(null)
// //   const [addingToCartId, setAddingToCartId] = useState<number | null>(null)
// //   const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
// //   const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set())
// //   const { toast } = useToast()

// //   useEffect(() => {
// //     fetchFavorites()
// //   }, [isAdmin])

// //   const fetchFavorites = async () => {
// //     try {
// //       setLoading(true)
// //       if (isAdmin) {
// //         const data = await favoritesService.getAllFavorites()
// //         setAllFavorites(data.favorites || [])
// //       } else {
// //         const data = await favoritesService.getFavorites()
// //         setFavorites(data.favorites || [])
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch favorites:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to load favorites data",
// //         variant: "destructive",
// //       })
// //       if (isAdmin) {
// //         setAllFavorites([])
// //       } else {
// //         setFavorites([])
// //       }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const groupedUserFavorites: GroupedUserFavorites[] = allFavorites.reduce((acc, item) => {
// //     const existingUser = acc.find((u) => u.user_id === item.user_id)
// //     if (existingUser) {
// //       existingUser.favorites.push(item)
// //       existingUser.total_favorites += 1
// //       existingUser.total_value += Number.parseFloat(item.price)
// //     } else {
// //       acc.push({
// //         user_id: item.user_id,
// //         customer_name: item.customer_name,
// //         customer_email: item.customer_email,
// //         favorites: [item],
// //         total_favorites: 1,
// //         total_value: Number.parseFloat(item.price),
// //       })
// //     }
// //     return acc
// //   }, [] as GroupedUserFavorites[])

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

// //   const handleRemoveFavorite = async (productId: number) => {
// //     try {
// //       setRemovingItemId(productId)
// //       await favoritesService.removeFromFavorites(productId)
// //       toast({
// //         title: "Success",
// //         description: "Removed from favorites",
// //       })
// //       fetchFavorites()
// //     } catch (error) {
// //       console.error("Failed to remove favorite:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to remove from favorites",
// //         variant: "destructive",
// //       })
// //     } finally {
// //       setRemovingItemId(null)
// //     }
// //   }

// //   const handleAddToCart = async (productId: number, productName: string) => {
// //     try {
// //       setAddingToCartId(productId)
// //       await cartService.addToCart(productId, 1)
// //       toast({
// //         title: "Success",
// //         description: `${productName} added to cart`,
// //       })
// //     } catch (error) {
// //       console.error("Failed to add to cart:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to add to cart",
// //         variant: "destructive",
// //       })
// //     } finally {
// //       setAddingToCartId(null)
// //     }
// //   }

// //   const handleAdminRemoveFavorite = async (userId: number, productId: number) => {
// //     try {
// //       await favoritesService.deleteCustomerFavorite(userId, productId)
// //       toast({
// //         title: "Success",
// //         description: "Removed from user's favorites",
// //       })
// //       fetchFavorites()
// //     } catch (error) {
// //       console.error("Failed to remove favorite:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to remove favorite",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const handleAdminClearFavorites = async (userId: number) => {
// //     try {
// //       await favoritesService.clearCustomerFavorites(userId)
// //       toast({
// //         title: "Success",
// //         description: "User's favorites cleared successfully",
// //       })
// //       setSelectedUserId(null)
// //       fetchFavorites()
// //     } catch (error) {
// //       console.error("Failed to clear favorites:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to clear favorites",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const filteredFavorites = favorites.filter((fav) => {
// //     const search = searchTerm.toLowerCase()
// //     return fav.product_name?.toLowerCase().includes(search) || fav.product_name_ar?.includes(search)
// //   })

// //   const filteredUserFavorites = groupedUserFavorites.filter((userFav) => {
// //     const search = searchTerm.toLowerCase()
// //     return (
// //       userFav.customer_name?.toLowerCase().includes(search) || userFav.customer_email?.toLowerCase().includes(search)
// //     )
// //   })

// //   // Calculate statistics
// //   const stats = isAdmin
// //     ? {
// //         totalUsers: groupedUserFavorites.length,
// //         totalFavorites: groupedUserFavorites.reduce((sum, uf) => sum + uf.total_favorites, 0),
// //         totalValue: groupedUserFavorites.reduce((sum, uf) => sum + uf.total_value, 0),
// //       }
// //     : {
// //         totalFavorites: favorites.length,
// //         uniqueProducts: new Set(favorites.map((fav) => fav.product_id)).size,
// //         totalValue: favorites.reduce((sum, fav) => sum + Number.parseFloat(fav.price), 0),
// //       }

// //   if (isAdmin) {
// //     return (
// //       <DashboardLayout>
// //         <div className="space-y-6">
// //           <div>
// //             <h1 className="text-3xl font-bold text-foreground">Favorites Management (Admin)</h1>
// //             <p className="text-muted-foreground">Manage all users' favorite products</p>
// //           </div>

// //           {/* Admin Statistics Cards */}
// //           <div className="grid gap-4 md:grid-cols-3">
// //             <Card className="bg-gradient-to-br from-pink-500/10 to-red-600/10 border-pink-500/20">
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Users with Favorites</CardTitle>
// //                 <Users className="h-4 w-4 text-pink-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">{stats.totalUsers}</div>
// //                 <p className="text-xs text-muted-foreground">Active users</p>
// //               </CardContent>
// //             </Card>

// //             <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
// //                 <Heart className="h-4 w-4 text-purple-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">{stats.totalFavorites}</div>
// //                 <p className="text-xs text-muted-foreground">Across all users</p>
// //               </CardContent>
// //             </Card>

// //             <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
// //               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                 <CardTitle className="text-sm font-medium">Total Value</CardTitle>
// //                 <DollarSign className="h-4 w-4 text-blue-500" />
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
// //                 <p className="text-xs text-muted-foreground">Combined value</p>
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
// //           ) : filteredUserFavorites.length === 0 ? (
// //             <Card>
// //               <CardContent className="flex flex-col items-center justify-center py-12">
// //                 <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
// //                 <p className="text-lg font-medium text-muted-foreground">No user favorites found</p>
// //               </CardContent>
// //             </Card>
// //           ) : (
// //             <div className="space-y-4">
// //               {filteredUserFavorites.map((userFav) => (
// //                 <Card key={userFav.user_id} className="overflow-hidden transition-shadow hover:shadow-lg">
// //                   <CardHeader
// //                     className="cursor-pointer hover:bg-muted/50 transition-colors"
// //                     onClick={() => toggleUserExpansion(userFav.user_id)}
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-4">
// //                         <Avatar className="h-12 w-12">
// //                           <AvatarFallback className="bg-gradient-to-br from-pink-500 to-red-500 text-white text-lg">
// //                             {userFav.customer_name?.charAt(0).toUpperCase() || "U"}
// //                           </AvatarFallback>
// //                         </Avatar>
// //                         <div>
// //                           <CardTitle className="text-lg">{userFav.customer_name}</CardTitle>
// //                           <p className="text-sm text-muted-foreground">{userFav.customer_email}</p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-6">
// //                         <div className="text-right">
// //                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                             <Heart className="h-4 w-4 text-red-500 fill-current" />
// //                             <span className="font-medium">{userFav.total_favorites} favorites</span>
// //                           </div>
// //                           <p className="text-lg font-bold text-primary mt-1">
// //                             {userFav.total_value.toLocaleString()} IQD
// //                           </p>
// //                         </div>
// //                         {expandedUsers.has(userFav.user_id) ? (
// //                           <ChevronUp className="h-5 w-5 text-muted-foreground" />
// //                         ) : (
// //                           <ChevronDown className="h-5 w-5 text-muted-foreground" />
// //                         )}
// //                       </div>
// //                     </div>
// //                   </CardHeader>

// //                   {expandedUsers.has(userFav.user_id) && (
// //                     <CardContent className="border-t bg-muted/20 pt-4">
// //                       <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
// //                         {userFav.favorites.map((item) => (
// //                           <Card key={item.id} className="group overflow-hidden">
// //                             <div className="relative aspect-square overflow-hidden">
// //                               <img
// //                                 src={item.image_url || "/placeholder.svg"}
// //                                 alt={item.product_name}
// //                                 className="h-full w-full object-cover transition-transform group-hover:scale-105"
// //                               />
// //                               <Button
// //                                 size="sm"
// //                                 variant="destructive"
// //                                 className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
// //                                 onClick={() => handleAdminRemoveFavorite(userFav.user_id, item.product_id)}
// //                               >
// //                                 <Trash2 className="h-3 w-3" />
// //                               </Button>
// //                             </div>
// //                             <CardContent className="p-3">
// //                               <p className="font-medium text-sm truncate">{item.product_name}</p>
// //                               <p className="text-xs text-muted-foreground truncate">{item.product_name_ar}</p>
// //                               <p className="text-sm font-bold text-primary mt-1">
// //                                 {Number.parseFloat(item.price).toLocaleString()} IQD
// //                               </p>
// //                             </CardContent>
// //                           </Card>
// //                         ))}
// //                       </div>

// //                       <Button
// //                         variant="destructive"
// //                         size="sm"
// //                         className="w-full mt-4"
// //                         onClick={() => setSelectedUserId(userFav.user_id)}
// //                       >
// //                         <Trash2 className="h-4 w-4 mr-2" />
// //                         Clear User's Favorites
// //                       </Button>
// //                     </CardContent>
// //                   )}
// //                 </Card>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Clear User Favorites Dialog */}
// //         <Dialog open={selectedUserId !== null} onOpenChange={() => setSelectedUserId(null)}>
// //           <DialogContent>
// //             <DialogHeader>
// //               <DialogTitle>Clear User's Favorites</DialogTitle>
// //               <DialogDescription>
// //                 Are you sure you want to clear this user's favorites? This action cannot be undone.
// //               </DialogDescription>
// //             </DialogHeader>
// //             <DialogFooter>
// //               <Button variant="outline" onClick={() => setSelectedUserId(null)}>
// //                 Cancel
// //               </Button>
// //               <Button variant="destructive" onClick={() => selectedUserId && handleAdminClearFavorites(selectedUserId)}>
// //                 Clear Favorites
// //               </Button>
// //             </DialogFooter>
// //           </DialogContent>
// //         </Dialog>
// //       </DashboardLayout>
// //     )
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div className="space-y-6">
// //         <div>
// //           <h1 className="text-3xl font-bold text-foreground">Favorites</h1>
// //           <p className="text-muted-foreground">Your favorite products collection</p>
// //         </div>

// //         {/* Statistics Cards */}
// //         <div className="grid gap-4 md:grid-cols-3">
// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
// //               <Heart className="h-4 w-4 text-muted-foreground" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{stats.totalFavorites}</div>
// //               <p className="text-xs text-muted-foreground">Products you love</p>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Unique Products</CardTitle>
// //               <Package className="h-4 w-4 text-muted-foreground" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{stats.uniqueProducts}</div>
// //               <p className="text-xs text-muted-foreground">Different items</p>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //               <CardTitle className="text-sm font-medium">Total Value</CardTitle>
// //               <ShoppingCart className="h-4 w-4 text-muted-foreground" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
// //               <p className="text-xs text-muted-foreground">Combined value</p>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Search */}
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// //           <Input
// //             placeholder="Search favorite products..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="pl-10"
// //           />
// //         </div>

// //         <Card>
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <Heart className="h-5 w-5 fill-current text-red-500" />
// //               Your Favorite Products
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             {loading ? (
// //               <div className="flex items-center justify-center py-12">
// //                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// //               </div>
// //             ) : filteredFavorites.length === 0 ? (
// //               <div className="flex flex-col items-center justify-center py-12">
// //                 <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
// //                 <p className="text-lg font-medium text-muted-foreground">No favorites yet</p>
// //                 <p className="text-sm text-muted-foreground">Start adding products you love</p>
// //               </div>
// //             ) : (
// //               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //                 {filteredFavorites.map((item) => (
// //                   <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-lg">
// //                     <div className="relative aspect-square overflow-hidden">
// //                       <img
// //                         src={item.image_url || "/placeholder.svg"}
// //                         alt={item.product_name}
// //                         className="h-full w-full object-cover transition-transform group-hover:scale-105"
// //                       />
// //                       <Button
// //                         size="sm"
// //                         variant="destructive"
// //                         className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
// //                         onClick={() => handleRemoveFavorite(item.product_id)}
// //                         disabled={removingItemId === item.product_id}
// //                       >
// //                         <Trash2 className="h-4 w-4" />
// //                       </Button>
// //                     </div>
// //                     <CardContent className="p-4">
// //                       <div className="space-y-2">
// //                         <div>
// //                           <h4 className="font-semibold text-foreground line-clamp-1">{item.product_name}</h4>
// //                           <p className="text-sm text-muted-foreground line-clamp-1">{item.product_name_ar}</p>
// //                         </div>
// //                         <div className="flex items-center justify-between">
// //                           <p className="text-lg font-bold text-primary">
// //                             {Number.parseFloat(item.price).toLocaleString()} IQD
// //                           </p>
// //                           <Badge variant="secondary" className="gap-1">
// //                             <Heart className="h-3 w-3 fill-current text-red-500" />
// //                             Favorite
// //                           </Badge>
// //                         </div>
// //                         <Button
// //                           className="w-full"
// //                           size="sm"
// //                           onClick={() => handleAddToCart(item.product_id, item.product_name)}
// //                           disabled={addingToCartId === item.product_id}
// //                         >
// //                           {addingToCartId === item.product_id ? (
// //                             <>
// //                               <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-background border-t-transparent" />
// //                               Adding...
// //                             </>
// //                           ) : (
// //                             <>
// //                               <ShoppingCart className="mr-2 h-4 w-4" />
// //                               Add to Cart
// //                             </>
// //                           )}
// //                         </Button>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </DashboardLayout>
// //   )
// // }





// "use client"

// import { useState, useEffect } from "react"
// import { DashboardLayout } from "@/components/DashboardLayout"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useToast } from "@/hooks/use-toast"
// import { useAuth } from "@/contexts/AuthContext"
// import favoritesService, { type FavoriteItem } from "@/services/favoritesService"
// import cartService from "@/services/cartService"
// import { Heart, Package, Search, ShoppingCart, Trash2, Users, DollarSign, ChevronDown, ChevronUp } from "lucide-react"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"

// interface GroupedUserFavorites {
//   user_id: number
//   customer_name: string
//   customer_email: string
//   favorites: FavoriteItem[]
//   total_favorites: number
//   total_value: number
// }

// export default function FavoritesPage() {
//   const { isAdmin } = useAuth()
//   const [favorites, setFavorites] = useState<FavoriteItem[]>([])
//   const [allFavorites, setAllFavorites] = useState<FavoriteItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [removingItemId, setRemovingItemId] = useState<number | null>(null)
//   const [addingToCartId, setAddingToCartId] = useState<number | null>(null)
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
//   const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set())
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchFavorites()
//   }, [isAdmin])

//   const fetchFavorites = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       if (isAdmin) {
//         const data = await favoritesService.getAllFavorites()
//         const favoritesData = data?.favorites || []
//         setAllFavorites(Array.isArray(favoritesData) ? favoritesData : [])
//       } else {
//         const data = await favoritesService.getFavorites()
//         const favoritesData = data?.favorites || []
//         setFavorites(Array.isArray(favoritesData) ? favoritesData : [])
//       }
//     } catch (error: any) {
//       console.error("Failed to fetch favorites:", error)
//       setError(error?.response?.data?.message || "Failed to load favorites data")
//       if (isAdmin) {
//         setAllFavorites([])
//       } else {
//         setFavorites([])
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const groupedUserFavorites: GroupedUserFavorites[] = allFavorites.reduce((acc, item) => {
//     const existingUser = acc.find((u) => u.user_id === item.user_id)
//     if (existingUser) {
//       existingUser.favorites.push(item)
//       existingUser.total_favorites += 1
//       existingUser.total_value += Number.parseFloat(item.price)
//     } else {
//       acc.push({
//         user_id: item.user_id,
//         customer_name: item.customer_name,
//         customer_email: item.customer_email,
//         favorites: [item],
//         total_favorites: 1,
//         total_value: Number.parseFloat(item.price),
//       })
//     }
//     return acc
//   }, [] as GroupedUserFavorites[])

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

//   const handleRemoveFavorite = async (productId: number) => {
//     try {
//       setRemovingItemId(productId)
//       await favoritesService.removeFromFavorites(productId)
//       toast({
//         title: "Success",
//         description: "Removed from favorites",
//       })
//       fetchFavorites()
//     } catch (error) {
//       console.error("Failed to remove favorite:", error)
//       toast({
//         title: "Error",
//         description: "Failed to remove from favorites",
//         variant: "destructive",
//       })
//     } finally {
//       setRemovingItemId(null)
//     }
//   }

//   const handleAddToCart = async (productId: number, productName: string) => {
//     try {
//       setAddingToCartId(productId)
//       await cartService.addToCart(productId, 1)
//       toast({
//         title: "Success",
//         description: `${productName} added to cart`,
//       })
//     } catch (error) {
//       console.error("Failed to add to cart:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add to cart",
//         variant: "destructive",
//       })
//     } finally {
//       setAddingToCartId(null)
//     }
//   }

//   const handleAdminRemoveFavorite = async (userId: number, productId: number) => {
//     try {
//       await favoritesService.deleteCustomerFavorite(userId, productId)
//       toast({
//         title: "Success",
//         description: "Removed from user's favorites",
//       })
//       fetchFavorites()
//     } catch (error) {
//       console.error("Failed to remove favorite:", error)
//       toast({
//         title: "Error",
//         description: "Failed to remove favorite",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleAdminClearFavorites = async (userId: number) => {
//     try {
//       await favoritesService.clearCustomerFavorites(userId)
//       toast({
//         title: "Success",
//         description: "User's favorites cleared successfully",
//       })
//       setSelectedUserId(null)
//       fetchFavorites()
//     } catch (error) {
//       console.error("Failed to clear favorites:", error)
//       toast({
//         title: "Error",
//         description: "Failed to clear favorites",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredFavorites = favorites.filter((fav) => {
//     const search = searchTerm.toLowerCase()
//     return fav.product_name?.toLowerCase().includes(search) || fav.product_name_ar?.includes(search)
//   })

//   const filteredUserFavorites = groupedUserFavorites.filter((userFav) => {
//     const search = searchTerm.toLowerCase()
//     return (
//       userFav.customer_name?.toLowerCase().includes(search) || userFav.customer_email?.toLowerCase().includes(search)
//     )
//   })

//   // Calculate statistics
//   const stats = isAdmin
//     ? {
//         totalUsers: groupedUserFavorites.length,
//         totalFavorites: groupedUserFavorites.reduce((sum, uf) => sum + uf.total_favorites, 0),
//         totalValue: groupedUserFavorites.reduce((sum, uf) => sum + uf.total_value, 0),
//       }
//     : {
//         totalFavorites: favorites.length,
//         uniqueProducts: new Set(favorites.map((fav) => fav.product_id)).size,
//         totalValue: favorites.reduce((sum, fav) => sum + Number.parseFloat(fav.price), 0),
//       }

//   if (isAdmin) {
//     return (
//       <DashboardLayout>
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Favorites Management (Admin)</h1>
//             <p className="text-muted-foreground">Manage all users' favorite products</p>
//           </div>

//           {/* Admin Statistics Cards */}
//           <div className="grid gap-4 md:grid-cols-3">
//             <Card className="bg-gradient-to-br from-pink-500/10 to-red-600/10 border-pink-500/20">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Users with Favorites</CardTitle>
//                 <Users className="h-4 w-4 text-pink-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalUsers}</div>
//                 <p className="text-xs text-muted-foreground">Active users</p>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
//                 <Heart className="h-4 w-4 text-purple-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalFavorites}</div>
//                 <p className="text-xs text-muted-foreground">Across all users</p>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Value</CardTitle>
//                 <DollarSign className="h-4 w-4 text-blue-500" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
//                 <p className="text-xs text-muted-foreground">Combined value</p>
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
//                 <Heart className="h-16 w-16 text-destructive/50 mb-4" />
//                 <p className="text-lg font-medium text-destructive">Error loading favorites</p>
//                 <p className="text-sm text-muted-foreground mb-4">{error}</p>
//                 <Button onClick={fetchFavorites} variant="outline">
//                   Try Again
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : filteredUserFavorites.length === 0 ? (
//             <Card>
//               <CardContent className="flex flex-col items-center justify-center py-12">
//                 <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
//                 <p className="text-lg font-medium text-muted-foreground">
//                   {searchTerm ? "No matching favorites found" : "No user favorites found"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {searchTerm ? "Try a different search term" : "Users haven't added any favorites yet"}
//                 </p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="space-y-4">
//               {filteredUserFavorites.map((userFav) => (
//                 <Card key={userFav.user_id} className="overflow-hidden transition-shadow hover:shadow-lg">
//                   <CardHeader
//                     className="cursor-pointer hover:bg-muted/50 transition-colors"
//                     onClick={() => toggleUserExpansion(userFav.user_id)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <Avatar className="h-12 w-12">
//                           <AvatarFallback className="bg-gradient-to-br from-pink-500 to-red-500 text-white text-lg">
//                             {userFav.customer_name?.charAt(0).toUpperCase() || "U"}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <CardTitle className="text-lg">{userFav.customer_name}</CardTitle>
//                           <p className="text-sm text-muted-foreground">{userFav.customer_email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-6">
//                         <div className="text-right">
//                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                             <Heart className="h-4 w-4 text-red-500 fill-current" />
//                             <span className="font-medium">{userFav.total_favorites} favorites</span>
//                           </div>
//                           <p className="text-lg font-bold text-primary mt-1">
//                             {userFav.total_value.toLocaleString()} IQD
//                           </p>
//                         </div>
//                         {expandedUsers.has(userFav.user_id) ? (
//                           <ChevronUp className="h-5 w-5 text-muted-foreground" />
//                         ) : (
//                           <ChevronDown className="h-5 w-5 text-muted-foreground" />
//                         )}
//                       </div>
//                     </div>
//                   </CardHeader>

//                   {expandedUsers.has(userFav.user_id) && (
//                     <CardContent className="border-t bg-muted/20 pt-4">
//                       <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//                         {userFav.favorites.map((item) => (
//                           <Card key={item.id} className="group overflow-hidden">
//                             <div className="relative aspect-square overflow-hidden">
//                               <img
//                                 src={item.image_url || "/placeholder.svg"}
//                                 alt={item.product_name}
//                                 className="h-full w-full object-cover transition-transform group-hover:scale-105"
//                               />
//                               <Button
//                                 size="sm"
//                                 variant="destructive"
//                                 className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
//                                 onClick={() => handleAdminRemoveFavorite(userFav.user_id, item.product_id)}
//                               >
//                                 <Trash2 className="h-3 w-3" />
//                               </Button>
//                             </div>
//                             <CardContent className="p-3">
//                               <p className="font-medium text-sm truncate">{item.product_name}</p>
//                               <p className="text-xs text-muted-foreground truncate">{item.product_name_ar}</p>
//                               <p className="text-sm font-bold text-primary mt-1">
//                                 {Number.parseFloat(item.price).toLocaleString()} IQD
//                               </p>
//                             </CardContent>
//                           </Card>
//                         ))}
//                       </div>

//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         className="w-full mt-4"
//                         onClick={() => setSelectedUserId(userFav.user_id)}
//                       >
//                         <Trash2 className="h-4 w-4 mr-2" />
//                         Clear User's Favorites
//                       </Button>
//                     </CardContent>
//                   )}
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Clear User Favorites Dialog */}
//         <Dialog open={selectedUserId !== null} onOpenChange={() => setSelectedUserId(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Clear User's Favorites</DialogTitle>
//               <DialogDescription>
//                 Are you sure you want to clear this user's favorites? This action cannot be undone.
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setSelectedUserId(null)}>
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={() => selectedUserId && handleAdminClearFavorites(selectedUserId)}>
//                 Clear Favorites
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Favorites</h1>
//           <p className="text-muted-foreground">Your favorite products collection</p>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid gap-4 md:grid-cols-3">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
//               <Heart className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalFavorites}</div>
//               <p className="text-xs text-muted-foreground">Products you love</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Unique Products</CardTitle>
//               <Package className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.uniqueProducts}</div>
//               <p className="text-xs text-muted-foreground">Different items</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Value</CardTitle>
//               <ShoppingCart className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
//               <p className="text-xs text-muted-foreground">Combined value</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search favorite products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Heart className="h-5 w-5 fill-current text-red-500" />
//               Your Favorite Products
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//               </div>
//             ) : error ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <Heart className="h-16 w-16 text-destructive/50 mb-4" />
//                 <p className="text-lg font-medium text-destructive">Error loading favorites</p>
//                 <p className="text-sm text-muted-foreground mb-4">{error}</p>
//                 <Button onClick={fetchFavorites} variant="outline">
//                   Try Again
//                 </Button>
//               </div>
//             ) : filteredFavorites.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
//                 <p className="text-lg font-medium text-muted-foreground">
//                   {searchTerm ? "No matching products" : "No favorites yet"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {searchTerm ? "Try a different search term" : "Start adding products you love"}
//                 </p>
//               </div>
//             ) : (
//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {filteredFavorites.map((item) => (
//                   <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-lg">
//                     <div className="relative aspect-square overflow-hidden">
//                       <img
//                         src={item.image_url || "/placeholder.svg"}
//                         alt={item.product_name}
//                         className="h-full w-full object-cover transition-transform group-hover:scale-105"
//                       />
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
//                         onClick={() => handleRemoveFavorite(item.product_id)}
//                         disabled={removingItemId === item.product_id}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     <CardContent className="p-4">
//                       <div className="space-y-2">
//                         <div>
//                           <h4 className="font-semibold text-foreground line-clamp-1">{item.product_name}</h4>
//                           <p className="text-sm text-muted-foreground line-clamp-1">{item.product_name_ar}</p>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <p className="text-lg font-bold text-primary">
//                             {Number.parseFloat(item.price).toLocaleString()} IQD
//                           </p>
//                           <Badge variant="secondary" className="gap-1">
//                             <Heart className="h-3 w-3 fill-current text-red-500" />
//                             Favorite
//                           </Badge>
//                         </div>
//                         <Button
//                           className="w-full"
//                           size="sm"
//                           onClick={() => handleAddToCart(item.product_id, item.product_name)}
//                           disabled={addingToCartId === item.product_id}
//                         >
//                           {addingToCartId === item.product_id ? (
//                             <>
//                               <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-background border-t-transparent" />
//                               Adding...
//                             </>
//                           ) : (
//                             <>
//                               <ShoppingCart className="mr-2 h-4 w-4" />
//                               Add to Cart
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }





"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import favoritesService, { type FavoriteItem } from "@/services/favoritesService"
import cartService from "@/services/cartService"
import { Heart, Package, Search, ShoppingCart, Trash2, Users, DollarSign, ChevronDown, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface GroupedUserFavorites {
  user_id: number
  customer_name: string
  customer_email: string
  favorites: FavoriteItem[]
  total_favorites: number
  total_value: number
}

export default function FavoritesPage() {
  const { isAdmin, isLoading: authLoading } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [allFavorites, setAllFavorites] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [removingItemId, setRemovingItemId] = useState<number | null>(null)
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading) {
      fetchFavorites()
    }
  }, [isAdmin, authLoading])

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Fetching favorites, isAdmin:", isAdmin)

      const token = localStorage.getItem("token")
      if (!token) {
        console.log("[v0] No token found, cannot fetch favorites")
        setError("Please log in to view your favorites")
        setLoading(false)
        return
      }

      if (isAdmin) {
        const data = await favoritesService.getAllFavorites()
        console.log("[v0] Admin favorites data:", data)
        const favoritesData = data?.favorites || []
        setAllFavorites(Array.isArray(favoritesData) ? favoritesData : [])
      } else {
        const data = await favoritesService.getFavorites()
        console.log("[v0] User favorites data:", data)
        const favoritesData = data?.favorites || []
        setFavorites(Array.isArray(favoritesData) ? favoritesData : [])
      }
    } catch (error: any) {
      console.error("[v0] Failed to fetch favorites:", error)
      setError(error?.response?.data?.message || "Failed to load favorites data")
      if (isAdmin) {
        setAllFavorites([])
      } else {
        setFavorites([])
      }
    } finally {
      setLoading(false)
    }
  }

  const groupedUserFavorites: GroupedUserFavorites[] = allFavorites.reduce((acc, item) => {
    const existingUser = acc.find((u) => u.user_id === item.user_id)
    if (existingUser) {
      existingUser.favorites.push(item)
      existingUser.total_favorites += 1
      existingUser.total_value += Number.parseFloat(item.price)
    } else {
      acc.push({
        user_id: item.user_id,
        customer_name: item.customer_name,
        customer_email: item.customer_email,
        favorites: [item],
        total_favorites: 1,
        total_value: Number.parseFloat(item.price),
      })
    }
    return acc
  }, [] as GroupedUserFavorites[])

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

  const handleRemoveFavorite = async (productId: number) => {
    try {
      setRemovingItemId(productId)
      await favoritesService.removeFromFavorites(productId)
      toast({
        title: "Success",
        description: "Removed from favorites",
      })
      fetchFavorites()
    } catch (error) {
      console.error("Failed to remove favorite:", error)
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive",
      })
    } finally {
      setRemovingItemId(null)
    }
  }

  const handleAddToCart = async (productId: number, productName: string) => {
    try {
      setAddingToCartId(productId)
      await cartService.addToCart(productId, 1)
      toast({
        title: "Success",
        description: `${productName} added to cart`,
      })
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive",
      })
    } finally {
      setAddingToCartId(null)
    }
  }

  const handleAdminRemoveFavorite = async (userId: number, productId: number) => {
    try {
      await favoritesService.deleteCustomerFavorite(userId, productId)
      toast({
        title: "Success",
        description: "Removed from user's favorites",
      })
      fetchFavorites()
    } catch (error) {
      console.error("Failed to remove favorite:", error)
      toast({
        title: "Error",
        description: "Failed to remove favorite",
        variant: "destructive",
      })
    }
  }

  const handleAdminClearFavorites = async (userId: number) => {
    try {
      await favoritesService.clearCustomerFavorites(userId)
      toast({
        title: "Success",
        description: "User's favorites cleared successfully",
      })
      setSelectedUserId(null)
      fetchFavorites()
    } catch (error) {
      console.error("Failed to clear favorites:", error)
      toast({
        title: "Error",
        description: "Failed to clear favorites",
        variant: "destructive",
      })
    }
  }

  const filteredFavorites = favorites.filter((fav) => {
    const search = searchTerm.toLowerCase()
    return fav.product_name?.toLowerCase().includes(search) || fav.product_name_ar?.includes(search)
  })

  const filteredUserFavorites = groupedUserFavorites.filter((userFav) => {
    const search = searchTerm.toLowerCase()
    return (
      userFav.customer_name?.toLowerCase().includes(search) || userFav.customer_email?.toLowerCase().includes(search)
    )
  })

  const stats = isAdmin
    ? {
        totalUsers: groupedUserFavorites.length,
        totalFavorites: groupedUserFavorites.reduce((sum, uf) => sum + uf.total_favorites, 0),
        totalValue: groupedUserFavorites.reduce((sum, uf) => sum + uf.total_value, 0),
      }
    : {
        totalFavorites: favorites.length,
        uniqueProducts: new Set(favorites.map((fav) => fav.product_id)).size,
        totalValue: favorites.reduce((sum, fav) => sum + Number.parseFloat(fav.price), 0),
      }

  if (isAdmin) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Favorites Management (Admin)</h1>
            <p className="text-muted-foreground">Manage all users' favorite products</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-pink-500/10 to-red-600/10 border-pink-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users with Favorites</CardTitle>
                <Users className="h-4 w-4 text-pink-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Active users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
                <Heart className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalFavorites}</div>
                <p className="text-xs text-muted-foreground">Across all users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
                <p className="text-xs text-muted-foreground">Combined value</p>
              </CardContent>
            </Card>
          </div>

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
                <Heart className="h-16 w-16 text-destructive/50 mb-4" />
                <p className="text-lg font-medium text-destructive">Error loading favorites</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchFavorites} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : filteredUserFavorites.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  {searchTerm ? "No matching favorites found" : "No user favorites found"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Users haven't added any favorites yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredUserFavorites.map((userFav) => (
                <Card key={userFav.user_id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleUserExpansion(userFav.user_id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-br from-pink-500 to-red-500 text-white text-lg">
                            {userFav.customer_name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{userFav.customer_name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{userFav.customer_email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Heart className="h-4 w-4 text-red-500 fill-current" />
                            <span className="font-medium">{userFav.total_favorites} favorites</span>
                          </div>
                          <p className="text-lg font-bold text-primary mt-1">
                            {userFav.total_value.toLocaleString()} IQD
                          </p>
                        </div>
                        {expandedUsers.has(userFav.user_id) ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedUsers.has(userFav.user_id) && (
                    <CardContent className="border-t bg-muted/20 pt-4">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {userFav.favorites.map((item) => (
                          <Card key={item.id} className="group overflow-hidden">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={item.image_url || "/placeholder.svg"}
                                alt={item.product_name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
                                onClick={() => handleAdminRemoveFavorite(userFav.user_id, item.product_id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <CardContent className="p-3">
                              <p className="font-medium text-sm truncate">{item.product_name}</p>
                              <p className="text-xs text-muted-foreground truncate">{item.product_name_ar}</p>
                              <p className="text-sm font-bold text-primary mt-1">
                                {Number.parseFloat(item.price).toLocaleString()} IQD
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => setSelectedUserId(userFav.user_id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear User's Favorites
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        <Dialog open={selectedUserId !== null} onOpenChange={() => setSelectedUserId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clear User's Favorites</DialogTitle>
              <DialogDescription>
                Are you sure you want to clear this user's favorites? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUserId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => selectedUserId && handleAdminClearFavorites(selectedUserId)}>
                Clear Favorites
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Favorites</h1>
          <p className="text-muted-foreground">Your favorite products collection</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFavorites}</div>
              <p className="text-xs text-muted-foreground">Products you love</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueProducts}</div>
              <p className="text-xs text-muted-foreground">Different items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} IQD</div>
              <p className="text-xs text-muted-foreground">Combined value</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search favorite products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 fill-current text-red-500" />
              Your Favorite Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Heart className="h-16 w-16 text-destructive/50 mb-4" />
                <p className="text-lg font-medium text-destructive">Error loading favorites</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchFavorites} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : filteredFavorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  {searchTerm ? "No matching products" : "No favorites yet"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Start adding products you love"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredFavorites.map((item) => (
                  <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.product_name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => handleRemoveFavorite(item.product_id)}
                        disabled={removingItemId === item.product_id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold text-foreground line-clamp-1">{item.product_name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.product_name_ar}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-primary">
                            {Number.parseFloat(item.price).toLocaleString()} IQD
                          </p>
                          <Badge variant="secondary" className="gap-1">
                            <Heart className="h-3 w-3 fill-current text-red-500" />
                            Favorite
                          </Badge>
                        </div>
                        <Button
                          className="w-full"
                          size="sm"
                          onClick={() => handleAddToCart(item.product_id, item.product_name)}
                          disabled={addingToCartId === item.product_id}
                        >
                          {addingToCartId === item.product_id ? (
                            <>
                              <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-background border-t-transparent" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
