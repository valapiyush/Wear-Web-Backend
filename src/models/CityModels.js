const mongoose = require("mongoose")
const Schema = mongoose.Schema

const citySchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    state_id: {
        type: Schema.Types.ObjectId,
        ref: "states"
    },
    country_id: {
        type: Schema.Types.ObjectId,
        ref: "countries"
    },
    

},{
    timestamps: true
})
module.exports = mongoose.model("city", citySchema)