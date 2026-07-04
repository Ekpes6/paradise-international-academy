-- ============================================================
-- 01-create-databases.sql
-- Creates all service databases and grants permissions
-- ============================================================

CREATE DATABASE IF NOT EXISTS pia_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pia_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pia_admission CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pia_student CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pia_payment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS pia_notification CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create application user (password is set via env var in docker-compose)
CREATE USER IF NOT EXISTS 'pia_user'@'%' IDENTIFIED BY 'PIA_Secure@2024!';

GRANT ALL PRIVILEGES ON pia_auth.* TO 'pia_user'@'%';
GRANT ALL PRIVILEGES ON pia_cms.* TO 'pia_user'@'%';
GRANT ALL PRIVILEGES ON pia_admission.* TO 'pia_user'@'%';
GRANT ALL PRIVILEGES ON pia_student.* TO 'pia_user'@'%';
GRANT ALL PRIVILEGES ON pia_payment.* TO 'pia_user'@'%';
GRANT ALL PRIVILEGES ON pia_notification.* TO 'pia_user'@'%';

FLUSH PRIVILEGES;
