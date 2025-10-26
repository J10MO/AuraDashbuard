// import { api } from "@/lib/api"
// import type { Order } from "@/types"

// export const orderService = {
//   getOrders: async (): Promise<Order[]> => {
//     const response = await api.get("/orders")
//     return response.data.orders || []
//   },

//   getOrderById: async (orderId: number): Promise<Order> => {
//     const response = await api.get(`/orders/${orderId}`)
//     return response.data
//   },

//   createOrder: async (orderData: any) => {
//     const response = await api.post("/orders", orderData)
//     return response.data
//   },

//   updateOrderStatus: async (orderId: number, status: string) => {
//     const response = await api.put(`/orders/${orderId}/status`, { status })
//     return response.data
//   },

//   updateOrder: async (orderId: number, orderData: any) => {
//     const response = await api.put(`/orders/${orderId}`, orderData)
//     return response.data
//   },

//   deleteOrder: async (orderId: number) => {
//     const response = await api.delete(`/orders/${orderId}`)
//     return response.data
//   },

//   cancelOrder: async (orderId: number) => {
//     const response = await api.put(`/orders/${orderId}/cancel`)
//     return response.data
//   },
// }




// import { api } from "@/lib/api"
// import type { Order } from "@/types"

// export const orderService = {
//   getOrders: async (
//     page = 1,
//     limit = 10,
//   ): Promise<{ orders: Order[]; total: number; page: number; totalPages: number }> => {
//     const response = await api.get(`/orders?page=${page}&limit=${limit}`)

//     // API returns { orders: [...], pagination: { currentPage, totalPages, totalOrders, hasNext, hasPrev } }
//     const pagination = response.data.pagination || {}

//     return {
//       orders: response.data.orders || [],
//       total: pagination.totalOrders || response.data.orders?.length || 0,
//       page: pagination.currentPage || page,
//       totalPages: pagination.totalPages || 1,
//     }
//   },

//   getOrderById: async (orderId: number): Promise<Order> => {
//     const response = await api.get(`/orders/${orderId}`)
//     return response.data
//   },

//   createOrder: async (orderData: any) => {
//     const response = await api.post("/orders", orderData)
//     return response.data
//   },

//   updateOrderStatus: async (orderId: number, status: string) => {
//     const response = await api.put(`/orders/${orderId}/status`, { status })
//     return response.data
//   },

//   updateOrder: async (orderId: number, orderData: any) => {
//     const response = await api.put(`/orders/${orderId}`, orderData)
//     return response.data
//   },

//   deleteOrder: async (orderId: number) => {
//     const response = await api.delete(`/orders/${orderId}`)
//     return response.data
//   },

//   cancelOrder: async (orderId: number) => {
//     const response = await api.put(`/orders/${orderId}/cancel`)
//     return response.data
//   },
// }





import { api } from "@/lib/api"
import type { Order } from "@/types"

export const orderService = {
  getOrders: async (
    page = 1,
    limit = 10,
    status = '',
    user_id = ''
  ): Promise<{ orders: Order[]; total: number; page: number; totalPages: number }> => {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    
    if (status) params.append('status', status)
    if (user_id) params.append('user_id', user_id)

    const response = await api.get(`/orders?${params}`)

    // Your backend returns: 
    // { 
    //   orders: [...], 
    //   pagination: { currentPage, totalPages, totalOrders, hasNext, hasPrev } 
    // }
    const pagination = response.data.pagination || {}
    
    return {
      orders: response.data.orders || [],
      total: pagination.totalOrders || 0,
      page: pagination.currentPage || page,
      totalPages: pagination.totalPages || 1,
    }
  },

  // Get ALL orders without pagination
  getAllOrders: async (status = ''): Promise<Order[]> => {
    const params = new URLSearchParams({ limit: '1000' }) // Use high limit to get all orders
    if (status) params.append('status', status)

    const response = await api.get(`/orders?${params}`)
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