const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabaseAndTables = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  try {
    console.log('Creating database...');
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'school_management'}\``);
    await connection.query(`USE \`${process.env.DB_NAME || 'school_management'}\``);
    
    console.log('Database created or already exists.');

    // Create schools table
    const createSchoolsTable = `
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
    `;

    await connection.query(createSchoolsTable);
    console.log('Schools table created successfully.');

    // Insert sample data for testing
    const insertSampleData = `
      INSERT IGNORE INTO schools (name, address, latitude, longitude) VALUES
      ('Delhi Public School', 'New Delhi, India', 28.6139, 77.2090),
      ('Mumbai International School', 'Mumbai, India', 19.0760, 72.8777),
      ('Bangalore High School', 'Bangalore, India', 12.9716, 77.5946),
      ('Chennai Public School', 'Chennai, India', 13.0827, 80.2707),
      ('Kolkata Academy', 'Kolkata, India', 22.5726, 88.3639),
      ('Pune Modern School', 'Pune, India', 18.5204, 73.8567),
      ('Hyderabad International School', 'Hyderabad, India', 17.3850, 78.4867),
      ('Ahmedabad Public School', 'Ahmedabad, India', 23.0225, 72.5714)
    `;

    await connection.query(insertSampleData);
    console.log('Sample data inserted successfully.');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  createDatabaseAndTables();
}

module.exports = { createDatabaseAndTables };
