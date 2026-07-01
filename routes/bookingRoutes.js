const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// GET bookings for the signed-in user only
router.get("/", async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const bookings = await Booking.find({
            userId,
            $or: [
                { duration: { $ne: "One Time" } },
                { duration: "One Time", date: { $gte: today } }
            ]
        }).sort({ date: 1 });

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