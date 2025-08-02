"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { LogOut, User, BookOpen, Home, Sparkles } from "lucide-react"

export default function Navigation() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-b border-slate-700/50 backdrop-blur-xl sticky top-0 z-50 shadow-2xl shadow-black/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <BookOpen className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-blue-200 group-hover:to-purple-200 transition-all duration-300 animate-gradient-x">
              EduPortal
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 rounded-xl px-4 py-2 font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </Button>
            </Link>

            <div className="flex items-center space-x-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 px-4 py-2 rounded-xl border border-slate-600/50 backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-200 font-semibold text-sm">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold uppercase tracking-wide">
                  {user?.role}
                </span>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 rounded-xl px-4 py-2 font-medium group"
            >
              <LogOut className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
