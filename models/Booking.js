const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    locality: { type: String, required: true },
    duration: {
        type: String,
        enum: ["One Time", "Weekly", "Monthly", "Quarterly"],
        required: true
    },
    paymentMethod: { type: String, default: "Pay later" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
