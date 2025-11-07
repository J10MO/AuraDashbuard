// // import { api } from "@/lib/api"
// // import type { Product, ProductsResponse } from "@/types"

// // export const productService = {
// //   // <CHANGE> Updated to handle paginated response structure
// //   getProducts: async (): Promise<Product[]> => {
// //     const response = await api.get<ProductsResponse>("/products")
// //     return response.data.products
// //   },

// //   getProduct: async (id: number): Promise<Product> => {
// //     const response = await api.get(`/products/${id}`)
// //     return response.data
// //   },

// //   getFeaturedProducts: async (): Promise<Product[]> => {
// //     const response = await api.get("/products/featured")
// //     return response.data.products || response.data
// //   },

// //   getProductsOnSale: async (): Promise<Product[]> => {
// //     const response = await api.get("/products/sale")
// //     return response.data.products || response.data
// //   },

// //   searchProducts: async (query: string): Promise<Product[]> => {
// //     const response = await api.get("/products/search", { params: { q: query } })
// //     return response.data.products || response.data
// //   },

// //   // <CHANGE> Updated to match backend field names
// //   createProduct: async (productData: Partial<Product>) => {
// //     const response = await api.post("/products", productData)
// //     return response.data
// //   },

// //   updateProduct: async (id: number, productData: Partial<Product>) => {
// //     const response = await api.put(`/products/${id}`, productData)
// //     return response.data
// //   },

// //   deleteProduct: async (id: number) => {
// //     const response = await api.delete(`/products/${id}`)
// //     return response.data
// //   },
// // }










// import { api, getApiUrl } from "@/lib/api"
// import type { Product, ProductsResponse } from "@/types"
// import axios from "axios"

// export const productService = {
//   // Updated to handle paginated response structure
//   getProducts: async (): Promise<Product[]> => {
//     const response = await api.get<ProductsResponse>("/products")
//     return response.data.products
//   },

//   getProduct: async (id: number): Promise<Product> => {
//     const response = await api.get(`/products/${id}`)
//     return response.data
//   },

//   getFeaturedProducts: async (): Promise<Product[]> => {
//     const response = await api.get("/products/featured")
//     return response.data.products || response.data
//   },

//   getProductsOnSale: async (): Promise<Product[]> => {
//     const response = await api.get("/products/sale")
//     return response.data.products || response.data
//   },

//   searchProducts: async (query: string): Promise<Product[]> => {
//     const response = await api.get("/products/search", { params: { q: query } })
//     return response.data.products || response.data
//   },

//   createProduct: async (productData: Partial<Product> & { image?: File | string }) => {
//     const { image, ...restData } = productData

//     // If image is a File object, use FormData
//     if (image instanceof File) {
//       const formData = new FormData()

//       // Append all product fields
//       Object.entries(restData).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           formData.append(key, String(value))
//         }
//       })

//       // Append the image file
//       formData.append("image", image)

//       const token = localStorage.getItem("token")
//       const response = await axios.post(getApiUrl("products"), formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return response.data
//     } else {
//       // If image is a URL string, use JSON
//       const dataToSend = { ...restData }
//       if (image) {
//         dataToSend.image_url = image
//       }
//       const response = await api.post("/products", dataToSend)
//       return response.data
//     }
//   },

//   updateProduct: async (id: number, productData: Partial<Product> & { image?: File | string }) => {
//     const { image, ...restData } = productData

//     // If image is a File object, use FormData
//     if (image instanceof File) {
//       const formData = new FormData()

//       // Append all product fields
//       Object.entries(restData).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           formData.append(key, String(value))
//         }
//       })

//       // Append the image file
//       formData.append("image", image)

//       const token = localStorage.getItem("token")
//       const response = await axios.put(getApiUrl(`products/${id}`), formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return response.data
//     } else {
//       // If image is a URL string or not provided, use JSON
//       const dataToSend = { ...restData }
//       if (image) {
//         dataToSend.image_url = image
//       }
//       const response = await api.put(`/products/${id}`, dataToSend)
//       return response.data
//     }
//   },

//   deleteProduct: async (id: number) => {
//     const response = await api.delete(`/products/${id}`)
//     return response.data
//   },
// }




import { api, getApiUrl } from "@/lib/api"
import type { Product, ProductsResponse } from "@/types"
import axios from "axios"

export const productService = {
  // Updated to handle paginated response structure with page parameter
  getProducts: async (page: number = 1): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>("/products", { 
      params: { page } 
    })
    return response.data
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

  searchProducts: async (query: string, page: number = 1): Promise<ProductsResponse> => {
    const response = await api.get("/products/search", { 
      params: { q: query, page } 
    })
    return response.data
  },

  createProduct: async (productData: Partial<Product> & { image?: File | string }) => {
    const { image, ...restData } = productData

    // If image is a File object, use FormData
    if (image instanceof File) {
      const formData = new FormData()

      // Append all product fields
      Object.entries(restData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Append the image file
      formData.append("image", image)

      const token = localStorage.getItem("token")
      const response = await axios.post(getApiUrl("products"), formData, {
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
      const response = await api.post("/products", dataToSend)
      return response.data
    }
  },

  updateProduct: async (id: number, productData: Partial<Product> & { image?: File | string }) => {
    const { image, ...restData } = productData

    // If image is a File object, use FormData
    if (image instanceof File) {
      const formData = new FormData()

      // Append all product fields
      Object.entries(restData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Append the image file
      formData.append("image", image)

      const token = localStorage.getItem("token")
      const response = await axios.put(getApiUrl(`products/${id}`), formData, {
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
      const response = await api.put(`/products/${id}`, dataToSend)
      return response.data
    }
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}