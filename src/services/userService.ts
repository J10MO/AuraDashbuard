import {api} from "@/lib/api"
import type { User } from "@/types"

export interface UsersStats {
  totalUsers: number
  activeUsers: number
  adminUsers: number
  newUsersThisMonth: number
}

export interface UsersResponse {
  users: User[]
  pagination: {
    currentPage: number
    totalPages: number
    totalUsers: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export const userService = {
  // Get user statistics
  async getUsersStats(): Promise<UsersStats> {
    const response = await api.get("/admin/users/stats")
    return response.data
  },

  // Get all users with filters and pagination
  async getUsers(params?: {
    page?: number
    limit?: number
    search?: string
    role?: string
    membershipLevel?: string
  }): Promise<UsersResponse> {
    const response = await api.get("/admin/users", { params })
    return response.data
  },

  // Get specific user by ID
  async getUserById(userId: number): Promise<User> {
    const response = await api.get(`/admin/users/${userId}`)
    return response.data.user
  },

  // Update user information
  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    const response = await api.put(`/admin/users/${userId}`, data)
    return response.data.user
  },

  // Delete user
  async deleteUser(userId: number): Promise<void> {
    await api.delete(`/admin/users/${userId}`)
  },
}
