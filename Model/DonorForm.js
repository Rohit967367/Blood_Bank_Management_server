const mongoose = require("mongoose");

const DonorForm = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        adhaarNumber: { type: String, required: true},
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: String, required: true },
        gender: {
            type: String, enum: ["male", "female", "other"],required: true
        },
        occupation: { type: String, required: true },
        address: { type: String, required: true },
        pinCode: { type: String, required: true },
        date: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("DonorForm", DonorForm);