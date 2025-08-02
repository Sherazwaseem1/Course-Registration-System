import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-ping delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl">
              EduPortal
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full animate-pulse"></div>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-300">
              Your gateway to academic excellence. Register for courses, manage your schedule, and connect with
              instructors in our modern learning platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up delay-500">
            <Link href="/auth/login">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                <span className="flex items-center gap-2">✨ Sign In</span>
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                variant="outline"
                className="border-2 border-cyan-400 text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:text-white px-10 py-4 text-lg font-semibold rounded-xl bg-transparent backdrop-blur-sm shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:-rotate-1"
              >
                <span className="flex items-center gap-2">🚀 Get Started</span>
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20 animate-slide-up delay-700">
            {[
              {
                icon: "📚",
                title: "Course Management",
                description: "Browse and enroll in courses tailored to your academic goals.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: "👨‍🏫",
                title: "Expert Instructors",
                description: "Learn from experienced faculty and industry professionals.",
                gradient: "from-purple-500 to-blue-500",
              },
              {
                icon: "🎓",
                title: "Academic Success",
                description: "Track your progress and achieve your educational objectives.",
                gradient: "from-cyan-500 to-indigo-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-cyan-400/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 flex items-center justify-center text-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3 group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
