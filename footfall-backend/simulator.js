// simulator.js
const axios = require("axios");

const API_URL = "http://localhost:5000/api/sensor-data"; // Your running backend URL

// List of simulated sensors
const sensors = [
  { sensor_id: "sensor_1", location: { lat: 25.2048, lng: 55.2708 } },
  { sensor_id: "sensor_2", location: { lat: 25.276987, lng: 55.296249 } }
];

// Function to send random footfall data
const sendData = async () => {
  for (let sensor of sensors) {
    const data = {
      sensor_id: sensor.sensor_id,
      timestamp: new Date(),
      count: Math.floor(Math.random() * 10) + 1, // Random count between 1-10
      location: sensor.location
    };

    try {
      const res = await axios.post(API_URL, data);
      console.log(`✅ Data sent for ${sensor.sensor_id}:`, res.data);
    } catch (err) {
      console.error(`❌ Error sending data for ${sensor.sensor_id}:`, err.message);
    }
  }
};

// Run every hour (for real use, change to 3600000 ms)
setInterval(sendData, 5000); // every 5 sec for testing

console.log("🚀 Simulator started... sending data every 5 seconds");
