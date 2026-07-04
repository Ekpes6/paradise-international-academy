package com.paradise.cms.controller;

import com.paradise.cms.entity.News;
import com.paradise.cms.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsRepository newsRepository;

    @GetMapping
    public ResponseEntity<Page<News>> getPublishedNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<News> result = category != null && !category.isEmpty()
                ? newsRepository.findByPublishedTrueAndCategoryOrderByPublishedAtDesc(category, pageable)
                : newsRepository.findByPublishedTrueOrderByPublishedAtDesc(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<News> getNewsBySlug(@PathVariable String slug) {
        return newsRepository.findBySlugAndPublishedTrue(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<News> createNews(@RequestBody News news) {
        return ResponseEntity.ok(newsRepository.save(news));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News updated) {
        return newsRepository.findById(id).map(news -> {
            news.setTitle(updated.getTitle());
            news.setSlug(updated.getSlug());
            news.setExcerpt(updated.getExcerpt());
            news.setContent(updated.getContent());
            news.setFeaturedImageUrl(updated.getFeaturedImageUrl());
            news.setCategory(updated.getCategory());
            news.setPublished(updated.isPublished());
            news.setPublishedAt(updated.getPublishedAt());
            return ResponseEntity.ok(newsRepository.save(news));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteNews(@PathVariable Long id) {
        newsRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }
}
