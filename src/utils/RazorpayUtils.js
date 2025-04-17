const Razorpay = require("razorpay");
// require("dotenv").config();

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_VUoYtVHJesQRnL",
  key_secret: "MZzrbYCvKiBIkvbsnaRjfoRY",
});

const createRazorpayOrder = async (amount) => {
  try {
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substr(2, 9),
    };

    const order = await razorpayInstance.orders.create(options);
    return order;
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    throw error;
  }
};

module.exports = {
  createRazorpayOrder,
  razorpayInstance,
};
