package com.sheraz.course_registration.service;

import com.sheraz.course_registration.dto.CourseDTO;
import com.sheraz.course_registration.entity.Course;
import com.sheraz.course_registration.entity.Instructor;
import com.sheraz.course_registration.entity.Student;
import com.sheraz.course_registration.repository.CourseRepository;
import com.sheraz.course_registration.repository.InstructorRepository;

import com.sheraz.course_registration.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private InstructorRepository instructorRepo;

    public Course createCourse(CourseDTO dto) {
        Instructor instructor = instructorRepo.findById(dto.getInstructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        Course course = new Course(
                dto.getTitle(),
                dto.getDescription(),
                dto.getCreditHours(),
                dto.getCapacity(),
                instructor);

        return courseRepo.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public List<Course> getCoursesByInstructor(Long instructorId) {
        return courseRepo.findByInstructorId(instructorId);
    }

    public Course updateCourse(Long courseId, CourseDTO dto) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setCreditHours(dto.getCreditHours());
        course.setCapacity(dto.getCapacity());

        if (dto.getInstructorId() != null && !dto.getInstructorId().equals(course.getInstructor().getId())) {
            Instructor instructor = instructorRepo.findById(dto.getInstructorId())
                    .orElseThrow(() -> new RuntimeException("Instructor not found"));
            course.setInstructor(instructor);
        }

        return courseRepo.save(course);
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        for (Student student : course.getStudents()) {
            student.getEnrolledCourses().remove(course);
        }

        course.getStudents().clear(); // Optional cleanup

        courseRepo.delete(course);
    }

}
