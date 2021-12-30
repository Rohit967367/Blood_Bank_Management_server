// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     profilePic: { type: String, defaut: "" },
//     isAdmin: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", UserSchema);

























const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        confirmPassword: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User_Server", UserSchema);