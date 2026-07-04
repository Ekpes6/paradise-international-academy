package com.paradise.admission.service;

import com.paradise.admission.dto.AdmissionEvent;
import com.paradise.admission.entity.AdmissionApplication;
import com.paradise.admission.entity.ApplicationStatus;
import com.paradise.admission.repository.AdmissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdmissionService {

    private final AdmissionRepository admissionRepository;
    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.admission.routing-key}")
    private String admissionRoutingKey;

    public AdmissionApplication submitApplication(AdmissionApplication application) {
        application.setApplicationNumber(generateApplicationNumber());
        application.setStatus(ApplicationStatus.PENDING);
        AdmissionApplication saved = admissionRepository.save(application);

        // Publish async event for notification service
        try {
            AdmissionEvent event = AdmissionEvent.builder()
                    .id(saved.getId())
                    .applicationNumber(saved.getApplicationNumber())
                    .childFirstName(saved.getChildFirstName())
                    .childLastName(saved.getChildLastName())
                    .parentName(saved.getParentName())
                    .parentEmail(saved.getParentEmail())
                    .parentPhone(saved.getParentPhone())
                    .applyingFor(saved.getApplyingFor().name())
                    .build();
            rabbitTemplate.convertAndSend(exchange, admissionRoutingKey, event);
            log.info("Published admission event for application {}", saved.getApplicationNumber());
        } catch (Exception e) {
            log.warn("Failed to publish admission event: {}", e.getMessage());
        }

        return saved;
    }

    public Page<AdmissionApplication> getAllApplications(int page, int size, ApplicationStatus status) {
        Pageable pageable = PageRequest.of(page, size);
        return status != null
                ? admissionRepository.findByStatusOrderBySubmittedAtDesc(status, pageable)
                : admissionRepository.findAllByOrderBySubmittedAtDesc(pageable);
    }

    public AdmissionApplication getByApplicationNumber(String applicationNumber) {
        return admissionRepository.findByApplicationNumber(applicationNumber)
                .orElseThrow(() -> new RuntimeException("Application not found: " + applicationNumber));
    }

    public AdmissionApplication updateStatus(Long id, ApplicationStatus status, String notes) {
        AdmissionApplication app = admissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found: " + id));
        app.setStatus(status);
        app.setAdminNotes(notes);
        app.setReviewedAt(LocalDateTime.now());
        return admissionRepository.save(app);
    }

    private String generateApplicationNumber() {
        String year = String.valueOf(LocalDateTime.now().getYear());
        String uid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "PIA-" + year + "-" + uid;
    }
}
