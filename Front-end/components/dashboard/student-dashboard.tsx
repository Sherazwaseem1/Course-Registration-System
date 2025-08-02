"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useCourses } from "@/hooks/use-courses"
import Navigation from "@/components/navigation"
import { Search, BookOpen, Users, Clock } from "lucide-react"

export default function StudentDashboard() {
  const { user } = useAuth()
  const { courses, enrolledCourses, enrollInCourse, loading } = useCourses()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isEnrolled = (courseId: number) => {
    return enrolledCourses.some((course) => course.id === courseId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading courses...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">

        {/* Welcome Section */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4 animate-gradient-x">
            Welcome back, {user?.username}! 🎉
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover amazing courses and continue your learning journey
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full animate-pulse"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up delay-300">
          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-cyan-300">{enrolledCourses.length}</h3>
              <p className="text-slate-400">Enrolled Courses</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-blue-300">{courses.length}</h3>
              <p className="text-slate-400">Available Courses</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-400/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-purple-300">
                {enrolledCourses.reduce((total, course) => total + course.creditHours, 0)}
              </h3>
              <p className="text-slate-400">Total Credits</p>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12 animate-slide-up delay-500">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-6">
            📚 My Courses
          </h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-slate-800 border border-slate-700"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300 font-medium">👨‍🏫 {course.instructor.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4 leading-relaxed">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-3 py-1">
                        ✅ Enrolled
                      </Badge>
                      <span className="text-cyan-400 font-bold text-lg">{course.creditHours} Credits</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-800 border border-slate-700">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce-slow">📖</div>
                <p className="text-slate-300 text-lg">You haven't enrolled in any courses yet.</p>
                <p className="text-slate-400 mt-2">Browse available courses below to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Available Courses */}
        <div className="animate-slide-up delay-700">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              🌟 Available Courses
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-slate-800 border border-slate-700"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300 font-medium">👨‍🏫 {course.instructorName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4 leading-relaxed">{course.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cyan-400 font-bold text-lg">{course.creditHours} Credits</span>
                    <Badge variant="outline" className="border-blue-400 text-blue-400 bg-blue-400/10 font-semibold">
                      {course.capacity - (course.enrolled || 0)} spots Total
                    </Badge>
                  </div>
                  <Button
                    onClick={() => enrollInCourse(course.id)}
                    disabled={isEnrolled(course.id) || loading}
                    className={`w-full font-semibold py-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      isEnrolled(course.id)
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 shadow-lg hover:shadow-green-500/25"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-lg hover:shadow-blue-500/25"
                    }`}
                  >
                    {isEnrolled(course.id) ? "✅ Enrolled" : "🚀 Enroll Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
