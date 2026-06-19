const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bookingRoutes = require("./routes/bookingRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/greennest")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// Test Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Products API
app.use("/api/products", productRoutes);

// ✅ BOOKING API (VERY IMPORTANT)
app.use("/api/bookings", bookingRoutes);

// Server Start
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});