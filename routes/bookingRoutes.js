const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// GET all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// CREATE booking
router.post("/", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: "🌱 Booking Successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;