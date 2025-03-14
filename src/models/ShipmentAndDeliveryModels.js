const mongoose =require('mongoose');
const Schema = mongoose.Schema

const shipmentAndDeliveryMSchema = new Schema({
    order_id:{
        type: Schema.Types.ObjectId,
        ref: 'orders'
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    courier_name:{
        type: String,
        required: true,

    },
    tracking_id:{
        type: String,
        required: true,
        unique: true
    },
    estimated_delivery:{
        type: Date,
        required: true
    },
    delivery_status:{
        type: String,
        enum: ['Processing', 'In-Transit', 'Delivered'],
        default: 'Processing'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('shipmentAndDelivery', shipmentAndDeliveryMSchema)