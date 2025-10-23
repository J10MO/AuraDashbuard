import { api } from "@/lib/api"
import type { Ad } from "@/types"

export const adService = {
  getAllAds: async (): Promise<Ad[]> => {
    const response = await api.get("/ads")
    return response.data.ads || []
  },

  getAdById: async (id: number): Promise<Ad> => {
    const response = await api.get(`/ads/${id}`)
    return response.data.ad || response.data
  },

  getHomepageAds: async (): Promise<Ad[]> => {
    const response = await api.get("/ads/homepage")
    return response.data.ads || []
  },

  createAd: async (adData: Partial<Ad>) => {
    const response = await api.post("/ads", adData)
    return response.data
  },

  updateAd: async (id: number, adData: Partial<Ad>) => {
    const response = await api.put(`/ads/${id}`, adData)
    return response.data
  },

  deleteAd: async (id: number) => {
    const response = await api.delete(`/ads/${id}`)
    return response.data
  },

  incrementViewCount: async (id: number) => {
    const response = await api.patch(`/ads/${id}/view`)
    return response.data
  },

  incrementClickCount: async (id: number) => {
    const response = await api.patch(`/ads/${id}/click`)
    return response.data
  },
}
