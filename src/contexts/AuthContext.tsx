// "use client"

// import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
// import type { User } from "@/types"
// import { authService } from "@/services/authService"

// interface AuthContextType {
//   user: User | null
//   token: string | null
//   login: (token: string, user: User) => void
//   logout: () => void
//   isLoading: boolean
//   isAdmin: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   const logout = useCallback(() => {
//     setToken(null)
//     setUser(null)
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//   }, [])

//   useEffect(() => {
//     const initAuth = async () => {
//       setIsLoading(true)

//       const storedToken = localStorage.getItem("token")
//       const storedUser = localStorage.getItem("user")

//       if (storedToken && storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser)
//           setToken(storedToken)
//           setUser(parsedUser)

//           try {
//             const profile = await authService.getProfile()
//             setUser(profile)
//             localStorage.setItem("user", JSON.stringify(profile))
//           } catch (verifyError) {
//             console.error("Token verification failed, using cached user:", verifyError)
//           }
//         } catch (error) {
//           console.error("Failed to restore session:", error)
//           logout()
//         }
//       }

//       setIsLoading(false)
//     }

//     initAuth()
//   }, [logout])

//   const login = (newToken: string, newUser: User) => {
//     setToken(newToken)
//     setUser(newUser)
//     localStorage.setItem("token", newToken)
//     localStorage.setItem("user", JSON.stringify(newUser))
//   }

//   const isAdmin = user?.role === "admin"

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isLoading, isAdmin }}>{children}</AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }



"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User } from "@/types"
import { authService } from "@/services/authService"

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const expirationTime = payload.exp * 1000 // Convert to milliseconds
    const currentTime = Date.now()
    const isExpired = currentTime >= expirationTime

    console.log("[v0] Token expiration check:", {
      expirationTime: new Date(expirationTime).toISOString(),
      currentTime: new Date(currentTime).toISOString(),
      isExpired,
    })

    return isExpired
  } catch (error) {
    console.error("[v0] Error parsing token:", error)
    return true // If we can't parse it, consider it expired
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    console.log("[v0] Logging out user")
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }, [])

  useEffect(() => {
    const initAuth = async () => {
      console.log("[v0] Initializing authentication...")
      setIsLoading(true)

      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      console.log("[v0] Stored token exists:", !!storedToken)
      console.log("[v0] Stored user exists:", !!storedUser)

      if (storedToken && storedUser) {
        if (isTokenExpired(storedToken)) {
          console.log("[v0] Token is expired, clearing session")
          logout()
          setIsLoading(false)
          return
        }

        try {
          const parsedUser = JSON.parse(storedUser)
          console.log("[v0] Parsed user from localStorage:", parsedUser)

          setToken(storedToken)
          setUser(parsedUser)

          try {
            console.log("[v0] Attempting to fetch fresh user profile...")
            const profile = await authService.getProfile()
            console.log("[v0] Successfully fetched user profile:", profile)
            setUser(profile)
            localStorage.setItem("user", JSON.stringify(profile))
          } catch (verifyError: any) {
            console.log("[v0] Failed to fetch profile, using cached user:", verifyError?.message)
            // Only logout if it's a 401 (unauthorized) error
            if (verifyError?.response?.status === 401) {
              console.log("[v0] 401 error, token is invalid, logging out")
              logout()
            }
          }
        } catch (error) {
          console.error("[v0] Failed to restore session:", error)
          logout()
        }
      } else {
        console.log("[v0] No stored credentials found")
      }

      setIsLoading(false)
      console.log("[v0] Authentication initialization complete")
    }

    initAuth()
  }, [logout])

  const login = (newToken: string, newUser: User) => {
    console.log("[v0] Logging in user:", newUser)
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, isAdmin }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
