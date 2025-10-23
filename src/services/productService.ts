import { api } from "@/lib/api"
import type { Product, ProductsResponse } from "@/types"

export const productService = {
  // <CHANGE> Updated to handle paginated response structure
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<ProductsResponse>("/products")
    return response.data.products
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products/featured")
    return response.data.products || response.data
  },

  getProductsOnSale: async (): Promise<Product[]> => {
    const response = await api.get("/products/sale")
    return response.data.products || response.data
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get("/products/search", { params: { q: query } })
    return response.data.products || response.data
  },

  // <CHANGE> Updated to match backend field names
  createProduct: async (productData: Partial<Product>) => {
    const response = await api.post("/products", productData)
    return response.data
  },

  updateProduct: async (id: number, productData: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}
