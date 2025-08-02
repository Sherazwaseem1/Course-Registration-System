package com.sheraz.course_registration.service;

import com.sheraz.course_registration.dto.EnrollmentRequest;
import com.sheraz.course_registration.entity.Course;
import com.sheraz.course_registration.entity.Student;
import com.sheraz.course_registration.repository.CourseRepository;
import com.sheraz.course_registration.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    @Mock
    private StudentRepository studentRepo;

    @Mock
    private CourseRepository courseRepo;

    @InjectMocks
    private StudentService studentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerStudent_shouldSaveAndReturnStudent() {
        Student student = new Student("Alice", "alice@example.com");
        when(studentRepo.save(student)).thenReturn(student);

        Student result = studentService.registerStudent(student);

        assertEquals(student, result);
        verify(studentRepo).save(student);
    }

    @Test
    void enrollInCourse_shouldAddCourseToStudentAndSave() {
        Long studentId = 1L;
        Long courseId = 10L;

        Student student = new Student("John", "john@example.com");
        student.setId(studentId);
        Course course = new Course();
        course.setId(courseId);

        EnrollmentRequest request = new EnrollmentRequest();
        request.setStudentId(studentId);
        request.setCourseId(courseId);

        when(studentRepo.findById(studentId)).thenReturn(Optional.of(student));
        when(courseRepo.findById(courseId)).thenReturn(Optional.of(course));
        when(studentRepo.save(any(Student.class))).thenReturn(student);

        Student result = studentService.enrollInCourse(request);

        assertTrue(result.getEnrolledCourses().contains(course));
        verify(studentRepo).save(student);
    }

    @Test
    void getAllStudents_shouldReturnList() {
        List<Student> students = List.of(
                new Student("Ali", "ali@mail.com"),
                new Student("Sara", "sara@mail.com"));

        when(studentRepo.findAll()).thenReturn(students);

        List<Student> result = studentService.getAllStudents();

        assertEquals(2, result.size());
        verify(studentRepo).findAll();
    }

    @Test
    void getEnrolledCourses_shouldReturnCoursesForStudent() {
        Long studentId = 1L;
        Course course1 = new Course();
        Course course2 = new Course();
        Student student = new Student("Hassan", "hassan@mail.com");
        student.setId(studentId);
        student.getEnrolledCourses().addAll(Set.of(course1, course2));

        when(studentRepo.findById(studentId)).thenReturn(Optional.of(student));

        List<Course> result = studentService.getEnrolledCourses(studentId);

        assertEquals(2, result.size());
        assertTrue(result.contains(course1));
        assertTrue(result.contains(course2));
        verify(studentRepo).findById(studentId);
    }
}
