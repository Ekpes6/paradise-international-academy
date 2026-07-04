package com.paradise.admission.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "admission_applications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdmissionApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String applicationNumber;

    // Child details
    @Column(nullable = false, length = 100)
    private String childFirstName;

    @Column(nullable = false, length = 100)
    private String childLastName;

    @Column(nullable = false)
    private java.time.LocalDate dateOfBirth;

    @Column(length = 10)
    private String gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AcademicLevel applyingFor;

    // Parent/Guardian details
    @Column(nullable = false, length = 100)
    private String parentName;

    @Column(nullable = false, length = 150)
    private String parentEmail;

    @Column(nullable = false, length = 20)
    private String parentPhone;

    @Column(length = 500)
    private String address;

    @Column(length = 100)
    private String previousSchool;

    @Column(columnDefinition = "TEXT")
    private String additionalInfo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String adminNotes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt;

    private LocalDateTime reviewedAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
