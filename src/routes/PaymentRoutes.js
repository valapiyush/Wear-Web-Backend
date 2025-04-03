const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentControllers");
// const authMiddleware = require("../middleware/authMiddleware"); // Ensure user authentication

// router.post("/checkout", authMiddleware, PaymentController.checkout);

router.post("/create", PaymentController.createPayment);

router.get("/user/:user_id", PaymentController.getPaymentsByUser);

router.get("/:id", PaymentController.getPaymentById);

router.delete("/:id", PaymentController.deletePayment);

module.exports = router;
