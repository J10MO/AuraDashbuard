// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "@/contexts/AuthContext"
// import { authService } from "@/services/authService"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "sonner"
// import { ShieldCheck } from "lucide-react"

// export default function LoginPage() {
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [otp, setOtp] = useState("")
//   const [step, setStep] = useState<"phone" | "otp">("phone")
//   const [isLoading, setIsLoading] = useState(false)
//   const [debugOtp, setDebugOtp] = useState<string | null>(null)
//   const { login, user, isLoading: authLoading } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!authLoading && user && user.role === "admin") {
//       navigate("/", { replace: true })
//     }
//   }, [user, authLoading, navigate])

//   if (authLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//         <div className="text-center">
//           <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//           <p className="mt-4 text-sm text-slate-400">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const response = await authService.sendOTP(phoneNumber)

//       if (response.role !== "admin") {
//         toast.error("Access denied. Admin privileges required.")
//         setIsLoading(false)
//         return
//       }

//       if (response.otp) {
//         setDebugOtp(response.otp)
//         console.log("[v0] Debug OTP:", response.otp)
//       }

//       setStep("otp")
//       toast.success(response.message || "OTP sent successfully")
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to send OTP")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const response = await authService.verifyOTP(phoneNumber, otp)

//       if (response.user.role !== "admin") {
//         toast.error("Access denied. Admin privileges required.")
//         setIsLoading(false)
//         return
//       }

//       login(response.token, response.user)
//       toast.success("Login successful")
//       navigate("/")
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Invalid OTP")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleResendOTP = async () => {
//     setIsLoading(true)
//     try {
//       const response = await authService.resendOTP(phoneNumber)

//       if (response.otp) {
//         setDebugOtp(response.otp)
//         console.log("[v0] Debug OTP:", response.otp)
//       }

//       toast.success(response.message || "OTP resent successfully")
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to resend OTP")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
//       <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
//         <CardHeader className="space-y-3 text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//             <ShieldCheck className="h-8 w-8 text-primary" />
//           </div>
//           <CardTitle className="text-2xl text-white">Admin Dashboard</CardTitle>
//           <CardDescription className="text-slate-400">
//             {step === "phone" ? "Enter your phone number to receive OTP" : "Enter the OTP sent to your phone"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {step === "phone" ? (
//             <form onSubmit={handleSendOTP} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-slate-200">
//                   Phone Number
//                 </Label>
//                 <Input
//                   id="phone"
//                   type="tel"
//                   placeholder="07XXXXXXXXX"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Sending..." : "Send OTP"}
//               </Button>
//             </form>
//           ) : (
//             <form onSubmit={handleVerifyOTP} className="space-y-4">
//               {debugOtp && (
//                 <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-center">
//                   <p className="text-xs text-amber-400 mb-1">Development Mode - OTP Code:</p>
//                   <p className="text-2xl font-mono font-bold text-amber-300">{debugOtp}</p>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="otp" className="text-slate-200">
//                   OTP Code
//                 </Label>
//                 <Input
//                   id="otp"
//                   type="text"
//                   placeholder="Enter 4-digit code"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   maxLength={6}
//                   className="border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Verifying..." : "Verify OTP"}
//               </Button>
//               <div className="flex items-center justify-between text-sm">
//                 <Button
//                   type="button"
//                   variant="link"
//                   className="p-0 text-slate-400 hover:text-white"
//                   onClick={() => setStep("phone")}
//                 >
//                   Change phone number
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="link"
//                   className="p-0 text-slate-400 hover:text-white"
//                   onClick={handleResendOTP}
//                   disabled={isLoading}
//                 >
//                   Resend OTP
//                 </Button>
//               </div>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }







"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { authService } from "@/services/authService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [isLoading, setIsLoading] = useState(false)
  const [debugOtp, setDebugOtp] = useState<string | null>(null)
  const { login, user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && user && user.role === "admin") {
      navigate("/", { replace: true })
    }
  }, [user, authLoading, navigate])

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await authService.sendOTP(phoneNumber)

      if (response.exists === false) {
        toast.error("Wrong number. This phone number is not registered.")
        setIsLoading(false)
        return
      }

      if (response.role !== "admin") {
        toast.error("Access denied. Admin privileges required.")
        setIsLoading(false)
        return
      }

      if (response.otp) {
        setDebugOtp(response.otp)
        console.log("[v0] Debug OTP:", response.otp)
      }

      setStep("otp")
      toast.success(response.message || "OTP sent successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await authService.verifyOTP(phoneNumber, otp)

      if (response.user.role !== "admin") {
        toast.error("Access denied. Admin privileges required.")
        setIsLoading(false)
        return
      }

      login(response.token, response.user)
      toast.success("Login successful")
      navigate("/")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    try {
      const response = await authService.resendOTP(phoneNumber)

      if (response.otp) {
        setDebugOtp(response.otp)
        console.log("[v0] Debug OTP:", response.otp)
      }

      toast.success(response.message || "OTP resent successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Dashboard</CardTitle>
          <CardDescription className="text-slate-400">
            {step === "phone" ? "Enter your phone number to receive OTP" : "Enter the OTP sent to your phone"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              {debugOtp && (
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-center">
                  <p className="text-xs text-amber-400 mb-1">Development Mode - OTP Code:</p>
                  <p className="text-2xl font-mono font-bold text-amber-300">{debugOtp}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-slate-200">
                  OTP Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <div className="flex items-center justify-between text-sm">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-slate-400 hover:text-white"
                  onClick={() => setStep("phone")}
                >
                  Change phone number
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-slate-400 hover:text-white"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
