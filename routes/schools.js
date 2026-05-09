const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { validateSchool, validateLocation } = require('../middleware/validation');

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

// POST /addSchool - Add a new school
router.post('/addSchool', validateSchool, async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [name, address, latitude, longitude]);

    res.status(201).json({
      status: 'Success',
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /listSchools - List schools sorted by proximity
router.get('/listSchools', validateLocation, async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Fetch all schools
    const query = 'SELECT * FROM schools';
    const [schools] = await pool.execute(query);

    // Calculate distance for each school and sort
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    // Sort by distance (ascending)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      status: 'Success',
      message: 'Schools retrieved successfully',
      data: schoolsWithDistance,
      count: schoolsWithDistance.length
    });
  } catch (error) {
    next(error);
  }
});

// GET /schools - Get all schools (without distance calculation)
router.get('/schools', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM schools ORDER BY name';
    const [schools] = await pool.execute(query);

    res.status(200).json({
      status: 'Success',
      message: 'Schools retrieved successfully',
      data: schools,
      count: schools.length
    });
  } catch (error) {
    next(error);
  }
});

// GET /schools/:id - Get a specific school by ID
router.get('/schools/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const query = 'SELECT * FROM schools WHERE id = ?';
    const [schools] = await pool.execute(query, [id]);

    if (schools.length === 0) {
      return res.status(404).json({
        status: 'Error',
        message: 'School not found'
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'School retrieved successfully',
      data: schools[0]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
