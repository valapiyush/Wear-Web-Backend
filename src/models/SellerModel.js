const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    store_name:{
        type: String,
        required: true,
        unique: true
    },
    business_registration_number:{
        type: String,
        required: true,
        unique: true,
    },
    contact_number:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: "Contact number must be 10 digits"
        }
    },
    store_address:{
        type: String,
        required: true,

    },
    business_email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: "Please enter a valid email address"
        }
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "products"
    }],
    total_sales:{
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true // true: active, false: inactive
    }
})
module.exports = mongoose.model("sellers", sellerSchema);