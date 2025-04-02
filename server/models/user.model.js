const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: false

        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profile_pic: {
            type: String,
            default: null
        }
    },{timestamps: true}

);


const User = mongoose.model("User", UserSchema);

module.exports = User;