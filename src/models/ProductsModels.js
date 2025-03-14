const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const productsSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    product_name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        // required: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: "categories"   
    },
    sub_category_id:{
        type: Schema.Types.ObjectId,
        ref: "subcategories"
    },
    brand_name:{
        type: String,
        required: true
    },
    base_price:{
        type: Number,
        required: true
    },
    offer_price:{
        type: Number,
    },
    offer_percentage:{
        type: Number,
    },
    
    quantity:{
        type: Number,
        required: true
    },
    product_image_urls:[{
        type: Array,
        // required: true
    }],
    
},{
    timestamps: true
})
module.exports = mongoose.model("products",productsSchema)
