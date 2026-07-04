-- ============================================================
-- 06-payment-schema.sql
-- Payment service tables
-- ============================================================

USE pia_payment;

CREATE TABLE IF NOT EXISTS payments (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    reference VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
    description VARCHAR(255),
    student_id VARCHAR(50),
    status ENUM('PENDING','SUCCESS','FAILED','ABANDONED','REFUNDED') NOT NULL DEFAULT 'PENDING',
    paystack_transaction_id VARCHAR(100),
    paystack_response TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paid_at DATETIME,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_payment_reference (reference),
    INDEX idx_payment_student (student_id),
    INDEX idx_payment_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS fee_schedules (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    academic_level VARCHAR(30) NOT NULL,
    fee_type VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
    academic_year VARCHAR(20) NOT NULL,
    term VARCHAR(50),
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_fee_level (academic_level),
    INDEX idx_fee_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed 2024/2025 fee schedule
INSERT IGNORE INTO fee_schedules (academic_level, fee_type, amount, academic_year) VALUES
('CRECHE',    'Tuition Fee', 250000.00, '2024/2025'),
('NURSERY_1', 'Tuition Fee', 280000.00, '2024/2025'),
('NURSERY_2', 'Tuition Fee', 280000.00, '2024/2025'),
('PRIMARY_1', 'Tuition Fee', 320000.00, '2024/2025'),
('PRIMARY_6', 'Tuition Fee', 350000.00, '2024/2025'),
('JSS_1',     'Tuition Fee', 420000.00, '2024/2025'),
('JSS_3',     'Tuition Fee', 450000.00, '2024/2025'),
('SSS_1',     'Tuition Fee', 500000.00, '2024/2025'),
('SSS_3',     'Tuition Fee', 520000.00, '2024/2025');
