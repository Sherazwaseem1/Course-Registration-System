package com.sheraz.course_registration.service;

import com.sheraz.course_registration.entity.Instructor;
import com.sheraz.course_registration.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorService {

    @Autowired
    private InstructorRepository instructorRepo;

    public Instructor createInstructor(Instructor instructor) {
        return instructorRepo.save(instructor);
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepo.findAll();
    }

    public Instructor getInstructorById(Long id) {
        return instructorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found with id: " + id));
    }
}
