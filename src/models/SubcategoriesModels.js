const mongoose = require("mongoose")
const Schema = mongoose.Schema

const subCategoriesSchema = new Schema({
    category_id:{
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    sub_category_name:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model("subcategories", subCategoriesSchema)