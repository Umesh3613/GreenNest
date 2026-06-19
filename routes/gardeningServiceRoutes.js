const express = require("express");
const router = express.Router();
const GardeningService = require("../models/gardeningService");

// GET all services
router.get("/", async (req, res) => {
    try {
        const services = await GardeningService.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADD service
router.post("/", async (req, res) => {
    try {
        const service = new GardeningService(req.body);
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;