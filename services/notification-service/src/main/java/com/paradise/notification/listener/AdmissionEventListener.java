package com.paradise.notification.listener;

import com.paradise.notification.dto.AdmissionEvent;
import com.paradise.notification.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdmissionEventListener {

    private final EmailService emailService;

    @RabbitListener(queues = "${rabbitmq.queues.admission}")
    public void handleAdmissionEvent(AdmissionEvent event) {
        log.info("Received admission event for application {}", event.getApplicationNumber());
        try {
            String childFullName = event.getChildFirstName() + " " + event.getChildLastName();
            emailService.sendAdmissionConfirmation(
                    event.getParentEmail(),
                    event.getParentName(),
                    childFullName,
                    event.getApplicationNumber()
            );
        } catch (Exception e) {
            log.error("Failed to send admission confirmation email for {}: {}",
                    event.getApplicationNumber(), e.getMessage());
        }
    }
}
