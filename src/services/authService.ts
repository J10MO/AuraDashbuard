import { api } from "@/lib/api"
import type { User } from "@/types"

export const authService = {
  sendOTP: async (phoneNumber: string) => {
    const response = await api.post("/auth/send-otp", { phone: phoneNumber })
    return response.data
  },

  verifyOTP: async (phoneNumber: string, otp: string) => {
    const response = await api.post("/auth/verify-otp", { phone: phoneNumber, code: otp })
    return response.data
  },

  resendOTP: async (phoneNumber: string) => {
    const response = await api.post("/auth/resend-otp", { phone: phoneNumber })
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get("/auth/profile")
    return response.data
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.put("/auth/profile", data)
    return response.data
  },

  promoteToAdmin: async (userId: number) => {
    const response = await api.post("/auth/promote-to-admin", { user_id: userId })
    return response.data
  },

  changeUserRole: async (userId: number, role: string) => {
    const response = await api.post("/auth/change-role", { user_id: userId, role })
    return response.data
  },
}
