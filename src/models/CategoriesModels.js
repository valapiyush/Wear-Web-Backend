const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema =new Schema({
    category_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('categories',categoriesSchema)