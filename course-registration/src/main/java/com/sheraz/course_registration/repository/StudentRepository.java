package com.sheraz.course_registration.repository;

import com.sheraz.course_registration.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
