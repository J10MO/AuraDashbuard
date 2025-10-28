// import { api } from "@/lib/api"
// import type { Ad } from "@/types"

// export const adService = {
//   getAllAds: async (): Promise<Ad[]> => {
//     const response = await api.get("/ads")
//     return response.data.ads || []
//   },

//   getAdById: async (id: number): Promise<Ad> => {
//     const response = await api.get(`/ads/${id}`)
//     return response.data.ad || response.data
//   },

//   getHomepageAds: async (): Promise<Ad[]> => {
//     const response = await api.get("/ads/homepage")
//     return response.data.ads || []
//   },

//   createAd: async (adData: Partial<Ad>) => {
//     const response = await api.post("/ads", adData)
//     return response.data
//   },

//   updateAd: async (id: number, adData: Partial<Ad>) => {
//     const response = await api.put(`/ads/${id}`, adData)
//     return response.data
//   },

//   deleteAd: async (id: number) => {
//     const response = await api.delete(`/ads/${id}`)
//     return response.data
//   },

//   incrementViewCount: async (id: number) => {
//     const response = await api.patch(`/ads/${id}/view`)
//     return response.data
//   },

//   incrementClickCount: async (id: number) => {
//     const response = await api.patch(`/ads/${id}/click`)
//     return response.data
//   },
// }






import { api, getApiUrl } from "@/lib/api"
import type { Ad } from "@/types"
import axios from "axios"

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

  createAd: async (adData: Partial<Ad> & { image?: File | string }) => {
    const { image, ...restData } = adData

    // If image is a File object, use FormData
    if (image instanceof File) {
      const formData = new FormData()

      // Append all ad fields
      Object.entries(restData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Append the image file
      formData.append("image", image)

      const token = localStorage.getItem("token")
      const response = await axios.post(getApiUrl("ads"), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } else {
      // If image is a URL string, use JSON
      const dataToSend = { ...restData }
      if (image) {
        dataToSend.image_url = image
      }
      const response = await api.post("/ads", dataToSend)
      return response.data
    }
  },

  updateAd: async (id: number, adData: Partial<Ad> & { image?: File | string }) => {
    const { image, ...restData } = adData

    // If image is a File object, use FormData
    if (image instanceof File) {
      const formData = new FormData()

      // Append all ad fields
      Object.entries(restData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Append the image file
      formData.append("image", image)

      const token = localStorage.getItem("token")
      const response = await axios.put(getApiUrl(`ads/${id}`), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } else {
      // If image is a URL string or not provided, use JSON
      const dataToSend = { ...restData }
      if (image) {
        dataToSend.image_url = image
      }
      const response = await api.put(`/ads/${id}`, dataToSend)
      return response.data
    }
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
