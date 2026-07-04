package com.paradise.cms.repository;

import com.paradise.cms.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    Page<News> findByPublishedTrueOrderByPublishedAtDesc(Pageable pageable);
    Page<News> findByPublishedTrueAndCategoryOrderByPublishedAtDesc(String category, Pageable pageable);
    Optional<News> findBySlugAndPublishedTrue(String slug);
    boolean existsBySlug(String slug);
}
