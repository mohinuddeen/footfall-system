// footfall-backend/controllers/analyticsController.js
const Footfall = require('../models/Footfall');
const Device = require('../models/Device');

/**
 * @desc    Fetch aggregated footfall analytics (grouped by hour or day)
 * @route   GET /analytics?groupBy=hour|day
 * @access  Public (or add auth if needed)
 */

exports.getAnalytics = async (req, res) => {
  try {
    const { groupBy = "hour" } = req.query;

    const dateFormat = groupBy === "day"
      ? { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }
      : { $dateToString: { format: "%Y-%m-%d %H:00", date: "$timestamp" } };

    const data = await Footfall.aggregate([
      {
        $group: {
          _id: { sensor_id: "$sensor_id", time: dateFormat },
          total_count: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          sensor_id: "$_id.sensor_id",
          time: "$_id.time",
          total_count: 1
        }
      },
      { $sort: { time: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Fetch list of devices with status (active/inactive)
 * @route   GET /devices
 * @access  Public (or add auth if needed)
 */

exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    const now = new Date();

    const formattedDevices = devices.map(d => ({
      sensor_id: d.sensor_id,
      location: {
        lat: d.location.lat,
        lng: d.location.lng
      },
      last_seen: d.last_seen,
      status: (now - d.last_seen) / (1000 * 60 * 60) > 1 ? "inactive" : "active"
    }));

    res.json(formattedDevices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
