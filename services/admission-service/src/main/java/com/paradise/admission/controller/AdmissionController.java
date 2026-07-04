package com.paradise.admission.controller;

import com.paradise.admission.entity.AdmissionApplication;
import com.paradise.admission.entity.ApplicationStatus;
import com.paradise.admission.service.AdmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admissions")
@RequiredArgsConstructor
public class AdmissionController {

    private final AdmissionService admissionService;

    @PostMapping("/apply")
    public ResponseEntity<AdmissionApplication> submitApplication(
            @RequestBody AdmissionApplication application
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(admissionService.submitApplication(application));
    }

    @GetMapping("/track/{applicationNumber}")
    public ResponseEntity<AdmissionApplication> trackApplication(
            @PathVariable String applicationNumber
    ) {
        return ResponseEntity.ok(admissionService.getByApplicationNumber(applicationNumber));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<AdmissionApplication>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) ApplicationStatus status
    ) {
        return ResponseEntity.ok(admissionService.getAllApplications(page, size, status));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdmissionApplication> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String notes
    ) {
        return ResponseEntity.ok(admissionService.updateStatus(id, status, notes));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "admission-service"));
    }
}
