INSERT INTO users (id, name, email, password_hash, bio, linkedin_url, location, experience_level, avatar_url) VALUES
('user-1', 'John Doe', 'john.doe@email.com', '$2b$10$hashedpassword1', 'Experienced full stack developer with expertise in React, Node.js, and blockchain technologies. Passionate about building scalable web applications.', 'https://linkedin.com/in/johndoe', 'San Francisco, CA', 'Senior', '/placeholder.svg?height=40&width=40'),
('user-2', 'Sarah Chen', 'sarah.chen@email.com', '$2b$10$hashedpassword2', 'AI/ML engineer specializing in deep learning and computer vision. Published researcher with 5+ years in the field.', 'https://linkedin.com/in/sarahchen', 'Remote', 'Senior', '/placeholder.svg?height=40&width=40'),
('user-3', 'Mike Rodriguez', 'mike.rodriguez@email.com', '$2b$10$hashedpassword3', 'Product manager with a technical background. Expert in agile methodologies and user experience design.', 'https://linkedin.com/in/mikerodriguez', 'New York, NY', 'Lead', '/placeholder.svg?height=40&width=40'),
('user-4', 'Emily Johnson', 'emily.johnson@email.com', '$2b$10$hashedpassword4', 'UX/UI designer passionate about creating intuitive user experiences. Skilled in Figma, Adobe Creative Suite, and user research.', 'https://linkedin.com/in/emilyjohnson', 'Austin, TX', 'Mid-level', '/placeholder.svg?height=40&width=40'),
('user-5', 'David Kim', 'david.kim@email.com', '$2b$10$hashedpassword5', 'Data scientist with expertise in machine learning, statistical analysis, and big data technologies.', 'https://linkedin.com/in/davidkim', 'Seattle, WA', 'Senior', '/placeholder.svg?height=40&width=40');

INSERT INTO user_skills (user_id, skill_name, proficiency_level) VALUES
('user-1', 'React', 'Expert'),
('user-1', 'Node.js', 'Expert'),
('user-1', 'TypeScript', 'Advanced'),
('user-1', 'Blockchain', 'Advanced'),
('user-1', 'Smart Contracts', 'Intermediate'),
('user-1', 'AWS', 'Advanced'),
('user-2', 'Python', 'Expert'),
('user-2', 'TensorFlow', 'Expert'),
('user-2', 'Machine Learning', 'Expert'),
('user-2', 'Deep Learning', 'Expert'),
('user-2', 'PyTorch', 'Advanced'),
('user-3', 'Product Management', 'Expert'),
('user-3', 'Agile', 'Expert'),
('user-3', 'Scrum', 'Expert'),
('user-3', 'User Research', 'Advanced'),
('user-4', 'Figma', 'Expert'),
('user-4', 'Adobe Creative Suite', 'Advanced'),
('user-4', 'User Experience', 'Expert'),
('user-4', 'Prototyping', 'Advanced'),
('user-5', 'Python', 'Expert'),
('user-5', 'SQL', 'Expert'),
('user-5', 'Machine Learning', 'Expert'),
('user-5', 'Statistics', 'Expert');

INSERT INTO companies (id, name, description, website, location, size) VALUES
('comp-1', 'TechCorp', 'Leading technology company focused on innovative software solutions', 'https://techcorp.com', 'San Francisco, CA', 'Large'),
('comp-2', 'DataFlow Inc', 'AI and machine learning company building next-generation data platforms', 'https://dataflow.com', 'Remote', 'Medium'),
('comp-3', 'CryptoStart', 'Blockchain startup developing decentralized applications', 'https://cryptostart.com', 'New York, NY', 'Startup'),
('comp-4', 'DesignHub', 'Creative agency specializing in digital design and user experience', 'https://designhub.com', 'Austin, TX', 'Small'),
('comp-5', 'CloudTech Solutions', 'Cloud infrastructure and DevOps consulting company', 'https://cloudtech.com', 'Seattle, WA', 'Medium');

INSERT INTO jobs (id, title, company_id, company_name, description, budget_min, budget_max, location, job_type, posted_by, payment_confirmed) VALUES
('job-1', 'Senior Full Stack Developer', 'comp-1', 'TechCorp', 'We are looking for an experienced full stack developer to join our team. You will work on cutting-edge projects using React, Node.js, and cloud technologies. The ideal candidate has 5+ years of experience and strong problem-solving skills.', 100000, 140000, 'San Francisco, CA', 'full-time', 'user-1', TRUE),
('job-2', 'AI/ML Engineer', 'comp-2', 'DataFlow Inc', 'Join our AI team to build next-generation machine learning models. Experience with Python, TensorFlow, and deep learning required. You will work on computer vision and NLP projects.', 120000, 160000, 'Remote', 'full-time', 'user-2', TRUE),
('job-3', 'Blockchain Developer', 'comp-3', 'CryptoStart', 'Build decentralized applications and smart contracts. Solidity and Web3 experience essential. Join our growing team in the exciting world of blockchain technology.', 90000, 130000, 'New York, NY', 'contract', 'user-3', TRUE),
('job-4', 'UX/UI Designer', 'comp-4', 'DesignHub', 'Create beautiful and intuitive user interfaces for web and mobile applications. Figma expertise required. Work with cross-functional teams to deliver exceptional user experiences.', 70000, 100000, 'Austin, TX', 'full-time', 'user-4', TRUE),
('job-5', 'Data Scientist', 'comp-5', 'CloudTech Solutions', 'Analyze large datasets and build predictive models. Python and SQL expertise required. Help drive data-driven decision making across the organization.', 95000, 125000, 'Seattle, WA', 'full-time', 'user-5', TRUE);

INSERT INTO job_skills (job_id, skill_name, required_level, is_required) VALUES
('job-1', 'React', 'Advanced', TRUE),
('job-1', 'Node.js', 'Advanced', TRUE),
('job-1', 'TypeScript', 'Intermediate', TRUE),
('job-1', 'AWS', 'Intermediate', FALSE),
('job-2', 'Python', 'Expert', TRUE),
('job-2', 'TensorFlow', 'Advanced', TRUE),
('job-2', 'Machine Learning', 'Expert', TRUE),
('job-2', 'Deep Learning', 'Advanced', TRUE),
('job-3', 'Solidity', 'Advanced', TRUE),
('job-3', 'Web3', 'Advanced', TRUE),
('job-3', 'Ethereum', 'Intermediate', TRUE),
('job-3', 'Smart Contracts', 'Advanced', TRUE),
('job-4', 'Figma', 'Expert', TRUE),
('job-4', 'User Experience', 'Advanced', TRUE),
('job-4', 'Prototyping', 'Intermediate', FALSE),
('job-5', 'Python', 'Expert', TRUE),
('job-5', 'SQL', 'Expert', TRUE),
('job-5', 'Machine Learning', 'Advanced', TRUE),
('job-5', 'Statistics', 'Advanced', TRUE);

INSERT INTO posts (id, author_id, content, post_type, likes_count, comments_count) VALUES
('post-1', 'user-2', 'Just completed my first smart contract deployment on Ethereum! The learning curve was steep but incredibly rewarding. Happy to share resources with anyone getting started in Web3.', 'update', 42, 8),
('post-2', 'user-3', 'Career advice: Always negotiate your salary. I increased my offer by 25% just by asking professionally and backing it up with market research. Knowledge is power!', 'advice', 156, 23),
('post-3', 'user-1', 'Excited to announce that TechCorp is hiring! We are looking for passionate developers to join our growing team. Remote-friendly culture with excellent benefits. DM me for details!', 'job', 89, 15),
('post-4', 'user-4', 'The importance of user research cannot be overstated. Spent the last week interviewing users and the insights are game-changing for our product roadmap.', 'advice', 73, 12),
('post-5', 'user-5', 'Machine learning model deployed to production today! Achieved 94% accuracy on our prediction task. The power of clean data and feature engineering never ceases to amaze me.', 'update', 98, 19);

INSERT INTO connections (id, requester_id, recipient_id, status, message) VALUES
('conn-1', 'user-1', 'user-2', 'accepted', 'Hi Sarah! I saw your post about smart contracts and would love to connect. I am also working in the blockchain space.'),
('conn-2', 'user-2', 'user-3', 'accepted', 'Mike, your product management insights are always valuable. Would love to connect and learn more.'),
('conn-3', 'user-3', 'user-4', 'accepted', 'Emily, I have been following your design work. Would love to collaborate on future projects.'),
('conn-4', 'user-4', 'user-5', 'pending', 'David, your data science posts are inspiring. Would love to connect and discuss UX research methodologies.'),
('conn-5', 'user-1', 'user-5', 'accepted', 'Hi David! Fellow tech professional here. Your ML work looks fascinating!');

INSERT INTO payments (id, user_id, transaction_hash, wallet_address, amount, purpose, status, confirmed_at) VALUES
('pay-1', 'user-1', '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', 0.001, 'job_posting', 'confirmed', NOW()),
('pay-2', 'user-2', '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', '0x8ba1f109551bD432803012645Hac136c9c1588c9', 0.001, 'job_posting', 'confirmed', NOW()),
('pay-3', 'user-3', '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456', '0x2546BcD3c84621e976D8185a91A922aE77ECEc30', 0.001, 'job_posting', 'confirmed', NOW());

INSERT INTO ai_job_matches (id, user_id, job_id, match_score, matching_skills, recommendations) VALUES
('match-1', 'user-1', 'job-1', 92, '["React", "Node.js", "TypeScript"]', '["Perfect match for your skill set", "Your experience aligns well with requirements"]'),
('match-2', 'user-2', 'job-2', 95, '["Python", "TensorFlow", "Machine Learning", "Deep Learning"]', '["Excellent match", "Your expertise is exactly what they need"]'),
('match-3', 'user-1', 'job-3', 78, '["Blockchain", "Smart Contracts"]', '["Good match", "Consider highlighting your blockchain experience"]'),
('match-4', 'user-4', 'job-4', 88, '["Figma", "User Experience"]', '["Strong match", "Your design skills are well-suited for this role"]'),
('match-5', 'user-5', 'job-5', 91, '["Python", "SQL", "Machine Learning", "Statistics"]', '["Excellent fit", "Your data science background is perfect"]');
