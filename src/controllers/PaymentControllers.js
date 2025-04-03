const Payment = require('../models/PaymentModels');

const Order = require("../models/OrderModels"); // Import Order Model

exports.createPayment = async (req, res) => {
  try {
    const { user_id, order_id, amount, payment_method, transaction_id } = req.body;

    // Validate Order Exists
    const order = await Order.findById(order_id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Create Payment
    const payment = new Payment({
      user_id,
      order_id,
      amount,
      payment_method,
      payment_status: payment_method === "COD" ? "Pending" : "Completed",
      transaction_id,
    });

    await payment.save();

    // Update Order Payment Status
    order.payment_status = payment.payment_status;
    await order.save();

    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.checkout = async (req, res) => {
  try {
    const { user_id, cart, total, payment_method, transaction_id } = req.body;

    // Step 1️⃣: Create Order
    const order = new Order({
      user_id,
      items: cart,
      total,
      payment_status: payment_method === "COD" ? "Pending" : "Completed",
    });

    await order.save();

    // Step 2️⃣: Process Payment
    const payment = new Payment({
      user_id,
      order_id: order._id,
      amount: total,
      payment_method,
      payment_status: payment_method === "COD" ? "Pending" : "Completed",
      transaction_id: transaction_id || null,
    });

    await payment.save();

    // Step 3️⃣: Respond with order & payment details
    res.status(201).json({
      message: "Order placed & Payment processed successfully!",
      order_id: order._id,
      payment_id: payment._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ user_id: req.params.user_id }).populate("order_id");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

