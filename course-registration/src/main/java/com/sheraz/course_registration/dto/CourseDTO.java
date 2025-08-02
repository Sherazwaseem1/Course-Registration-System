package com.sheraz.course_registration.dto;

public class CourseDTO {

    private String title;
    private String description;
    private int creditHours; 
    private int capacity; 
    private Long instructorId;

    public CourseDTO() {
    }

    public CourseDTO(String title, String description, int creditHours, int capacity, Long instructorId) {
        this.title = title;
        this.description = description;
        this.creditHours = creditHours;
        this.capacity = capacity;
        this.instructorId = instructorId;
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

    public Long getInstructorId() {
        return instructorId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreditHours(int creditHours) {
        this.creditHours = creditHours;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }
}
