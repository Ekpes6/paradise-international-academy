package com.paradise.cms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "news")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 255, unique = true)
    private String slug;

    @Column(length = 500)
    private String excerpt;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(length = 500)
    private String featuredImageUrl;

    @Column(length = 100)
    private String category;

    @Column(length = 100)
    private String authorName;

    @Column(nullable = false)
    @Builder.Default
    private boolean published = false;

    private LocalDateTime publishedAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
