package com.sheraz.course_registration.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sheraz.course_registration.dto.CourseDTO;
import com.sheraz.course_registration.entity.Instructor;
import com.sheraz.course_registration.repository.InstructorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class CourseControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private InstructorRepository instructorRepo;

    @Autowired
    private ObjectMapper objectMapper;

    private Instructor testInstructor;

    @BeforeEach
    void setup() {
        instructorRepo.deleteAll();  // clean before each test
        testInstructor = new Instructor();
        testInstructor.setName("Sheraz Instructor");
        instructorRepo.save(testInstructor);
    }

    @Test
    void testCreateCourseIntegration() throws Exception {
        CourseDTO courseDTO = new CourseDTO(
                "Spring Boot",
                "Learn Spring Boot",
                4,
                50,
                testInstructor.getId()
        );

        mockMvc.perform(post("/api/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(courseDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Spring Boot"))
                .andExpect(jsonPath("$.creditHours").value(4));
    }
}
