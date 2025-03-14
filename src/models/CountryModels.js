const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define schema
const contrySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
},{
    timestamps: true,
})

module.exports = mongoose.model('country', contrySchema)