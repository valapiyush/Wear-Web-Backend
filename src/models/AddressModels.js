const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  street: { type: String, required: true },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
    required: true,
  },
  state_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "states",
    required: true,
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "country",
    required: true,
  },
  zip_code: { type: String, required: true },
  address_type: {
    type: String,
    enum: ["home", "work", "other"],
    default: "home",
  },
  is_default: { type: Boolean, default: false },
});

module.exports = mongoose.model("addresses", AddressSchema);
