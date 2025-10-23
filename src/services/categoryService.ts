import { api } from "@/lib/api"
import type { Category } from "@/types"

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get("/categories")
    return response.data
  },

  getCategory: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  },

  createCategory: async (categoryData: Partial<Category>) => {
    const response = await api.post("/categories", categoryData)
    return response.data
  },

  updateCategory: async (id: number, categoryData: Partial<Category>) => {
    const response = await api.put(`/categories/${id}`, categoryData)
    return response.data
  },

  deleteCategory: async (id: number) => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
  },
}
