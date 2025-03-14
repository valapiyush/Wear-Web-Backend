const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderTransactionsSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: "orders",
        required: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    payment_method:{
        type: String,
        required: true
    },
    amount_paid:{
        type: Number,
        required: true
    },
    transaction_status:{
        type: String,
        required: true,
        enum: ["pending", "completed", "failed","refunded"],
        lowercase: true,
        trim: true,
        default: "pending"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("OrderTransactions", orderTransactionsSchema)