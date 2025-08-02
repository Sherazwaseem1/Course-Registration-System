    package com.sheraz.course_registration.entity;

    import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

    import jakarta.persistence.*;

    @Entity
    public class Instructor {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private String email;
        @OneToOne
        @JoinColumn(name = "user_id")
        @JsonIgnoreProperties("instructor") 
        private User user;

        public Instructor() {
        }

        public Instructor(String name, String email) {
            this.name = name;
            this.email = email;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public User getUser() {
            return user;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setUser(User user) {
            this.user = user;
        }
    }
