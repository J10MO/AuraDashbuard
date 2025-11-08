import { api } from "@/lib/api"
import type { Setting } from "@/types"

export const settingsService = {
  getAllSettings: async (): Promise<Setting[]> => {
    const response = await api.get("/settings")
    return response.data.settings || []
  },

  getDeliveryPrice: async (): Promise<number> => {
    const response = await api.get("/settings/delivery-price")
    return response.data.delivery_price || 0
  },

  updateDeliveryPrice: async (deliveryPrice: number) => {
    const response = await api.put("/settings/delivery-price", {
      delivery_price: deliveryPrice,
    })
    return response.data
  },

  updateSetting: async (key: string, value: string, description?: string) => {
    const response = await api.put("/settings", {
      key,
      value,
      description,
    })
    return response.data
  },
}
