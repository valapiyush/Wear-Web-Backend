const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    product_id:{
        type:Schema.Types.ObjectId,
        ref:"products"
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    }
},{
    timestamps: true
}) 
module.exports = mongoose.model("carts", cartSchema)