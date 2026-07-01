const mongoose = require("mongoose");

const gardeningServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    city: String,
    locality: String,
    startingPrice: Number,
}, { timestamps: true });

module.exports = mongoose.model("GardeningService", gardeningServiceSchema);
