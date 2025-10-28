// import { api } from "@/lib/api"
// import type { Category } from "@/types"

// export const categoryService = {
//   getCategories: async (): Promise<Category[]> => {
//     const response = await api.get("/categories")
//     return response.data
//   },

//   getCategory: async (id: number): Promise<Category> => {
//     const response = await api.get(`/categories/${id}`)
//     return response.data
//   },

//   createCategory: async (categoryData: Partial<Category>) => {
//     const response = await api.post("/categories", categoryData)
//     return response.data
//   },

//   updateCategory: async (id: number, categoryData: Partial<Category>) => {
//     const response = await api.put(`/categories/${id}`, categoryData)
//     return response.data
//   },

//   deleteCategory: async (id: number) => {
//     const response = await api.delete(`/categories/${id}`)
//     return response.data
//   },
// }





import { api, getApiUrl } from "@/lib/api"
import type { Category } from "@/types"
import axios from "axios"

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get("/categories")
    return response.data
  },

  getCategory: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },

  createCategory: async (categoryData: Partial<Category> & { image?: File | string }) => {
    const { image, ...restData } = categoryData

    // If image is a File object, use FormData
    if (image instanceof File) {
      const formData = new FormData()

      // Append all category fields
      Object.entries(restData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Append the image file
      formData.append("image", image)

      const token = localStorage.getItem("token")
      const response = await axios.post(getApiUrl("categories"), formData, {
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
      const response = await api.post("/categories", dataToSend)
      return response.data
    }
  },

  updateCategory: async (id: number, categoryData: Partial<Category> & { image?: File | string }) => {
    const { image, ...restData } = categoryData

    // If image is a File object, use FormData
    if (image instanceof File) {
      const formData = new FormData()

      // Append all category fields
      Object.entries(restData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Append the image file
      formData.append("image", image)

      const token = localStorage.getItem("token")
      const response = await axios.put(getApiUrl(`categories/${id}`), formData, {
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
      const response = await api.put(`/categories/${id}`, dataToSend)
      return response.data
    }
  },

  deleteCategory: async (id: number) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  },
}
