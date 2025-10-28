// import axios from "axios"

// const API_BASE_URL = import.meta.env.VITE_API_URL 

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )





// import axios from "axios"

// const API_BASE_URL = import.meta.env.VITE_API_URL

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//       console.log("[v0] Adding auth token to request:", config.url)
//     } else {
//       console.log("[v0] No token available for request:", config.url)
//     }
//     return config
//   },
//   (error) => {
//     console.error("[v0] Request interceptor error:", error)
//     return Promise.reject(error)
//   },
// )

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => {
//     console.log("[v0] API response success:", response.config.url, response.status)
//     return response
//   },
//   (error) => {
//     console.error("[v0] API response error:", error.config?.url, error.response?.status)

//     if (error.response?.status === 401) {
//       console.log("[v0] 401 Unauthorized - clearing session and redirecting to login")
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")

//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login"
//       }
//     }
//     return Promise.reject(error)
//   },
// )






import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL

export const getApiUrl = (path: string): string => {
  const baseUrl = API_BASE_URL || "http://localhost:5001/api"
  // Remove trailing slash from base URL and leading slash from path, then join
  const normalizedBase = baseUrl.replace(/\/$/, "")
  const normalizedPath = path.replace(/^\//, "")
  return `${normalizedBase}/${normalizedPath}`
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log("[v0] Adding auth token to request:", config.url)
    } else {
      console.log("[v0] No token available for request:", config.url)
    }
    return config
  },
  (error) => {
    console.error("[v0] Request interceptor error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log("[v0] API response success:", response.config.url, response.status)
    return response
  },
  (error) => {
    console.error("[v0] API response error:", error.config?.url, error.response?.status)

    if (error.response?.status === 401) {
      console.log("[v0] 401 Unauthorized - clearing session and redirecting to login")
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)
