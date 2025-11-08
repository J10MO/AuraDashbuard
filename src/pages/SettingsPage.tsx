"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { settingsService } from "@/services/settingsService"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Settings, DollarSign, Save, Package } from "lucide-react"

export default function SettingsPage() {
  const [deliveryPrice, setDeliveryPrice] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setIsLoading(true)
      const price = await settingsService.getDeliveryPrice()
      setDeliveryPrice(price.toString())
    } catch (error) {
      console.error("Failed to fetch settings:", error)
      toast.error("Failed to load settings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDeliveryPrice = async () => {
    const price = Number.parseFloat(deliveryPrice)

    if (isNaN(price) || price < 0) {
      toast.error("Please enter a valid price")
      return
    }

    setIsSaving(true)
    try {
      await settingsService.updateDeliveryPrice(price)
      toast.success("Delivery price updated successfully")
    } catch (error) {
      console.error("Failed to update delivery price:", error)
      toast.error("Failed to update delivery price")
    } finally {
      setIsSaving(false)
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
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and configuration</p>
        </div>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Delivery Settings</CardTitle>
                <CardDescription>Configure delivery and shipping options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-price" className="text-base font-semibold">
                  Default Delivery Price
                </Label>
                <p className="text-sm text-muted-foreground">
                  Set the standard delivery fee that will be applied to all orders
                </p>
                <div className="flex items-center gap-3 max-w-md">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="delivery-price"
                      type="number"
                      value={deliveryPrice}
                      onChange={(e) => setDeliveryPrice(e.target.value)}
                      placeholder="0.00"
                      className="pl-9"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">IQD</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Current Delivery Price</p>
                  <p className="text-2xl font-bold text-primary">{Number(deliveryPrice).toLocaleString()} IQD</p>
                </div>
                <Button onClick={handleSaveDeliveryPrice} disabled={isSaving} size="lg">
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Settings Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Application settings overview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Application Name</p>
                <p className="text-base font-medium">E-Commerce Dashboard</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="text-base font-medium">1.0.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="text-base font-medium">Iraqi Dinar (IQD)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Language</p>
                <p className="text-base font-medium">English / العربية</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Configuration Tips</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  The delivery price will be automatically applied to all new orders. You can adjust this value at any
                  time based on your business needs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
