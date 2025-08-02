package com.sheraz.course_registration.entity;

import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private int creditHours; 
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    @JsonIgnoreProperties("user") 
    private Instructor instructor;

    @ManyToMany(mappedBy = "enrolledCourses", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JsonIgnoreProperties("enrolledCourses") 
    private Set<Student> students = new HashSet<>();

    public Course() {
    }

    public Course(String title, String description, int creditHours, int capacity, Instructor instructor) {
        this.title = title;
        this.description = description;
        this.creditHours = creditHours;
        this.capacity = capacity;
        this.instructor = instructor;
    }

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

    public Instructor getInstructor() {
        return instructor;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }
}
