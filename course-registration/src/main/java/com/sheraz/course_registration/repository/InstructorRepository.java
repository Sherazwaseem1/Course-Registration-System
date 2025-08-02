package com.sheraz.course_registration.repository;

import com.sheraz.course_registration.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
}
