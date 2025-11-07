// // "use client"

// // import type { ReactNode } from "react"
// // import { Link, useLocation, useNavigate } from "react-router-dom"
// // import { useAuth } from "@/contexts/AuthContext"
// // import { useTheme } from "@/contexts/ThemeContext"
// // import { Button } from "@/components/ui/button"
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// // import {
// //   LayoutDashboard,
// //   ShoppingCart,
// //   Package,
// //   FolderTree,
// //   Users,
// //   Megaphone,
// //   LogOut,
// //   Menu,
// //   Sun,
// //   Moon,
// //   Heart,
// //   ShoppingBag,
// // } from "lucide-react"
// // import { useState } from "react"

// // interface DashboardLayoutProps {
// //   children: ReactNode
// // }

// // export function DashboardLayout({ children }: DashboardLayoutProps) {
// //   const { user, logout } = useAuth()
// //   const { theme, toggleTheme } = useTheme()
// //   const location = useLocation()
// //   const navigate = useNavigate()
// //   const [sidebarOpen, setSidebarOpen] = useState(true)

// //   const handleLogout = () => {
// //     logout()
// //     navigate("/login")
// //   }

// //   const navItems = [
// //     { path: "/", label: "Dashboard", icon: LayoutDashboard },
// //     { path: "/orders", label: "Orders", icon: ShoppingCart },
// //     { path: "/products", label: "Products", icon: Package },
// //     { path: "/categories", label: "Categories", icon: FolderTree },
// //     { path: "/users", label: "Users", icon: Users },
// //     { path: "/cart", label: "Carts", icon: ShoppingBag }, // Added Cart navigation
// //     { path: "/favorites", label: "Favorites", icon: Heart }, // Added Favorites navigation
// //     { path: "/ads", label: "Ads", icon: Megaphone },
// //   ]

// //   return (
// //     <div className="flex h-screen bg-background">
// //       {/* Sidebar */}
// //       <aside className={`${sidebarOpen ? "w-64" : "w-20"} border-r border-border bg-card transition-all duration-300`}>
// //         <div className="flex h-16 items-center justify-between border-b border-border px-6">
// //           {sidebarOpen && <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>}
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             onClick={() => setSidebarOpen(!sidebarOpen)}
// //             className="text-muted-foreground hover:text-foreground"
// //           >
// //             <Menu className="h-5 w-5" />
// //           </Button>
// //         </div>
// //         <nav className="space-y-1 p-4">
// //           {navItems.map((item) => {
// //             const Icon = item.icon
// //             const isActive = location.pathname === item.path
// //             return (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
// //                   isActive
// //                     ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
// //                     : "text-muted-foreground hover:bg-accent hover:text-foreground"
// //                 }`}
// //                 title={!sidebarOpen ? item.label : undefined}
// //               >
// //                 <Icon className="h-5 w-5 flex-shrink-0" />
// //                 {sidebarOpen && <span>{item.label}</span>}
// //               </Link>
// //             )
// //           })}
// //         </nav>
// //       </aside>

// //       {/* Main Content */}
// //       <div className="flex flex-1 flex-col overflow-hidden">
// //         {/* Header */}
// //         <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
// //           <div className="flex items-center gap-4">
// //             <div>
// //               <h2 className="text-lg font-semibold text-foreground">{user?.name || user?.phone}</h2>
// //               <p className="text-xs text-muted-foreground">{user?.email || "Administrator"}</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={toggleTheme}
// //               className="text-muted-foreground hover:text-foreground"
// //               title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
// //             >
// //               {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
// //             </Button>
// //             <div className="flex items-center gap-3 rounded-lg bg-accent px-4 py-2">
// //               <Avatar className="h-8 w-8">
// //                 <AvatarFallback className="bg-primary text-xs text-primary-foreground">
// //                   {user?.name?.charAt(0) || user?.phone?.charAt(0) || "A"}
// //                 </AvatarFallback>
// //               </Avatar>
// //               <div className="text-right">
// //                 <p className="text-sm font-medium text-foreground">{user?.name || "Admin"}</p>
// //                 <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
// //               </div>
// //             </div>
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               onClick={handleLogout}
// //               className="text-muted-foreground hover:text-foreground"
// //             >
// //               <LogOut className="mr-2 h-4 w-4" />
// //               Logout
// //             </Button>
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="flex-1 overflow-y-auto bg-background p-6">{children}</main>
// //       </div>
// //     </div>
// //   )
// // }





// // "use client"

// // import type { ReactNode } from "react"
// // import { Link, useLocation, useNavigate } from "react-router-dom"
// // import { useAuth } from "@/contexts/AuthContext"
// // import { useTheme } from "@/contexts/ThemeContext"
// // import { Button } from "@/components/ui/button"
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// // import {
// //   LayoutDashboard,
// //   ShoppingCart,
// //   Package,
// //   FolderTree,
// //   Users,
// //   Megaphone,
// //   LogOut,
// //   Menu,
// //   Sun,
// //   Moon,
// //   Heart,
// //   ShoppingBag,
// // } from "lucide-react"
// // import { useState } from "react"

// // interface DashboardLayoutProps {
// //   children: ReactNode
// // }

// // export function DashboardLayout({ children }: DashboardLayoutProps) {
// //   const { user, logout, isLoading } = useAuth()
// //   const { theme, toggleTheme } = useTheme()
// //   const location = useLocation()
// //   const navigate = useNavigate()
// //   const [sidebarOpen, setSidebarOpen] = useState(true)

// //   const handleLogout = () => {
// //     logout()
// //     navigate("/login")
// //   }

// //   const navItems = [
// //     { path: "/", label: "Dashboard", icon: LayoutDashboard },
// //     { path: "/orders", label: "Orders", icon: ShoppingCart },
// //     { path: "/products", label: "Products", icon: Package },
// //     { path: "/categories", label: "Categories", icon: FolderTree },
// //     { path: "/users", label: "Users", icon: Users },
// //     { path: "/cart", label: "Carts", icon: ShoppingBag },
// //     { path: "/favorites", label: "Favorites", icon: Heart },
// //     { path: "/ads", label: "Ads", icon: Megaphone },
// //   ]

// //   if (isLoading) {
// //     return (
// //       <div className="flex h-screen items-center justify-center bg-background">
// //         <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="flex h-screen bg-background">
// //       {/* Sidebar */}
// //       <aside className={`${sidebarOpen ? "w-64" : "w-20"} border-r border-border bg-card transition-all duration-300`}>
// //         <div className="flex h-16 items-center justify-between border-b border-border px-6">
// //           {sidebarOpen && <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>}
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             onClick={() => setSidebarOpen(!sidebarOpen)}
// //             className="text-muted-foreground hover:text-foreground"
// //           >
// //             <Menu className="h-5 w-5" />
// //           </Button>
// //         </div>
// //         <nav className="space-y-1 p-4">
// //           {navItems.map((item) => {
// //             const Icon = item.icon
// //             const isActive = location.pathname === item.path
// //             return (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
// //                   isActive
// //                     ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
// //                     : "text-muted-foreground hover:bg-accent hover:text-foreground"
// //                 }`}
// //                 title={!sidebarOpen ? item.label : undefined}
// //               >
// //                 <Icon className="h-5 w-5 flex-shrink-0" />
// //                 {sidebarOpen && <span>{item.label}</span>}
// //               </Link>
// //             )
// //           })}
// //         </nav>
// //       </aside>

// //       {/* Main Content */}
// //       <div className="flex flex-1 flex-col overflow-hidden">
// //         {/* Header */}
// //         <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
// //           <div className="flex items-center gap-4">
// //             <div>
// //               <h2 className="text-lg font-semibold text-foreground">{user?.name || user?.phone || "Loading..."}</h2>
// //               <p className="text-xs text-muted-foreground">{user?.email || "Administrator"}</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={toggleTheme}
// //               className="text-muted-foreground hover:text-foreground"
// //               title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
// //             >
// //               {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
// //             </Button>
// //             <div className="flex items-center gap-3 rounded-lg bg-accent px-4 py-2">
// //               <Avatar className="h-8 w-8">
// //                 <AvatarFallback className="bg-primary text-xs text-primary-foreground">
// //                   {user?.name?.charAt(0) || user?.phone?.charAt(0) || "A"}
// //                 </AvatarFallback>
// //               </Avatar>
// //               <div className="text-right">
// //                 <p className="text-sm font-medium text-foreground">{user?.name || "Admin"}</p>
// //                 <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
// //               </div>
// //             </div>
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               onClick={handleLogout}
// //               className="text-muted-foreground hover:text-foreground"
// //             >
// //               <LogOut className="mr-2 h-4 w-4" />
// //               Logout
// //             </Button>
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="flex-1 overflow-y-auto bg-background p-6">{children}</main>
// //       </div>
// //     </div>
// //   )
// // }






// "use client"

// import type { ReactNode } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { useAuth } from "@/contexts/AuthContext"
// import { useTheme } from "@/contexts/ThemeContext"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import {
//   LayoutDashboard,
//   ShoppingCart,
//   Package,
//   FolderTree,
//   Users,
//   Megaphone,
//   LogOut,
//   Menu,
//   Sun,
//   Moon,
//   Heart,
//   ShoppingBag,
// } from "lucide-react"
// import { useState } from "react"

// interface DashboardLayoutProps {
//   children: ReactNode
// }

// export function DashboardLayout({ children }: DashboardLayoutProps) {
//   const { user, logout, isLoading } = useAuth()
//   const { theme, toggleTheme } = useTheme()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [sidebarOpen, setSidebarOpen] = useState(true)

//   const handleLogout = () => {
//     logout()
//     navigate("/login")
//   }

//   const navItems = [
//     { path: "/", label: "Dashboard", icon: LayoutDashboard },
//     { path: "/orders", label: "Orders", icon: ShoppingCart },
//     { path: "/products", label: "Products", icon: Package },
//     { path: "/categories", label: "Categories", icon: FolderTree },
//     { path: "/users", label: "Users", icon: Users },
//     { path: "/cart", label: "Carts", icon: ShoppingBag },
//     { path: "/favorites", label: "Favorites", icon: Heart },
//     { path: "/ads", label: "Ads", icon: Megaphone },
//   ]

//   // Show loading state only during initial auth check
//   if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-background">
//         <div className="text-center">
//           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
//           <p className="text-sm text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   // If not loading but no user, redirect to login
//   if (!isLoading && !user) {
//     navigate("/login")
//     return null
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar */}
//       <aside className={`${sidebarOpen ? "w-64" : "w-20"} border-r border-border bg-card transition-all duration-300`}>
//         <div className="flex h-16 items-center justify-between border-b border-border px-6">
//           {sidebarOpen && <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>}
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-muted-foreground hover:text-foreground"
//           >
//             <Menu className="h-5 w-5" />
//           </Button>
//         </div>
//         <nav className="space-y-1 p-4">
//           {navItems.map((item) => {
//             const Icon = item.icon
//             const isActive = location.pathname === item.path
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
//                     : "text-muted-foreground hover:bg-accent hover:text-foreground"
//                 }`}
//                 title={!sidebarOpen ? item.label : undefined}
//               >
//                 <Icon className="h-5 w-5 flex-shrink-0" />
//                 {sidebarOpen && <span>{item.label}</span>}
//               </Link>
//             )
//           })}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         {/* Header */}
//         <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
//           <div className="flex items-center gap-4">
//             <div>
//               <h2 className="text-lg font-semibold text-foreground">
//                 {user?.name || user?.phone || "User"}
//               </h2>
//               <p className="text-xs text-muted-foreground">
//                 {user?.email || user?.role || "Administrator"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleTheme}
//               className="text-muted-foreground hover:text-foreground"
//               title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
//             >
//               {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//             </Button>
            
//             {user && (
//               <div className="flex items-center gap-3 rounded-lg bg-accent px-4 py-2">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback className="bg-primary text-xs text-primary-foreground">
//                     {user?.name?.charAt(0)?.toUpperCase() || user?.phone?.charAt(0) || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-foreground">
//                     {user?.name || user?.phone || "User"}
//                   </p>
//                   <p className="text-xs text-muted-foreground capitalize">
//                     {user?.role || "user"}
//                   </p>
//                 </div>
//               </div>
//             )}
            
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleLogout}
//               className="text-muted-foreground hover:text-foreground"
//             >
//               <LogOut className="mr-2 h-4 w-4" />
//               Logout
//             </Button>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto bg-background p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }



"use client"

import type { ReactNode } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Users,
  Megaphone,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Heart,
  ShoppingBag,
  ChevronLeft,
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/orders", label: "Orders", icon: ShoppingCart },
  { path: "/products", label: "Products", icon: Package },
  { path: "/categories", label: "Categories", icon: FolderTree },
  { path: "/users", label: "Users", icon: Users },
  { path: "/cart", label: "Carts", icon: ShoppingBag },
  { path: "/favorites", label: "Favorites", icon: Heart },
  { path: "/ads", label: "Ads", icon: Megaphone },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isLoading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Initialize screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    navigate("/login")
  }, [logout, navigate])

  const closeSidebar = useCallback(() => {
    if (isMobile) setSidebarOpen(false)
  }, [isMobile])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 md:relative md:z-auto md:inset-auto",
          sidebarOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-border px-4 md:px-6">
          {sidebarOpen && (
            <h1 className="truncate text-xl font-bold text-foreground">Admin</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-9 w-9 text-muted-foreground hover:text-foreground md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden h-9 w-9 text-muted-foreground hover:text-foreground md:flex"
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  !sidebarOpen && "justify-center px-0"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
                
                {/* Tooltip for collapsed sidebar on desktop */}
                {!sidebarOpen && !isMobile && (
                  <div className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 hidden whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow-lg group-hover:block">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar User Card - Desktop Only */}
        {sidebarOpen && user && !isMobile && (
          <div className="flex-shrink-0 border-t border-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
                  {user.name?.charAt(0)?.toUpperCase() || user.phone?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.name || user.phone || "User"}
                </p>
                <p className="truncate text-xs capitalize text-muted-foreground">
                  {user.role || "user"}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-border bg-card px-4 md:px-6">
          {/* Left Section */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Menu Button - Always visible on mobile */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            {/* Desktop Toggle Button - Only when sidebar is closed */}
            {!isMobile && !sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground">
                {user.name || user.phone || "User"}
              </h2>
              <p className="truncate text-xs text-muted-foreground">
                {user.role || "Administrator"}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Desktop User Avatar */}
            <div className="hidden items-center gap-2 rounded-lg bg-accent px-2 py-1.5 lg:flex">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-xs font-medium text-primary-foreground">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-right">
                <p className="truncate text-xs font-medium text-foreground">
                  {user.name || "User"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.role || "user"}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-9 gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background p-3 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}