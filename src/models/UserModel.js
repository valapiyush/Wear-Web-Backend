const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true

    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: "roles"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true // true: active, false: inactive
    }
});

module.exports = mongoose.model("users", userSchema);
