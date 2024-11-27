const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to create an order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const order = await razorpay.orders.create({
      amount, // Amount in paise (e.g., 50000 = ₹500)
      currency, // e.g., 'INR'
      receipt, // Optional unique identifier
    });

    res.json(order); // Send order details to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 3001; // Choose a port for your backend
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
