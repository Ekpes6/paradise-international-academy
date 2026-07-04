package com.paradise.cms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gallery_images")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 500)
    private String thumbnailUrl;

    @Column(length = 255)
    private String caption;

    @Column(length = 100)
    private String category;

    @Column(nullable = false)
    @Builder.Default
    private boolean published = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
