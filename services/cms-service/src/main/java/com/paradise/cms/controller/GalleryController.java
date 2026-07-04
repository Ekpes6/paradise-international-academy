package com.paradise.cms.controller;

import com.paradise.cms.entity.GalleryImage;
import com.paradise.cms.repository.GalleryImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryImageRepository galleryImageRepository;

    @GetMapping
    public ResponseEntity<Page<GalleryImage>> getGallery(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "24") int size,
            @RequestParam(required = false) String category
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<GalleryImage> result = category != null && !category.isEmpty()
                ? galleryImageRepository.findByPublishedTrueAndCategoryOrderByCreatedAtDesc(category, pageable)
                : galleryImageRepository.findByPublishedTrueOrderByCreatedAtDesc(pageable);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GalleryImage> addImage(@RequestBody GalleryImage image) {
        return ResponseEntity.ok(galleryImageRepository.save(image));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteImage(@PathVariable Long id) {
        galleryImageRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }
}
