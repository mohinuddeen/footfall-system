// Main server file: Sets up Express server, connects to MongoDB, and mounts routes

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");  // ✅ Import CORS
const sensorRoutes = require("./routes/sensorRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());  // ✅ Enable CORS for all origins

// ✅ Use Routes
app.use("/api", sensorRoutes);
app.use("/api", analyticsRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("MongoDB connected...");
  })
  .catch((err) => console.error(err));

