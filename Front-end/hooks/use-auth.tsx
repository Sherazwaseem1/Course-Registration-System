"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"

interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: string
}

interface LoginPayload {
  username: string
  password: string
}

interface AuthResponse {
  token: string
  username: string
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN"
  instructorId?: number | null
  studentId?: number | null
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user info from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const role = localStorage.getItem("role")
    const instructorId = localStorage.getItem("instructorId")
    const studentId = localStorage.getItem("studentId")

    if (token && username && role) {
      setUser({
        token,
        username,
        role: role as AuthResponse["role"],
        instructorId: instructorId ? Number(instructorId) : null,
        studentId: studentId ? Number(studentId) : null,
      })
    }

    setLoading(false)
  }, [])

  const register = async (data: RegisterPayload) => {
    try {
      const payload = {
        username: data.firstName + data.lastName,
        email: data.email,
        password: data.password,
        role: data.role,
      }

      const response = await axios.post("http://localhost:8080/api/auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      })

      return response.data
    } catch (error: any) {
      toast.error("Registration failed")
      throw error
    }
  }

  const login = async (data: LoginPayload) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: data.username,
        password: data.password,
      }, {
        headers: { "Content-Type": "application/json" },
      })

      const { token, username, role, instructorId, studentId } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("role", role)
      if (instructorId !== null && instructorId !== undefined) {
        localStorage.setItem("instructorId", instructorId.toString())
      }
      if (studentId !== null && studentId !== undefined) {
        localStorage.setItem("studentId", studentId.toString())
      }

      setUser({ token, username, role, instructorId, studentId })

      toast.success("Login successful")
      return response.data
    } catch (error: any) {
      toast.error("Login failed")
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    localStorage.removeItem("instructorId")
    localStorage.removeItem("studentId")
    setUser(null)
    router.push("/auth/login")
  }

  return { register, login, logout, user, loading }
}
