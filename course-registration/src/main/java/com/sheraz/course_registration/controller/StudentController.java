package com.sheraz.course_registration.controller;

import com.sheraz.course_registration.dto.EnrollmentRequest;
import com.sheraz.course_registration.entity.Course;
import com.sheraz.course_registration.entity.Student;
import com.sheraz.course_registration.repository.CourseRepository;
import com.sheraz.course_registration.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sheraz.course_registration.service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public Student registerStudent(@RequestBody Student student) {
        return studentService.registerStudent(student);
    }

    @PostMapping("/enroll")
    public Student enrollCourse(@RequestBody EnrollmentRequest request) {
        return studentService.enrollInCourse(request);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}/courses")
    public List<Course> getEnrolledCourses(@PathVariable Long id) {
        return studentService.getEnrolledCourses(id);
    }
}
