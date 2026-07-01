const express = require("express");
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_T50JaxvWk0jVgv',
  key_secret: '4bKrZVp4ssxJI4m56kvQldk3'
});

router.post("/create-order", async (req, res) => {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Valid amount is required" });
    }
    
    const options = {
        amount: req.body.amount, // Amount in paisa
        currency: "INR",
        receipt: "rcpt_" + Date.now() + "_" + Math.floor(Math.random() * 1000)
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order); // This returns the order object containing the ID
    } catch (error) {
        console.log("Error creating Razorpay order:", error);
        res.status(500).send(error);
    }
});

module.exports = router;