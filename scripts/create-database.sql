CREATE DATABASE jobconnect_pro;

USE jobconnect_pro;

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    linkedin_url VARCHAR(500),
    wallet_address VARCHAR(42),
    location VARCHAR(255),
    experience_level ENUM('Entry-level', 'Mid-level', 'Senior', 'Lead', 'Executive') DEFAULT 'Mid-level',
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_wallet (wallet_address)
);

CREATE TABLE user_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_skill (user_id, skill_name),
    INDEX idx_skill (skill_name)
);

CREATE TABLE companies (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(500),
    logo_url VARCHAR(500),
    location VARCHAR(255),
    size ENUM('Startup', 'Small', 'Medium', 'Large', 'Enterprise') DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

CREATE TABLE jobs (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_id VARCHAR(36),
    company_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    budget_min INT,
    budget_max INT,
    currency VARCHAR(10) DEFAULT 'USD',
    location VARCHAR(255),
    job_type ENUM('full-time', 'part-time', 'contract', 'freelance', 'internship') DEFAULT 'full-time',
    remote_allowed BOOLEAN DEFAULT FALSE,
    posted_by VARCHAR(36) NOT NULL,
    status ENUM('active', 'paused', 'closed', 'filled') DEFAULT 'active',
    payment_transaction_hash VARCHAR(66),
    payment_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,
    INDEX idx_title (title),
    INDEX idx_location (location),
    INDEX idx_type (job_type),
    INDEX idx_status (status),
    INDEX idx_posted_by (posted_by),
    INDEX idx_created (created_at)
);

CREATE TABLE job_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id VARCHAR(36) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    required_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
    is_required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_job_skill (job_id, skill_name),
    INDEX idx_skill (skill_name)
);

CREATE TABLE job_applications (
    id VARCHAR(36) PRIMARY KEY,
    job_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    cover_letter TEXT,
    resume_url VARCHAR(500),
    status ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'pending',
    match_score INT DEFAULT 0,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (job_id, user_id),
    INDEX idx_job (job_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_match_score (match_score)
);

CREATE TABLE posts (
    id VARCHAR(36) PRIMARY KEY,
    author_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    post_type ENUM('update', 'job', 'advice', 'article') DEFAULT 'update',
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_author (author_id),
    INDEX idx_type (post_type),
    INDEX idx_created (created_at)
);

CREATE TABLE connections (
    id VARCHAR(36) PRIMARY KEY,
    requester_id VARCHAR(36) NOT NULL,
    recipient_id VARCHAR(36) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected', 'blocked') DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_connection (requester_id, recipient_id),
    INDEX idx_requester (requester_id),
    INDEX idx_recipient (recipient_id),
    INDEX idx_status (status)
);

CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    transaction_hash VARCHAR(66) NOT NULL UNIQUE,
    wallet_address VARCHAR(42) NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    currency VARCHAR(10) DEFAULT 'ETH',
    network VARCHAR(50) DEFAULT 'ethereum',
    purpose ENUM('job_posting', 'premium_subscription', 'boost_profile', 'featured_job') NOT NULL,
    status ENUM('pending', 'confirmed', 'failed', 'refunded') DEFAULT 'pending',
    gas_used INT,
    gas_price DECIMAL(18, 8),
    block_number BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_hash (transaction_hash),
    INDEX idx_wallet (wallet_address),
    INDEX idx_status (status),
    INDEX idx_purpose (purpose)
);

CREATE TABLE ai_job_matches (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    job_id VARCHAR(36) NOT NULL,
    match_score INT NOT NULL,
    matching_skills JSON,
    recommendations JSON,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_match (user_id, job_id),
    INDEX idx_user (user_id),
    INDEX idx_job (job_id),
    INDEX idx_score (match_score)
);

CREATE TABLE skill_extractions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    job_id VARCHAR(36),
    input_text TEXT NOT NULL,
    extracted_skills JSON NOT NULL,
    confidence_scores JSON,
    extraction_method VARCHAR(50) DEFAULT 'ai_nlp',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_job (job_id),
    INDEX idx_method (extraction_method)
);
