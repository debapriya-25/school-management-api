-- Initialize database for School Management API
-- This file is used by Docker Compose to initialize the MySQL database

CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_coordinates (latitude, longitude),
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data for testing
INSERT IGNORE INTO schools (name, address, latitude, longitude) VALUES
('Delhi Public School', 'New Delhi, India', 28.6139, 77.2090),
('Mumbai International School', 'Mumbai, India', 19.0760, 72.8777),
('Bangalore High School', 'Bangalore, India', 12.9716, 77.5946),
('Chennai Public School', 'Chennai, India', 13.0827, 80.2707),
('Kolkata Academy', 'Kolkata, India', 22.5726, 88.3639),
('Pune Modern School', 'Pune, India', 18.5204, 73.8567),
('Hyderabad International School', 'Hyderabad, India', 17.3850, 78.4867),
('Ahmedabad Public School', 'Ahmedabad, India', 23.0225, 72.5714);
