import { api } from "@/lib/api"

export interface FavoriteItem {
  id: number
  user_id: number
  product_id: number
  created_at: string
  product_name: string
  product_name_ar: string
  price: string
  image_url: string
  customer_name: string
  customer_email: string
}

export interface FavoritesResponse {
  success: boolean
  favorites: FavoriteItem[]
  count?: number
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

const favoritesService = {
  // Get current user's favorites
  getFavorites: async (): Promise<FavoritesResponse> => {
    const response = await api.get("/favorites")
    return response.data
  },

  // Get favorites count
  getFavoritesCount: async () => {
    const response = await api.get("/favorites/count")
    return response.data
  },

  // Check if product is favorited
  checkFavorite: async (productId: number) => {
    const response = await api.get(`/favorites/check/${productId}`)
    return response.data
  },

  // Add product to favorites
  addToFavorites: async (productId: number) => {
    const response = await api.post(`/favorites/${productId}`)
    return response.data
  },

  // Remove product from favorites
  removeFromFavorites: async (productId: number) => {
    const response = await api.delete(`/favorites/${productId}`)
    return response.data
  },

  getAllFavorites: async (): Promise<FavoritesResponse> => {
    const response = await api.get("/favorites/admin/all")
    return response.data
  },

  // Admin: Get specific customer's favorites
  getCustomerFavorites: async (userId: number): Promise<FavoritesResponse> => {
    const response = await api.get(`/favorites/admin/customer/${userId}`)
    return response.data
  },

  // Admin: Delete item from customer's favorites
  deleteCustomerFavorite: async (userId: number, productId: number) => {
    const response = await api.delete(`/favorites/admin/customer/${userId}/product/${productId}`)
    return response.data
  },

  // Admin: Clear customer's entire favorites
  clearCustomerFavorites: async (userId: number) => {
    const response = await api.delete(`/favorites/admin/customer/${userId}`)
    return response.data
  },
}

export default favoritesService
