-- ============================================================
-- 03-cms-schema.sql
-- CMS service tables: news, events, gallery_images, announcements
-- ============================================================

USE pia_cms;

CREATE TABLE IF NOT EXISTS news (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content LONGTEXT NOT NULL,
    featured_image_url VARCHAR(500),
    category VARCHAR(100),
    author_name VARCHAR(100),
    published TINYINT(1) NOT NULL DEFAULT 0,
    published_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_news_slug (slug),
    INDEX idx_news_published (published, published_at),
    INDEX idx_news_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    location VARCHAR(255),
    category VARCHAR(50),
    published TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_events_start_date (start_date),
    INDEX idx_events_published (published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS gallery_images (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    caption VARCHAR(255),
    category VARCHAR(100),
    published TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_gallery_category (category),
    INDEX idx_gallery_published (published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS announcements (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_audience ENUM('ALL','PARENTS','STUDENTS','STAFF') NOT NULL DEFAULT 'ALL',
    published TINYINT(1) NOT NULL DEFAULT 0,
    expires_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ann_published (published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed news articles
INSERT IGNORE INTO news (title, slug, excerpt, content, category, author_name, published, published_at)
VALUES
('Welcome to the 2024/2025 Academic Session', 'welcome-2024-2025-session',
 'Paradise International Academy warmly welcomes all students, parents and staff to the new academic session.',
 '<p>It is with great joy that we welcome everyone back to school. This session promises to be filled with learning, growth and achievements.</p>',
 'Academics', 'Admin Office', 1, NOW()),
('School Achieves 100% WAEC Pass Rate', 'waec-100-percent-pass-rate-2024',
 'Our SSS3 students achieved a historic 100% pass rate in the 2024 WAEC examinations.',
 '<p>We are immensely proud of our graduating class who recorded a 100% pass rate in WAEC 2024.</p>',
 'Academics', 'Principal', 1, DATE_SUB(NOW(), INTERVAL 7 DAY));
