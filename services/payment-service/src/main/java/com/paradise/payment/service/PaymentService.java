package com.paradise.payment.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paradise.payment.entity.Payment;
import com.paradise.payment.entity.PaymentStatus;
import com.paradise.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HexFormat;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    @Value("${paystack.secret-key}")
    private String paystackSecretKey;

    @Value("${paystack.base-url}")
    private String paystackBaseUrl;

    @Value("${paystack.webhook-secret}")
    private String webhookSecret;

    public Payment initiatePayment(String email, BigDecimal amount, String description, String studentId) {
        String reference = "PIA-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();

        Payment payment = Payment.builder()
                .reference(reference)
                .email(email)
                .amount(amount)
                .description(description)
                .studentId(studentId)
                .status(PaymentStatus.PENDING)
                .build();

        return paymentRepository.save(payment);
    }

    public void handleWebhook(String payload, String paystackSignature) throws Exception {
        // Verify HMAC SHA-512 signature
        Mac mac = Mac.getInstance("HmacSHA512");
        mac.init(new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA512"));
        byte[] hash = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
        String computedSignature = HexFormat.of().formatHex(hash);

        if (!computedSignature.equals(paystackSignature)) {
            throw new SecurityException("Invalid Paystack webhook signature");
        }

        JsonNode event = objectMapper.readTree(payload);
        String eventType = event.path("event").asText();

        if ("charge.success".equals(eventType)) {
            JsonNode data = event.path("data");
            String reference = data.path("reference").asText();
            String transactionId = data.path("id").asText();

            paymentRepository.findByReference(reference).ifPresent(payment -> {
                payment.setStatus(PaymentStatus.SUCCESS);
                payment.setPaystackTransactionId(transactionId);
                payment.setPaystackResponse(data.toString());
                payment.setPaidAt(LocalDateTime.now());
                paymentRepository.save(payment);
                log.info("Payment {} confirmed via webhook", reference);
            });
        }
    }

    public Payment getByReference(String reference) {
        return paymentRepository.findByReference(reference)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + reference));
    }
}
