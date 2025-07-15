// analyticsRoutes.js
// Routes for fetching analytics data and device status

const express = require('express');
const router = express.Router();
const { getAnalytics, getDevices } = require('../controllers/analyticsController');
/**
 * @route   GET /analytics
 * @desc    Get aggregated footfall analytics (grouped by hour/day)
 * @access  Public
 */
router.get('/analytics', getAnalytics);
/**
 * @route   GET /devices
 * @desc    Get list of devices with location, last seen time, and active/inactive status
 * @access  Public
 */
router.get('/devices', getDevices);

module.exports = router;
