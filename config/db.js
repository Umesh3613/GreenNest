const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/greennest");
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.log("❌ DB Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;