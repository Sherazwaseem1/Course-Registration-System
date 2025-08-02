package com.sheraz.course_registration.service;

import com.sheraz.course_registration.entity.Instructor;
import com.sheraz.course_registration.repository.InstructorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstructorServiceTest {

    @InjectMocks
    private InstructorService instructorService;

    @Mock
    private InstructorRepository instructorRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateInstructor_Success() {
        Instructor instructor = new Instructor();
        instructor.setName("Dr. Sheraz");
        instructor.setEmail("Sheraz@example.com");

        when(instructorRepo.save(any(Instructor.class))).thenReturn(instructor);

        Instructor saved = instructorService.createInstructor(instructor);

        assertNotNull(saved);
        assertEquals("Dr. Sheraz", saved.getName());
        assertEquals("Sheraz@example.com", saved.getEmail());
        verify(instructorRepo).save(instructor);
    }

    @Test
    void testGetAllInstructors() {
        List<Instructor> mockList = Arrays.asList(new Instructor(), new Instructor());

        when(instructorRepo.findAll()).thenReturn(mockList);

        List<Instructor> result = instructorService.getAllInstructors();

        assertEquals(2, result.size());
        verify(instructorRepo, times(1)).findAll();
    }

    @Test
    void testGetInstructorById_Success() {
        Instructor instructor = new Instructor();
        instructor.setId(1L);
        instructor.setName("John");

        when(instructorRepo.findById(1L)).thenReturn(Optional.of(instructor));

        Instructor result = instructorService.getInstructorById(1L);

        assertEquals(1L, result.getId());
        assertEquals("John", result.getName());
        verify(instructorRepo).findById(1L);
    }

    @Test
    void testGetInstructorById_NotFound() {
        when(instructorRepo.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> instructorService.getInstructorById(99L));

        assertEquals("Instructor not found with id: 99", exception.getMessage());
        verify(instructorRepo).findById(99L);
    }
}
