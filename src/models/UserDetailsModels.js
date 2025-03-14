const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userDetailsSchema = new Schema({
   first_name:{
     type:String,
     required: true
   },
   last_name: {
     type: String,
     required: true
   },
   gender:{
     type: String,
     required: true
   },
   age: {
     type: Number,
     required: true
   },
   contact_number:{
     type: String,
     required: true
   },
   user_id:{
    type: Schema.Types.ObjectId,
    ref: 'users'
   },
   title:{
     type: String,
     required: true
   },
   unit_name:{
     type: String,
     required: true
   },
   street:{
     type: String,
     required: true
   },
   city_id:{
     type: Schema.Types.ObjectId,
     ref: "cities"
   },
   state_id:{
     type: Schema.Types.ObjectId,
     ref: "states"
   },
   country_id:{
     type: Schema.Types.ObjectId,
     ref: "countries"
   },
   pincode:{
     type: String,
     required: true
   },
},{
    timestamps: true
})
module.exports = mongoose.model("userdetails", userDetailsSchema)