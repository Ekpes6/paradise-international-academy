-- ============================================================
-- 04-admission-schema.sql
-- Admission service tables
-- ============================================================

USE pia_admission;

CREATE TABLE IF NOT EXISTS admission_applications (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    application_number VARCHAR(20) NOT NULL,
    child_first_name VARCHAR(100) NOT NULL,
    child_last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    applying_for VARCHAR(30) NOT NULL,
    parent_name VARCHAR(100) NOT NULL,
    parent_email VARCHAR(150) NOT NULL,
    parent_phone VARCHAR(20) NOT NULL,
    address VARCHAR(500),
    previous_school VARCHAR(100),
    additional_info TEXT,
    status ENUM('PENDING','UNDER_REVIEW','APPROVED','REJECTED','WAITLISTED') NOT NULL DEFAULT 'PENDING',
    admin_notes TEXT,
    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_at DATETIME,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_application_number (application_number),
    INDEX idx_admission_status (status),
    INDEX idx_admission_submitted (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
