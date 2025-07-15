// footfall-backend/controllers/sensorController.js
// Controller handling incoming sensor data (footfall counts) and updating device info

const Footfall = require('../models/Footfall');
const Device = require('../models/Device');
/**
 * @desc    Add new sensor (footfall) data and update device status
 * @route   POST /sensor/data
 * @access  Public (can be secured if needed)
 */
exports.addSensorData = async (req, res) => {
  try {
    const { sensor_id, timestamp, count, location } = req.body;

    if (!sensor_id || !count) {
      return res.status(400).json({ message: "sensor_id and count are required" });
    }

    // Save footfall data
    const newFootfall = await Footfall.create({
      sensor_id,
      timestamp: timestamp || new Date(),
      count
    });

    // Update or add device
    await Device.findOneAndUpdate(
      { sensor_id },
      {
        sensor_id,
        location: location || { lat: 0, lng: 0 }, // default if not provided
        last_seen: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Data recorded successfully", data: newFootfall });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
