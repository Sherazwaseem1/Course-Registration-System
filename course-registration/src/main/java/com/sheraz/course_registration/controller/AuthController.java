package com.sheraz.course_registration.controller;

import com.sheraz.course_registration.dto.*;
import com.sheraz.course_registration.entity.*;
import com.sheraz.course_registration.repository.*;
import com.sheraz.course_registration.security.JwtUtil;
import com.sheraz.course_registration.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private InstructorRepository instructorRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        userRepo.save(user); // Save user first

        // Save corresponding role entity
        if (user.getRole().name().equals("INSTRUCTOR")) {
            Instructor instructor = new Instructor();
            instructor.setName(user.getUsername());
            instructor.setEmail(user.getEmail());
            instructor.setUser(user);
            instructorRepo.save(instructor);
        } else if (user.getRole().name().equals("STUDENT")) {
            Student student = new Student();
            student.setName(user.getUsername());
            student.setEmail(user.getEmail());
            student.setUser(user);
            studentRepo.save(student);
        }

        return "User registered successfully!";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        User user = userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long instructorId = null;
        Long studentId = null;

        if (user.getRole().name().equals("INSTRUCTOR") && user.getInstructor() != null) {
            instructorId = user.getInstructor().getId();
        } else if (user.getRole().name().equals("STUDENT") && user.getStudent() != null) {
            studentId = user.getStudent().getId();
        }

        String token = jwtUtil.generateToken(user, instructorId, studentId);

        return new AuthResponse(token, user.getUsername(), user.getRole().name(), instructorId, studentId);
    }
}
