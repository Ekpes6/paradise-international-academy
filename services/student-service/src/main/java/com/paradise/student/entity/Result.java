package com.paradise.student.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String studentId;

    @Column(nullable = false, length = 100)
    private String subject;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal score;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal maxScore;

    @Column(length = 5)
    private String grade;

    @Column(length = 50)
    private String term;

    @Column(length = 20)
    private String academicYear;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
