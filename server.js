const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bookingRoutes = require("./routes/bookingRoutes");
const productRoutes = require("./routes/productRoutes");
const gardeningServiceRoutes = require("./routes/gardeningServiceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/greennest";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
.then(() => console.log("MongoDB Connected", MONGODB_URI))
.catch(err => console.log("DB Error:", err));

// Test Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Products API
app.use("/api/products", productRoutes);

// Gardening Services API 
app.use("/api/gardeningServices", gardeningServiceRoutes);

// ✅ BOOKING API 
app.use("/api/bookings", bookingRoutes);

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});