const mongoose = require("mongoose");

const gardeningServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String
}, { timestamps: true });

module.exports = mongoose.model("GardeningService", gardeningServiceSchema);