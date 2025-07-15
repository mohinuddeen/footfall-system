// sensorRoutes.js
// Routes for handling incoming sensor data (footfall counts)

const express = require('express');
const router = express.Router();
const { addSensorData } = require('../controllers/sensorController');

/**
 * @route   POST /sensor-data
 * @desc    Add new sensor (footfall) data and update device info
 * @access  Public (can be secured if needed)
 */
router.post('/sensor-data', addSensorData);

module.exports = router;
