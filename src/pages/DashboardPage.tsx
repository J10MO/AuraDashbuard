// // // "use client"

// // // import { DashboardLayout } from "@/components/DashboardLayout"
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { useEffect, useState } from "react"
// // // import { orderService } from "@/services/orderService"
// // // import { productService } from "@/services/productService"
// // // import { userService } from "@/services/userService"
// // // import  cartService  from "@/services/cartService"
// // // import  favoritesService  from "@/services/favoritesService"
// // // import {
// // //   ShoppingCart,
// // //   Package,
// // //   TrendingUp,
// // //   DollarSign,
// // //   Users,
// // //   Heart,
// // //   ShoppingBag,
// // //   ArrowUpRight,
// // //   Activity,
// // // } from "lucide-react"
// // // import {
// // //   AreaChart,
// // //   Area,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // //   Legend,
// // // } from "recharts"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Skeleton } from "@/components/ui/skeleton"

// // // export default function DashboardPage() {
// // //   const [stats, setStats] = useState({
// // //     totalOrders: 0,
// // //     totalProducts: 0,
// // //     totalRevenue: 0,
// // //     totalUsers: 0,
// // //     totalCartItems: 0,
// // //     totalFavorites: 0,
// // //     pendingOrders: 0,
// // //     shippedOrders: 0,
// // //     deliveredOrders: 0,
// // //     cancelledOrders: 0,
// // //     revenueGrowth: 0,
// // //     ordersGrowth: 0,
// // //   })
// // //   const [recentOrders, setRecentOrders] = useState<any[]>([])
// // //   const [topProducts, setTopProducts] = useState<any[]>([])
// // //   const [loading, setLoading] = useState(true)

// // //   useEffect(() => {
// // //     fetchDashboardData()
// // //   }, [])

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       setLoading(true)

// // //       const [ordersData, productsData, usersData, cartsData, favoritesData] = await Promise.all([
// // //         orderService.getOrders().catch(() => []),
// // //         productService.getProducts().catch(() => []),
// // //         userService.getUsers().catch(() => ({ users: [], pagination: { totalUsers: 0 } })),
// // //         cartService.getAllCarts().catch(() => ({ carts: [], total_items: 0 })),
// // //         favoritesService.getAllFavorites().catch(() => ({ favorites: [], total_items: 0 })),
// // //       ])

// // //       const orders = ordersData || []
// // //       const products = productsData || []
// // //       const users = usersData?.users || []
// // //       const totalUsers = usersData?.pagination?.totalUsers || users.length
// // //       const totalCartItems = cartsData?.total_items || 0
// // //       const totalFavorites = favoritesData?.total_items || 0

// // //       const totalRevenue = orders.reduce((sum, order) => sum + (Number.parseFloat(order.total_amount) || 0), 0)
// // //       const pendingOrders = orders.filter((order) => order.status === "pending").length
// // //       const shippedOrders = orders.filter((order) => order.status === "shipped").length
// // //       const deliveredOrders = orders.filter((order) => order.status === "delivered").length
// // //       const cancelledOrders = orders.filter((order) => order.status === "cancelled").length

// // //       // Calculate growth metrics (mock data for now)
// // //       const revenueGrowth = 12.5
// // //       const ordersGrowth = 8.3

// // //       setStats({
// // //         totalOrders: orders.length,
// // //         totalProducts: products.length,
// // //         totalRevenue,
// // //         totalUsers,
// // //         totalCartItems,
// // //         totalFavorites,
// // //         pendingOrders,
// // //         shippedOrders,
// // //         deliveredOrders,
// // //         cancelledOrders,
// // //         revenueGrowth,
// // //         ordersGrowth,
// // //       })

// // //       setRecentOrders(orders.slice(0, 6))

// // //       // Get top products (mock for now, would need sales data from backend)
// // //       setTopProducts(products.slice(0, 5))
// // //     } catch (error) {
// // //       console.error("Failed to fetch dashboard data:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const generateRevenueData = () => {
// // //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
// // //     const baseRevenue = stats.totalRevenue / 6
// // //     return months.map((month, index) => ({
// // //       month,
// // //       revenue: Math.round(baseRevenue * (0.7 + Math.random() * 0.6)),
// // //       orders: Math.round((stats.totalOrders / 6) * (0.7 + Math.random() * 0.6)),
// // //     }))
// // //   }

// // //   const generateOrdersData = () => {
// // //     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
// // //     return days.map((day) => ({
// // //       day,
// // //       pending: Math.round(stats.pendingOrders / 7 + Math.random() * 5),
// // //       shipped: Math.round(stats.shippedOrders / 7 + Math.random() * 5),
// // //       delivered: Math.round(stats.deliveredOrders / 7 + Math.random() * 5),
// // //     }))
// // //   }

// // //   const revenueData = generateRevenueData()
// // //   const ordersData = generateOrdersData()

// // //   const statCards = [
// // //     {
// // //       title: "Total Revenue",
// // //       value: `${stats.totalRevenue.toLocaleString()} IQD`,
// // //       change: `+${stats.revenueGrowth}%`,
// // //       isPositive: true,
// // //       icon: DollarSign,
// // //       description: "vs last month",
// // //       color: "text-emerald-500",
// // //       bgColor: "bg-emerald-500/10",
// // //       borderColor: "border-emerald-500/20",
// // //     },
// // //     {
// // //       title: "Total Orders",
// // //       value: stats.totalOrders.toLocaleString(),
// // //       change: `+${stats.ordersGrowth}%`,
// // //       isPositive: true,
// // //       icon: ShoppingCart,
// // //       description: `${stats.pendingOrders} pending`,
// // //       color: "text-blue-500",
// // //       bgColor: "bg-blue-500/10",
// // //       borderColor: "border-blue-500/20",
// // //     },
// // //     {
// // //       title: "Products",
// // //       value: stats.totalProducts.toLocaleString(),
// // //       change: "Active",
// // //       isPositive: true,
// // //       icon: Package,
// // //       description: "In catalog",
// // //       color: "text-purple-500",
// // //       bgColor: "bg-purple-500/10",
// // //       borderColor: "border-purple-500/20",
// // //     },
// // //     {
// // //       title: "Total Users",
// // //       value: stats.totalUsers.toLocaleString(),
// // //       change: "Active",
// // //       isPositive: true,
// // //       icon: Users,
// // //       description: "Registered users",
// // //       color: "text-orange-500",
// // //       bgColor: "bg-orange-500/10",
// // //       borderColor: "border-orange-500/20",
// // //     },
// // //   ]

// // //   const secondaryStats = [
// // //     {
// // //       title: "Cart Items",
// // //       value: stats.totalCartItems.toLocaleString(),
// // //       icon: ShoppingBag,
// // //       color: "text-cyan-500",
// // //     },
// // //     {
// // //       title: "Favorites",
// // //       value: stats.totalFavorites.toLocaleString(),
// // //       icon: Heart,
// // //       color: "text-pink-500",
// // //     },
// // //     {
// // //       title: "Delivered",
// // //       value: stats.deliveredOrders.toLocaleString(),
// // //       icon: Activity,
// // //       color: "text-green-500",
// // //     },
// // //   ]

// // //   const getStatusColor = (status: string) => {
// // //     const colors: Record<string, string> = {
// // //       pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
// // //       shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
// // //       delivered: "bg-green-500/10 text-green-500 border-green-500/20",
// // //       cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
// // //     }
// // //     return colors[status] || colors.pending
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <DashboardLayout>
// // //         <div className="space-y-6">
// // //           <div>
// // //             <Skeleton className="h-10 w-64" />
// // //             <Skeleton className="mt-2 h-5 w-96" />
// // //           </div>
// // //           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// // //             {[1, 2, 3, 4].map((i) => (
// // //               <Skeleton key={i} className="h-32" />
// // //             ))}
// // //           </div>
// // //           <div className="grid gap-6 lg:grid-cols-2">
// // //             <Skeleton className="h-96" />
// // //             <Skeleton className="h-96" />
// // //           </div>
// // //         </div>
// // //       </DashboardLayout>
// // //     )
// // //   }

// // //   return (
// // //     <DashboardLayout>
// // //       <div className="space-y-6">
// // //         <div className="space-y-2">
// // //           <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent">
// // //             Dashboard Overview
// // //           </h1>
// // //           <p className="text-lg text-muted-foreground">Monitor your e-commerce performance and manage operations</p>
// // //         </div>

// // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// // //           {statCards.map((stat) => {
// // //             const Icon = stat.icon
// // //             return (
// // //               <Card
// // //                 key={stat.title}
// // //                 className={`border-2 ${stat.borderColor} transition-all hover:shadow-lg hover:shadow-primary/5`}
// // //               >
// // //                 <CardHeader className="flex flex-row items-center justify-between pb-2">
// // //                   <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
// // //                   <div className={`rounded-xl p-2.5 ${stat.bgColor}`}>
// // //                     <Icon className={`h-5 w-5 ${stat.color}`} />
// // //                   </div>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   <div className="text-3xl font-bold text-foreground">{stat.value}</div>
// // //                   <div className="mt-2 flex items-center gap-2 text-xs">
// // //                     {stat.isPositive && stat.change.includes("%") ? (
// // //                       <span className="flex items-center gap-1 text-emerald-500">
// // //                         <ArrowUpRight className="h-3 w-3" />
// // //                         {stat.change}
// // //                       </span>
// // //                     ) : (
// // //                       <span className="text-muted-foreground">{stat.change}</span>
// // //                     )}
// // //                     <span className="text-muted-foreground">{stat.description}</span>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             )
// // //           })}
// // //         </div>

// // //         <div className="grid gap-4 md:grid-cols-3">
// // //           {secondaryStats.map((stat) => {
// // //             const Icon = stat.icon
// // //             return (
// // //               <Card key={stat.title} className="border-border/50">
// // //                 <CardContent className="flex items-center justify-between p-4">
// // //                   <div>
// // //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// // //                     <p className="text-2xl font-bold text-foreground">{stat.value}</p>
// // //                   </div>
// // //                   <Icon className={`h-8 w-8 ${stat.color}`} />
// // //                 </CardContent>
// // //               </Card>
// // //             )
// // //           })}
// // //         </div>

// // //         <div className="grid gap-6 lg:grid-cols-2">
// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <TrendingUp className="h-5 w-5 text-primary" />
// // //                 Revenue & Orders Trend
// // //               </CardTitle>
// // //               <CardDescription>Monthly performance overview</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <ResponsiveContainer width="100%" height={300}>
// // //                 <AreaChart data={revenueData}>
// // //                   <defs>
// // //                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
// // //                       <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
// // //                       <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
// // //                     </linearGradient>
// // //                     <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
// // //                       <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
// // //                       <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
// // //                     </linearGradient>
// // //                   </defs>
// // //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
// // //                   <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <Tooltip
// // //                     contentStyle={{
// // //                       backgroundColor: "hsl(var(--card))",
// // //                       border: "1px solid hsl(var(--border))",
// // //                       borderRadius: "8px",
// // //                     }}
// // //                   />
// // //                   <Legend />
// // //                   <Area
// // //                     type="monotone"
// // //                     dataKey="revenue"
// // //                     stroke="hsl(var(--chart-1))"
// // //                     fillOpacity={1}
// // //                     fill="url(#colorRevenue)"
// // //                     strokeWidth={2}
// // //                     name="Revenue (IQD)"
// // //                   />
// // //                   <Area
// // //                     type="monotone"
// // //                     dataKey="orders"
// // //                     stroke="hsl(var(--chart-2))"
// // //                     fillOpacity={1}
// // //                     fill="url(#colorOrders)"
// // //                     strokeWidth={2}
// // //                     name="Orders"
// // //                   />
// // //                 </AreaChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <Activity className="h-5 w-5 text-primary" />
// // //                 Order Status Distribution
// // //               </CardTitle>
// // //               <CardDescription>Weekly order status breakdown</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <ResponsiveContainer width="100%" height={300}>
// // //                 <BarChart data={ordersData}>
// // //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
// // //                   <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <Tooltip
// // //                     contentStyle={{
// // //                       backgroundColor: "hsl(var(--card))",
// // //                       border: "1px solid hsl(var(--border))",
// // //                       borderRadius: "8px",
// // //                     }}
// // //                   />
// // //                   <Legend />
// // //                   <Bar dataKey="pending" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} name="Pending" />
// // //                   <Bar dataKey="shipped" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Shipped" />
// // //                   <Bar dataKey="delivered" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Delivered" />
// // //                 </BarChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         <div className="grid gap-6 lg:grid-cols-2">
// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle>Recent Orders</CardTitle>
// // //               <CardDescription>Latest customer orders</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="space-y-3">
// // //                 {recentOrders.length > 0 ? (
// // //                   recentOrders.map((order) => (
// // //                     <div
// // //                       key={order.id}
// // //                       className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
// // //                     >
// // //                       <div className="flex-1">
// // //                         <p className="font-semibold text-foreground">#{order.order_number}</p>
// // //                         <p className="text-sm text-muted-foreground">{order.delivery_name}</p>
// // //                       </div>
// // //                       <div className="flex items-center gap-3">
// // //                         <span className="font-bold text-foreground">
// // //                           {Number.parseFloat(order.total_amount).toLocaleString()} IQD
// // //                         </span>
// // //                         <Badge className={`${getStatusColor(order.status)} border`}>{order.status}</Badge>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <p className="py-8 text-center text-sm text-muted-foreground">No recent orders</p>
// // //                 )}
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle>Top Products</CardTitle>
// // //               <CardDescription>Best performing products</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="space-y-3">
// // //                 {topProducts.length > 0 ? (
// // //                   topProducts.map((product, index) => (
// // //                     <div
// // //                       key={product.id}
// // //                       className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
// // //                     >
// // //                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
// // //                         #{index + 1}
// // //                       </div>
// // //                       <div className="flex-1">
// // //                         <p className="font-semibold text-foreground">{product.name}</p>
// // //                         <p className="text-sm text-muted-foreground">{product.brand}</p>
// // //                       </div>
// // //                       <span className="font-bold text-foreground">
// // //                         {Number.parseFloat(product.price).toLocaleString()} IQD
// // //                       </span>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <p className="py-8 text-center text-sm text-muted-foreground">No products available</p>
// // //                 )}
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     </DashboardLayout>
// // //   )
// // // }




// // // "use client"

// // // import { DashboardLayout } from "@/components/DashboardLayout"
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { useEffect, useState } from "react"
// // // import { orderService } from "@/services/orderService"
// // // import { productService } from "@/services/productService"
// // // import { userService } from "@/services/userService"
// // // import  cartService  from "../services/cartService"
// // // import favoritesService  from "../services/favoritesService"
// // // import {
// // //   ShoppingCart,
// // //   Package,
// // //   TrendingUp,
// // //   DollarSign,
// // //   Users,
// // //   Heart,
// // //   ShoppingBag,
// // //   ArrowUpRight,
// // //   Activity,
// // // } from "lucide-react"
// // // import {
// // //   AreaChart,
// // //   Area,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // //   Legend,
// // // } from "recharts"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Skeleton } from "@/components/ui/skeleton"

// // // export default function DashboardPage() {
// // //   const [stats, setStats] = useState({
// // //     totalOrders: 0,
// // //     totalProducts: 0,
// // //     totalRevenue: 0,
// // //     totalUsers: 0,
// // //     totalCartItems: 0,
// // //     totalFavorites: 0,
// // //     pendingOrders: 0,
// // //     shippedOrders: 0,
// // //     deliveredOrders: 0,
// // //     cancelledOrders: 0,
// // //     revenueGrowth: 0,
// // //     ordersGrowth: 0,
// // //   })
// // //   const [recentOrders, setRecentOrders] = useState<any[]>([])
// // //   const [topProducts, setTopProducts] = useState<any[]>([])
// // //   const [loading, setLoading] = useState(true)

// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       fetchDashboardData()
// // //     }, 100)
// // //     return () => clearTimeout(timer)
// // //   }, [])

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       setLoading(true)
// // //       console.log("[v0] Fetching dashboard data...")

// // //       const token = localStorage.getItem("token")
// // //       if (!token) {
// // //         console.log("[v0] No token found, skipping data fetch")
// // //         setLoading(false)
// // //         return
// // //       }

// // //       const [ordersData, productsData, usersData, cartsData, favoritesData] = await Promise.all([
// // //         orderService.getOrders().catch((err) => {
// // //           console.error("[v0] Failed to fetch orders:", err)
// // //           return { orders: [], pagination: { totalOrders: 0 } }
// // //         }),
// // //         productService.getProducts().catch((err) => {
// // //           console.error("[v0] Failed to fetch products:", err)
// // //           return []
// // //         }),
// // //         userService.getUsers().catch((err) => {
// // //           console.error("[v0] Failed to fetch users:", err)
// // //           return { users: [], pagination: { totalUsers: 0 } }
// // //         }),
// // //         cartService.getAllCarts().catch((err) => {
// // //           console.error("[v0] Failed to fetch carts:", err)
// // //           return { carts: [], total_items: 0 }
// // //         }),
// // //         favoritesService.getAllFavorites().catch((err) => {
// // //           console.error("[v0] Failed to fetch favorites:", err)
// // //           return { favorites: [], total_items: 0 }
// // //         }),
// // //       ])

// // //       const orders = ordersData?.orders || []
// // //       const totalOrders = ordersData.totalOrders || orders.length
// // //       const products = productsData || []
// // //       const users = usersData?.users || []
// // //       const totalUsers = usersData?.pagination?.totalUsers || users.length
// // //       const totalCartItems = cartsData?.total_items || 0
// // //       const totalFavorites = favoritesData?.total_items || 0

// // //       console.log("[v0] Dashboard data fetched:", {
// // //         orders: orders.length,
// // //         products: products.length,
// // //         users: users.length,
// // //         totalCartItems,
// // //         totalFavorites,
// // //       })

// // //       const totalRevenue = orders.reduce((sum, order) => sum + (Number.parseFloat(order.total_amount) || 0), 0)
// // //       const pendingOrders = orders.filter((order) => order.status === "pending").length
// // //       const shippedOrders = orders.filter((order) => order.status === "shipped").length
// // //       const deliveredOrders = orders.filter((order) => order.status === "delivered").length
// // //       const cancelledOrders = orders.filter((order) => order.status === "cancelled").length

// // //       const revenueGrowth = 12.5
// // //       const ordersGrowth = 8.3

// // //       setStats({
// // //         totalOrders,
// // //         totalProducts: products.length,
// // //         totalRevenue,
// // //         totalUsers,
// // //         totalCartItems,
// // //         totalFavorites,
// // //         pendingOrders,
// // //         shippedOrders,
// // //         deliveredOrders,
// // //         cancelledOrders,
// // //         revenueGrowth,
// // //         ordersGrowth,
// // //       })

// // //       setRecentOrders(orders.slice(0, 6))

// // //       setTopProducts(products.slice(0, 5))
// // //     } catch (error) {
// // //       console.error("[v0] Failed to fetch dashboard data:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const generateRevenueData = () => {
// // //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
// // //     const baseRevenue = stats.totalRevenue / 6
// // //     return months.map((month, index) => ({
// // //       month,
// // //       revenue: Math.round(baseRevenue * (0.7 + Math.random() * 0.6)),
// // //       orders: Math.round((stats.totalOrders / 6) * (0.7 + Math.random() * 0.6)),
// // //     }))
// // //   }

// // //   const generateOrdersData = () => {
// // //     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
// // //     return days.map((day) => ({
// // //       day,
// // //       pending: Math.round(stats.pendingOrders / 7 + Math.random() * 5),
// // //       shipped: Math.round(stats.shippedOrders / 7 + Math.random() * 5),
// // //       delivered: Math.round(stats.deliveredOrders / 7 + Math.random() * 5),
// // //     }))
// // //   }

// // //   const revenueData = generateRevenueData()
// // //   const ordersData = generateOrdersData()

// // //   const statCards = [
// // //     {
// // //       title: "Total Revenue",
// // //       value: `${stats.totalRevenue.toLocaleString()} IQD`,
// // //       change: `+${stats.revenueGrowth}%`,
// // //       isPositive: true,
// // //       icon: DollarSign,
// // //       description: "vs last month",
// // //       color: "text-emerald-500",
// // //       bgColor: "bg-emerald-500/10",
// // //       borderColor: "border-emerald-500/20",
// // //     },
// // //     {
// // //       title: "Total Orders",
// // //       value: stats.totalOrders.toLocaleString(),
// // //       change: `+${stats.ordersGrowth}%`,
// // //       isPositive: true,
// // //       icon: ShoppingCart,
// // //       description: `${stats.pendingOrders} pending`,
// // //       color: "text-blue-500",
// // //       bgColor: "bg-blue-500/10",
// // //       borderColor: "border-blue-500/20",
// // //     },
// // //     {
// // //       title: "Products",
// // //       value: stats.totalProducts.toLocaleString(),
// // //       change: "Active",
// // //       isPositive: true,
// // //       icon: Package,
// // //       description: "In catalog",
// // //       color: "text-purple-500",
// // //       bgColor: "bg-purple-500/10",
// // //       borderColor: "border-purple-500/20",
// // //     },
// // //     {
// // //       title: "Total Users",
// // //       value: stats.totalUsers.toLocaleString(),
// // //       change: "Active",
// // //       isPositive: true,
// // //       icon: Users,
// // //       description: "Registered users",
// // //       color: "text-orange-500",
// // //       bgColor: "bg-orange-500/10",
// // //       borderColor: "border-orange-500/20",
// // //     },
// // //   ]

// // //   const secondaryStats = [
// // //     {
// // //       title: "Cart Items",
// // //       value: stats.totalCartItems.toLocaleString(),
// // //       icon: ShoppingBag,
// // //       color: "text-cyan-500",
// // //     },
// // //     {
// // //       title: "Favorites",
// // //       value: stats.totalFavorites.toLocaleString(),
// // //       icon: Heart,
// // //       color: "text-pink-500",
// // //     },
// // //     {
// // //       title: "Delivered",
// // //       value: stats.deliveredOrders.toLocaleString(),
// // //       icon: Activity,
// // //       color: "text-green-500",
// // //     },
// // //   ]

// // //   const getStatusColor = (status: string) => {
// // //     const colors: Record<string, string> = {
// // //       pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
// // //       shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
// // //       delivered: "bg-green-500/10 text-green-500 border-green-500/20",
// // //       cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
// // //     }
// // //     return colors[status] || colors.pending
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <DashboardLayout>
// // //         <div className="space-y-6">
// // //           <div>
// // //             <Skeleton className="h-10 w-64" />
// // //             <Skeleton className="mt-2 h-5 w-96" />
// // //           </div>
// // //           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// // //             {[1, 2, 3, 4].map((i) => (
// // //               <Skeleton key={i} className="h-32" />
// // //             ))}
// // //           </div>
// // //           <div className="grid gap-6 lg:grid-cols-2">
// // //             <Skeleton className="h-96" />
// // //             <Skeleton className="h-96" />
// // //           </div>
// // //         </div>
// // //       </DashboardLayout>
// // //     )
// // //   }

// // //   return (
// // //     <DashboardLayout>
// // //       <div className="space-y-6">
// // //         <div className="space-y-2">
// // //           <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent">
// // //             Dashboard Overview
// // //           </h1>
// // //           <p className="text-lg text-muted-foreground">Monitor your e-commerce performance and manage operations</p>
// // //         </div>

// // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// // //           {statCards.map((stat) => {
// // //             const Icon = stat.icon
// // //             return (
// // //               <Card
// // //                 key={stat.title}
// // //                 className={`border-2 ${stat.borderColor} transition-all hover:shadow-lg hover:shadow-primary/5`}
// // //               >
// // //                 <CardHeader className="flex flex-row items-center justify-between pb-2">
// // //                   <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
// // //                   <div className={`rounded-xl p-2.5 ${stat.bgColor}`}>
// // //                     <Icon className={`h-5 w-5 ${stat.color}`} />
// // //                   </div>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   <div className="text-3xl font-bold text-foreground">{stat.value}</div>
// // //                   <div className="mt-2 flex items-center gap-2 text-xs">
// // //                     {stat.isPositive && stat.change.includes("%") ? (
// // //                       <span className="flex items-center gap-1 text-emerald-500">
// // //                         <ArrowUpRight className="h-3 w-3" />
// // //                         {stat.change}
// // //                       </span>
// // //                     ) : (
// // //                       <span className="text-muted-foreground">{stat.change}</span>
// // //                     )}
// // //                     <span className="text-muted-foreground">{stat.description}</span>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             )
// // //           })}
// // //         </div>

// // //         <div className="grid gap-4 md:grid-cols-3">
// // //           {secondaryStats.map((stat) => {
// // //             const Icon = stat.icon
// // //             return (
// // //               <Card key={stat.title} className="border-border/50">
// // //                 <CardContent className="flex items-center justify-between p-4">
// // //                   <div>
// // //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// // //                     <p className="text-2xl font-bold text-foreground">{stat.value}</p>
// // //                   </div>
// // //                   <Icon className={`h-8 w-8 ${stat.color}`} />
// // //                 </CardContent>
// // //               </Card>
// // //             )
// // //           })}
// // //         </div>

// // //         <div className="grid gap-6 lg:grid-cols-2">
// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <TrendingUp className="h-5 w-5 text-primary" />
// // //                 Revenue & Orders Trend
// // //               </CardTitle>
// // //               <CardDescription>Monthly performance overview</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <ResponsiveContainer width="100%" height={300}>
// // //                 <AreaChart data={revenueData}>
// // //                   <defs>
// // //                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
// // //                       <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
// // //                       <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
// // //                     </linearGradient>
// // //                     <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
// // //                       <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
// // //                       <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
// // //                     </linearGradient>
// // //                   </defs>
// // //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
// // //                   <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <Tooltip
// // //                     contentStyle={{
// // //                       backgroundColor: "hsl(var(--card))",
// // //                       border: "1px solid hsl(var(--border))",
// // //                       borderRadius: "8px",
// // //                     }}
// // //                   />
// // //                   <Legend />
// // //                   <Area
// // //                     type="monotone"
// // //                     dataKey="revenue"
// // //                     stroke="hsl(var(--chart-1))"
// // //                     fillOpacity={1}
// // //                     fill="url(#colorRevenue)"
// // //                     strokeWidth={2}
// // //                     name="Revenue (IQD)"
// // //                   />
// // //                   <Area
// // //                     type="monotone"
// // //                     dataKey="orders"
// // //                     stroke="hsl(var(--chart-2))"
// // //                     fillOpacity={1}
// // //                     fill="url(#colorOrders)"
// // //                     strokeWidth={2}
// // //                     name="Orders"
// // //                   />
// // //                 </AreaChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <Activity className="h-5 w-5 text-primary" />
// // //                 Order Status Distribution
// // //               </CardTitle>
// // //               <CardDescription>Weekly order status breakdown</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <ResponsiveContainer width="100%" height={300}>
// // //                 <BarChart data={ordersData}>
// // //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
// // //                   <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
// // //                   <Tooltip
// // //                     contentStyle={{
// // //                       backgroundColor: "hsl(var(--card))",
// // //                       border: "1px solid hsl(var(--border))",
// // //                       borderRadius: "8px",
// // //                     }}
// // //                   />
// // //                   <Legend />
// // //                   <Bar dataKey="pending" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} name="Pending" />
// // //                   <Bar dataKey="shipped" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Shipped" />
// // //                   <Bar dataKey="delivered" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Delivered" />
// // //                 </BarChart>
// // //               </ResponsiveContainer>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         <div className="grid gap-6 lg:grid-cols-2">
// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle>Recent Orders</CardTitle>
// // //               <CardDescription>Latest customer orders</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="space-y-3">
// // //                 {recentOrders.length > 0 ? (
// // //                   recentOrders.map((order) => (
// // //                     <div
// // //                       key={order.id}
// // //                       className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
// // //                     >
// // //                       <div className="flex-1">
// // //                         <p className="font-semibold text-foreground">#{order.order_number}</p>
// // //                         <p className="text-sm text-muted-foreground">{order.delivery_name}</p>
// // //                       </div>
// // //                       <div className="flex items-center gap-3">
// // //                         <span className="font-bold text-foreground">
// // //                           {Number.parseFloat(order.total_amount).toLocaleString()} IQD
// // //                         </span>
// // //                         <Badge className={`${getStatusColor(order.status)} border`}>{order.status}</Badge>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <p className="py-8 text-center text-sm text-muted-foreground">No recent orders</p>
// // //                 )}
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="border-border/50">
// // //             <CardHeader>
// // //               <CardTitle>Top Products</CardTitle>
// // //               <CardDescription>Best performing products</CardDescription>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="space-y-3">
// // //                 {topProducts.length > 0 ? (
// // //                   topProducts.map((product, index) => (
// // //                     <div
// // //                       key={product.id}
// // //                       className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
// // //                     >
// // //                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
// // //                         #{index + 1}
// // //                       </div>
// // //                       <div className="flex-1">
// // //                         <p className="font-semibold text-foreground">{product.name}</p>
// // //                         <p className="text-sm text-muted-foreground">{product.brand}</p>
// // //                       </div>
// // //                       <span className="font-bold text-foreground">
// // //                         {Number.parseFloat(product.price).toLocaleString()} IQD
// // //                       </span>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <p className="py-8 text-center text-sm text-muted-foreground">No products available</p>
// // //                 )}
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     </DashboardLayout>
// // //   )
// // // }





// // "use client"

// // import { DashboardLayout } from "@/components/DashboardLayout"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { useEffect, useState } from "react"
// // import { orderService } from "@/services/orderService"
// // import { productService } from "@/services/productService"
// // import { userService } from "@/services/userService"
// // import cartService from "../services/cartService"
// // import favoritesService from "../services/favoritesService"
// // import {
// //   ShoppingCart,
// //   Package,
// //   TrendingUp,
// //   DollarSign,
// //   Users,
// //   Heart,
// //   ShoppingBag,
// //   ArrowUpRight,
// //   Activity,
// // } from "lucide-react"
// // import {
// //   AreaChart,
// //   Area,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   Legend,
// // } from "recharts"
// // import { Badge } from "@/components/ui/badge"
// // import { Skeleton } from "@/components/ui/skeleton"

// // export default function DashboardPage() {
// //   const [stats, setStats] = useState({
// //     totalOrders: 0,
// //     totalProducts: 0,
// //     totalRevenue: 0,
// //     totalUsers: 0,
// //     totalCartItems: 0,
// //     totalFavorites: 0,
// //     pendingOrders: 0,
// //     shippedOrders: 0,
// //     deliveredOrders: 0,
// //     cancelledOrders: 0,
// //     revenueGrowth: 0,
// //     ordersGrowth: 0,
// //   })
// //   const [recentOrders, setRecentOrders] = useState<any[]>([])
// //   const [topProducts, setTopProducts] = useState<any[]>([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       fetchDashboardData()
// //     }, 100)
// //     return () => clearTimeout(timer)
// //   }, [])

// // const fetchDashboardData = async () => {
// //   try {
// //     setLoading(true)
// //     console.log("[v0] Fetching dashboard data...")

// //     const token = localStorage.getItem("token")
// //     if (!token) {
// //       console.log("[v0] No token found, skipping data fetch")
// //       setLoading(false)
// //       return
// //     }

// //     // Use getAllOrders to get all orders without pagination
// //     const [ordersResponse, productsData, usersData, cartsData, favoritesData] = await Promise.all([
// //       orderService.getAllOrders().catch((err) => {
// //         console.error("[v0] Failed to fetch orders:", err)
// //         return []
// //       }),
// //       productService.getProducts().catch((err) => {
// //         console.error("[v0] Failed to fetch products:", err)
// //         return []
// //       }),
// //       userService.getUsers().catch((err) => {
// //         console.error("[v0] Failed to fetch users:", err)
// //         return { users: [], pagination: { totalUsers: 0 } }
// //       }),
// //       cartService.getAllCarts().catch((err) => {
// //         console.error("[v0] Failed to fetch carts:", err)
// //         return { carts: [], total_items: 0 }
// //       }),
// //       favoritesService.getAllFavorites().catch((err) => {
// //         console.error("[v0] Failed to fetch favorites:", err)
// //         return { favorites: [], total_items: 0 }
// //       }),
// //     ])

// //     console.log("[v0] Orders data response:", ordersResponse)

// //     // Now ordersResponse is the actual array of orders
// //     const orders = Array.isArray(ordersResponse) ? ordersResponse : []
// //     const totalOrders = orders.length

// //     const products = productsData || []
// //     const users = usersData?.users || []
// //     const totalUsers = usersData?.pagination?.totalUsers || users.length
// //     const totalCartItems = cartsData?.total_items || 0
// //     const totalFavorites = favoritesData?.total_items || 0

// //     console.log("[v0] Dashboard data fetched:", {
// //       orders: orders.length,
// //       totalOrders: totalOrders,
// //       products: products.length,
// //       users: users.length,
// //       totalCartItems,
// //       totalFavorites,
// //     })

// //     // Calculate statistics from ALL orders
// //     const totalRevenue = orders.reduce((sum, order) => sum + (Number.parseFloat(order.total_amount) || 0), 0)
// //     const pendingOrders = orders.filter((order) => order.status === "pending").length
// //     const shippedOrders = orders.filter((order) => order.status === "shipped").length
// //     const deliveredOrders = orders.filter((order) => order.status === "delivered").length
// //     const cancelledOrders = orders.filter((order) => order.status === "cancelled").length

// //     const revenueGrowth = 12.5
// //     const ordersGrowth = 8.3

// //     setStats({
// //       totalOrders, // This now uses the correct total count
// //       totalProducts: products.length,
// //       totalRevenue,
// //       totalUsers,
// //       totalCartItems,
// //       totalFavorites,
// //       pendingOrders,
// //       shippedOrders,
// //       deliveredOrders,
// //       cancelledOrders,
// //       revenueGrowth,
// //       ordersGrowth,
// //     })

// //     // Show recent orders (most recent first)
// //     const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
// //     setRecentOrders(sortedOrders.slice(0, 6))

// //     setTopProducts(products.slice(0, 5))
// //   } catch (error) {
// //     console.error("[v0] Failed to fetch dashboard data:", error)
// //   } finally {
// //     setLoading(false)
// //   }
// // }

// //   // ... rest of your component remains the same
// //   const generateRevenueData = () => {
// //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
// //     const baseRevenue = stats.totalRevenue / 6
// //     return months.map((month, index) => ({
// //       month,
// //       revenue: Math.round(baseRevenue * (0.7 + Math.random() * 0.6)),
// //       orders: Math.round((stats.totalOrders / 6) * (0.7 + Math.random() * 0.6)),
// //     }))
// //   }

// //   const generateOrdersData = () => {
// //     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
// //     return days.map((day) => ({
// //       day,
// //       pending: Math.round(stats.pendingOrders / 7 + Math.random() * 5),
// //       shipped: Math.round(stats.shippedOrders / 7 + Math.random() * 5),
// //       delivered: Math.round(stats.deliveredOrders / 7 + Math.random() * 5),
// //     }))
// //   }

// //   const revenueData = generateRevenueData()
// //   const ordersData = generateOrdersData()

// //   const statCards = [
// //     {
// //       title: "Total Revenue",
// //       value: `${stats.totalRevenue.toLocaleString()} IQD`,
// //       change: `+${stats.revenueGrowth}%`,
// //       isPositive: true,
// //       icon: DollarSign,
// //       description: "vs last month",
// //       color: "text-emerald-500",
// //       bgColor: "bg-emerald-500/10",
// //       borderColor: "border-emerald-500/20",
// //     },
// //     {
// //       title: "Total Orders",
// //       value: stats.totalOrders.toLocaleString(),
// //       change: `+${stats.ordersGrowth}%`,
// //       isPositive: true,
// //       icon: ShoppingCart,
// //       description: `${stats.pendingOrders} pending`,
// //       color: "text-blue-500",
// //       bgColor: "bg-blue-500/10",
// //       borderColor: "border-blue-500/20",
// //     },
// //     {
// //       title: "Products",
// //       value: stats.totalProducts.toLocaleString(),
// //       change: "Active",
// //       isPositive: true,
// //       icon: Package,
// //       description: "In catalog",
// //       color: "text-purple-500",
// //       bgColor: "bg-purple-500/10",
// //       borderColor: "border-purple-500/20",
// //     },
// //     {
// //       title: "Total Users",
// //       value: stats.totalUsers.toLocaleString(),
// //       change: "Active",
// //       isPositive: true,
// //       icon: Users,
// //       description: "Registered users",
// //       color: "text-orange-500",
// //       bgColor: "bg-orange-500/10",
// //       borderColor: "border-orange-500/20",
// //     },
// //   ]

// //   // ... rest of your component code remains the same
  
// //   const secondaryStats = [
// //     {
// //       title: "Cart Items",
// //       value: stats.totalCartItems.toLocaleString(),
// //       icon: ShoppingBag,
// //       color: "text-cyan-500",
// //     },
// //     {
// //       title: "Favorites",
// //       value: stats.totalFavorites.toLocaleString(),
// //       icon: Heart,
// //       color: "text-pink-500",
// //     },
// //     {
// //       title: "Delivered",
// //       value: stats.deliveredOrders.toLocaleString(),
// //       icon: Activity,
// //       color: "text-green-500",
// //     },
// //   ]

// //   const getStatusColor = (status: string) => {
// //     const colors: Record<string, string> = {
// //       pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
// //       shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
// //       delivered: "bg-green-500/10 text-green-500 border-green-500/20",
// //       cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
// //     }
// //     return colors[status] || colors.pending
// //   }

// //   if (loading) {
// //     return (
// //       <DashboardLayout>
// //         <div className="space-y-6">
// //           <div>
// //             <Skeleton className="h-10 w-64" />
// //             <Skeleton className="mt-2 h-5 w-96" />
// //           </div>
// //           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// //             {[1, 2, 3, 4].map((i) => (
// //               <Skeleton key={i} className="h-32" />
// //             ))}
// //           </div>
// //           <div className="grid gap-6 lg:grid-cols-2">
// //             <Skeleton className="h-96" />
// //             <Skeleton className="h-96" />
// //           </div>
// //         </div>
// //       </DashboardLayout>
// //     )
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div className="space-y-6">
// //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// //           {statCards.map((stat) => {
// //             const Icon = stat.icon
// //             return (
// //               <Card
// //                 key={stat.title}
// //                 className={`border-2 ${stat.borderColor} transition-all hover:shadow-lg hover:shadow-primary/5`}
// //               >
// //                 <CardHeader className="flex flex-row items-center justify-between pb-2">
// //                   <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
// //                   <div className={`rounded-xl p-2.5 ${stat.bgColor}`}>
// //                     <Icon className={`h-5 w-5 ${stat.color}`} />
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="text-3xl font-bold text-foreground">{stat.value}</div>
// //                   <div className="mt-2 flex items-center gap-2 text-xs">
// //                     {stat.isPositive && stat.change.includes("%") ? (
// //                       <span className="flex items-center gap-1 text-emerald-500">
// //                         <ArrowUpRight className="h-3 w-3" />
// //                         {stat.change}
// //                       </span>
// //                     ) : (
// //                       <span className="text-muted-foreground">{stat.change}</span>
// //                     )}
// //                     <span className="text-muted-foreground">{stat.description}</span>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             )
// //           })}
// //         </div>

// //         <div className="grid gap-4 md:grid-cols-3">
// //           {secondaryStats.map((stat) => {
// //             const Icon = stat.icon
// //             return (
// //               <Card key={stat.title} className="border-border/50">
// //                 <CardContent className="flex items-center justify-between p-4">
// //                   <div>
// //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// //                     <p className="text-2xl font-bold text-foreground">{stat.value}</p>
// //                   </div>
// //                   <Icon className={`h-8 w-8 ${stat.color}`} />
// //                 </CardContent>
// //               </Card>
// //             )
// //           })}
// //         </div>

// //         <div className="grid gap-6 lg:grid-cols-2">
// //           <Card className="border-border/50">
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <TrendingUp className="h-5 w-5 text-primary" />
// //                 Revenue & Orders Trend
// //               </CardTitle>
// //               <CardDescription>Monthly performance overview</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <AreaChart data={revenueData}>
// //                   <defs>
// //                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
// //                       <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
// //                       <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
// //                     </linearGradient>
// //                     <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
// //                       <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
// //                       <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
// //                     </linearGradient>
// //                   </defs>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
// //                   <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
// //                   <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
// //                   <Tooltip
// //                     contentStyle={{
// //                       backgroundColor: "hsl(var(--card))",
// //                       border: "1px solid hsl(var(--border))",
// //                       borderRadius: "8px",
// //                     }}
// //                   />
// //                   <Legend />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="revenue"
// //                     stroke="hsl(var(--chart-1))"
// //                     fillOpacity={1}
// //                     fill="url(#colorRevenue)"
// //                     strokeWidth={2}
// //                     name="Revenue (IQD)"
// //                   />
// //                   <Area
// //                     type="monotone"
// //                     dataKey="orders"
// //                     stroke="hsl(var(--chart-2))"
// //                     fillOpacity={1}
// //                     fill="url(#colorOrders)"
// //                     strokeWidth={2}
// //                     name="Orders"
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>

// //           <Card className="border-border/50">
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Activity className="h-5 w-5 text-primary" />
// //                 Order Status Distribution
// //               </CardTitle>
// //               <CardDescription>Weekly order status breakdown</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <BarChart data={ordersData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
// //                   <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
// //                   <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
// //                   <Tooltip
// //                     contentStyle={{
// //                       backgroundColor: "hsl(var(--card))",
// //                       border: "1px solid hsl(var(--border))",
// //                       borderRadius: "8px",
// //                     }}
// //                   />
// //                   <Legend />
// //                   <Bar dataKey="pending" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} name="Pending" />
// //                   <Bar dataKey="shipped" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Shipped" />
// //                   <Bar dataKey="delivered" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Delivered" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         <div className="grid gap-6 lg:grid-cols-2">
// //           <Card className="border-border/50">
// //             <CardHeader>
// //               <CardTitle>Recent Orders</CardTitle>
// //               <CardDescription>Latest customer orders</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-3">
// //                 {recentOrders.length > 0 ? (
// //                   recentOrders.map((order) => (
// //                     <div
// //                       key={order.id}
// //                       className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
// //                     >
// //                       <div className="flex-1">
// //                         <p className="font-semibold text-foreground">#{order.order_number}</p>
// //                         <p className="text-sm text-muted-foreground">{order.delivery_name}</p>
// //                       </div>
// //                       <div className="flex items-center gap-3">
// //                         <span className="font-bold text-foreground">
// //                           {Number.parseFloat(order.total_amount).toLocaleString()} IQD
// //                         </span>
// //                         <Badge className={`${getStatusColor(order.status)} border`}>{order.status}</Badge>
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p className="py-8 text-center text-sm text-muted-foreground">No recent orders</p>
// //                 )}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="border-border/50">
// //             <CardHeader>
// //               <CardTitle>Top Products</CardTitle>
// //               <CardDescription>Best performing products</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-3">
// //                 {topProducts.length > 0 ? (
// //                   topProducts.map((product, index) => (
// //                     <div
// //                       key={product.id}
// //                       className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
// //                     >
// //                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
// //                         #{index + 1}
// //                       </div>
// //                       <div className="flex-1">
// //                         <p className="font-semibold text-foreground">{product.name}</p>
// //                         <p className="text-sm text-muted-foreground">{product.brand}</p>
// //                       </div>
// //                       <span className="font-bold text-foreground">
// //                         {Number.parseFloat(product.price).toLocaleString()} IQD
// //                       </span>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p className="py-8 text-center text-sm text-muted-foreground">No products available</p>
// //                 )}
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   )
// // }




// "use client"

// import { DashboardLayout } from "@/components/DashboardLayout"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useEffect, useState } from "react"
// import { orderService } from "@/services/orderService"
// import { productService } from "@/services/productService"
// import { userService } from "@/services/userService"
// import cartService from "../services/cartService"
// import favoritesService from "../services/favoritesService"
// import {
//   ShoppingCart,
//   Package,
//   TrendingUp,
//   DollarSign,
//   Users,
//   Heart,
//   ShoppingBag,
//   ArrowUpRight,
//   ArrowDownRight,
//   Activity,
//   Clock,
//   CheckCircle,
//   Truck,
//   XCircle,
//   RefreshCw,
// } from "lucide-react"
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts"
// import { Badge } from "@/components/ui/badge"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// interface DashboardStats {
//   totalRevenue: number
//   totalOrders: number
//   totalProducts: number
//   totalUsers: number
//   totalCartItems: number
//   totalFavorites: number
//   pendingOrders: number
//   shippedOrders: number
//   deliveredOrders: number
//   cancelledOrders: number
//   revenueGrowth: number
//   ordersGrowth: number
//   usersGrowth: number
//   averageOrderValue: number
//   conversionRate: number
// }

// export default function DashboardPage() {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalRevenue: 0,
//     totalOrders: 0,
//     totalProducts: 0,
//     totalUsers: 0,
//     totalCartItems: 0,
//     totalFavorites: 0,
//     pendingOrders: 0,
//     shippedOrders: 0,
//     deliveredOrders: 0,
//     cancelledOrders: 0,
//     revenueGrowth: 0,
//     ordersGrowth: 0,
//     usersGrowth: 0,
//     averageOrderValue: 0,
//     conversionRate: 0,
//   })
//   const [recentOrders, setRecentOrders] = useState<any[]>([])
//   const [topProducts, setTopProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(false)
//   const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

//   useEffect(() => {
//     fetchDashboardData()
//   }, [timeRange])

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true)
//       console.log("[Dashboard] Fetching dashboard data...")

//       const token = localStorage.getItem("token")
//       if (!token) {
//         console.log("[Dashboard] No token found, skipping data fetch")
//         setLoading(false)
//         return
//       }

//       // Fetch all data in parallel with proper error handling
//       const [ordersResponse, productsResponse, usersResponse, cartsResponse, favoritesResponse] = await Promise.all([
//         orderService.getAllOrders().catch((err) => {
//           console.error("[Dashboard] Failed to fetch orders:", err)
//           return []
//         }),
//         productService.getProducts(1).catch((err) => {
//           console.error("[Dashboard] Failed to fetch products:", err)
//           return { products: [], pagination: { total: 0 } }
//         }),
//         userService.getUsers().catch((err) => {
//           console.error("[Dashboard] Failed to fetch users:", err)
//           return { users: [], pagination: { totalUsers: 0 } }
//         }),
//         cartService.getAllCarts().catch((err) => {
//           console.error("[Dashboard] Failed to fetch carts:", err)
//           return { success: false, carts: [], total_items: 0 }
//         }),
//         favoritesService.getAllFavorites().catch((err) => {
//           console.error("[Dashboard] Failed to fetch favorites:", err)
//           return { success: false, favorites: [], total_items: 0 }
//         }),
//       ])

//       console.log("[Dashboard] Data fetched:", {
//         orders: ordersResponse.length,
//         products: productsResponse.products?.length,
//         users: usersResponse.users?.length,
//         cartItems: cartsResponse.total_items,
//         favorites: favoritesResponse.total_items,
//       })

//       // Process orders data
//       const orders = Array.isArray(ordersResponse) ? ordersResponse : []
//       const totalOrders = orders.length
      
//       // Calculate revenue from completed orders only
//       const completedOrders = orders.filter(order => 
//         order.status === 'delivered' || order.status === 'shipped'
//       )
//       const totalRevenue = completedOrders.reduce(
//         (sum, order) => sum + (Number.parseFloat(order.total_amount) || 0), 0
//       )

//       // Calculate order status counts
//       const pendingOrders = orders.filter((order) => order.status === "pending").length
//       const shippedOrders = orders.filter((order) => order.status === "shipped").length
//       const deliveredOrders = orders.filter((order) => order.status === "delivered").length
//       const cancelledOrders = orders.filter((order) => order.status === "cancelled").length

//       // Process products data
//       const products = productsResponse.products || []
//       const totalProducts = productsResponse.pagination?.total || products.length

//       // Process users data
//       const users = usersResponse.users || []
//       const totalUsers = usersResponse.pagination?.totalUsers || users.length

//       // Process carts data
//       const totalCartItems = cartsResponse.success ? cartsResponse.total_items : 0

//       // Process favorites data
//       const totalFavorites = favoritesResponse.success ? favoritesResponse.total_items : 0

//       // Calculate advanced metrics
//       const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
//       const conversionRate = totalUsers > 0 ? (totalOrders / totalUsers) * 100 : 0

//       // Calculate growth percentages (you can replace with actual comparison logic)
//       const revenueGrowth = 12.5
//       const ordersGrowth = 8.3
//       const usersGrowth = 5.7

//       setStats({
//         totalRevenue,
//         totalOrders,
//         totalProducts,
//         totalUsers,
//         totalCartItems,
//         totalFavorites,
//         pendingOrders,
//         shippedOrders,
//         deliveredOrders,
//         cancelledOrders,
//         revenueGrowth,
//         ordersGrowth,
//         usersGrowth,
//         averageOrderValue,
//         conversionRate,
//       })

//       // Show recent orders (most recent first)
//       const sortedOrders = [...orders].sort(
//         (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       )
//       setRecentOrders(sortedOrders.slice(0, 6))

//       // Sort products by rating and get top 5
//       const sortedProducts = [...products]
//         .sort((a, b) => (Number.parseFloat(b.rating) || 0) - (Number.parseFloat(a.rating) || 0))
//         .slice(0, 5)
//       setTopProducts(sortedProducts)

//     } catch (error) {
//       console.error("[Dashboard] Failed to fetch dashboard data:", error)
//     } finally {
//       setLoading(false)
//       setRefreshing(false)
//     }
//   }

//   const handleRefresh = async () => {
//     setRefreshing(true)
//     await fetchDashboardData()
//   }

//   // Generate realistic chart data based on actual stats
//   const generateRevenueData = () => {
//     const periods = timeRange === 'week' 
//       ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//       : timeRange === 'month'
//       ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
//       : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
//     const baseRevenue = stats.totalRevenue / periods.length
//     return periods.map((period, index) => ({
//       period,
//       revenue: Math.round(baseRevenue * (0.8 + Math.random() * 0.4)),
//       orders: Math.round((stats.totalOrders / periods.length) * (0.8 + Math.random() * 0.4)),
//     }))
//   }

//   const generateOrdersData = () => {
//     const statusData = [
//       { name: 'Pending', value: stats.pendingOrders, color: '#f59e0b' },
//       { name: 'Shipped', value: stats.shippedOrders, color: '#3b82f6' },
//       { name: 'Delivered', value: stats.deliveredOrders, color: '#10b981' },
//       { name: 'Cancelled', value: stats.cancelledOrders, color: '#ef4444' },
//     ].filter(item => item.value > 0)

//     return statusData
//   }

//   const generateSalesData = () => {
//     const categories = ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Body Care']
//     return categories.map(category => ({
//       category,
//       sales: Math.round(stats.totalRevenue * (0.1 + Math.random() * 0.3)),
//     }))
//   }

//   const revenueData = generateRevenueData()
//   const ordersData = generateOrdersData()
//   const salesData = generateSalesData()

//   const mainStats = [
//     {
//       title: "Total Revenue",
//       value: `${stats.totalRevenue.toLocaleString()} IQD`,
//       change: stats.revenueGrowth,
//       isPositive: stats.revenueGrowth >= 0,
//       icon: DollarSign,
//       description: `AOV: ${stats.averageOrderValue.toLocaleString()} IQD`,
//       color: "text-emerald-500",
//       bgColor: "bg-emerald-500/10",
//       borderColor: "border-emerald-500/20",
//     },
//     {
//       title: "Total Orders",
//       value: stats.totalOrders.toLocaleString(),
//       change: stats.ordersGrowth,
//       isPositive: stats.ordersGrowth >= 0,
//       icon: ShoppingCart,
//       description: `${stats.pendingOrders} pending`,
//       color: "text-blue-500",
//       bgColor: "bg-blue-500/10",
//       borderColor: "border-blue-500/20",
//     },
//     {
//       title: "Products",
//       value: stats.totalProducts.toLocaleString(),
//       change: "Active",
//       isPositive: true,
//       icon: Package,
//       description: `${stats.totalFavorites} favorites`,
//       color: "text-purple-500",
//       bgColor: "bg-purple-500/10",
//       borderColor: "border-purple-500/20",
//     },
//     {
//       title: "Total Users",
//       value: stats.totalUsers.toLocaleString(),
//       change: stats.usersGrowth,
//       isPositive: stats.usersGrowth >= 0,
//       icon: Users,
//       description: `${stats.conversionRate.toFixed(1)}% conversion`,
//       color: "text-orange-500",
//       bgColor: "bg-orange-500/10",
//       borderColor: "border-orange-500/20",
//     },
//   ]

//   const statusStats = [
//     {
//       title: "Pending",
//       value: stats.pendingOrders,
//       icon: Clock,
//       color: "text-yellow-500",
//       bgColor: "bg-yellow-500/10",
//     },
//     {
//       title: "Shipped",
//       value: stats.shippedOrders,
//       icon: Truck,
//       color: "text-blue-500",
//       bgColor: "bg-blue-500/10",
//     },
//     {
//       title: "Delivered",
//       value: stats.deliveredOrders,
//       icon: CheckCircle,
//       color: "text-green-500",
//       bgColor: "bg-green-500/10",
//     },
//     {
//       title: "Cancelled",
//       value: stats.cancelledOrders,
//       icon: XCircle,
//       color: "text-red-500",
//       bgColor: "bg-red-500/10",
//     },
//   ]

//   const engagementStats = [
//     {
//       title: "Cart Items",
//       value: stats.totalCartItems,
//       icon: ShoppingBag,
//       color: "text-cyan-500",
//       description: "Active carts",
//     },
//     {
//       title: "Favorites",
//       value: stats.totalFavorites,
//       icon: Heart,
//       color: "text-pink-500",
//       description: "Saved items",
//     },
//   ]

//   const getStatusColor = (status: string) => {
//     const colors: Record<string, string> = {
//       pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
//       shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//       delivered: "bg-green-500/10 text-green-500 border-green-500/20",
//       cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
//     }
//     return colors[status] || colors.pending
//   }

//   const formatCurrency = (amount: number) => {
//     return `${amount.toLocaleString()} IQD`
//   }

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <Skeleton className="h-10 w-64" />
//               <Skeleton className="mt-2 h-5 w-96" />
//             </div>
//             <Skeleton className="h-10 w-32" />
//           </div>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             {[1, 2, 3, 4].map((i) => (
//               <Skeleton key={i} className="h-32" />
//             ))}
//           </div>
//           <div className="grid gap-4 md:grid-cols-4">
//             {[1, 2, 3, 4].map((i) => (
//               <Skeleton key={i} className="h-24" />
//             ))}
//           </div>
//           <div className="grid gap-6 lg:grid-cols-2">
//             <Skeleton className="h-96" />
//             <Skeleton className="h-96" />
//           </div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//            <div className="justify-end block items-end text-center">
//         {/* Animated Gradient Heading */}
//         <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-400  via-purple-500  to-blue-500 bg-clip-text text-transparent bg-size-200 bg-pos-0 animate-gradient">
//           مرحبا بك في ادارة اورا
//         </h1>
//         <p className="text-muted-foreground mt-2">
//           نوفر لك جميع التقارير اليومية للموقع
//         </p>
//       </div>
//           <div className="flex items-end justify-end gap-2" >
//             <Button
//               variant={timeRange === 'week' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setTimeRange('week')}
//             >
//               اسبوعي
//             </Button>
//             <Button
//               variant={timeRange === 'month' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setTimeRange('month')}
//             >
//               شهري
//             </Button>
//             <Button
//               variant={timeRange === 'year' ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setTimeRange('year')}
//             >
//               سنوي
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleRefresh}
//               disabled={refreshing}
//             >
//               <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//               تحديث
//             </Button>
//           </div>
//         </div>

//         {/* Main Stats Grid */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           {mainStats.map((stat) => {
//             const Icon = stat.icon
//             return (
//               <Card
//                 key={stat.title}
//                 className={`border-2 ${stat.borderColor} transition-all hover:shadow-lg hover:shadow-primary/5`}
//               >
//                 <CardHeader className="flex flex-row items-center justify-between pb-2">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
//                   <div className={`rounded-xl p-2.5 ${stat.bgColor}`}>
//                     <Icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-foreground">{stat.value}</div>
//                   <div className="mt-2 flex items-center gap-2 text-xs">
//                     {typeof stat.change === 'number' ? (
//                       <span className={`flex items-center gap-1 ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
//                         {stat.isPositive ? (
//                           <ArrowUpRight className="h-3 w-3" />
//                         ) : (
//                           <ArrowDownRight className="h-3 w-3" />
//                         )}
//                         {Math.abs(stat.change)}%
//                       </span>
//                     ) : (
//                       <span className="text-muted-foreground">{stat.change}</span>
//                     )}
//                     <span className="text-muted-foreground">{stat.description}</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             )
//           })}
//         </div>

//         {/* Status and Engagement Stats */}
//         <div className="grid gap-4 md:grid-cols-4">
//           {statusStats.map((stat) => {
//             const Icon = stat.icon
//             return (
//               <Card key={stat.title} className="border-border/50">
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">{stat.title}</p>
//                     <p className="text-2xl font-bold text-foreground">{stat.value}</p>
//                   </div>
//                   <div className={`rounded-lg p-3 ${stat.bgColor}`}>
//                     <Icon className={`h-6 w-6 ${stat.color}`} />
//                   </div>
//                 </CardContent>
//               </Card>
//             )
//           })}
//         </div>

//         <div className="grid gap-4 md:grid-cols-2">
//           {engagementStats.map((stat) => {
//             const Icon = stat.icon
//             return (
//               <Card key={stat.title} className="border-border/50">
//                 <CardContent className="flex items-center justify-between p-6">
//                   <div>
//                     <p className="text-sm text-muted-foreground">{stat.title}</p>
//                     <p className="text-3xl font-bold text-foreground">{stat.value}</p>
//                     <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
//                   </div>
//                   <Icon className={`h-8 w-8 ${stat.color}`} />
//                 </CardContent>
//               </Card>
//             )
//           })}
//         </div>

//         {/* Charts Section */}
//         <Tabs defaultValue="revenue" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="revenue">Revenue & Orders</TabsTrigger>
//             <TabsTrigger value="orders">Order Status</TabsTrigger>
//             <TabsTrigger value="sales">Sales by Category</TabsTrigger>
//           </TabsList>

//           <TabsContent value="revenue" className="space-y-6">
//             <div className="grid gap-6 lg:grid-cols-2">
//               <Card className="border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <TrendingUp className="h-5 w-5 text-primary" />
//                     Revenue Trend
//                   </CardTitle>
//                   <CardDescription>
//                     {timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Yearly'} revenue performance
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <AreaChart data={revenueData}>
//                       <defs>
//                         <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
//                           <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
//                       <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                       <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                       <Tooltip
//                         formatter={(value) => [`${value} IQD`, 'Revenue']}
//                         contentStyle={{
//                           backgroundColor: "hsl(var(--card))",
//                           border: "1px solid hsl(var(--border))",
//                           borderRadius: "8px",
//                         }}
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="revenue"
//                         stroke="hsl(var(--chart-1))"
//                         fillOpacity={1}
//                         fill="url(#colorRevenue)"
//                         strokeWidth={2}
//                         name="Revenue"
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>

//               <Card className="border-border/50">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Activity className="h-5 w-5 text-primary" />
//                     Orders Trend
//                   </CardTitle>
//                   <CardDescription>
//                     {timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Yearly'} order volume
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={revenueData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
//                       <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                       <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: "hsl(var(--card))",
//                           border: "1px solid hsl(var(--border))",
//                           borderRadius: "8px",
//                         }}
//                       />
//                       <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Orders" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="orders">
//             <Card className="border-border/50">
//               <CardHeader>
//                 <CardTitle>Order Status Distribution</CardTitle>
//                 <CardDescription>Current breakdown of order statuses</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-6 lg:grid-cols-2">
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={ordersData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                       >
//                         {ordersData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip formatter={(value) => [value, 'Orders']} />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="space-y-4">
//                     {ordersData.map((status, index) => (
//                       <div key={status.name} className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div
//                             className="h-3 w-3 rounded-full"
//                             style={{ backgroundColor: status.color }}
//                           />
//                           <span className="text-sm font-medium">{status.name}</span>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold">{status.value}</p>
//                           <p className="text-xs text-muted-foreground">
//                             {((status.value / stats.totalOrders) * 100).toFixed(1)}%
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="sales">
//             <Card className="border-border/50">
//               <CardHeader>
//                 <CardTitle>Sales by Category</CardTitle>
//                 <CardDescription>Revenue distribution across product categories</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={salesData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
//                     <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                     <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                     <Tooltip
//                       formatter={(value) => [`${value} IQD`, 'Revenue']}
//                       contentStyle={{
//                         backgroundColor: "hsl(var(--card))",
//                         border: "1px solid hsl(var(--border))",
//                         borderRadius: "8px",
//                       }}
//                     />
//                     <Bar dataKey="sales" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Sales" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {/* Recent Activity */}
//         <div className="grid gap-6 lg:grid-cols-2">
//           <Card className="border-border/50">
//             <CardHeader>
//               <CardTitle>Recent Orders</CardTitle>
//               <CardDescription>Latest customer orders and their status</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {recentOrders.length > 0 ? (
//                   recentOrders.map((order) => (
//                     <div
//                       key={order.id}
//                       className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
//                     >
//                       <div className="flex-1 space-y-1">
//                         <p className="font-semibold text-foreground">#{order.order_number}</p>
//                         <p className="text-sm text-muted-foreground">{order.delivery_name}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {new Date(order.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-end gap-2">
//                         <span className="font-bold text-foreground">
//                           {formatCurrency(Number.parseFloat(order.total_amount))}
//                         </span>
//                         <Badge className={`${getStatusColor(order.status)} border`}>
//                           {order.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="py-8 text-center">
//                     <Package className="mx-auto h-12 w-12 text-muted-foreground" />
//                     <p className="mt-2 text-sm text-muted-foreground">No recent orders</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-border/50">
//             <CardHeader>
//               <CardTitle>Top Rated Products</CardTitle>
//               <CardDescription>Best performing products by customer ratings</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {topProducts.length > 0 ? (
//                   topProducts.map((product, index) => (
//                     <div
//                       key={product.id}
//                       className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
//                     >
//                       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
//                         #{index + 1}
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-semibold text-foreground line-clamp-1">{product.name}</p>
//                         <p className="text-sm text-muted-foreground">{product.brand}</p>
//                         <div className="mt-1 flex items-center gap-2">
//                           <span className="text-yellow-500">★</span>
//                           <span className="text-xs text-muted-foreground">
//                             {Number.parseFloat(product.rating) || 0} • {product.reviews_count || 0} reviews
//                           </span>
//                         </div>
//                       </div>
//                       <span className="font-bold text-foreground">
//                         {formatCurrency(Number.parseFloat(product.price))}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="py-8 text-center">
//                     <Package className="mx-auto h-12 w-12 text-muted-foreground" />
//                     <p className="mt-2 text-sm text-muted-foreground">No products available</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }




"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { orderService } from "@/services/orderService"
import { productService } from "@/services/productService"
import { userService } from "@/services/userService"
import cartService from "../services/cartService"
import favoritesService from "../services/favoritesService"
import {
  ShoppingCart,
  Package,
  TrendingUp,
  DollarSign,
  Users,
  Heart,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  RefreshCw,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "@/styles/dashboard-styles.css"
interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  totalCartItems: number
  totalFavorites: number
  pendingOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  revenueGrowth: number
  ordersGrowth: number
  usersGrowth: number
  averageOrderValue: number
  conversionRate: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalCartItems: 0,
    totalFavorites: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    usersGrowth: 0,
    averageOrderValue: 0,
    conversionRate: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  useEffect(() => {
    fetchDashboardData()
  }, [timeRange])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      console.log("[Dashboard] Fetching dashboard data...")

      const token = localStorage.getItem("token")
      if (!token) {
        console.log("[Dashboard] No token found, skipping data fetch")
        setLoading(false)
        return
      }

      // Fetch all data in parallel with proper error handling
      const [ordersResponse, productsResponse, usersResponse, cartsResponse, favoritesResponse] = await Promise.all([
        orderService.getAllOrders().catch((err) => {
          console.error("[Dashboard] Failed to fetch orders:", err)
          return []
        }),
        productService.getProducts(1).catch((err) => {
          console.error("[Dashboard] Failed to fetch products:", err)
          return { products: [], pagination: { total: 0 } }
        }),
        userService.getUsers().catch((err) => {
          console.error("[Dashboard] Failed to fetch users:", err)
          return { users: [], pagination: { totalUsers: 0 } }
        }),
        cartService.getAllCarts().catch((err) => {
          console.error("[Dashboard] Failed to fetch carts:", err)
          return { success: false, carts: [], total_items: 0 }
        }),
        favoritesService.getAllFavorites().catch((err) => {
          console.error("[Dashboard] Failed to fetch favorites:", err)
          return { success: false, favorites: [], total_items: 0 }
        }),
      ])

      console.log("[Dashboard] Data fetched:", {
        orders: ordersResponse.length,
        products: productsResponse.products?.length,
        users: usersResponse.users?.length,
        cartItems: cartsResponse.total_items,
        favorites: favoritesResponse.total_items,
      })

      // Process orders data
      const orders = Array.isArray(ordersResponse) ? ordersResponse : []
      const totalOrders = orders.length
      
      // Calculate revenue from completed orders only
      const completedOrders = orders.filter(order => 
        order.status === 'delivered' || order.status === 'shipped'
      )
      const totalRevenue = completedOrders.reduce(
        (sum, order) => sum + (Number.parseFloat(order.total_amount) || 0), 0
      )

      // Calculate order status counts
      const pendingOrders = orders.filter((order) => order.status === "pending").length
      const shippedOrders = orders.filter((order) => order.status === "shipped").length
      const deliveredOrders = orders.filter((order) => order.status === "delivered").length
      const cancelledOrders = orders.filter((order) => order.status === "cancelled").length

      // Process products data
      const products = productsResponse.products || []
      const totalProducts = productsResponse.pagination?.total || products.length

      // Process users data
      const users = usersResponse.users || []
      const totalUsers = usersResponse.pagination?.totalUsers || users.length

      // Process carts data
      const totalCartItems = cartsResponse.success ? cartsResponse.total_items : 0

      // Process favorites data
      const totalFavorites = favoritesResponse.success ? favoritesResponse.total_items : 0

      // Calculate advanced metrics
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
      const conversionRate = totalUsers > 0 ? (totalOrders / totalUsers) * 100 : 0

      // Calculate growth percentages (you can replace with actual comparison logic)
      const revenueGrowth = 12.5
      const ordersGrowth = 8.3
      const usersGrowth = 5.7

      setStats({
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        totalCartItems,
        totalFavorites,
        pendingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        revenueGrowth,
        ordersGrowth,
        usersGrowth,
        averageOrderValue,
        conversionRate,
      })

      // Show recent orders (most recent first)
      const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      setRecentOrders(sortedOrders.slice(0, 6))

      // Sort products by rating and get top 5
      const sortedProducts = [...products]
        .sort((a, b) => (Number.parseFloat(b.rating) || 0) - (Number.parseFloat(a.rating) || 0))
        .slice(0, 5)
      setTopProducts(sortedProducts)

    } catch (error) {
      console.error("[Dashboard] Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
  }

  // Generate realistic chart data based on actual stats
  const generateRevenueData = () => {
    const periods = timeRange === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeRange === 'month'
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    const baseRevenue = stats.totalRevenue / periods.length
    return periods.map((period, index) => ({
      period,
      revenue: Math.round(baseRevenue * (0.8 + Math.random() * 0.4)),
      orders: Math.round((stats.totalOrders / periods.length) * (0.8 + Math.random() * 0.4)),
    }))
  }

  const generateOrdersData = () => {
    const statusData = [
      { name: 'Pending', value: stats.pendingOrders, color: '#f59e0b' },
      { name: 'Shipped', value: stats.shippedOrders, color: '#3b82f6' },
      { name: 'Delivered', value: stats.deliveredOrders, color: '#10b981' },
      { name: 'Cancelled', value: stats.cancelledOrders, color: '#ef4444' },
    ].filter(item => item.value > 0)

    return statusData
  }

  const generateSalesData = () => {
    const categories = ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Body Care']
    return categories.map(category => ({
      category,
      sales: Math.round(stats.totalRevenue * (0.1 + Math.random() * 0.3)),
    }))
  }

  const revenueData = generateRevenueData()
  const ordersData = generateOrdersData()
  const salesData = generateSalesData()

  const mainStats = [
    {
      title: "Total Revenue",
      value: `${stats.totalRevenue.toLocaleString()} IQD`,
      change: stats.revenueGrowth,
      isPositive: stats.revenueGrowth >= 0,
      icon: DollarSign,
      description: `AOV: ${stats.averageOrderValue.toLocaleString()} IQD`,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: stats.ordersGrowth,
      isPositive: stats.ordersGrowth >= 0,
      icon: ShoppingCart,
      description: `${stats.pendingOrders} pending`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Products",
      value: stats.totalProducts.toLocaleString(),
      change: "Active",
      isPositive: true,
      icon: Package,
      description: `${stats.totalFavorites} favorites`,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: stats.usersGrowth,
      isPositive: stats.usersGrowth >= 0,
      icon: Users,
      description: `${stats.conversionRate.toFixed(1)}% conversion`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ]

  const statusStats = [
    {
      title: "Pending",
      value: stats.pendingOrders,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Shipped",
      value: stats.shippedOrders,
      icon: Truck,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Delivered",
      value: stats.deliveredOrders,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Cancelled",
      value: stats.cancelledOrders,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ]

  const engagementStats = [
    {
      title: "Cart Items",
      value: stats.totalCartItems,
      icon: ShoppingBag,
      color: "text-cyan-500",
      description: "Active carts",
    },
    {
      title: "Favorites",
      value: stats.totalFavorites,
      icon: Heart,
      color: "text-pink-500",
      description: "Saved items",
    },
  ]

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      delivered: "bg-green-500/10 text-green-500 border-green-500/20",
      cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return colors[status] || colors.pending
  }

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} IQD`
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-10 w-64" />
              <Skeleton className="mt-2 h-5 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-center sm:text-right">
            {/* Animated Gradient Heading */}
            <h1 className="ubuntu-gradient-text text-xl md:text-4xl font-bold">
          Aura Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 ubuntu-font text-base md:text-lg">
              نوفر لك جميع التقارير اليومية للموقع
            </p>
          </div>
          <div className="flex items-end justify-end gap-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              اسبوعي
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              شهري
            </Button>
            <Button
              variant={timeRange === 'year' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('year')}
            >
              سنوي
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mainStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className={`border-2 ${stat.borderColor} transition-all hover:shadow-lg hover:shadow-primary/5`}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`rounded-xl p-2.5 ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {typeof stat.change === 'number' ? (
                      <span className={`flex items-center gap-1 ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stat.isPositive ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(stat.change)}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{stat.change}</span>
                    )}
                    <span className="text-muted-foreground">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Status and Engagement Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {statusStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="border-border/50">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {engagementStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="border-border/50">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Revenue & Orders</TabsTrigger>
            <TabsTrigger value="orders">Order Status</TabsTrigger>
            <TabsTrigger value="sales">Sales by Category</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>
                    {timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Yearly'} revenue performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        formatter={(value) => [`${value} IQD`, 'Revenue']}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--chart-1))"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                        name="Revenue"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Orders Trend
                  </CardTitle>
                  <CardDescription>
                    {timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Yearly'} order volume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>Current breakdown of order statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ordersData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ordersData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Orders']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-4">
                    {ordersData.map((status, index) => (
                      <div key={status.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: status.color }}
                          />
                          <span className="text-sm font-medium">{status.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{status.value}</p>
                          <p className="text-xs text-muted-foreground">
                            {((status.value / stats.totalOrders) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Revenue distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      formatter={(value) => [`${value} IQD`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="sales" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Sales" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold text-foreground">#{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">{order.delivery_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-bold text-foreground">
                          {formatCurrency(Number.parseFloat(order.total_amount))}
                        </span>
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No recent orders</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Top Rated Products</CardTitle>
              <CardDescription>Best performing products by customer ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topProducts.length > 0 ? (
                  topProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/20 hover:bg-accent/50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground line-clamp-1">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span className="text-xs text-muted-foreground">
                            {Number.parseFloat(product.rating) || 0} • {product.reviews_count || 0} reviews
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-foreground">
                        {formatCurrency(Number.parseFloat(product.price))}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No products available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add the CSS styles */}
   
    </DashboardLayout>
  )
}