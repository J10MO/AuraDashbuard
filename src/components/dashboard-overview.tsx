"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCards } from "@/components/stats-cards"
import { RecentOrders } from "@/components/recent-orders"
import { SalesChart } from "@/components/sales-chart"
import { TopProducts } from "@/components/top-products"
import { CategoryManagement } from "@/components/category-management"
import { AdsManagement } from "@/components/ads-management"
import { UserManagement } from "@/components/user-management"
import { LayoutDashboard, ShoppingCart, Users, Package, Megaphone } from "lucide-react"

export function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">E-Commerce Dashboard</h1>
                <p className="text-sm text-muted-foreground">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto w-full justify-start gap-1 rounded-none border-0 bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Package className="h-4 w-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="ads"
                className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Megaphone className="h-4 w-4" />
                Ads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="py-6">
                <StatsCards />
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <SalesChart />
                  <TopProducts />
                </div>
                <div className="mt-6">
                  <RecentOrders />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <div className="py-6">
                <RecentOrders showAll />
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <div className="py-6">
                <UserManagement />
              </div>
            </TabsContent>

            <TabsContent value="categories" className="mt-0">
              <div className="py-6">
                <CategoryManagement />
              </div>
            </TabsContent>

            <TabsContent value="ads" className="mt-0">
              <div className="py-6">
                <AdsManagement />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
