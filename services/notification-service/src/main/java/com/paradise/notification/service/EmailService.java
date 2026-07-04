package com.paradise.notification.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${school.name}")
    private String schoolName;

    @Value("${school.email}")
    private String schoolEmail;

    public void sendHtmlEmail(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(schoolEmail, schoolName);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info("Email sent to {}: {}", to, subject);
        } catch (MessagingException | java.io.UnsupportedEncodingException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }

    public void sendContactEmail(String fromName, String fromEmail, String phone,
                                 String subject, String message) {
        String body = """
                <html><body style="font-family:Arial,sans-serif;color:#333;">
                  <div style="max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
                    <div style="background:#cc0000;padding:24px;text-align:center;">
                      <h1 style="color:white;margin:0;">New Website Enquiry</h1>
                    </div>
                    <div style="padding:32px;">
                      <table style="width:100%%;">
                        <tr><td style="font-weight:bold;width:120px;">Name:</td><td>%s</td></tr>
                        <tr><td style="font-weight:bold;">Email:</td><td><a href="mailto:%s">%s</a></td></tr>
                        <tr><td style="font-weight:bold;">Phone:</td><td>%s</td></tr>
                        <tr><td style="font-weight:bold;">Subject:</td><td>%s</td></tr>
                      </table>
                      <div style="background:#f9f9f9;border-left:4px solid #cc0000;padding:16px;margin:20px 0;white-space:pre-wrap;">%s</div>
                    </div>
                  </div>
                </body></html>
                """.formatted(fromName, fromEmail, fromEmail, phone, subject, message);
        sendHtmlEmail(schoolEmail, "Website Enquiry: " + subject, body);

        // Auto-reply to sender
        String autoReply = """
                <html><body style="font-family:Arial,sans-serif;color:#333;">
                  <div style="max-width:600px;margin:0 auto;">
                    <div style="background:#cc0000;padding:24px;text-align:center;">
                      <h1 style="color:white;margin:0;">Paradise International Academy</h1>
                    </div>
                    <div style="padding:32px;">
                      <p>Dear %s,</p>
                      <p>Thank you for contacting us. We have received your message and will respond within 24 hours.</p>
                      <p style="color:#888;font-size:12px;">This is an automated reply — please do not respond to this email.</p>
                    </div>
                  </div>
                </body></html>
                """.formatted(fromName);
        sendHtmlEmail(fromEmail, "We received your message — " + schoolName, autoReply);
    }

    public void sendAdmissionConfirmation(String parentEmail, String parentName,
                                          String childName, String applicationNumber) {
        String subject = "Admission Application Received — " + applicationNumber;
        String body = """
                <html><body style="font-family:Arial,sans-serif;color:#333;">
                  <div style="max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
                    <div style="background:#cc0000;padding:24px;text-align:center;">
                      <h1 style="color:white;margin:0;">Paradise International Academy</h1>
                    </div>
                    <div style="padding:32px;">
                      <h2 style="color:#cc0000;">Application Received!</h2>
                      <p>Dear %s,</p>
                      <p>Thank you for applying to Paradise International Academy for <strong>%s</strong>.</p>
                      <p>Your application has been received and is under review.</p>
                      <div style="background:#f9f9f9;border-left:4px solid #cc0000;padding:16px;margin:20px 0;">
                        <strong>Application Number: %s</strong>
                      </div>
                      <p>Our admissions team will contact you within 5–7 working days.</p>
                      <p>For enquiries: <a href="mailto:admissions@paradiseinternationalacademy.com.ng">admissions@paradiseinternationalacademy.com.ng</a></p>
                      <hr style="margin:24px 0;">
                      <p style="color:#888;font-size:12px;">Paradise International Academy — Crèche | Nursery | Primary | Secondary</p>
                    </div>
                  </div>
                </body></html>
                """.formatted(parentName, childName, applicationNumber);
        sendHtmlEmail(parentEmail, subject, body);
    }
}
