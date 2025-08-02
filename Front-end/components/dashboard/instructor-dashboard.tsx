import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import { useCourses } from "@/hooks/use-courses"
import Navigation from "@/components/navigation"
import { Plus, Edit, Trash2, Search } from "lucide-react"

export default function InstructorDashboard() {
  const { user } = useAuth()
  const {
    instructorCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    loading,
    courses, // ✅ All courses
  } = useCourses()

  console.log("The courses are",courses)

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<any | null>(null)

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    credits: "",
    capacity: "",
  })

  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { title, description, credits, capacity } = courseForm
    const parsedCredits = Number(credits)
    const parsedCapacity = Number(capacity)

    if (parsedCredits < 0 || parsedCapacity < 0) {
      alert("Credits and Capacity must be non-negative numbers.")
      return
    }

    if (user?.instructorId == null) {
      alert("Instructor ID not found. Please log in again.")
      return
    }

    const payload = {
      title,
      description,
      credits: parsedCredits,
      capacity: parsedCapacity,
      instructorId: user.instructorId,
    }

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, payload)
        setEditingCourse(null)
      } else {
        await createCourse(payload)
        setIsCreateDialogOpen(false)
      }

      setCourseForm({ title: "", description: "", credits: "", capacity: "" })
    } catch (error) {
      console.error("Error saving course:", error)
    }
  }

  const handleEdit = (course: any) => {
    setEditingCourse(course)
    setCourseForm({
      title: course.title,
      description: course.description,
      credits: course.creditHours.toString(),
      capacity: course.capacity.toString(),
    })
    setIsCreateDialogOpen(true)
  }

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            Instructor Dashboard
          </h1>
          <p className="text-slate-400">
            Welcome back, {user?.username}! Manage your courses here.
          </p>
        </div>

        {/* Instructor’s own courses */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">My Courses</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingCourse ? "Edit Course" : "Create New Course"}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  {editingCourse
                    ? "Update course details below."
                    : "Fill in the details to create a new course."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300">
                    Course Title
                  </Label>
                  <Input
                    id="title"
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, title: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={courseForm.description}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        description: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="credits" className="text-slate-300">
                      Credits
                    </Label>
                    <Input
                      id="credits"
                      type="number"
                      min={0}
                      value={courseForm.credits}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          credits: e.target.value,
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="text-slate-300">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      min={0}
                      value={courseForm.capacity}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          capacity: e.target.value,
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {editingCourse ? "Update Course" : "Create Course"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* My Courses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {instructorCourses.map((course) => (
            <Card key={course.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{course.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  {course.capacity} students capacity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <Badge className="bg-blue-600 text-white">{course.creditHours} Credits</Badge>
                  <Badge variant="outline" className="border-green-400 text-green-400">
                    {course.capacity} Total Seats
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(course)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteCourse(course.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Courses (Read-only) */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white mb-2">All Courses</h2>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search courses by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{course.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  Instructor: {course.instructorName || "Unknown"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-blue-600 text-white">{course.creditHours} Credits</Badge>
                  <Badge variant="outline" className="border-green-400 text-green-400">
                    {course.capacity} Capacity
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
