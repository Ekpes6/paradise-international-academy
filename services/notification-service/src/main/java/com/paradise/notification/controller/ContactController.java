package com.paradise.notification.controller;

import com.paradise.notification.service.EmailService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    public record ContactRequest(
            @NotBlank String name,
            @Email @NotBlank String email,
            @NotBlank String phone,
            @NotBlank @Size(min = 5, max = 200) String subject,
            @NotBlank @Size(min = 10, max = 2000) String message
    ) {}

    @PostMapping("/contact")
    public ResponseEntity<Void> contact(@Valid @RequestBody ContactRequest req) {
        emailService.sendContactEmail(req.name(), req.email(), req.phone(), req.subject(), req.message());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("notification-service OK");
    }
}
