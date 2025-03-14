const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    status:{
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Shipped','Delivered', 'Cancelled']
    },
    total_amount:{
        type: Number,
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],

},{
    timestamps: true
})

module.exports = mongoose.model('order', orderSchema)