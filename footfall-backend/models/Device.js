// footfall-backend/models/Device.js
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  sensor_id: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  last_seen: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
