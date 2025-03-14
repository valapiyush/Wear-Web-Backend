const mongoose = require("mongoose")
const Schema = mongoose.Schema

const stateSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    country_id:{
        type: Schema.Types.ObjectId,
        ref: "countries"
    },
   

},{
    timestamps: true
})

module.exports = mongoose.model("states", stateSchema)