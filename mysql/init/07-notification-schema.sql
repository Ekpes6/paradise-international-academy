-- ============================================================
-- 07-notification-schema.sql
-- Notification service tables
-- ============================================================

USE pia_notification;

CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    recipient_email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT,
    type ENUM('EMAIL','SMS','WHATSAPP') NOT NULL DEFAULT 'EMAIL',
    status ENUM('PENDING','SENT','FAILED') NOT NULL DEFAULT 'PENDING',
    reference_type VARCHAR(50),
    reference_id VARCHAR(50),
    sent_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_notification_status (status),
    INDEX idx_notification_email (recipient_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(150) NOT NULL,
    first_name VARCHAR(100),
    active TINYINT(1) NOT NULL DEFAULT 1,
    subscribed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at DATETIME,
    PRIMARY KEY (id),
    UNIQUE KEY uq_subscriber_email (email),
    INDEX idx_subscriber_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
