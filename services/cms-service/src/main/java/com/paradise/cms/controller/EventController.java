package com.paradise.cms.controller;

import com.paradise.cms.entity.Event;
import com.paradise.cms.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventRepository eventRepository;

    @GetMapping("/upcoming")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        return ResponseEntity.ok(
            eventRepository.findByPublishedTrueAndStartDateAfterOrderByStartDateAsc(LocalDateTime.now())
        );
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventRepository.save(event));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updated) {
        return eventRepository.findById(id).map(e -> {
            e.setTitle(updated.getTitle());
            e.setDescription(updated.getDescription());
            e.setStartDate(updated.getStartDate());
            e.setEndDate(updated.getEndDate());
            e.setLocation(updated.getLocation());
            e.setCategory(updated.getCategory());
            e.setPublished(updated.isPublished());
            return ResponseEntity.ok(eventRepository.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }
}
