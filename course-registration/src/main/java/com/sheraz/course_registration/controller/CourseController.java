package com.sheraz.course_registration.controller;

import com.sheraz.course_registration.dto.CourseDTO;
import com.sheraz.course_registration.dto.CourseResponseDTO;
import com.sheraz.course_registration.entity.Course;
import com.sheraz.course_registration.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public Course create(@RequestBody CourseDTO dto) {
        return courseService.createCourse(dto);
    }

    @GetMapping
    public List<CourseResponseDTO> getAll() {
        List<Course> courses = courseService.getAllCourses();
        return courses.stream()
                .map(course -> new CourseResponseDTO(
                        course.getId(),
                        course.getTitle(),
                        course.getDescription(),
                        course.getCreditHours(),
                        course.getCapacity(),
                        course.getInstructor().getName()))
                .toList();
    }

    @GetMapping("/instructor/{instructorId}")
    public List<CourseResponseDTO> getCoursesByInstructor(@PathVariable Long instructorId) {
        List<Course> courses = courseService.getCoursesByInstructor(instructorId);
        return courses.stream()
                .map(course -> new CourseResponseDTO(
                        course.getId(),
                        course.getTitle(),
                        course.getDescription(),
                        course.getCreditHours(),
                        course.getCapacity(),
                        course.getInstructor().getName()))
                .toList();
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody CourseDTO dto) {
        return courseService.updateCourse(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Course deleted and students dropped.");
    }

}
