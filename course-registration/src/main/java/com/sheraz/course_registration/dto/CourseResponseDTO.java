package com.sheraz.course_registration.dto;

public class CourseResponseDTO {

    private Long id;
    private String title;
    private String description;
    private int creditHours;
    private int capacity;
    private String instructorName;

    public CourseResponseDTO(Long id, String title, String description, int creditHours, int capacity,
            String instructorName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creditHours = creditHours;
        this.capacity = capacity;
        this.instructorName = instructorName;
    }

    // ✅ Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getCreditHours() {
        return creditHours;
    }

    public int getCapacity() {
        return capacity;
    }

    public String getInstructorName() {
        return instructorName;
    }
}
