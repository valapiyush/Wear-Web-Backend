const crypto = require("crypto");

const verifyRazorpaySignature = ({ order_id, payment_id, razorpay_signature }) => {
  const body = order_id + "|" + payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", "MZzrbYCvKiBIkvbsnaRjfoRY")
    .update(body.toString())
    .digest("hex");

  return expectedSignature === razorpay_signature;
};

module.exports = verifyRazorpaySignature;
