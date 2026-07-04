package com.paradise.cms.repository;

import com.paradise.cms.entity.GalleryImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {
    Page<GalleryImage> findByPublishedTrueOrderByCreatedAtDesc(Pageable pageable);
    Page<GalleryImage> findByPublishedTrueAndCategoryOrderByCreatedAtDesc(String category, Pageable pageable);
}
