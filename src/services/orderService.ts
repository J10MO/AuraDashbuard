import { api } from "@/lib/api"
import type { Order } from "@/types"

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get("/orders")
    return response.data.orders || []
  },

  getOrderById: async (orderId: number): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  },

  createOrder: async (orderData: any) => {
    const response = await api.post("/orders", orderData)
    return response.data
  },

  updateOrderStatus: async (orderId: number, status: string) => {
    const response = await api.put(`/orders/${orderId}/status`, { status })
    return response.data
  },

  updateOrder: async (orderId: number, orderData: any) => {
    const response = await api.put(`/orders/${orderId}`, orderData)
    return response.data
  },

  deleteOrder: async (orderId: number) => {
    const response = await api.delete(`/orders/${orderId}`)
    return response.data
  },

  cancelOrder: async (orderId: number) => {
    const response = await api.put(`/orders/${orderId}/cancel`)
    return response.data
  },
}
