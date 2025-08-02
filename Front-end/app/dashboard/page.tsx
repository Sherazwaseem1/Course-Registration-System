"use client"

import { useAuth } from "@/hooks/use-auth"
import StudentDashboard from "@/components/dashboard/student-dashboard"
import InstructorDashboard from "@/components/dashboard/instructor-dashboard"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {user.role === "STUDENT" ? <StudentDashboard /> : <InstructorDashboard />}
    </div>
  )
}
