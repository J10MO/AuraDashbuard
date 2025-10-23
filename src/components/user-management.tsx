import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, MoreHorizontal, Award } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    phone: "+966501234567",
    membershipLevel: "platinum",
    points: 2450,
    totalOrders: 67,
    joinDate: "2024-03-15",
  },
  {
    id: 2,
    name: "Sara Mohammed",
    email: "sara@example.com",
    phone: "+966507654321",
    membershipLevel: "gold",
    points: 1230,
    totalOrders: 34,
    joinDate: "2024-05-20",
  },
  {
    id: 3,
    name: "Omar Hassan",
    email: "omar@example.com",
    phone: "+966509876543",
    membershipLevel: "silver",
    points: 890,
    totalOrders: 18,
    joinDate: "2024-07-10",
  },
  {
    id: 4,
    name: "Fatima Khalil",
    email: "fatima@example.com",
    phone: "+966502345678",
    membershipLevel: "bronze",
    points: 340,
    totalOrders: 8,
    joinDate: "2024-09-05",
  },
]

const membershipColors = {
  platinum: "bg-slate-100 text-slate-900 border-slate-300",
  gold: "bg-yellow-100 text-yellow-900 border-yellow-300",
  silver: "bg-gray-100 text-gray-900 border-gray-300",
  bronze: "bg-orange-100 text-orange-900 border-orange-300",
}

export function UserManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Users</h2>
          <p className="text-sm text-muted-foreground">Manage customer accounts</p>
        </div>
      </div>

      <Card className="border-border bg-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">User</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Contact</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Membership</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Points</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Orders</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Join Date</th>
                <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{user.phone}</td>
                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={`capitalize ${membershipColors[user.membershipLevel as keyof typeof membershipColors]}`}
                    >
                      <Award className="mr-1 h-3 w-3" />
                      {user.membershipLevel}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm font-medium text-foreground">{user.points}</td>
                  <td className="py-4 text-sm text-foreground">{user.totalOrders}</td>
                  <td className="py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
