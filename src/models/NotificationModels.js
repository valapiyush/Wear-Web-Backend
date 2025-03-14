const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    message:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['Order Update', 'Promo', 'Security Alert']
    },
    status:{
        type: String,
        default: 'Unreaad',
        enum: ['Unread', 'Read']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('notifications', notificationSchema)