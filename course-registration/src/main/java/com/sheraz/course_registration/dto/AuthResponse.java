package com.sheraz.course_registration.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String role;
    private Long instructorId; // nullable
    private Long studentId; // nullable

    public AuthResponse(String token, String username, String role, Long instructorId, Long studentId) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.instructorId = instructorId;
        this.studentId = studentId;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public Long getInstructorId() {
        return instructorId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
}
