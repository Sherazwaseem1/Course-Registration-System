"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface Instructor {
  id: number
  name: string
  email: string
}

interface Course {
  id: number
  title: string
  description: string
  creditHours: number
  capacity: number
  instructorName: string
  enrolled?: number
}

interface EnrolledCourse {
  id: number
  title: string
  description: string
  creditHours: number
  capacity: number
  instructor: Instructor
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([])
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)

  const userRole = localStorage.getItem("role")
  const instructorId = localStorage.getItem("instructorId")
  const studentId = localStorage.getItem("studentId")
  const token = localStorage.getItem("token")

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCourses(response.data)
    } catch (error) {
      console.error("Failed to fetch all courses:", error)
    }
  }

  const fetchInstructorCourses = async () => {
    try {
      if (!instructorId) return
      const response = await axios.get(
        `http://localhost:8080/api/courses/instructor/${instructorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setInstructorCourses(response.data)
    } catch (error) {
      console.error("Failed to fetch instructor courses:", error)
    }
  }

  const fetchEnrolledCourses = async () => {
    try {
      if (!studentId) return
      const response = await axios.get(
        `http://localhost:8080/api/students/${studentId}/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setEnrolledCourses(response.data)
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error)
    }
  }

  const enrollInCourse = async (courseId: number) => {
    try {
      if (!token || !studentId) {
        throw new Error("Missing token or studentId")
      }

      const payload = {
        studentId: parseInt(studentId),
        courseId,
      }

      await axios.post("http://localhost:8080/api/students/enroll", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      await fetchEnrolledCourses()
    } catch (error) {
      console.error("Failed to enroll in course:", error)
    }
  }

  const createCourse = async (courseData: {
    title: string
    description: string
    credits: number
    capacity: number
    instructorId: number
  }) => {
    try {
      const payload = {
        title: courseData.title,
        description: courseData.description,
        creditHours: courseData.credits,
        capacity: courseData.capacity,
        instructorId: courseData.instructorId,
      }

      const response = await axios.post(
        "http://localhost:8080/api/courses",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      await fetchInstructorCourses()
      return response.data
    } catch (error) {
      console.error("Failed to create course:", error)
      throw error
    }
  }

  const updateCourse = async (courseId: number, courseData: any) => {
    try {
      const payload = {
        ...courseData,
        creditHours: parseInt(courseData.credits),
        capacity: parseInt(courseData.capacity),
      }

      await axios.put(
        `http://localhost:8080/api/courses/${courseId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      await fetchInstructorCourses()
    } catch (error) {
      console.error("Failed to update course:", error)
    }
  }

  const deleteCourse = async (courseId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    // Update both instructorCourses and all courses
    await fetchInstructorCourses()
    await fetchAllCourses()
      } catch (error) {
      console.error("Failed to delete course:", error)
    }
  }

useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    await fetchAllCourses() // Fetch all courses regardless of role
    if (userRole === "INSTRUCTOR") {
      await fetchInstructorCourses()
    } else if (userRole === "STUDENT") {
      await fetchEnrolledCourses()
    }
    setLoading(false)
  }

  fetchData()
}, [userRole])


  return {
    courses,
    instructorCourses,
    enrolledCourses,
    loading,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
  }
}
