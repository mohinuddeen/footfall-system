const axios = require('axios');

const sensors = [
  { sensor_id: "sensor_1", location: { lat: 25.2048, lng: 55.2708 } },
  { sensor_id: "sensor_2", location: { lat: 25.276987, lng: 55.296249 } }
];

setInterval(async () => {
  for (const sensor of sensors) {
    try {
      await axios.post("http://localhost:5000/sensor-data", {
        sensor_id: sensor.sensor_id,
        count: Math.floor(Math.random() * 20) + 1,
        location: sensor.location
      });
      console.log(`Data sent for ${sensor.sensor_id}`);
    } catch (err) {
      console.error("Error sending data", err.message);
    }
  }
}, 3600000); // every 1 hour

console.log("Simulator running...");
