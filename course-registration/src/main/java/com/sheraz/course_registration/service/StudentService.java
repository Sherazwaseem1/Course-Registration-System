package com.sheraz.course_registration.service;

import com.sheraz.course_registration.dto.EnrollmentRequest;
import com.sheraz.course_registration.entity.Course;
import com.sheraz.course_registration.entity.Student;
import com.sheraz.course_registration.repository.CourseRepository;
import com.sheraz.course_registration.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private CourseRepository courseRepo;

    public Student registerStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student enrollInCourse(EnrollmentRequest request) {
        Student student = studentRepo.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepo.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        student.getEnrolledCourses().add(course);
        return studentRepo.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public List<Course> getEnrolledCourses(Long studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return List.copyOf(student.getEnrolledCourses());
    }
}
