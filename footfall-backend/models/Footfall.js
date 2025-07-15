//footfall-backend/models/Footfall.js
const mongoose = require('mongoose');

const footfallSchema = new mongoose.Schema({
  sensor_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  count: { type: Number, required: true }
});

module.exports = mongoose.model('Footfall', footfallSchema);
