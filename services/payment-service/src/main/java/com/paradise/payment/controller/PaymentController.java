package com.paradise.payment.controller;

import com.paradise.payment.entity.Payment;
import com.paradise.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/initiate")
    public ResponseEntity<Payment> initiate(
            @RequestParam String email,
            @RequestParam BigDecimal amount,
            @RequestParam String description,
            @RequestParam(required = false) String studentId
    ) {
        return ResponseEntity.ok(paymentService.initiatePayment(email, amount, description, studentId));
    }

    @GetMapping("/{reference}")
    public ResponseEntity<Payment> getPayment(@PathVariable String reference) {
        return ResponseEntity.ok(paymentService.getByReference(reference));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Map<String, String>> webhook(
            @RequestBody String payload,
            @RequestHeader("X-Paystack-Signature") String signature
    ) {
        try {
            paymentService.handleWebhook(payload, signature);
            return ResponseEntity.ok(Map.of("status", "received"));
        } catch (SecurityException e) {
            log.warn("Invalid webhook signature received");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid signature"));
        } catch (Exception e) {
            log.error("Webhook processing error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Processing failed"));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "payment-service"));
    }
}
