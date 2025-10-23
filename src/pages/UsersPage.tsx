"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userService, type UsersStats } from "@/services/userService"
import type { User } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { Search, Users, UserCheck, Shield, TrendingUp, Edit, Trash2, Phone, Mail, MapPin, Award } from "lucide-react"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UsersStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [membershipFilter, setMembershipFilter] = useState<string>("all")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isCleanupDialogOpen, setIsCleanupDialogOpen] = useState(false)
  const [invalidUsers, setInvalidUsers] = useState<User[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersData, statsData] = await Promise.all([userService.getUsers(), userService.getUsersStats()])

      console.log("[v0] Users data:", usersData)

      if (Array.isArray(usersData.users)) {
        setUsers(usersData.users)
      } else if (Array.isArray(usersData)) {
        setUsers(usersData)
      } else {
        console.error("[v0] Unexpected users data structure:", usersData)
        setUsers([])
      }

      setStats(statsData)
    } catch (error) {
      console.error("[v0] Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to load users data",
        variant: "destructive",
      })
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  const handleSaveUser = async () => {
    if (!editingUser) return

    try {
      await userService.updateUser(editingUser.id, editingUser)
      toast({
        title: "Success",
        description: "User updated successfully",
      })
      setIsEditDialogOpen(false)
      fetchData()
    } catch (error) {
      console.error("[v0] Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      await userService.deleteUser(userToDelete.id)
      toast({
        title: "Success",
        description: "User deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
      fetchData()
    } catch (error) {
      console.error("[v0] Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const findInvalidUsers = () => {
    return users.filter((user) => !user.name || user.name.trim() === "" || user.name === "null")
  }

  const handleCleanupInvalidUsers = () => {
    const invalid = findInvalidUsers()
    setInvalidUsers(invalid)
    setIsCleanupDialogOpen(true)
  }

  const executeCleanup = async () => {
    try {
      const deletePromises = invalidUsers.map((user) => userService.deleteUser(user.id))
      await Promise.all(deletePromises)

      toast({
        title: "Success",
        description: `Deleted ${invalidUsers.length} invalid user(s)`,
      })
      setIsCleanupDialogOpen(false)
      setInvalidUsers([])
      fetchData()
    } catch (error) {
      console.error("[v0] Error cleaning up users:", error)
      toast({
        title: "Error",
        description: "Failed to delete some users",
        variant: "destructive",
      })
    }
  }

  const isInvalidUser = (user: User) => {
    return !user.name || user.name.trim() === "" || user.name === "null"
  }

  const getDisplayName = (user: User) => {
    if (isInvalidUser(user)) {
      return "⚠️ Invalid Data"
    }
    return user.name
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.phone || "").includes(searchTerm) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesMembership = membershipFilter === "all" || user.membershipLevel === membershipFilter

    return matchesSearch && matchesRole && matchesMembership
  })

  const getRoleBadgeColor = (role: string) => {
    return role === "admin" ? "bg-purple-500" : "bg-blue-500"
  }

  const getMembershipBadgeColor = (level: string) => {
    const colors = {
      bronze: "bg-orange-600",
      silver: "bg-gray-400",
      gold: "bg-yellow-500",
      platinum: "bg-cyan-400",
    }
    return colors[level as keyof typeof colors] || "bg-gray-500"
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users Management</h1>
          {findInvalidUsers().length > 0 && (
            <Button variant="destructive" onClick={handleCleanupInvalidUsers}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clean Invalid Users ({findInvalidUsers().length})
            </Button>
          )}
        </div>

        {stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeUsers}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                <Shield className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.adminUsers}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newUsersThisMonth}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={membershipFilter} onValueChange={setMembershipFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by membership" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Memberships</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className={`hover:shadow-lg transition-shadow ${isInvalidUser(user) ? "border-red-500 border-2" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback
                        className={
                          isInvalidUser(user)
                            ? "bg-gradient-to-br from-red-500 to-orange-500 text-white"
                            : "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                        }
                      >
                        {isInvalidUser(user) ? "⚠" : user.name?.charAt(0).toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className={`text-lg ${isInvalidUser(user) ? "text-red-500" : ""}`}>
                        {getDisplayName(user)}
                      </CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                        <Badge className={getMembershipBadgeColor(user.membershipLevel)}>{user.membershipLevel}</Badge>
                        {isInvalidUser(user) && <Badge className="bg-red-500">Invalid</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span dir="ltr">{user.phone || "No phone"}</span>
                  </div>
                  {user.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-right" dir="rtl">
                        {user.address.city}, {user.address.district}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{user.points} pts</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{user.totalOrders} orders</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent"
                    onClick={() => {
                      setUserToDelete(user)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No users found</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information</DialogDescription>
            </DialogHeader>
            {editingUser && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingUser.email || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value: "user" | "admin") => setEditingUser({ ...editingUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="membership">Membership Level</Label>
                  <Select
                    value={editingUser.membershipLevel}
                    onValueChange={(value: "bronze" | "silver" | "gold" | "platinum") =>
                      setEditingUser({ ...editingUser, membershipLevel: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    value={editingUser.points}
                    onChange={(e) => setEditingUser({ ...editingUser, points: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteDialogOpen(false)
                  setUserToDelete(null)
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isCleanupDialogOpen} onOpenChange={setIsCleanupDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clean Up Invalid Users</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {invalidUsers.length} user(s) with invalid data? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-60 overflow-y-auto space-y-2 my-4">
              {invalidUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <span className="text-sm">
                    ID: {user.id} - Phone: {user.phone || "N/A"}
                  </span>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCleanupDialogOpen(false)
                  setInvalidUsers([])
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={executeCleanup}>
                Delete All Invalid Users
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
