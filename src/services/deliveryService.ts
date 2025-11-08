import { api } from "@/lib/api"
import type { Delivery } from "@/types"

export const deliveryService = {
  getDeliveries: async (
    page = 1,
    limit = 10,
    status = "",
  ): Promise<{ deliveries: Delivery[]; total: number; page: number; totalPages: number }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (status) params.append("status", status)

    const response = await api.get(`/deliveries?${params}`)
    const pagination = response.data.pagination || {}

    return {
      deliveries: response.data.deliveries || [],
      total: pagination.totalDeliveries || 0,
      page: pagination.currentPage || page,
      totalPages: pagination.totalPages || 1,
    }
  },

  getDeliveryByOrderId: async (orderId: number): Promise<Delivery> => {
    const response = await api.get(`/deliveries/order/${orderId}`)
    return response.data.delivery
  },

  getDeliveryByTracking: async (trackingNumber: string): Promise<Delivery> => {
    const response = await api.get(`/deliveries/track/${trackingNumber}`)
    return response.data.delivery
  },

  createDelivery: async (deliveryData: any) => {
    const response = await api.post("/deliveries", deliveryData)
    return response.data
  },

  updateDelivery: async (deliveryId: number, deliveryData: any) => {
    const response = await api.put(`/deliveries/${deliveryId}`, deliveryData)
    return response.data
  },

  deleteDelivery: async (deliveryId: number) => {
    const response = await api.delete(`/deliveries/${deliveryId}`)
    return response.data
  },
}
