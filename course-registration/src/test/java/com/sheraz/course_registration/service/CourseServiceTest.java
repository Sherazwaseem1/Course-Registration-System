package com.sheraz.course_registration.service;

import com.sheraz.course_registration.dto.CourseDTO;
import com.sheraz.course_registration.entity.Course;
import com.sheraz.course_registration.entity.Instructor;
import com.sheraz.course_registration.entity.Student;
import com.sheraz.course_registration.repository.CourseRepository;
import com.sheraz.course_registration.repository.InstructorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CourseServiceTest {

    @InjectMocks
    private CourseService courseService;

    @Mock
    private CourseRepository courseRepo;

    @Mock
    private InstructorRepository instructorRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateCourse_Success() {
        CourseDTO dto = new CourseDTO();
        dto.setTitle("Math");
        dto.setDescription("Algebra");
        dto.setCreditHours(3);
        dto.setCapacity(50);
        dto.setInstructorId(1L);

        Instructor instructor = new Instructor();
        instructor.setId(1L);

        Course expectedCourse = new Course(
                dto.getTitle(),
                dto.getDescription(),
                dto.getCreditHours(),
                dto.getCapacity(),
                instructor);

        when(instructorRepo.findById(1L)).thenReturn(Optional.of(instructor));
        when(courseRepo.save(any(Course.class))).thenReturn(expectedCourse);

        Course result = courseService.createCourse(dto);

        assertEquals("Math", result.getTitle());
        assertEquals("Algebra", result.getDescription());
        assertEquals(3, result.getCreditHours());
        assertEquals(50, result.getCapacity());
        assertEquals(instructor, result.getInstructor());
    }

    @Test
    void testGetAllCourses() {
        List<Course> mockCourses = Arrays.asList(new Course(), new Course());
        when(courseRepo.findAll()).thenReturn(mockCourses);

        List<Course> result = courseService.getAllCourses();

        assertEquals(2, result.size());
        verify(courseRepo, times(1)).findAll();
    }

    @Test
    void testGetCoursesByInstructor() {
        List<Course> mockCourses = Arrays.asList(new Course(), new Course());
        when(courseRepo.findByInstructorId(1L)).thenReturn(mockCourses);

        List<Course> result = courseService.getCoursesByInstructor(1L);

        assertEquals(2, result.size());
        verify(courseRepo).findByInstructorId(1L);
    }

    @Test
    void testUpdateCourse() {
        Course existing = new Course();
        existing.setId(10L);
        Instructor instructor1 = new Instructor();
        instructor1.setId(1L);
        existing.setInstructor(instructor1);

        CourseDTO dto = new CourseDTO();
        dto.setTitle("Updated");
        dto.setDescription("Updated Desc");
        dto.setCreditHours(4);
        dto.setCapacity(60);
        dto.setInstructorId(2L);

        Instructor newInstructor = new Instructor();
        newInstructor.setId(2L);

        when(courseRepo.findById(10L)).thenReturn(Optional.of(existing));
        when(instructorRepo.findById(2L)).thenReturn(Optional.of(newInstructor));
        when(courseRepo.save(any(Course.class))).thenReturn(existing);

        Course updated = courseService.updateCourse(10L, dto);

        assertEquals("Updated", updated.getTitle());
        assertEquals(4, updated.getCreditHours());
        assertEquals(60, updated.getCapacity());
        assertEquals(newInstructor, updated.getInstructor());
    }

    @Test
    void testDeleteCourse() {
        // Setup course with students
        Course course = new Course();
        Student s1 = new Student();
        Student s2 = new Student();

        Set<Course> enrolled1 = new HashSet<>(List.of(course));
        Set<Course> enrolled2 = new HashSet<>(List.of(course));
        s1.setEnrolledCourses(enrolled1);
        s2.setEnrolledCourses(enrolled2);

        Set<Student> students = new HashSet<>(List.of(s1, s2));
        course.setStudents(students);

        when(courseRepo.findById(1L)).thenReturn(Optional.of(course));

        // Act
        courseService.deleteCourse(1L);

        // Assert: Make sure course is removed from student enrollments
        assertFalse(s1.getEnrolledCourses().contains(course));
        assertFalse(s2.getEnrolledCourses().contains(course));
        verify(courseRepo).delete(course);
    }
}
