const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentControllers");
const { createRazorpayOrder } = require("../utils/RazorpayUtils");
const verifyRazorpaySignature = require("../utils/VerifySignatureUtils");

// const authMiddleware = require("../middleware/authMiddleware"); // Ensure user authentication

// router.post("/checkout", authMiddleware, PaymentController.checkout);

router.post("/create", PaymentController.createPayment);

router.get("/user/:user_id", PaymentController.getPaymentsByUser);

router.get("/:id", PaymentController.getPaymentById);

router.delete("/:id", PaymentController.deletePayment);
router.post("/create-order", async (req, res) => {
    const { amount } = req.body;
  
    try {
      const order = await createRazorpayOrder(amount);
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: "Failed to create Razorpay order" });
    }
  });
  router.post("/verify", async (req, res) => {
    const { order_id, payment_id, razorpay_signature } = req.body;
  
    try {
      const isValid = verifyRazorpaySignature({ order_id, payment_id, razorpay_signature });
  
      if (!isValid) {
        return res.status(400).json({ success: false, message: "Signature verification failed" });
      }
  
      // ✅ If valid, continue with order placement
      res.status(200).json({ success: true, message: "Payment verified successfully" });
  
    } catch (error) {
      console.error("Error verifying signature:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
module.exports = router;
