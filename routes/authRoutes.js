const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = (username || normalizedEmail.split("@")[0]).trim().toLowerCase();

    try {
        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
        });

        if (existingUser) {
            const message = existingUser.email === normalizedEmail
                ? "Email already registered"
                : "Username already taken";
            return res.status(409).json({ message });
        }

        const newUser = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password
        });

        const safeUser = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        };

        res.status(201).json({ message: "Account created successfully", user: safeUser });
    } catch (error) {
        res.status(500).json({ message: "Sign up failed", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email: email.trim().toLowerCase(), password });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const safeUser = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        res.status(200).json({ message: "Login successful", user: safeUser });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

module.exports = router;
