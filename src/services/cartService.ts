import { api } from "@/lib/api"

export interface CartItem {
  id: number
  user_id: number
  product_id: number
  quantity: number
  created_at: string
  name: string
  name_ar: string
  brand?: string
  price: string
  image_url: string
  customer_name: string
  customer_email: string
}

export interface CartResponse {
  success: boolean
  cart?: CartItem[]
  carts?: CartItem[]
  total?: number
  total_items?: number
}

export interface AdminCartsResponse {
  success: boolean
  carts: CartItem[]
  total_items: number
}

const cartService = {
  // Get current user's cart
  getCart: async (): Promise<CartResponse> => {
    const response = await api.get("/cart")
    return response.data
  },

  // Add item to cart
  addToCart: async (productId: number, quantity: number) => {
    const response = await api.post("/cart", { product_id: productId, quantity })
    return response.data
  },

  // Update cart item quantity
  updateCartItem: async (productId: number, quantity: number) => {
    const response = await api.put(`/cart/${productId}`, { quantity })
    return response.data
  },

  // Remove item from cart
  removeFromCart: async (productId: number) => {
    const response = await api.delete(`/cart/${productId}`)
    return response.data
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await api.delete("/cart")
    return response.data
  },

  getAllCarts: async (): Promise<AdminCartsResponse> => {
    const response = await api.get("/cart/admin/all")
    return response.data
  },

  // Admin: Get specific customer's cart
  getCustomerCart: async (userId: number): Promise<CartResponse> => {
    const response = await api.get(`/cart/admin/customer/${userId}`)
    return response.data
  },

  // Admin: Delete item from customer's cart
  deleteCustomerCartItem: async (userId: number, productId: number) => {
    const response = await api.delete(`/cart/admin/customer/${userId}/product/${productId}`)
    return response.data
  },

  // Admin: Clear customer's entire cart
  clearCustomerCart: async (userId: number) => {
    const response = await api.delete(`/cart/admin/customer/${userId}`)
    return response.data
  },
}

export default cartService
