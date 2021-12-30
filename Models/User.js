const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true, trim: true},
        email: {type: String, required: true, unique: true, trim: true},
        password: {type: String, required: true, default: ""},
        isAdmin: {type:Boolean, default:false},
    }, {timestamps: true}
)

module.exports = mongoose.model("UserList", userSchema);