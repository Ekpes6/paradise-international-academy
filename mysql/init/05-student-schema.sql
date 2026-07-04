-- ============================================================
-- 05-student-schema.sql
-- Student service tables: students, results, attendance
-- ============================================================

USE pia_student;

CREATE TABLE IF NOT EXISTS students (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_id VARCHAR(20) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    current_class VARCHAR(50),
    parent_name VARCHAR(100),
    parent_email VARCHAR(150),
    parent_phone VARCHAR(20),
    address VARCHAR(500),
    photo_url VARCHAR(500),
    active TINYINT(1) NOT NULL DEFAULT 1,
    enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_student_id (student_id),
    INDEX idx_students_class (current_class),
    INDEX idx_students_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS results (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_id VARCHAR(20) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    grade VARCHAR(5),
    term VARCHAR(50),
    academic_year VARCHAR(20),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_results_student (student_id),
    INDEX idx_results_year_term (academic_year, term)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_id VARCHAR(20) NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('PRESENT','ABSENT','LATE','EXCUSED') NOT NULL DEFAULT 'PRESENT',
    notes VARCHAR(255),
    recorded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_student_date (student_id, attendance_date),
    INDEX idx_attendance_student (student_id),
    INDEX idx_attendance_date (attendance_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
